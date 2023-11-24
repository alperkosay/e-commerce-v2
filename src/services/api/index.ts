import product from "./product";
import navigation from "./navigation";
import category from "./category";

category.findCategoryTree("kablosuz-mouse").then(data => {
    console.log(data.data);
    category.findCategoryTree(data.data[0].attributes.slug!).then(data => {
        console.log(data.data)
        category.findCategoryTree(data.data[0].attributes.slug!).then(data => {
            console.log(data.data)
        })
    })
})

export default {
    product,
    navigation,
    category,
};
