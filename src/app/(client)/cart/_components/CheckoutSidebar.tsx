"use client";
import Price from "@/components/ui/price";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import useBasket from "@/hooks/useBasket";
import { priceFormatter } from "@/lib/utils";

export default function CheckoutSidebar() {
  const { basketProducts, productCount, totalPrice, totalDiscountedPrice } =
    useBasket();
  return (
    <aside className="w-[18rem]">
      <div className="sticky top-5 border border-muted p-3">
        <h2 className="text-xl mb-4">Sipariş Özeti</h2>
        <div className="space-y-4">
          <div className="flex items-end justify-between gap-6">
            <span>Ürünün Toplamı</span>
            <div className="text-right">
              <Price
                price={totalPrice}
                discountedPrice={totalDiscountedPrice}
              />
            </div>
          </div>
          <div className="flex justify-between gap-6">
            <span>Kargo Toplamı</span>
            <span>29</span>
          </div>
          <Separator />
          <div className="flex justify-between gap-6">
            <span>Toplam</span>
            <span className="text-primary">{priceFormatter(totalPrice)}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function CheckoutSidebarSkeleton() {
  return <Skeleton className="w-[18rem] h-[16rem]" />;
}
