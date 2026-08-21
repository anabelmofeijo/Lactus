import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf8");

describe("experiência bilingue", () => {
  it("persiste a preferência de idioma e actualiza o idioma do documento", () => {
    const context = read("client/src/contexts/LanguageContext.tsx");
    expect(context).toContain('"lactus-language"');
    expect(context).toContain('document.documentElement.lang');
    expect(context).toContain('"pt-PT"');
    expect(context).toContain('new URLSearchParams(window.location.search)');
  });

  it("apresenta um selector PT/EN em todas as páginas públicas", () => {
    const toggle = read("client/src/components/LanguageToggle.tsx");
    expect(toggle).toContain('"PT"');
    expect(toggle).toContain('"EN"');
    for (const page of ["Home.tsx", "Moments.tsx", "Partnership.tsx", "NotFound.tsx"]) {
      expect(read(`client/src/pages/${page}`)).toContain("LanguageToggle");
    }
  });

  it("mantém versões portuguesa e inglesa do conteúdo institucional", () => {
    const home = read("client/src/pages/Home.tsx");
    expect(home).toContain("A energia pode");
    expect(home).toContain("Energy can");
    expect(home).toContain("nomeada a nível global");
    expect(home).toContain("globally nominated");
  });
});
