import { fetcher } from "@/lib/utils";
import qs from "qs";
import { endpointType } from "./types";

export class ApiService<T> {
    public endpoint: endpointType;

    constructor(endpoint: endpointType) {
        this.endpoint = endpoint;
    }

    public async findMany() {
        const qsMany = qs.stringify(
            {
                populate: "*",
            },
            {
                encodeValuesOnly: true,
            }
        );

        return fetcher<T[]>(`${this.endpoint.plural}?${qsMany}`);
    }

    public async findById(id: number) {
        const qsById = qs.stringify({
            populate: "*",
        });

        return await fetcher<T>(`${this.endpoint.singular}/${id}?${qsById}`);
    }

    public async findBySlug(slug: string) {
        const qsSlug = qs.stringify(
            {
                filters: {
                    slug: {
                        $eq: slug,
                    },
                },
                populate: "*",
            },
            {
                encodeValuesOnly: true,
            }
        );
        return await fetcher<T[]>(`${this.endpoint.plural}?${qsSlug}`);
    }

    public async findByTitle(title: string) {
        const _qs = qs.stringify(
            {
                filters: {
                    title: {
                        $contains: title,
                    },
                },
                populate: "*",
            },
            {
                encodeValuesOnly: true,
            }
        );

        return await fetcher<T[]>(`${this.endpoint.plural}?${_qs}`);
    }

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
        return await fetcher<T[]>(`${this.endpoint.plural}?${_qs}`);
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
        console.log("_qs", _qs);
        return await fetcher<T[]>(`${this.endpoint.plural}?${_qs}`);
    }
}
