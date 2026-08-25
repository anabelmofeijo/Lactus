import { describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

const database = vi.hoisted(() => ({
  clearAdminLoginAttempts: vi.fn(),
  createPartnershipRequest: vi.fn(),
  createTeamAccount: vi.fn().mockResolvedValue(42),
  getAdminLoginAttempt: vi.fn(),
  getTeamAccountByUsername: vi.fn().mockResolvedValue(undefined),
  listPartnershipRequests: vi.fn(),
  listTeamAccounts: vi.fn().mockResolvedValue([]),
  recordFailedAdminLogin: vi.fn(),
  setTeamAccountActive: vi.fn(),
  updatePartnershipRequestStatus: vi.fn(),
  upsertUser: vi.fn(),
}));

vi.mock("./db", () => database);
vi.mock("./_core/sdk", () => ({ sdk: { createSessionToken: vi.fn() } }));

const { appRouter } = await import("./routers");

function createAdminContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "admin",
      name: "Administração Lactus",
      email: "admin@lactus.ao",
      username: "admin",
      passwordHash: null,
      loginMethod: "password",
      role: "admin",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("team management", () => {
  it("cria uma conta com uma derivação de palavra-passe, nunca com o valor original", async () => {
    database.getTeamAccountByUsername.mockResolvedValueOnce(undefined);
    const caller = appRouter.createCaller(createAdminContext());
    const password = "EquipaLactus2026";

    await expect(caller.team.create({
      name: "Catarina Monteiro",
      email: "catarina@lactus.ao",
      username: "catarina.monteiro",
      password,
    })).resolves.toEqual({ success: true, id: 42 });

    const account = database.createTeamAccount.mock.calls[0]?.[0];
    expect(account.passwordHash).not.toContain(password);
    expect(account.passwordHash).toContain(":");
    expect(account.username).toBe("catarina.monteiro");
  });

  it("não permite duplicar um nome de utilizador", async () => {
    database.getTeamAccountByUsername.mockResolvedValueOnce({ id: 9, username: "catarina.monteiro" });
    const caller = appRouter.createCaller(createAdminContext());

    await expect(caller.team.create({
      name: "Catarina Monteiro",
      email: "catarina@lactus.ao",
      username: "catarina.monteiro",
      password: "EquipaLactus2026",
    })).rejects.toMatchObject({ code: "CONFLICT" });
  });

  it("permite desactivar uma conta a partir do painel administrativo", async () => {
    const caller = appRouter.createCaller(createAdminContext());

    await expect(caller.team.setActive({ id: 42, isActive: false })).resolves.toEqual({ success: true });
    expect(database.setTeamAccountActive).toHaveBeenCalledWith(42, false);
  });
});
