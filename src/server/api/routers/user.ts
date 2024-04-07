import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { getStrapiData } from "@/lib/utils";
import QueryString from "qs";
import { CommerceUser } from "@/types/user";
import { env } from "@/env";
import { signInSchema, signUpSchema } from "@/lib/validations/auth";
import { User } from "@/services/api/user/types";
import { hashPassword } from "@/lib/bcrypt";

export const userRouter = createTRPCRouter({
  getByUserName: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input }) => {
      const qs = QueryString.stringify(
        {
          filters: {
            username: {
              $eq: input.username,
            },
          },
          populate: "*",
        },
        {
          encodeValuesOnly: true,
        },
      );
      const data = await getStrapiData<CommerceUser[]>("/commerce-users", qs, {
        headers: {
          Authorization: `bearer ${env.NEXT_PUBLIC_AUTH_STRAPI_TOKEN}`,
        },
      });
      if (data.data) {
        return data.data[0];
      }

      return null;
    }),

  getByCredentials: publicProcedure
    .input(signInSchema)
    .query(async ({ input }) => {
      const qs = QueryString.stringify(
        {
          filters: {
            username: {
              $eq: input.username,
            },
            password: {
              $eq: input.password,
            },
          },
          populate: "*",
        },
        {
          encodeValuesOnly: true,
        },
      );
    }),

  createUser: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input }) => {
      console.log("input----", input);
      const hashedPassword = hashPassword(input.password);
      const user = await getStrapiData<User>("/commerce-users", undefined, {
        method: "POST",
        headers: {
          Authorization: `bearer ${env.NEXT_PUBLIC_AUTH_STRAPI_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: { ...input, password: hashedPassword } }),
      });

      console.log("user", user);
      return user;
    }),
});
