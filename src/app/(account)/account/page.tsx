import React from "react";
import Title from "../_components/title";
import AccountInformations from "./_components/account-informations";

export default function page() {
  return (
    <section>
      <Title>
        <h1>Hesabım</h1>
      </Title>
      <AccountInformations />
    </section>
  );
}
