import React from "react";
import FormContainer from "../_components/form-container";
import SignInForm from "../_components/Forms/sign-in-form";

export default function page() {
  return (
    <FormContainer title="Giriş Yap">
      <SignInForm />
    </FormContainer>
  );
}
