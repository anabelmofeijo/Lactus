import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const homeSource = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
const momentsSource = readFileSync(resolve(projectRoot, "client/src/pages/Moments.tsx"), "utf8");
const stylesSource = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");
const documentSource = readFileSync(resolve(projectRoot, "client/index.html"), "utf8");

describe("desempenho das páginas públicas", () => {
  it("atrasa a transferência e descodificação de fotografias fora do primeiro ecrã", () => {
    expect(homeSource).toContain('loading="lazy"');
    expect(homeSource).toContain('decoding="async"');
    expect(momentsSource).toContain('loading="lazy"');
    expect(momentsSource).toContain('decoding="async"');
  });

  it("prioriza a fotografia dos fundadores e descobre as fontes no documento inicial", () => {
    expect(homeSource).toContain('fetchPriority="high"');
    expect(documentSource).toContain('fonts.googleapis.com/css2');
  });

  it("prioriza movimento leve e respeita a preferência de movimento reduzido", () => {
    expect(stylesSource).toContain("will-change: transform");
    expect(stylesSource).toContain("prefers-reduced-motion: reduce");
  });
});
