import QueryString from "qs";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { getStrapiData } from "@/lib/utils";
import { Product } from "@/types/product";
import { z } from "zod";

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const qs = QueryString.stringify(
      {
        populate: "*",
      },
      {
        encodeValuesOnly: true,
      },
    );

    const data = getStrapiData<Product[]>("/products", qs);
    return data;
  }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const qs = QueryString.stringify(
        {
          filters: {
            slug: {
              $eq: input.slug,
            },
          },
          populate: "*",
        },
        {
          encodeValuesOnly: true,
        },
      );

      const data = await getStrapiData<Product[]>("/products", qs);

      if (data.data) {
        return data.data[0];
      }

      return null;
    }),
});
