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
import Link from "next/link";

import usernavigations from "@/mocks/usernavigations";
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
          <>
            <DropdownMenuItem onClick={() => signIn()}>
              Giriş Yap
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={"/sign-up"}>Kayıt Ol</Link>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuLabel>{data?.user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Object.entries(usernavigations).map((entry, index) => (
              <DropdownMenuItem asChild key={index}>
                <Link href={entry[1].href}>{entry[1].title}</Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem onClick={() => signOut()}>
              Çıkış Yap
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
