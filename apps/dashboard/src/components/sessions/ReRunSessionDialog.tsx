"use client";

import { useGetSession } from "@/hooks/sessions/useGetSession";
import { useAutomate } from "@/hooks/useAutomate";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@insta-puppeteer/ui/components/alert-dialog";
import { Button } from "@insta-puppeteer/ui/components/button";
import { RotateCw } from "lucide-react";
import { useSession } from "next-auth/react";

type ReRunSessionDialogProps = {
  sessionId: string;
};

export const ReRunSessionDialog = ({ sessionId }: ReRunSessionDialogProps) => {
  const { data: session } = useSession();
  const { data: userSession } = useGetSession(sessionId);
  const { mutate } = useAutomate();

  const handleReRun = () => {
    mutate({
      email: session?.user.email ?? "",
      password: session?.user.password ?? "",
      hashtag: userSession?.hashtag ?? "",
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          <RotateCw /> Re-Run
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will trigger a new run with the same hashtag.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleReRun}>Re-Run</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
