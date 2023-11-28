import { Payload, fetcher } from "@/lib/utils";
import { ApiService } from "../core";
import { Category } from "./types";
import qs from "qs";

class CategoryService extends ApiService<Category> {
    public async findMany(): Promise<Payload<Category[]>> {
        const _qs = qs.stringify(
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
            }
        );
console.log('this.endpoint.plural', this.endpoint.plural)
        return await fetcher<Category[]>(`${this.endpoint.plural}?${_qs}`);
    }

    public async findBySlug(slug: string): Promise<Payload<Category[]>> {
        const _qs = qs.stringify(
            {
                populate: {
                    categories: {
                        populate: "*",
                    },
                },
                filters: {
                    slug: {
                        $eq: slug,
                    },
                },
            },
            {
                encodeValuesOnly: true,
            }
        );

        return await fetcher<Category[]>(`${this.endpoint.plural}?${_qs}`);
    }

    // public async findCategoryTree(slug: string): Promise<Payload<Category[]>> {
    //     const _qs = qs.stringify({
    //         populate: {
    //             categories: {
    //                 populate: "*",
    //             },
    //         },
    //         filters: {
    //             categories: {
    //                 slug: {
    //                     $in: slug,
    //                 },
    //             },
    //         },
    //     });

    //     const firstData = await fetcher<Category[]>(
    //         `${this.endpoint.plural}?${_qs}`
    //     );

    //     if (!firstData.data[0].attributes.root_category) {
    //         const myData = await this.findCategoryTree(
    //             firstData.data[0].attributes.slug!
    //         );
    //         return myData;
    //     } else {
    //         return firstData;
    //     }
    // }
}
const service = new CategoryService({
    singular: "/category",
    plural: "/categories",
});
export default service;
