import { useRouter, useSearchParams } from "next/navigation";
import QueryString from "qs";

const QueryKeys = ["minPrice", "maxPrice", "category"] as const;

export type KeyType = (typeof QueryKeys)[number];

export type ParamType = {
    [key in KeyType]?: string | string[] | null | undefined;
};

export default function useFilters() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const getParam = (key: KeyType): string | string[] | undefined => {
        const params = QueryString.parse(searchParams.toString());
        return params[key] as string | string[] | undefined;
    };

    const currentParams = () => {
        const values: ParamType = {};
        for (const key of QueryKeys) {
            const element = getParam(key);
            if (element !== undefined) {
                values[key] = element;
            }
        }
        return values;
    };

    const setParam = (newParams: ParamType) => {
        const oldSearchParams = new URLSearchParams(searchParams.toString());
        const parsedParams = QueryString.parse(oldSearchParams.toString());

        const _qs = QueryString.stringify(
            {
                ...parsedParams,
                ...newParams,
            },
            {
                encodeValuesOnly: true,
            }
        );

        router.push(`?${_qs}`);
    };

    const removeParam = (key: KeyType) => {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.delete(key);

        router.push(`?${newParams.toString()}`);
    };

    return { setParam, getParam, currentParams, removeParam };
}
