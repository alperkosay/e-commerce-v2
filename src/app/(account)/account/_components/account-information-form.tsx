import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import React from "react";

export default function AccountInformationForm() {
  const session = useSession();

  if (session.status === "loading") {
    return <AccountInformationFormSkeleton />;
  }

  return (
    <form className="space-y-4">
      <Input
        placeholder="Kullanıcı adı"
        defaultValue={session.data?.user.name!}
      />
      <Input placeholder="Eposta" defaultValue={session.data?.user.email!} />

      <Button>Kaydet</Button>
    </form>
  );
}

export function AccountInformationFormSkeleton() {
  return <Skeleton className="w-full h-40" />;
}
