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

const Navbar = ({ navData }: { navData?: Category[] | null }) => {
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
                        className={`inline-block p-4 font-bold ${
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
                    <div className="container flex w-screen flex-1 gap-2">
                      <ul className="grid  w-full lg:grid-cols-3 xl:grid-cols-5">
                        {data.attributes.categories?.data.map(
                          (subMenuData, index) => (
                            <li key={index}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={`/${subMenuData.attributes.slug}`}
                                  className="inline-block w-max pt-3 text-lg font-semibold text-primary"
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
                                          className="inline-block w-max py-1.5"
                                        >
                                          {data.attributes.title}
                                        </Link>
                                      </NavigationMenuLink>
                                    </li>
                                  ),
                                )}
                              </ul>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ),
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </React.Fragment>
  );
};

export default Navbar;
