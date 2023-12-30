import React from "react";
import FormContainer from "../_components/form-container";
import SignUpForm from "../_components/Forms/sign-up-form";

export default function page() {
  return (
    <FormContainer title="Kayıt Ol">
      <SignUpForm />
    </FormContainer>
  );
}
