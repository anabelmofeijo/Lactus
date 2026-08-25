import { describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

const database = vi.hoisted(() => ({
  clearAdminLoginAttempts: vi.fn(),
  createLumiInstallation: vi.fn().mockResolvedValue(8),
  createPartnershipRequest: vi.fn(),
  createTeamAccount: vi.fn(),
  deleteLumiInstallation: vi.fn(),
  getAdminLoginAttempt: vi.fn(),
  getTeamAccountByUsername: vi.fn(),
  listLumiInstallations: vi.fn().mockResolvedValue([]),
  listPartnershipRequests: vi.fn(),
  listTeamAccounts: vi.fn(),
  recordFailedAdminLogin: vi.fn(),
  setTeamAccountActive: vi.fn(),
  updatePartnershipRequestStatus: vi.fn(),
  upsertUser: vi.fn(),
}));

vi.mock("./db", () => database);
vi.mock("./_core/sdk", () => ({ sdk: { createSessionToken: vi.fn() } }));

const { appRouter } = await import("./routers");

function contextWithRole(role: "admin" | "user"): TrpcContext {
  return { user: { role } } as TrpcContext;
}

describe("lumi management", () => {
  it("cadastra um ponto com os dados da instalação e empresa associada", async () => {
    const caller = appRouter.createCaller(contextWithRole("admin"));

    await expect(caller.lumi.create({
      pointName: "Lumi — Escola de Viana",
      companyName: "Lactus",
      contactName: "Catarina Monteiro",
      contactEmail: "catarina@lactus.ao",
      location: "Viana, Luanda",
      installedAt: "2026-08-25",
      status: "operacional",
      notes: "Acompanhamento mensal.",
    })).resolves.toEqual({ success: true, id: 8 });

    expect(database.createLumiInstallation).toHaveBeenCalledWith(expect.objectContaining({
      pointName: "Lumi — Escola de Viana",
      companyName: "Lactus",
      location: "Viana, Luanda",
      status: "operacional",
    }));
  });

  it("elimina um ponto apenas através do procedimento administrativo", async () => {
    const caller = appRouter.createCaller(contextWithRole("admin"));

    await expect(caller.lumi.delete({ id: 8 })).resolves.toEqual({ success: true });
    expect(database.deleteLumiInstallation).toHaveBeenCalledWith(8);
  });

  it("rejeita acesso de utilizadores sem perfil administrador", async () => {
    const caller = appRouter.createCaller(contextWithRole("user"));

    await expect(caller.lumi.list()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("valida campos obrigatórios antes de gravar", async () => {
    database.createLumiInstallation.mockClear();
    const caller = appRouter.createCaller(contextWithRole("admin"));

    await expect(caller.lumi.create({
      pointName: "Lumi",
      companyName: "",
      location: "Luanda",
      status: "operacional",
    })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    expect(database.createLumiInstallation).not.toHaveBeenCalled();
  });
});
