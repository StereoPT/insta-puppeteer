"use client";

import { AutomatePostGallery } from "@/components/automate/AutomatePostGallery";
import { useAutomate } from "@/hooks/useAutomate";
import { automateSchema, type AutomateSchemaType } from "@/schemas/automate";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@insta-puppeteer/ui/components/button";
import { Form, FormField } from "@insta-puppeteer/ui/components/form";
import { Input } from "@insta-puppeteer/ui/components/input";
import { Loader2Icon, SendHorizontalIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

export const Automate = () => {
  const { data: session } = useSession();
  const { data: sessionId, mutate, isPending, isSuccess } = useAutomate();

  const form = useForm<AutomateSchemaType>({
    resolver: zodResolver(automateSchema),
    defaultValues: {
      hashtag: "",
    },
  });

  const handleAutomate = (values: AutomateSchemaType) => {
    mutate({
      email: session?.user.email ?? "",
      password: session?.user.password ?? "",
      hashtag: values.hashtag,
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleAutomate)}>
          <div className="flex items-center justify-center gap-2">
            <FormField
              control={form.control}
              name="hashtag"
              render={({ field }) => (
                <Input
                  autoComplete="off"
                  className="max-w-md"
                  placeholder="Hastag to Automate. e.g: anime"
                  {...field}
                />
              )}
            />
            <Button disabled={isPending} type="submit">
              {isPending ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                <SendHorizontalIcon />
              )}
            </Button>
          </div>
        </form>
      </Form>
      {isSuccess && sessionId && <AutomatePostGallery sessionId={sessionId} />}
    </div>
  );
};
