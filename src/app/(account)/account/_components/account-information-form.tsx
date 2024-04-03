"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserInformation,
  userInformationsSchema,
} from "@/lib/validations/user-informations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { updateUserInformation } from "@/server/actions/user-information";
import { useToast } from "@/components/ui/use-toast";

export default function AccountInformationForm() {
  const session = useSession();
  const { toast } = useToast();
  const userForm = useForm<UserInformation>({
    resolver: zodResolver(userInformationsSchema),

    values: {
      username: session.data?.user.name || "",
      email: session.data?.user.email || "",
    },
  });
  const { isSubmitting } = userForm.formState;

  if (session.status === "loading") {
    return <AccountInformationFormSkeleton />;
  }

  const informationFormSubmit = async (values: UserInformation) => {
    const data = await updateUserInformation(values);
    console.log("data", data?.data);
    toast({
      title: "Bilgiler güncellendi",
    });
  };

  return (
    <Form {...userForm}>
      <form
        className="space-y-4"
        onSubmit={userForm.handleSubmit(informationFormSubmit)}
      >
        <FormField
          control={userForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kullanıcı adı</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Kullanıcı adı" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={userForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Eposta</FormLabel>

              <FormControl>
                <Input {...field} placeholder="Eposta" />
              </FormControl>
            </FormItem>
          )}
        />

        <Button disabled={isSubmitting}>
          {isSubmitting ? "Kaydediliyor..." : "Kaydet"}
        </Button>
      </form>
    </Form>
  );
}

export function AccountInformationFormSkeleton() {
  return <Skeleton className="w-full h-40" />;
}
