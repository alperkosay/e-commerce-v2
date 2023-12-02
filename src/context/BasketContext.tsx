import { Product } from "@/services/api/product/types";
import React, { createContext, useState } from "react";

export const BasketContext = createContext<Product[]>([]);

export const BasketProvider = ({ children }: { children: React.ReactNode }) => {
    const [basketProduct, setBasketProduct] = useState<Product[]>([]);    
    
    return (
        <BasketContext.Provider value={basketProduct}>
            {children}
        </BasketContext.Provider>
    );
};
