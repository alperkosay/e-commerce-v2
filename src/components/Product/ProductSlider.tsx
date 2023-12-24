"use client";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { ProductCard } from "./Cards/ProductCard";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "lucide-react";
import { Product } from "@/services/api/product/types";
export default function ProductSlider({ products }: { products: Product[] }) {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation]}
        navigation={{
          enabled: true,
          prevEl: ".product-slider-prev",
          nextEl: ".product-slider-next",
        }}
        slidesPerView={4}
        className="items-stretch"
        wrapperClass="items-stretch"
        spaceBetween={20}
      >
        {products.map((product, index) => (
          <SwiperSlide
            className="flex flex-col [&>*]:h-full items-stretch !h-[unset]"
            key={index}
          >
            <ProductCard productData={product} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Button
        className="product-slider-prev absolute rounded-full top-1/2 -translate-y-1/2 left-2 z-10 shadow-sm shadow-black"
        size={"icon"}
      >
        <ArrowLeftCircleIcon size={34} />
      </Button>

      <Button
        className="product-slider-next absolute rounded-full top-1/2 -translate-y-1/2 right-2 z-10 shadow-sm shadow-black"
        size={"icon"}
      >
        <ArrowRightCircleIcon size={34} />
      </Button>
    </div>
  );
}

export function ProductSliderSkeleton() {
  return <Skeleton className="w-full h-[30rem]" />;
}
