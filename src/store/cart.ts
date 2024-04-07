import api from "@/services/api";
import { Product } from "@/services/api/product/types";
import { create } from "zustand";

export interface CartProduct extends Product {
  quantity: number;
}

type LocalStorageCartItem = { productId: number; quantity: number };

type QuantityState = "increase" | "decrease";

type CartStore = {
  items: CartProduct[];
  basketPrices: {
    totalPrice: number;
    discountedPrice: number;
  };
  handleQuantity: (
    id: number,
    state: QuantityState,
    customQuantity?: number,
  ) => void;
  addToBasket: (productId: number, quantity: number) => Promise<boolean>;
  removeFromBasket: (productId: number) => void;
  clearBasket: () => void;
  _updateBasketPrices: (products: CartProduct[]) => void;
  init: () => Promise<void>;
};

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  basketPrices: {
    totalPrice: 0,
    discountedPrice: 0,
  },

  init: async () => {
    const _lsItems = localStorage.getItem("cart");

    if (!_lsItems) {
      set({ items: [] });
      return;
    }

    const ParsedLsItems = JSON.parse(_lsItems) as LocalStorageCartItem[];
    const items = await Promise.all(
      ParsedLsItems.map(async (item) => {
        const { data: productData, error } = await api.product.findById(
          item.productId,
        );
        return { ...productData, quantity: item.quantity };
      }),
    );

    set((state) => {
      state._updateBasketPrices(items);
      return { items: items };
    });
  },

  addToBasket: async (productId, quantity) => {
    const { data: productData, error } = await api.product.findById(productId);

    if (error) return false;

    set((state) => {
      console.log(state.items);
      const updatedItems = [
        ...state.items,
        {
          ...productData,
          quantity,
        },
      ];
      localStorage.setItem(
        "cart",
        JSON.stringify([
          ...JSON.parse(localStorage.getItem("cart") ?? "[]"),
          { productId, quantity },
        ]),
      );

      const totalPrice = calculateTotalPrice(updatedItems);
      const discountedPrice = calculateDiscountedPrice(updatedItems);
      return {
        items: updatedItems,

        basketPrices: {
          totalPrice,
          discountedPrice,
        },
      };
    });

    return true;
  },
  _updateBasketPrices: (products) => {
    set((state) => {
      const totalPrice = calculateTotalPrice(products);
      const discountedPrice = calculateDiscountedPrice(products);
      return {
        basketPrices: {
          totalPrice,
          discountedPrice,
        },
      };
    });
  },
  removeFromBasket: (productId) =>
    set((state) => {
      const updatedItems = state.items.filter((item) => item.id !== productId);
      const lsItems = JSON.parse(
        localStorage.getItem("cart") ?? "[]",
      ) as LocalStorageCartItem[];
      localStorage.setItem(
        "cart",
        JSON.stringify(lsItems.filter((item) => item.productId !== productId)),
      );

      state._updateBasketPrices(updatedItems);
      return {
        items: updatedItems,
      };
    }),
  handleQuantity: (id, handleState, customQuantity) => {
    set((state) => {
      const products = state.items.map((product) => {
        return product.id === id
          ? {
              ...product,
              quantity:
                customQuantity ??
                handleQuantityByState(product.quantity, handleState),
            }
          : product;
      });
      const lsItems = JSON.parse(
        localStorage.getItem("cart") ?? "[]",
      ) as LocalStorageCartItem[];
      localStorage.setItem(
        "cart",
        JSON.stringify(
          lsItems.map((product) => {
            return product.productId === id
              ? {
                  ...product,
                  quantity:
                    customQuantity ??
                    handleQuantityByState(product.quantity, handleState),
                }
              : product;
          }),
        ),
      );

      state._updateBasketPrices(products);

      return {
        items: products,
      };
    });
  },
  clearBasket: () =>
    set((state) => {
      localStorage.setItem("cart", JSON.stringify([]));
      return { items: [] };
    }),
}));

const calculateTotalPrice = (items: CartProduct[]): number => {
  return items.reduce((prev, curr) => {
    const price = curr.attributes.price * curr.quantity;
    return prev + price;
  }, 0);
};

const calculateDiscountedPrice = (items: CartProduct[]): number => {
  return items.reduce((prev, curr) => {
    if (!curr.attributes.discountedPrice) return 0;

    const discountedPrice = curr.attributes.discountedPrice * curr.quantity;
    return prev + discountedPrice;
  }, 0);
};

const handleQuantityByState = (quantity: number, state: QuantityState) => {
  if (state === "increase") {
    return quantity + 1;
  } else if (state === "decrease") {
    if (quantity > 1) {
      return quantity - 1;
    }
  }
  return 1;
};
