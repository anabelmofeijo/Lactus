import { and, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { adminLoginAttempts, InsertLumiInstallation, InsertPartnershipRequest, InsertUser, lumiInstallations, partnershipRequests, PartnershipRequest, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "username", "passwordHash", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }
    if (user.isActive !== undefined) {
      values.isActive = user.isActive;
      updateSet.isActive = user.isActive;
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getTeamAccountByUsername(username: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
  return result[0];
}

export async function listTeamAccounts() {
  const db = await getDb();
  if (!db) throw new Error("A base de dados não está disponível neste momento.");
  return db.select({
    id: users.id,
    name: users.name,
    email: users.email,
    username: users.username,
    isActive: users.isActive,
    role: users.role,
    createdAt: users.createdAt,
    lastSignedIn: users.lastSignedIn,
  }).from(users).where(eq(users.loginMethod, "team-password")).orderBy(desc(users.createdAt));
}

export async function createTeamAccount(account: {
  openId: string;
  name: string;
  email: string;
  username: string;
  passwordHash: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("A base de dados não está disponível neste momento.");
  const result = await db.insert(users).values({
    ...account,
    loginMethod: "team-password",
    role: "admin",
    isActive: true,
    lastSignedIn: new Date(),
  });
  return Number(result[0].insertId);
}

export async function setTeamAccountActive(id: number, isActive: boolean) {
  const db = await getDb();
  if (!db) throw new Error("A base de dados não está disponível neste momento.");
  await db.update(users).set({ isActive }).where(and(eq(users.id, id), eq(users.loginMethod, "team-password")));
}

export async function listLumiInstallations() {
  const db = await getDb();
  if (!db) throw new Error("A base de dados não está disponível neste momento.");
  return db.select().from(lumiInstallations).orderBy(desc(lumiInstallations.createdAt));
}

export async function createLumiInstallation(installation: InsertLumiInstallation) {
  const db = await getDb();
  if (!db) throw new Error("A base de dados não está disponível neste momento.");
  const result = await db.insert(lumiInstallations).values(installation);
  return Number(result[0].insertId);
}

export async function deleteLumiInstallation(id: number) {
  const db = await getDb();
  if (!db) throw new Error("A base de dados não está disponível neste momento.");
  await db.delete(lumiInstallations).where(eq(lumiInstallations.id, id));
}

export async function getAdminLoginAttempt(loginKey: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(adminLoginAttempts).where(eq(adminLoginAttempts.loginKey, loginKey)).limit(1);
  return result[0];
}

export async function recordFailedAdminLogin(loginKey: string, maxAttempts: number, lockDurationMs: number) {
  const db = await getDb();
  if (!db) throw new Error("A base de dados não está disponível neste momento.");

  const existing = await getAdminLoginAttempt(loginKey);
  const failedAttempts = (existing?.failedAttempts ?? 0) + 1;
  const lockedUntil = failedAttempts >= maxAttempts ? new Date(Date.now() + lockDurationMs) : null;

  await db.insert(adminLoginAttempts).values({ loginKey, failedAttempts, lockedUntil }).onDuplicateKeyUpdate({
    set: { failedAttempts, lockedUntil },
  });

  return { failedAttempts, lockedUntil };
}

export async function clearAdminLoginAttempts(loginKey: string) {
  const db = await getDb();
  if (!db) return;
  await db.delete(adminLoginAttempts).where(eq(adminLoginAttempts.loginKey, loginKey));
}

export async function createPartnershipRequest(request: InsertPartnershipRequest) {
  const db = await getDb();
  if (!db) {
    throw new Error("A base de dados não está disponível neste momento.");
  }

  const result = await db.insert(partnershipRequests).values(request);
  return result[0].insertId;
}

export async function listPartnershipRequests(status?: PartnershipRequest["status"]) {
  const db = await getDb();
  if (!db) {
    throw new Error("A base de dados não está disponível neste momento.");
  }

  if (status) {
    return db.select().from(partnershipRequests).where(eq(partnershipRequests.status, status)).orderBy(desc(partnershipRequests.createdAt));
  }

  return db.select().from(partnershipRequests).orderBy(desc(partnershipRequests.createdAt));
}

export async function updatePartnershipRequestStatus(id: number, status: PartnershipRequest["status"]) {
  const db = await getDb();
  if (!db) {
    throw new Error("A base de dados não está disponível neste momento.");
  }

  await db.update(partnershipRequests).set({ status }).where(eq(partnershipRequests.id, id));
}
