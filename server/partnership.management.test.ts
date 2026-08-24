import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const schema = readFileSync(resolve(projectRoot, "drizzle/schema.ts"), "utf8");
const db = readFileSync(resolve(projectRoot, "server/db.ts"), "utf8");
const routers = readFileSync(resolve(projectRoot, "server/routers.ts"), "utf8");
const admin = readFileSync(resolve(projectRoot, "client/src/pages/PartnershipAdmin.tsx"), "utf8");

describe("gestão privada de pedidos de parceria", () => {
  it("define estados de acompanhamento e os procedimentos protegidos de listagem e actualização", () => {
    expect(schema).toContain('status: mysqlEnum("status"');
    expect(schema).toContain('"em_conversa"');
    expect(db).toContain("listPartnershipRequests");
    expect(db).toContain("updatePartnershipRequestStatus");
    expect(routers).toContain("list: adminProcedure");
    expect(routers).toContain("updateStatus: adminProcedure");
  });

  it("apresenta um painel privado com filtro e mudança de estado", () => {
    expect(admin).toContain("Pedidos de parceria");
    expect(admin).toContain("Filtrar por estado");
    expect(admin).toContain("updateStatus.mutate");
    expect(admin).toContain("Acesso restrito");
  });
});
