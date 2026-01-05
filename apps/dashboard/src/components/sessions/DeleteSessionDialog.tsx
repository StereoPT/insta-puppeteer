import { useDeleteSession } from "@/hooks/sessions/useDeleteSession";
import type { Session } from "@insta-puppeteer/database";
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

type DeleteSessionDialogProps = {
  session: Session;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const DeleteSessionDialog = ({
  open,
  onOpenChange,
  session,
}: DeleteSessionDialogProps) => {
  const { isPending, mutate } = useDeleteSession(session.id);

  const handleDeleteSession = () => {
    mutate();
  };

  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete <b>{session.hashtag}</b>. This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            disabled={isPending}
            onClick={handleDeleteSession}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
