import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { getStrapiData } from "@/lib/utils";
import QueryString from "qs";
import { CommerceUser } from "@/types/user";
import { env } from "@/env";

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
});
