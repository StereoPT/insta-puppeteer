"use client";

import { useToggleHashtag } from "@/hooks/hashtags/useToggleHashtag";
import type { Hashtag } from "@insta-puppeteer/database";
import { Switch } from "@insta-puppeteer/ui/components/switch";

type ToggleHashtagProps = {
  hashtag: Hashtag;
};

export const ToggleHashtag = ({ hashtag }: ToggleHashtagProps) => {
  const { mutateAsync, isPending } = useToggleHashtag(hashtag.id);

  const handleActiveChange = async (newCheck: boolean) => {
    await mutateAsync(newCheck);
  };

  return (
    <Switch
      checked={hashtag.active}
      disabled={isPending}
      onCheckedChange={handleActiveChange}
    />
  );
};
