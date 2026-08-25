import { boolean, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  username: varchar("username", { length: 96 }).unique(),
  passwordHash: varchar("passwordHash", { length: 255 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const adminLoginAttempts = mysqlTable("adminLoginAttempts", {
  id: int("id").autoincrement().primaryKey(),
  loginKey: varchar("loginKey", { length: 96 }).notNull().unique(),
  failedAttempts: int("failedAttempts").default(0).notNull(),
  lockedUntil: timestamp("lockedUntil"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AdminLoginAttempt = typeof adminLoginAttempts.$inferSelect;

export const partnershipRequests = mysqlTable("partnershipRequests", {
  id: int("id").autoincrement().primaryKey(),
  organizationName: varchar("organizationName", { length: 180 }).notNull(),
  contactName: varchar("contactName", { length: 180 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 40 }),
  requestType: mysqlEnum("requestType", ["parceria", "patrocinio", "ambos", "outro"]).notNull(),
  location: varchar("location", { length: 180 }).notNull(),
  projectContext: text("projectContext").notNull(),
  objectives: text("objectives"),
  consentToContact: boolean("consentToContact").notNull(),
  status: mysqlEnum("status", ["novo", "em_analise", "contactado", "em_conversa", "concluido", "arquivado"]).default("novo").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PartnershipRequest = typeof partnershipRequests.$inferSelect;
export type InsertPartnershipRequest = typeof partnershipRequests.$inferInsert;
