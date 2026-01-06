"use client";

import { AutomateForYou } from "@/components/automate/AutomateForYou";
import { AutomateHashtag } from "@/components/automate/AutomateHashtag";
import { AutomatePostGallery } from "@/components/automate/AutomatePostGallery";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@insta-puppeteer/ui/components/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@insta-puppeteer/ui/components/tabs";
import { useSession } from "next-auth/react";
import { useState } from "react";

export const Automate = () => {
  const { data: session } = useSession();

  const [sessionId, setSessionId] = useState<string>();
  const [isSuccess, setIsSuccess] = useState(false);

  if (!session) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8">
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Automate</CardTitle>
          <CardDescription>Choose your automate mode below</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="hashtag">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="hashtag">Hashtag</TabsTrigger>
              <TabsTrigger value="forYou">For You</TabsTrigger>
            </TabsList>
            <TabsContent className="space-y-4 mt-6" value="hashtag">
              <AutomateHashtag
                session={session}
                setIsSuccess={setIsSuccess}
                setSessionId={setSessionId}
              />
            </TabsContent>
            <TabsContent className="space-y-4 mt-6" value="forYou">
              <AutomateForYou
                session={session}
                setIsSuccess={setIsSuccess}
                setSessionId={setSessionId}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {isSuccess && sessionId && <AutomatePostGallery sessionId={sessionId} />}
    </div>
  );
};
