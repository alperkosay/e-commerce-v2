"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User2 } from "lucide-react";
import React, { useEffect } from "react";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
export default function UserMenu() {
  const { data, status, update } = useSession();

  useEffect(() => {
    update();
  }, []);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"}>
          <User2 />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {status === "unauthenticated" ? (
          <DropdownMenuItem onClick={() => signIn()}>
            Giriş Yap
          </DropdownMenuItem>
        ) : (
          <>
            <DropdownMenuLabel>{data?.user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Hesabım</DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()}>
              Çıkış Yap
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
