import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const layout = readFileSync(resolve(projectRoot, "client/src/components/DashboardLayout.tsx"), "utf8");

describe("entrada do painel administrativo", () => {
  it("apresenta uma entrada Lactus e preserva o início de sessão seguro existente", () => {
    expect(layout).toContain("DashboardAccessGate");
    expect(layout).toContain("Cada parceria merece acompanhamento.");
    expect(layout).toContain("Entrar no painel");
    expect(layout).toContain("startLogin()");
    expect(layout).toContain("acesso administrativo é reservado");
  });
});
