"use client";

import { ROUTES } from "@/constants/routes";
import { loginSchema, type LoginSchemaType } from "@/schemas/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@insta-puppeteer/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@insta-puppeteer/ui/components/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@insta-puppeteer/ui/components/form";
import { Input } from "@insta-puppeteer/ui/components/input";
import { Label } from "@insta-puppeteer/ui/components/label";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onFormSubmit = (values: LoginSchemaType) => {
    signIn("credentials", { redirectTo: ROUTES.home, ...values });
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)}>
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-3">
                      <Label htmlFor="email">Email</Label>
                      <FormControl>
                        <Input
                          placeholder="stereopt@gmail.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-3">
                      <Label htmlFor="email">Password</Label>
                      <FormControl>
                        <Input placeholder="*****" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col gap-3">
                  <Button className="w-full" type="submit">
                    Login
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
