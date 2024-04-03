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
import { usePathname } from "next/navigation";

const Navbar = ({ navData }: { navData: Category[] }) => {
  const pathname = usePathname();

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
                      href={`/${data.attributes.slug}` || "/"}
                      passHref
                      legacyBehavior
                    >
                      <NavigationMenuLink
                        className={`p-4 inline-block font-bold ${
                          pathname === `/${data.attributes.slug}`
                            ? "text-primary"
                            : ""
                        }`}
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
                              <NavigationMenuLink asChild>
                                <Link
                                  href={`/${subMenuData.attributes.slug}`}
                                  className="pt-3 inline-block w-max text-lg text-primary font-semibold"
                                >
                                  {subMenuData.attributes.title}
                                </Link>
                              </NavigationMenuLink>
                              <ul>
                                {subMenuData.attributes.categories?.data?.map(
                                  (data, index) => (
                                    <li key={index}>
                                      <NavigationMenuLink asChild>
                                        <Link
                                          href={`/${data.attributes.slug}`}
                                          className="py-1.5 inline-block w-max"
                                        >
                                          {data.attributes.title}
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
