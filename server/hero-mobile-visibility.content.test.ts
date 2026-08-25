import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const styles = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");

describe("hero móvel dos fundadores", () => {
  it("reserva espaço abaixo da fotografia e desloca o selo editorial para essa área", () => {
    expect(styles).toContain(".hero-visual { min-height: 470px; }");
    expect(styles).toContain(".hero-photo-wrap--founders { width: 94%; height: 405px; }");
    expect(styles).toContain(".hero-note--top { top: auto; bottom: 8px; left: 1%; }");
  });
});
