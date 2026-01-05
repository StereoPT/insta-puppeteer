import { DeleteHashtagDialog } from "@/components/hashtags/DeleteHashtagDialog";
import type { Hashtag } from "@insta-puppeteer/database";
import { Button } from "@insta-puppeteer/ui/components/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";

type HashtagActionsProps = {
  hashtag: Hashtag;
};

export const HashtagActions = ({ hashtag }: HashtagActionsProps) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  return (
    <>
      {showDeleteAlert && (
        <DeleteHashtagDialog
          hashtag={hashtag}
          onOpenChange={setShowDeleteAlert}
          open={showDeleteAlert}
        />
      )}
      <div className="flex gap-2">
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
