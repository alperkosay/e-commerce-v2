import sections from "./sections";
import navigations from "./navigations";
import { findMany, findById, findBySlug } from "./core";

findBySlug<{ product: number }[]>("/products", "steel-series-rival-3-rgb-oyuncu-mouse").then(data => {
    console.log('data', data)
})


export default {
    sections,
    navigations
}