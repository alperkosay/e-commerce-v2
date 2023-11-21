import { ApiService } from "../core";
import { Product } from "./types";

export default new ApiService<Product>({
    plural: "/products",
    singular: "/product"
});
