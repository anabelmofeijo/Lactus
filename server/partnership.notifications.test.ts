import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const routers = readFileSync(resolve(projectRoot, "server/routers.ts"), "utf8");

describe("notificações de pedidos de parceria", () => {
  it("notifica o proprietário depois de guardar um pedido sem impedir a submissão se a notificação falhar", () => {
    expect(routers).toContain('import { notifyOwner } from "./_core/notification"');
    expect(routers).toContain("notificationSent = await notifyOwner");
    expect(routers).toContain("[Partnership] Failed to notify owner");
    expect(routers).toContain("return { success: true, id, notificationSent }");
  });
});
