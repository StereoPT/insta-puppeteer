"use client";

import { DialogHeader } from "@/components/DialogHeader";
import { AddHashtagForm } from "@/components/hashtags/AddHashtagForm";
import { Button } from "@insta-puppeteer/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@insta-puppeteer/ui/components/dialog";
import { HashIcon, PlusCircle } from "lucide-react";
import { useState } from "react";

export const AddHashtagDialog = () => {
  const [open, setOpen] = useState(false);

  const handleOnOpenChange = (open: boolean) => {
    setOpen(open);
  };

  return (
    <Dialog onOpenChange={handleOnOpenChange} open={open}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle />
          Add Hashtag
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0 py-4">
        <DialogHeader
          icon={HashIcon}
          subtitle="Create your hashtag"
          title="Create Hashtag"
        />
        <div className="px-4 pt-4">
          <AddHashtagForm setOpen={setOpen} />
        </div>
        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
};
