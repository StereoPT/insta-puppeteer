"use client";

import { useDeletePost } from "@/hooks/useDeletePost";
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
import { Button, buttonVariants } from "@insta-puppeteer/ui/components/button";
import { Trash2 } from "lucide-react";

type DeletePostAlertProps = {
  id: string;
  postId: string;
};

export const DeletePostAlert = ({ id, postId }: DeletePostAlertProps) => {
  const { mutate } = useDeletePost(id, postId);

  const handleDelete = () => {
    mutate();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
          size="icon"
          variant="destructive"
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this post. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
