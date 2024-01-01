"use client";
import React from "react";
import AccountInformationForm from "./account-information-form";
import AccountImage from "./account-image";

export default function AccountInformations() {
  return (
    <section>
      <div className="flex gap-x-24">
        <div className="flex-1">
          <AccountInformationForm />
        </div>
        <div>
          <AccountImage />
        </div>
      </div>
    </section>
  );
}
