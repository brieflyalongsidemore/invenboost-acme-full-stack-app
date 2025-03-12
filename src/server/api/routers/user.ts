import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { hashPassword } from "@/lib/hashPassword";
import {
  InsuranceDetailsSchema,
  SignUpSchema,
} from "@/app/get-started/schemas";

export const userRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  updateUserInsuranceDetails: protectedProcedure
    .input(InsuranceDetailsSchema)
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          groupNumber: input.groupNumber,
          provider: input.provider,
          memberID: input.memberId,
        },
      });

      return { user };
    }),

  uploadBenefitCard: protectedProcedure
    .input(
      z.object({
        url: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          benefitCardURL: input.url,
        },
      });

      return { user };
    }),
  getUser: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });

    return user;
  }),
  create: publicProcedure
    .input(SignUpSchema)
    .mutation(async ({ input, ctx }) => {
      const existingUser = await ctx.db.user.findUnique({
        where: {
          email: input.email.toLowerCase(),
          accessCode: input.accessCode,
        },
      });
      const accessCode = await ctx.db.accessCode.findFirst({
        where: {
          code: input.accessCode,
        },
      });

      if (existingUser) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Email is taken",
        });
      }
      if (!accessCode?.code) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Access code is invalid",
        });
      }

      const hashedPassword = await hashPassword(input.password);
      const user = await ctx.db.user.create({
        data: {
          email: input.email.toLocaleLowerCase(),
          firstName: input.firstName,
          lastName: input.lastName,
          phone: input.phone,
          accessCode: input.accessCode,
          password: hashedPassword,
        },
      });

      return { user };
    }),
});
