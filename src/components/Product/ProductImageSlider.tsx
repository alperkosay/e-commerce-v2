"use client";
import { Product } from "@/services/api/product/types";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

export default function ProductImageSlider({
    productImages,
}: {
    productImages: Product["attributes"]["productImages"];
}) {
    return (
        <Swiper slidesPerView={1}>
            {productImages?.data.map((data, index) => (
                <SwiperSlide key={index}>
                    <div>
                        <Image
                            src={data.attributes.url}
                            width={data.attributes.width}
                            height={data.attributes.height}
                            alt={
                                data.attributes.alternativeText || "Placeholder"
                            }
                            className="w-full"
                        />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
