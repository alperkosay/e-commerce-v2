"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

import { cn } from "@/lib/utils";
import Logo from "../../Logo";
import { SearchSkeleton } from "./Search";
import { ThemeTogglerSkeleton } from "@/components/ui/theme-toggler";
import { CartSkeleton } from "./Cart";
import Navbar from "./Navbar";
import MobileMenu from "./MobileMenu";
import { Category } from "@/services/api/category/types";
import UserMenu from "./UserMenu";
const Cart = dynamic(() => import("./Cart"), {
  ssr: false,
  loading: CartSkeleton,
});
const ThemeToggler = dynamic(() => import("@/components/ui/theme-toggler"), {
  ssr: false,
  loading: ThemeTogglerSkeleton,
});
const Search = dynamic(() => import("./Search"), {
  ssr: false,
  loading: SearchSkeleton,
});

const Header = ({ navData }: { navData?: Category[] | null }) => {
  return (
    <header
      className={cn(
        "dark:shadow-secondary relative left-0 top-0 z-20 w-full bg-white bg-opacity-50 pt-4 shadow backdrop-blur-sm dark:bg-black dark:bg-opacity-50",
      )}
    >
      <div className="container flex items-center justify-between gap-6">
        <Link href={"/"} title="Alper Koşay" className="relative z-20">
          <Logo className="max-w-[150px]" />
        </Link>
        <div className="flex-1 max-lg:hidden">
          <Search />
        </div>
        <div className="flex items-center gap-2 ">
          <ThemeToggler />
          <Cart />
          <UserMenu />
          <MobileMenu navData={navData} />
        </div>
      </div>
      <div className="container">
        <Navbar navData={navData} />
        <div className="flex-1 py-2 lg:hidden">
          <Search />
        </div>
      </div>
    </header>
  );
};

export default Header;
