"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { getFirstCharactersOfText } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function User() {
  const { data, status } = useSession();

  if (status === "loading") {
    return <UserSkeleton />;
  }

  return (
    <div className="flex items-center gap-3">
      <div className="w-14 h-14 overflow-hidden rounded-full bg-muted flex items-center justify-center">
        {data?.user.profilePicture ? (
          <Image
            src={data?.user.profilePicture || ""}
            alt={`${data?.user.name}'s profile picture`}
            width={56}
            height={56}
          />
        ) : (
          <span className="font-bold text-lg">
            {getFirstCharactersOfText(data?.user.name?.toUpperCase())}
          </span>
        )}
      </div>
      <span className="text-base font-semibold line-clamp-1">
        {data?.user.name}
      </span>
    </div>
  );
}

export function UserSkeleton() {
  return <Skeleton className="w-full h-14" />;
}
