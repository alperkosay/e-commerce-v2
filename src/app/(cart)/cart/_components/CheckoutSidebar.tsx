"use client";
import { Button } from "@/components/ui/button";
import Price from "@/components/ui/price";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { priceFormatter } from "@/lib/utils";
import { iyzipay } from "@/server/iyzico";
import { useCartStore } from "@/store/cart";
import { api } from "@/trpc/react";
import { useState } from "react";

export default function CheckoutSidebar() {
  const { basketPrices } = useCartStore();

  const [paymentHTML, setPaymentHTML] = useState<string>("");
  const iyziMutation = api.iyzico.checkout.useMutation();
  const handlePay = async () => {
    iyziMutation.mutate({});
  };
  return (
    <aside className="w-[18rem]">
      <div className="sticky top-5 border border-muted p-3">
        <h2 className="mb-4 text-xl">Sipariş Özeti</h2>
        <div className="space-y-4">
          <div className="flex items-end justify-between gap-6">
            <span>Ürünün Toplamı</span>
            <div className="text-right">
              <Price
                price={basketPrices.totalPrice}
                discountedPrice={basketPrices.discountedPrice}
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
            <span className="text-primary">
              {priceFormatter(basketPrices.totalPrice)}
            </span>
          </div>
          <Separator />
          <Button onClick={handlePay}>Siparişi Tamamla</Button>
        </div>
      </div>

      {paymentHTML && (
        <div dangerouslySetInnerHTML={{ __html: paymentHTML }}></div>
      )}
    </aside>
  );
}

export function CheckoutSidebarSkeleton() {
  return <Skeleton className="h-[16rem] w-[18rem]" />;
}
