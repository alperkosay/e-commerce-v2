import React from "react";
import Products from "../Products";

export default function page() {
    return (
        <div className="container grid grid-cols-4 gap-20">
            <Products />
        </div>
    );
}
