import { ApiService } from "../core";
import { Category } from "./types";

export default new ApiService<Category>({
    singular: "/category",
    plural: "/categories",
});
