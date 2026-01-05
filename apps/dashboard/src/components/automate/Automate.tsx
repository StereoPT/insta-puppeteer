"use client";

import { AutomatePostGallery } from "@/components/automate/AutomatePostGallery";
import { ErrorAlert } from "@/components/ErrorAlert";
import { useGetHashtags } from "@/hooks/hashtags/useGetHashtags";
import { useAutomate } from "@/hooks/useAutomate";
import { automateSchema, type AutomateSchemaType } from "@/schemas/automate";
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "@insta-puppeteer/ui/components/badge";
import { Button } from "@insta-puppeteer/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
} from "@insta-puppeteer/ui/components/form";
import { Input } from "@insta-puppeteer/ui/components/input";
import { Loader2Icon, SendHorizontalIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

export const Automate = () => {
  const { data: session } = useSession();
  const { data: hashtags } = useGetHashtags();
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

  if (!hashtags) {
    return <ErrorAlert />;
  }

  return (
    <div className="flex flex-col gap-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleAutomate)}>
          <div className="flex flex-col gap-4 items-center">
            <div className="flex w-full items-center justify-center gap-2">
              <FormField
                control={form.control}
                name="hashtag"
                render={({ field }) => (
                  <FormControl>
                    <Input
                      autoComplete="off"
                      className="max-w-md"
                      placeholder="Hastag to Automate. e.g: anime"
                      {...field}
                    />
                  </FormControl>
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
            <div>
              {hashtags.slice(0, 5).map((hashtag) => (
                <Badge
                  className="cursor-pointer capitalize"
                  key={hashtag.id}
                  onClick={() => form.setValue("hashtag", hashtag.tag)}
                >
                  {hashtag.tag}
                </Badge>
              ))}
            </div>
          </div>
        </form>
      </Form>
      {isSuccess && sessionId && <AutomatePostGallery sessionId={sessionId} />}
    </div>
  );
};
