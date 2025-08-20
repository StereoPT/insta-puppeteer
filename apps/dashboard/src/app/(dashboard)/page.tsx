"use client";

import { PageHeader } from "@/components/PageHeader";
import { useAutomate } from "@/hooks/useAutomate";
import { Button } from "@insta-puppeteer/ui/components/button";
import { CogIcon } from "lucide-react";
import { useSession } from "next-auth/react";

const HomePage = () => {
  const { data: session } = useSession();
  const { mutate, isPending } = useAutomate();

  return (
    <div className="flex flex-1 flex-col h-full">
      <PageHeader
        description="This is your Instagram report"
        title="Welcome, Guido"
      />
      <div className="h-full py-6">
        <Button
          disabled={isPending}
          onClick={() => {
            mutate({
              email: session?.user.email ?? "",
              password: session?.user.password ?? "",
            });
          }}
        >
          <CogIcon />
          Automate
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
