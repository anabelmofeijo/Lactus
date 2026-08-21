import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { createPartnershipRequest } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

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

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
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

      return { success: true, id } as const;
    }),
  }),
});

export type AppRouter = typeof appRouter;
