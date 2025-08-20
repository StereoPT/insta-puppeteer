"use client";

import { PageHeader } from "@/components/PageHeader";
import { useSession } from "next-auth/react";

const HomePage = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-1 flex-col h-full">
      <PageHeader
        description="This is your Instagram report"
        title="Welcome, Guido"
      />
      <div className="h-full py-6">
        <pre>{JSON.stringify(session?.user, null, 4)}</pre>
      </div>
    </div>
  );
};

export default HomePage;
