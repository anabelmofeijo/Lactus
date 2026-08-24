import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const layout = readFileSync(resolve(projectRoot, "client/src/components/DashboardLayout.tsx"), "utf8");

describe("entrada do painel administrativo", () => {
  it("apresenta uma entrada Lactus com fotografia da equipa e formulário de credenciais", () => {
    expect(layout).toContain("DashboardAccessGate");
    expect(layout).toContain("lactus-award-team_2bceef86.jpg");
    expect(layout).toContain("A energia que criamos também se gere com cuidado.");
    expect(layout).toContain("admin-username");
    expect(layout).toContain("admin-password");
    expect(layout).toContain("passwordLogin");
    expect(layout).toContain("Entrar na gestão");
  });
});
