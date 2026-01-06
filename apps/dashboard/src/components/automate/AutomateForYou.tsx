import { useAutomate } from "@/hooks/useAutomate";
import { Button } from "@insta-puppeteer/ui/components/button";
import { Spinner } from "@insta-puppeteer/ui/components/spinner";
import { SendHorizontalIcon } from "lucide-react";
import type { Session } from "next-auth";
import type { Dispatch, SetStateAction } from "react";

type AutomateForYouProps = {
  session: Session;
  setSessionId: Dispatch<SetStateAction<string | undefined>>;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
};

export const AutomateForYou = ({
  session,
  setSessionId,
  setIsSuccess,
}: AutomateForYouProps) => {
  const { mutateAsync, isPending } = useAutomate();

  const handleAutomate = async () => {
    const sessionId = await mutateAsync({
      email: session.user.email ?? "",
      password: session.user.password ?? "",
    });

    setSessionId(sessionId);
    setIsSuccess(true);
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <Button disabled={isPending} onClick={handleAutomate}>
        Automate For You Page
        {isPending ? <Spinner /> : <SendHorizontalIcon />}
      </Button>
    </div>
  );
};
