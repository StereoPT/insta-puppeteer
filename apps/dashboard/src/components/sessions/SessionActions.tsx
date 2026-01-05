import { DeleteSessionDialog } from "@/components/sessions/DeleteSessionDialog";
import { ROUTES } from "@/constants/routes";
import type { Session } from "@insta-puppeteer/database";
import { Button } from "@insta-puppeteer/ui/components/button";
import { Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type SessionActionsProps = {
  session: Session;
};

export const SessionActions = ({ session }: SessionActionsProps) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  return (
    <>
      {showDeleteAlert && (
        <DeleteSessionDialog
          onOpenChange={setShowDeleteAlert}
          open={showDeleteAlert}
          session={session}
        />
      )}
      <div className="flex gap-2">
        <Button asChild size="icon-sm" variant="outline">
          <Link href={ROUTES.session(session.id)}>
            <Eye />
          </Link>
        </Button>
        <Button
          onClick={() => setShowDeleteAlert(true)}
          size="icon-sm"
          variant="destructive"
        >
          <Trash2 />
        </Button>
      </div>
    </>
  );
};
