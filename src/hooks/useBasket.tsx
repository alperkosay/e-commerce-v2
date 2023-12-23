"use client";
import { useToast } from "@/components/ui/use-toast";
import {
    BasketContext,
    StorageProduct,
    basketStorageKey,
} from "@/context/BasketContext";
import api from "@/services/api";
import React, { useContext, useEffect } from "react";

export default function useBasket() {
    const { toast } = useToast();
    const basketContext = useContext(BasketContext);
    if (!basketContext) {
        throw new Error("Basket provider missing");
    }

    const { basketProducts, setBasketProducts, lsProducts, setLsProducts } =
        basketContext;

    const productCount = basketProducts.length;
    const totalPrice = basketProducts.reduce((prev, curr) => {
        const lsProduct = lsProducts.find(
            (x) => x.id === curr.id
        ) as StorageProduct;
        const countedPrice = curr.attributes.price * lsProduct?.count || 1;

        return prev + countedPrice;
    }, 0);
    const totalDiscountedPrice = basketProducts.reduce((prev, curr) => {
        if (!curr.attributes.discountedPrice) {
            return 0;
        }
        const lsProduct = lsProducts.find(
            (x) => x.id === curr.id
        ) as StorageProduct;
        const countedPrice =
            curr.attributes.discountedPrice * lsProduct?.count || 1;

        return prev + countedPrice;
    }, 0);

    const handleCount = (state: "inc" | "dec", id: number) => {
        const index = lsProducts.findIndex((product) => product.id === id);
        const products = [...lsProducts];
        const product = products[index];
        products[index].count =
            state === "inc"
                ? product.count + 1
                : product.count > 1
                ? product.count - 1
                : product.count;

        setLsProducts(products);
        localStorage.setItem(basketStorageKey, JSON.stringify(products));
    };

    const getCount = (id: number) => {
        const product = lsProducts.find((x) => x.id === id);
        return product ? product.count : 1;
    };
    const fetchProducts = async () => {
        try {
            const storedProducts = getProducts();
            const productPromises = storedProducts.map(async (data) => {
                const productData = await api.product.findById(data.id);

                return productData.data;
            });

            const fetchedProducts = await Promise.all(productPromises);

            basketContext.setBasketProducts(fetchedProducts);
        } catch (error) {
            console.error("Error fetching or setting products:", error);
        }
    };

    const setItem = (product: StorageProduct) => {
        const basket = getProducts();
        if (!basket.length) {
            localStorage.setItem(basketStorageKey, JSON.stringify([]));
        }

        const hasItem = basket.some((x) => x.id === product.id);
        if (hasItem) {
            toast({
                title: "Bu ürün sepette mevcut!",
                variant: "destructive",
            });
            return;
        }

        localStorage.setItem(
            basketStorageKey,
            JSON.stringify([
                ...JSON.parse(localStorage.getItem(basketStorageKey)!),
                product,
            ])
        );
        toast({
            title: "Ürün sepete eklendi!",
        });
        fetchProducts();
    };

    const removeProduct = (id: number) => {
        const basket = getProducts();

        const filteredItems = basket.filter((x) => x.id !== id);
        localStorage.setItem(basketStorageKey, JSON.stringify(filteredItems));
        fetchProducts();
    };

    const getProducts = () => {
        const storageProducts: StorageProduct[] | null = JSON.parse(
            localStorage.getItem(basketStorageKey)!
        );
        if (!storageProducts) return [];

        return storageProducts;
    };

    useEffect(() => {
        setLsProducts(getProducts());
        fetchProducts();
    }, []);

    return {
        basketProducts,
        lsProducts,
        setProduct: setItem,
        removeProduct,
        productCount,
        totalPrice,
        totalDiscountedPrice,
        handleCount,
        getCount,
    };
}
