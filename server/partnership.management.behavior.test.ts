import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

vi.mock("./db", () => ({
  createPartnershipRequest: vi.fn(),
  listPartnershipRequests: vi.fn(),
  updatePartnershipRequestStatus: vi.fn(),
}));

vi.mock("./_core/notification", () => ({ notifyOwner: vi.fn() }));

import { listPartnershipRequests, updatePartnershipRequestStatus } from "./db";
import { appRouter } from "./routers";

function createContext(role: "admin" | "user"): TrpcContext {
  return {
    user: {
      id: 1,
      openId: `${role}-user`,
      email: `${role}@lactus.test`,
      name: "Lactus Team",
      loginMethod: "manus",
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("procedimentos administrativos de parceria", () => {
  beforeEach(() => vi.clearAllMocks());

  it("bloqueia a listagem para utilizadores sem perfil de administrador", async () => {
    const caller = appRouter.createCaller(createContext("user"));
    await expect(caller.partnership.list()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("lista pedidos para administradores e persiste mudanças de estado", async () => {
    vi.mocked(listPartnershipRequests).mockResolvedValue([
      {
        id: 7,
        organizationName: "Organização Lactus",
        contactName: "Contacto Lactus",
        email: "contacto@lactus.test",
        phone: null,
        requestType: "parceria",
        location: "Luanda",
        projectContext: "Pedido de parceria para um projecto-piloto.",
        objectives: null,
        consentToContact: true,
        status: "novo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ] as never);

    const caller = appRouter.createCaller(createContext("admin"));
    const listed = await caller.partnership.list({ status: "novo" });
    expect(listPartnershipRequests).toHaveBeenCalledWith("novo");
    expect(listed.requests).toHaveLength(1);

    await caller.partnership.updateStatus({ id: 7, status: "contactado" });
    expect(updatePartnershipRequestStatus).toHaveBeenCalledWith(7, "contactado");
  });
});
