import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { clearAdminLoginAttempts } from "./db";

const INVALID_LOGIN_KEY = "unknown:utilizador-invalido";

type CookieCall = { name: string; value: string; options: Record<string, unknown> };

function createUnauthenticatedContext(): { ctx: TrpcContext; cookies: CookieCall[] } {
  const cookies: CookieCall[] = [];
  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      ip: "127.0.0.1",
      headers: { "x-forwarded-proto": "https" },
    } as TrpcContext["req"],
    res: {
      cookie: (name: string, value: string, options: Record<string, unknown>) => {
        cookies.push({ name, value, options });
      },
    } as TrpcContext["res"],
  };

  return { ctx, cookies };
}

describe("auth.passwordLogin", () => {
  it("aceita as credenciais administrativas configuradas e cria uma sessão HTTP-only", async () => {
    const username = process.env.ADMIN_LOGIN_USERNAME;
    const password = process.env.ADMIN_LOGIN_PASSWORD;
    expect(username).toBeTruthy();
    expect(password).toBeTruthy();

    const { ctx, cookies } = createUnauthenticatedContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.passwordLogin({ username, password });

    expect(result).toEqual({ success: true });
    expect(cookies).toHaveLength(1);
    expect(cookies[0]?.name).toBe("lactus_admin_session");
    expect(cookies[0]?.value).not.toContain(password as string);
    expect(cookies[0]?.options).toMatchObject({
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });
  });

  it("rejeita credenciais inválidas e não emite uma sessão", async () => {
    const { ctx, cookies } = createUnauthenticatedContext();
    const caller = appRouter.createCaller(ctx);

    await expect(caller.auth.passwordLogin({ username: "utilizador-invalido", password: "credencial-invalida" }))
      .rejects.toMatchObject({ code: "BAD_REQUEST" });
    expect(cookies).toHaveLength(0);

    await clearAdminLoginAttempts(INVALID_LOGIN_KEY);
  });

  it("bloqueia novas tentativas depois de cinco credenciais inválidas", async () => {
    const { ctx } = createUnauthenticatedContext();
    const caller = appRouter.createCaller(ctx);

    try {
      for (let attempt = 0; attempt < 4; attempt += 1) {
        await expect(caller.auth.passwordLogin({ username: "utilizador-invalido", password: "credencial-invalida" }))
          .rejects.toMatchObject({ code: "BAD_REQUEST" });
      }

      await expect(caller.auth.passwordLogin({ username: "utilizador-invalido", password: "credencial-invalida" }))
        .rejects.toMatchObject({ code: "TOO_MANY_REQUESTS" });
    } finally {
      await clearAdminLoginAttempts(INVALID_LOGIN_KEY);
    }
  });
});
