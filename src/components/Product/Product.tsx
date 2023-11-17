import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

type ProductType = {};

export function HorizontalProductCard() {
    return <div>Product</div>;
}

export function ProductCard() {
    return (
        <div className="space-y-2">
            <div>
                <Image
                    src={"https://picsum.photos/300/500"}
                    width={300}
                    height={500}
                    alt="alt"
                    className="w-full"
                />
            </div>
            <div className="p-3 space-y-3">
                <h2 className="text-xl font-semibold">
                    Lorem ipsum dolor sit.
                </h2>
                <p className="font-light">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
                    sed dignissimos officiis quaerat quae reprehenderit.
                </p>
            </div>
        </div>
    );
}
