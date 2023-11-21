import { Navigation } from "./types";
import { ApiService } from "../core";

export default new ApiService<Navigation>({
    plural: "/navigations",
    singular: "/navigation",
});
