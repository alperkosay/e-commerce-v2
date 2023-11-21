"use client";
import React from "react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

import { Navigation } from "@/services/api/navigation/types";
import { Category } from "@/services/api/category/types";

const Navbar = ({ navData }: { navData: Category[] }) => {
    return (
        <React.Fragment>
            <NavigationMenu className="max-lg:hidden">
                <NavigationMenuList>
                    {navData?.map((data, index) =>
                        !data.attributes.parentCategory?.data &&
                        data.attributes.subCategories.data.length ? (
                            <NavigationMenuItem key={index}>
                                <NavigationMenuTrigger>
                                    <Link
                                        href={`/${data.attributes.slug}` || "/"}
                                        passHref
                                        legacyBehavior
                                    >
                                        <NavigationMenuLink
                                            className="p-4 inline-block"
                                            title={data.attributes.title}
                                        >
                                            {data.attributes.title}
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <div className="flex gap-2 flex-1 w-screen container">
                                        <ul>
                                            {data.attributes.subCategories.data.map(
                                                (subMenuData, index) => (
                                                    <li key={index}>
                                                        <NavigationMenuLink
                                                            asChild
                                                        >
                                                            <Link
                                                                href={`/${subMenuData.attributes.slug}`}
                                                                className="p-6 py-3 inline-block w-max"
                                                            >
                                                                {
                                                                    subMenuData
                                                                        .attributes
                                                                        .title
                                                                }
                                                            </Link>
                                                        </NavigationMenuLink>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                        <div className="w-full bg-red-300 h-40"></div>
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        ) : (
                            !data.attributes.parentCategory?.data &&
                            <NavigationMenuItem key={index}>
                                <Link
                                    href={`/${data.attributes.slug}` || "/"}
                                    passHref
                                    legacyBehavior
                                >
                                    <NavigationMenuLink
                                        className="p-4 inline-block"
                                        title={data.attributes.title}
                                    >
                                        {data.attributes.title}
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        )
                    )}
                </NavigationMenuList>
            </NavigationMenu>
        </React.Fragment>
    );
};

export default Navbar;
