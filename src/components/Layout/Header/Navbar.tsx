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
import { Category } from "@/services/api/category/types";
import { Button } from "@/components/ui/button";

const Navbar = ({ navData }: { navData: Category[] }) => {
    console.log("navData", navData);
    return (
        <React.Fragment>
            <NavigationMenu className="max-lg:hidden">
                <NavigationMenuList>
                    {navData?.map(
                        (data, index) =>
                            data.attributes.root_category && (
                                <NavigationMenuItem key={index}>
                                    <NavigationMenuTrigger>
                                        <Link
                                            href={
                                                `/${data.attributes.slug}` ||
                                                "/"
                                            }
                                            passHref
                                            legacyBehavior
                                        >
                                            <NavigationMenuLink
                                                className="p-4 inline-block font-bold"
                                                title={data.attributes.title}
                                            >
                                                {data.attributes.title}
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent className="min-h-[400px]">
                                        <div className="flex gap-2 flex-1 w-screen container">
                                            <ul className="grid  lg:grid-cols-3 xl:grid-cols-5 w-full">
                                                {data.attributes.categories?.data.map(
                                                    (subMenuData, index) => (
                                                        <li key={index}>
                                                            <NavigationMenuLink
                                                                asChild
                                                            >
                                                                <Button
                                                                    asChild
                                                                    variant={
                                                                        "link"
                                                                    }
                                                                >
                                                                    <Link
                                                                        href={`/${subMenuData.attributes.slug}`}
                                                                        className="p-6 py-2 inline-block w-max font-semibold"
                                                                    >
                                                                        {
                                                                            subMenuData
                                                                                .attributes
                                                                                .title
                                                                        }
                                                                    </Link>
                                                                </Button>
                                                            </NavigationMenuLink>
                                                            <ul className="pl-2">
                                                                {subMenuData.attributes.categories?.data?.map(
                                                                    (
                                                                        data,
                                                                        index
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            <NavigationMenuLink
                                                                                asChild
                                                                            >
                                                                                <Link
                                                                                    href={`/${data.attributes.slug}`}
                                                                                    className="p-6 py-3 inline-block w-max"
                                                                                >
                                                                                    {
                                                                                        data
                                                                                            .attributes
                                                                                            .title
                                                                                    }
                                                                                </Link>
                                                                            </NavigationMenuLink>
                                                                        </li>
                                                                    )
                                                                )}
                                                            </ul>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                            {/* <div className="w-full bg-red-300 h-40"></div> */}
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            )
                    )}
                </NavigationMenuList>
            </NavigationMenu>
        </React.Fragment>
    );
};

export default Navbar;
