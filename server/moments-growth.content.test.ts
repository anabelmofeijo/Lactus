import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("ilustração botânica da página Momentos", () => {
  it("inclui uma planta decorativa e respeita a preferência de movimento reduzido", () => {
    const moments = readFileSync(resolve(process.cwd(), "client/src/pages/Moments.tsx"), "utf8");
    const styles = readFileSync(resolve(process.cwd(), "client/src/index.css"), "utf8");

    expect(moments).toContain("moments-growing-plant");
    expect(moments).toContain("growth-stem");
    expect(styles).toContain("@media (prefers-reduced-motion: no-preference)");
    expect(styles).toContain("plant-rise");
  });
});
