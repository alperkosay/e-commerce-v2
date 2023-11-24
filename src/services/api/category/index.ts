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

        return await fetcher<Category[]>(`${this.endpoint.plural}?${_qs}`);
    }


    public async findCategoryTree(slug: string) {
        const _qs = qs.stringify({
            populate: {
                categories: {
                    populate: "*"
                }
            },
            filters: {
                categories: {
                    slug: {
                        $in: slug
                    }
                },

            }
        })

        return await fetcher<Category[]>(`${this.endpoint.plural}?${_qs}`)
    }

}


export default new CategoryService({
    singular: "/category",
    plural: "/categories",
});
