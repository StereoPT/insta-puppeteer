import { useDeleteHashtag } from "@/hooks/hashtags/useDeleteHashtag";
import type { Hashtag } from "@insta-puppeteer/database";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@insta-puppeteer/ui/components/alert-dialog";
import { buttonVariants } from "@insta-puppeteer/ui/components/button";

type DeleteHashtagDialogProps = {
  hashtag: Hashtag;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const DeleteHashtagDialog = ({
  open,
  onOpenChange,
  hashtag,
}: DeleteHashtagDialogProps) => {
  const { isPending, mutate } = useDeleteHashtag(hashtag.id);

  const handleDeleteHashtag = () => {
    mutate();
  };

  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete <b>{hashtag.tag}</b>. This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            disabled={isPending}
            onClick={handleDeleteHashtag}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
