import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const homeSource = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
const momentsSource = readFileSync(resolve(projectRoot, "client/src/pages/Moments.tsx"), "utf8");

describe("destaque NASA Space Apps", () => {
  it("usa a fotografia original da vitória na landing page com contexto da nomeação global", () => {
    expect(homeSource).toContain("lactus-nasa-space-apps-luanda-2025-vitoria-global_d6ec43d1.jpeg");
    expect(homeSource).toContain("nomeada a nível global");
    expect(homeSource).toContain("Vitória local · Nomeação global");
  });

  it("inclui a fotografia e o marco correcto no arquivo Momentos", () => {
    expect(momentsSource).toContain("lactus-nasa-space-apps-luanda-2025-vitoria-global_d6ec43d1.jpeg");
    expect(momentsSource).toContain("Vitória no NASA Space Apps Luanda 2025 e nomeação global");
  });
});
