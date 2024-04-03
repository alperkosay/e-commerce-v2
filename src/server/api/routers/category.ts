import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { getStrapiData } from "@/lib/utils";
import QueryString from "qs";
import { CommerceUser } from "@/types/user";
import { Category } from "@/types/category";

export const categoryRouter = createTRPCRouter({
  getAllCategories: publicProcedure.query(async () => {
    const qs = QueryString.stringify(
      {
        populate: {
          categories: {
            populate: "*",
          },
        },
        filters: {
          root_category: true,
        },
      },
      {
        encodeValuesOnly: true,
      },
    );
    const data = await getStrapiData<Category[]>("/categories", qs);
    return data;
  }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const qs = QueryString.stringify(
        {
          populate: {
            categories: {
              populate: "*",
            },
          },
          filters: {
            slug: {
              $eq: input.slug,
            },
          },
        },
        {
          encodeValuesOnly: true,
        },
      );

      const data = await getStrapiData<Category[]>("/categories", qs);

      if (data.data) {
        return data.data[0];
      }
      return null;
    }),
});
