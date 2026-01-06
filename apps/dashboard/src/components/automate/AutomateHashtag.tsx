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
import { Spinner } from "@insta-puppeteer/ui/components/spinner";
import { SendHorizontalIcon } from "lucide-react";
import type { Session } from "next-auth";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

type AutomateHashtagProps = {
  session: Session;
  setSessionId: Dispatch<SetStateAction<string | undefined>>;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
};

export const AutomateHashtag = ({
  session,
  setSessionId,
  setIsSuccess,
}: AutomateHashtagProps) => {
  const { data: hashtags } = useGetHashtags();
  const { mutateAsync, isPending } = useAutomate();

  const form = useForm<AutomateSchemaType>({
    resolver: zodResolver(automateSchema),
    defaultValues: {
      hashtag: "",
    },
  });

  const handleAutomate = async (values: AutomateSchemaType) => {
    const sessionId = await mutateAsync({
      email: session.user.email ?? "",
      password: session.user.password ?? "",
      hashtag: values.hashtag,
    });

    setSessionId(sessionId);
    setIsSuccess(true);
  };

  const handleHashtagClick = (hashtag: string) => {
    form.setValue("hashtag", hashtag);
  };

  if (!hashtags) {
    return <ErrorAlert />;
  }

  return (
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
              {isPending ? <Spinner /> : <SendHorizontalIcon />}
            </Button>
          </div>
          <div>
            {hashtags.slice(0, 5).map((hashtag) => (
              <Badge
                className="cursor-pointer capitalize"
                key={hashtag.id}
                onClick={() => handleHashtagClick(hashtag.tag)}
              >
                {hashtag.tag}
              </Badge>
            ))}
          </div>
        </div>
      </form>
    </Form>
  );
};
