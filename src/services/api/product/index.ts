import { fetcher, qsParser } from "@/lib/utils";
import { ApiService } from "../core";
import { Product } from "./types";
import qs from "qs";
import { ParamType } from "@/hooks/filterHooks/useFilters";

class ProductService extends ApiService<Product> {
    public async findByCategory(filterOpt: {
        title?: string;
        slug?: string;
        filterQuery?: ParamType;
    }) {
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
        const _qs = qs.stringify(
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
            { encodeValuesOnly: true }
        );
        return await fetcher<Product[]>(`${this.endpoint.plural}?${_qs}`);
    }

    public async findByCategoryOrTitle(input: string) {
        const _qs = qs.stringify(
            {
                filters: {
                    $or: [
                        {
                            title: {
                                $contains: input,
                            },
                        },
                        {
                            categories: {
                                title: {
                                    $contains: input,
                                },
                            },
                        },
                    ],
                },
                populate: "*",
            },
            {
                encodeValuesOnly: true,
            }
        );
        return await fetcher<Product[]>(`${this.endpoint.plural}?${_qs}`);
    }
}

const service = new ProductService({
    plural: "/products",
    singular: "/product",
});

export default service;
