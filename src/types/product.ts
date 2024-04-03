import { Category } from "./category";
import { Media } from "./media";

export interface Product {
  id: number;
  attributes: {
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    title?: string;
    description?: string;
    price: number;
    productImages?: { data: Media[] };
    slug?: string;
    discountedPrice?: number;
    categories: { data: Category[] };
  };
}
