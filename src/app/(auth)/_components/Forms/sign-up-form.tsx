"use client";
import { SignUp, signUpSchema } from "@/lib/validations/auth";
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
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";

export default function SignUpForm() {
  const createUserMutation = api.user.createUser.useMutation();

  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<SignUp>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      password: "",
      username: "",
      email: "",
      passwordRepeat: "",
    },
  });

  async function onSubmit(values: SignUp) {
    if (values.password === values.passwordRepeat) {
      delete values.passwordRepeat;
      // const res = await fetch("/api/auth/sign-up", {
      //   method: "POST",
      //   body: JSON.stringify(values),
      // });
      await createUserMutation.mutateAsync(values);
      if (createUserMutation.isSuccess) {
        toast({
          title: "Kayıt başarılı!",
        });

        router.push("/sign-in");
      } else {
        toast({
          title: "Kayıt başarısız!",
          description: "Bu kullanıcı zaten kayıtlı",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Şifreler uyuşmuyor!",
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="email" />
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

          <FormField
            control={form.control}
            name="passwordRepeat"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Şifre tekrar"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Kayıt Ol</Button>
        </form>
      </Form>
    </>
  );
}
