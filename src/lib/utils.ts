import { env } from "@/env";
import { Meta } from "@/services/api/types";
import { Payload } from "@/types/payload";
import { type ClassValue, clsx } from "clsx";
import qs from "qs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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

export function qsParser(queryObj: { [key: string]: unknown }) {
  const filterStringify = qs.stringify(queryObj, {
    encodeValuesOnly: true,
  });
  return qs.parse(filterStringify);
}

export function priceFormatter(price: number) {
  const formatter = Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
  });

  return formatter.format(price);
}

export function getFirstCharactersOfText(text?: string) {
  if (!text) {
    return null;
  }

  const words = text.split(" ");

  // Her kelimenin ilk harfini al
  const firsCharacters = words.map((word) => word.charAt(0));

  return firsCharacters.join("");
}

export async function getStrapiData<T>(
  endpoint: string,
  qs?: string,
  params?: RequestInit,
) {
  console.log(
    `STRAPI REQUEST ---- ${env.NEXT_PUBLIC_API_URL}${endpoint}?${qs}`,
  );

  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}${endpoint}?${qs}`, {
    next: { revalidate: 30 },

    ...params,
  });
  return (await response.json()) as Payload<T>;
}

export interface Payload2<T> {
  data: T;
  meta: Meta;
  error: boolean;
}

export async function fetcher<T>(url: string, params?: RequestInit) {
  try {
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL + url}`, {
      next: {
        revalidate: 15,
      },
      ...params,
    });
    return (await response.json()) as Payload2<T>;
  } catch (error) {
    console.log("error", error);
    throw new Error("Sunucu hatası");
  }
}
