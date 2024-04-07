import QueryString from "qs";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { getStrapiData, qsParser } from "@/lib/utils";
import { Product } from "@/types/product";
import { z } from "zod";
import { ParamType } from "@/hooks/filterHooks/useFilters";

export const productRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const qs = QueryString.stringify(
        {
          populate: "*",
        },
        {
          encodeValuesOnly: true,
        },
      );

      const data = getStrapiData<Product>(`/products/${input.id}`, qs);
      return data;
    }),
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

  getByCategory: publicProcedure
    .input(
      z.object({
        title: z.string().optional(),
        slug: z.string().optional(),
        filterQuery: z.any(),
      }),
    )
    .query(async ({ input: filterOpt }) => {
      const parsedQuery: ParamType = qsParser(filterOpt.filterQuery!);
      const { category: cat, maxPrice, minPrice } = parsedQuery;

      //Category
      const queryCategories = Array.isArray(cat)
        ? cat.map((item) => ({
            categories: {
              slug: {
                $eq: item,
              },
            },
          }))
        : [];
      //

      //
      const pricingFilter = [
        {
          price: {
            $gte: minPrice,
          },
        },
        {
          price: {
            $lte: maxPrice,
          },
        },
      ];

      const filter = filterOpt.title
        ? {
            title: {
              $contains: filterOpt.title,
            },
          }
        : {
            slug: {
              $eq: filterOpt.slug,
            },
          };
      const qs = QueryString.stringify(
        {
          filters: {
            $or:
              queryCategories.length > 0
                ? [...queryCategories]
                : [
                    {
                      categories: filter,
                    },
                  ],

            $and: minPrice && maxPrice ? [...pricingFilter] : undefined,
          },
          populate: "*",
        },
        { encodeValuesOnly: true },
      );

      const data = await getStrapiData<Product[]>("/products", qs);
      return data;
    }),
});
