"use client";
import React from "react";
import AccountInformationForm from "./account-information-form";
import AccountImage from "./account-image";
import { useSession } from "next-auth/react";

export default function AccountInformations() {
  const { data } = useSession();
  return (
    <section>
      <div className="flex gap-x-24">
        <div className="flex-1">
          <AccountInformationForm />
        </div>
        <div>
          <AccountImage userID={data?.user.id!} />
        </div>
      </div>
    </section>
  );
}
