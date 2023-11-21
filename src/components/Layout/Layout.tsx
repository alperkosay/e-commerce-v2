"use client";
import React from "react";
import Footer from "./Footer/Footer";

import { Chivo_Mono, Poppins } from "next/font/google";
import Header from "./Header/Header";
import { TooltipProvider } from "../ui/tooltip";
import { Category } from "@/services/api/category/types";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const Layout = ({
    children,
    navData,
}: {
    children: React.ReactNode;
    navData: Category[];
}) => {
    return (
        <React.Fragment>
            <TooltipProvider>
                <div className={poppins.className}>
                    <Header navData={navData} />
                    {children}
                    <Footer />
                </div>
            </TooltipProvider>
        </React.Fragment>
    );
};

export default Layout;
