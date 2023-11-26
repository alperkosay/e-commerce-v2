import { fetcher } from "@/lib/utils";
import { ApiService } from "../core";
import { Product } from "./types";
import qs from "qs";

class ProductService extends ApiService<Product> {
    public async findByCategory(filterOpt: { title?: string; slug?: string }) {
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
                    categories: filter,
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
