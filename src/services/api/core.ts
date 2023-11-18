import { fetcher } from "@/lib/utils";
import qs from "qs";


const qsMany = qs.stringify({
    populate: "*"
})
export const findMany = async <T>(endpoint: string) => await fetcher<T>(`${endpoint}?${qsMany}`)

const qsById = qs.stringify({
    populate: "*"
})
export const findById = async <T>(endpoint: string, id: number) => await fetcher<T>(`${endpoint}/${id}?${qsById}`);

export const findBySlug = async <T>(endpoint: string, slug: string) => {

    const qsSlug = qs.stringify({
        filters: {
            slug: {
                $eq: slug
            }
        },
        populate: "*"
    }, {
        encodeValuesOnly: true
    })
    return await fetcher<T>(`${endpoint}?${qsSlug}`)
};
