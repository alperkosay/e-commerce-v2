"use client";
import { SignIn, signInSchema } from "@/lib/validations/auth";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      password: "",
      username: "",
    },
  });
  async function onSubmit(values: SignIn) {
    const session = await signIn("credentials", {
      callbackUrl: "/",
      redirect: false,
      ...values,
    });
    if (session?.ok) {
      toast({
        title: "Giriş Başarılı!",
      });
      router.push("/account");
    } else {
      toast({
        title: "Kullanıcı adı veya şifre yanlış!",
        variant: "destructive",
      });
    }
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Kullanıcı adı" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Şifre" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Giriş Yap</Button>
        </form>
      </Form>
    </>
  );
}
