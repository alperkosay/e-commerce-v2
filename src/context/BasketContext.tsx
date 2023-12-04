import api from "@/services/api";
import { Product } from "@/services/api/product/types";
import React, { createContext, useEffect, useState } from "react";

type BasketContextType = {
    basketProduct: Product[];
    setBasketProduct: React.Dispatch<React.SetStateAction<Product[]>>;
};

export const BasketContext = createContext<BasketContextType | undefined>(
    undefined
);

export const basketStorageKey = "basket";

export type StorageProduct = {
    id: number;
    count: number;
};

export const BasketProvider = ({ children }: { children: React.ReactNode }) => {
    const [basketProduct, setBasketProduct] = useState<Product[]>([]);

    return (
        <BasketContext.Provider
            value={{
                basketProduct,
                setBasketProduct,
            }}
        >
            {children}
        </BasketContext.Provider>
    );
};
