import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_MAX_AGE_MS, COOKIE_NAME } from "@shared/const";
import { scryptSync, timingSafeEqual } from "node:crypto";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { clearAdminLoginAttempts, createPartnershipRequest, getAdminLoginAttempt, listPartnershipRequests, recordFailedAdminLogin, updatePartnershipRequestStatus, upsertUser } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { ENV } from "./_core/env";
import { notifyOwner } from "./_core/notification";
import { sdk } from "./_core/sdk";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";

export const partnershipRequestInput = z.object({
  organizationName: z.string().trim().min(2, "Indique o nome da organização.").max(180),
  contactName: z.string().trim().min(2, "Indique o nome da pessoa responsável.").max(180),
  email: z.string().trim().email("Indique um e-mail válido.").max(320),
  phone: z.string().trim().max(40).optional(),
  requestType: z.enum(["parceria", "patrocinio", "ambos", "outro"]),
  location: z.string().trim().min(2, "Indique a localização do projecto.").max(180),
  projectContext: z.string().trim().min(20, "Descreva brevemente o contexto ou a necessidade.").max(5000),
  objectives: z.string().trim().max(5000).optional(),
  consentToContact: z.boolean().refine((value) => value, { message: "É necessário autorizar o contacto sobre este pedido." }),
});

export const partnershipStatusInput = z.enum(["novo", "em_analise", "contactado", "em_conversa", "concluido", "arquivado"]);

const passwordLoginInput = z.object({
  username: z.string().trim().min(1).max(96),
  password: z.string().min(1).max(128),
});
const PASSWORD_ADMIN_OPEN_ID = "lactus_password_admin";
const ADMIN_LOGIN_KEY = "primary-admin";
const MAX_FAILED_LOGIN_ATTEMPTS = 5;
const LOGIN_LOCK_DURATION_MS = 15 * 60 * 1000;

function sameSecret(candidate: string, expected: string) {
  const salt = "lactus-admin-password-verifier-v1";
  const candidateHash = scryptSync(candidate, salt, 64);
  const expectedHash = scryptSync(expected, salt, 64);
  return timingSafeEqual(candidateHash, expectedHash);
}

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    passwordLogin: publicProcedure.input(passwordLoginInput).mutation(async ({ ctx, input }) => {
      if (!ENV.adminLoginUsername || !ENV.adminLoginPassword) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "O acesso administrativo ainda não está configurado." });
      }

      const attempt = await getAdminLoginAttempt(ADMIN_LOGIN_KEY);
      if (attempt?.lockedUntil && attempt.lockedUntil > new Date()) {
        throw new TRPCError({ code: "TOO_MANY_REQUESTS", message: "Demasiadas tentativas. Tente novamente dentro de alguns minutos." });
      }

      const credentialsAreValid = sameSecret(input.username, ENV.adminLoginUsername) && sameSecret(input.password, ENV.adminLoginPassword);
      if (!credentialsAreValid) {
        const failed = await recordFailedAdminLogin(ADMIN_LOGIN_KEY, MAX_FAILED_LOGIN_ATTEMPTS, LOGIN_LOCK_DURATION_MS);
        const message = failed.lockedUntil
          ? "Demasiadas tentativas. Tente novamente dentro de alguns minutos."
          : "Utilizador ou palavra-passe incorrectos.";
        throw new TRPCError({ code: failed.lockedUntil ? "TOO_MANY_REQUESTS" : "BAD_REQUEST", message });
      }

      await clearAdminLoginAttempts(ADMIN_LOGIN_KEY);
      await upsertUser({
        openId: PASSWORD_ADMIN_OPEN_ID,
        name: "Administração Lactus",
        loginMethod: "password",
        role: "admin",
        lastSignedIn: new Date(),
      });

      const sessionToken = await sdk.createSessionToken(PASSWORD_ADMIN_OPEN_ID, {
        expiresInMs: ADMIN_SESSION_MAX_AGE_MS,
        name: ENV.adminLoginUsername,
      });
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.cookie(ADMIN_SESSION_COOKIE, sessionToken, { ...cookieOptions, maxAge: ADMIN_SESSION_MAX_AGE_MS });
      return { success: true } as const;
    }),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      ctx.res.clearCookie(ADMIN_SESSION_COOKIE, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  partnership: router({
    submit: publicProcedure.input(partnershipRequestInput).mutation(async ({ input }) => {
      const id = await createPartnershipRequest({
        organizationName: input.organizationName,
        contactName: input.contactName,
        email: input.email,
        phone: input.phone || null,
        requestType: input.requestType,
        location: input.location,
        projectContext: input.projectContext,
        objectives: input.objectives || null,
        consentToContact: input.consentToContact,
      });

      let notificationSent = false;
      try {
        notificationSent = await notifyOwner({
          title: `Novo pedido de parceria — ${input.organizationName}`,
          content: `${input.contactName} enviou um pedido de ${input.requestType} para ${input.location}. Contacto: ${input.email}.`,
        });
      } catch (error) {
        console.error("[Partnership] Failed to notify owner:", error);
      }

      return { success: true, id, notificationSent } as const;
    }),
    list: adminProcedure
      .input(z.object({ status: partnershipStatusInput.optional() }).optional())
      .query(async ({ input }) => ({ requests: await listPartnershipRequests(input?.status) })),
    updateStatus: adminProcedure
      .input(z.object({ id: z.number().int().positive(), status: partnershipStatusInput }))
      .mutation(async ({ input }) => {
        await updatePartnershipRequestStatus(input.id, input.status);
        return { success: true } as const;
      }),
  }),
});

export type AppRouter = typeof appRouter;
