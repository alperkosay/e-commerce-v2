import api from "@/services/api";
import { Product } from "@/services/api/product/types";
import React, { createContext, useEffect, useState } from "react";

export type StorageProduct = {
    id: number;
    count: number;
};

type BasketContextType = {
    basketProducts: Product[];
    setBasketProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    lsProducts: StorageProduct[];
    setLsProducts: React.Dispatch<React.SetStateAction<StorageProduct[]>>;
};

export const BasketContext = createContext<BasketContextType | undefined>(
    undefined
);

export const basketStorageKey = "basket";

export const BasketProvider = ({ children }: { children: React.ReactNode }) => {
    const [basketProducts, setBasketProducts] = useState<Product[]>([]);
    const [lsProducts, setLsProducts] = useState<StorageProduct[]>([]);

    return (
        <BasketContext.Provider
            value={{
                basketProducts,
                setBasketProducts,
                lsProducts,
                setLsProducts,
            }}
        >
            {children}
        </BasketContext.Provider>
    );
};
