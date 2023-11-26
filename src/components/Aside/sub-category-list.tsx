import { Category } from "@/services/api/category/types";
import React, { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Payload } from "@/lib/utils";
import api from "@/services/api";
import { usePathname } from "next/navigation";
import { CheckedState } from "@radix-ui/react-checkbox";
import useFilters from "@/hooks/filterHooks/useFilters";
import { ScrollArea } from "../ui/scroll-area";

const CategoryItems = ({ categoryData }: { categoryData?: Category[] }) => {
    const { setParam, removeParam, currentParams } = useFilters();
    const checkHandler = (checked: boolean, slug: string) => {
        const { category } = currentParams();

        if (checked) {
            setParam({
                category: Array.isArray(category)
                    ? [...category, slug]
                    : [slug],
            });
        } else {
            // Remove only the specific 'slug' from the category array
            if (Array.isArray(category)) {
                const updatedCategories = category.filter(
                    (item) => item !== slug
                );
                setParam({
                    category:
                        updatedCategories.length > 0
                            ? updatedCategories
                            : undefined,
                });
            }
        }
    };
    return categoryData?.map((data, index) => (
        <React.Fragment key={index}>
            <li className="flex items-center gap-1.5">
                <Checkbox
                    onCheckedChange={(checked) => {
                        checkHandler(checked as boolean, data.attributes.slug!);
                    }}
                    id={data.attributes.slug}
                    checked={
                        Array.isArray(currentParams().category) &&
                        currentParams().category?.includes(
                            data.attributes.slug!
                        )
                    }
                />
                <label
                    htmlFor={data.attributes.slug}
                    className=" cursor-pointer"
                >
                    <span>{data.attributes.title}</span>
                </label>
            </li>
            <CategoryItems categoryData={data.attributes.categories?.data} />
        </React.Fragment>
    ));
};

export default function SubCategoryList() {
    const [categories, setCategories] = useState<Payload<Category[]>>();
    const pathname = usePathname();

    useEffect(() => {
        console.log("pathname", pathname);
        api.category.findBySlug(pathname.slice(1)).then((data) => {
            setCategories(data);
        });
    }, [pathname]);

    return (
        categories?.data.length && (
            <div className="space-y-2">
                <p>Kategoriler</p>
                <ScrollArea className="h-24 relative before:absolute before:-bottom-1 before:left-0 before:w-full before:h-4 before:from-background before:to-transparent before:bg-gradient-to-t before:pointer-events-none">
                    <ul className="space-y-2 pb-2">
                        <CategoryItems categoryData={categories?.data} />
                    </ul>
                </ScrollArea>
            </div>
        )
    );
}
