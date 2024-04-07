"use client";
import { Product } from "@/services/api/product/types";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { env } from "@/env";

export default function ProductImageSlider({
  productImages,
}: {
  productImages: Product["attributes"]["productImages"];
}) {
  return (
    <div>
      <div className="relative">
        <Swiper
          slidesPerView={1}
          modules={[Pagination, Navigation]}
          pagination={{
            el: ".product-image-slider-pagination",
            type: "bullets",
            clickable: true,
            bulletClass: "border-2 cursor-pointer border-transparent",
            bulletActiveClass: "!border-primary",
            renderBullet: function (index, cls) {
              const productImage = productImages!.data[index];
              return `
                           <span class="${cls} !w-20 !h-20 !bg-transparent">
                             <img
                                src="${env.NEXT_PUBLIC_MEDIA_PREFIX + productImage?.attributes.formats.thumbnail.url}"
                                width="${productImage?.attributes.formats.thumbnail.width}"
                                height="${productImage?.attributes.formats.thumbnail.height}"
                                alt="
                                    ${productImage?.attributes.alternativeText}
                                "
                                class="w-full h-full object-contain"
                                aria-label="hidden"
                            />
                           </span>
                           `;
            },
          }}
          navigation={{
            enabled: true,
            prevEl: ".product-image-slider-prev",
            nextEl: ".product-image-slider-next",
          }}
        >
          {productImages?.data.map((data, index) => (
            <SwiperSlide
              key={index}
              className="relative flex items-center justify-center"
            >
              <Image
                src={env.NEXT_PUBLIC_MEDIA_PREFIX + data.attributes.url}
                width={data.attributes.width}
                height={data.attributes.height}
                alt={data.attributes.alternativeText || "Placeholder"}
                className={`w-full`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Button
          className="product-image-slider-prev absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full"
          size={"icon"}
          variant={"secondary"}
        >
          <ArrowLeft size={64} />
        </Button>
        <Button
          className="product-image-slider-next absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full"
          size={"icon"}
          variant={"secondary"}
        >
          <ArrowRight size={64} />
        </Button>
      </div>
      <div className="product-image-slider-pagination my-4 flex w-full items-center justify-center gap-2"></div>
    </div>
  );
}
