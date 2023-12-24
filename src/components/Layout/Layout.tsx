"use client";
import React from "react";
import Footer from "./Footer/Footer";

import Header from "./Header/Header";
import { TooltipProvider } from "../ui/tooltip";
import { Category } from "@/services/api/category/types";
import {
  BasketClientProvider,
  SessionClientProvider,
} from "../Providers/Providers";
import { Toaster } from "../ui/toaster";
// import { poppins } from "@/lib/fonts";

const Layout = ({
  children,
  navData,
}: {
  children: React.ReactNode;
  navData: Category[];
}) => {
  return (
    <React.Fragment>
      <SessionClientProvider>
        <BasketClientProvider>
          <TooltipProvider>
            {/* <div className={poppins.className}> */}
            <Header navData={navData} />
            {children}
            <Footer />
            {/* </div> */}
            <Toaster />
          </TooltipProvider>
        </BasketClientProvider>
      </SessionClientProvider>
    </React.Fragment>
  );
};

export default Layout;
