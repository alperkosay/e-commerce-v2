import config from "@/config";
import { Meta } from "@/services/api/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface Payload<T> {
    data: T;
    meta: Meta;
    error: boolean;
}

export async function fetcher<T>(url: string, params?: RequestInit) {
    try {
        const response = await fetch(`${config.strapiURL + url}`, {
            next: {
                revalidate: 0,
            },
            ...params,
        });
        return (await response.json()) as Payload<T>;
    } catch (error) {
        console.log("error", error);
        throw new Error("Sunucu hatası");
    }
}

export function createSearchParams(params: {
    [key: string]: string[] | string;
}) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, values]) => {
        if (Array.isArray(values)) {
            values.forEach((value) => {
                searchParams.append(key, value);
            });
        } else {
            searchParams.append(key, values);
        }
    });
    return searchParams;
}
