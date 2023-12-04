"use client";
import {
    BasketContext,
    StorageProduct,
    basketStorageKey,
} from "@/context/BasketContext";
import api from "@/services/api";
import { Product } from "@/services/api/product/types";
import React, { useContext, useEffect } from "react";

export default function useBasket() {
    const basketContext = useContext(BasketContext);
    if (!basketContext) {
        throw new Error("Basket provider missing");
    }
    const setItem = (product: StorageProduct) => {
        localStorage.setItem(
            basketStorageKey,
            JSON.stringify([
                ...(JSON.parse(
                    localStorage.getItem(basketStorageKey)!
                ) as StorageProduct[]),
                product,
            ])
        );
    };

    const getItems = () => {
        const storageProducts: StorageProduct[] | null = JSON.parse(
            localStorage.getItem(basketStorageKey)!
        );
        if (!storageProducts) return [];

        return storageProducts;
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const storedProducts = getItems();
                const productPromises = storedProducts.map(async (data) => {
                    const productData = await api.product.findById(data.id);
                    return productData.data;
                });

                // Wait for all promises to resolve
                const fetchedProducts = await Promise.all(productPromises);

                // Set the state with the fetched products
                basketContext.setBasketProduct(fetchedProducts);
            } catch (error) {
                // Handle errors when fetching data or setting the state
                console.error("Error fetching or setting products:", error);
            }
        };

        // Call the function to fetch and set products
        fetchProducts();
    }, []);

    return {
        basketProducts: basketContext.basketProduct,
    };
}
