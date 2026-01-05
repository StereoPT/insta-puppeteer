import { PageHeader } from "@/components/PageHeader";
import { UserSessions } from "@/components/sessions/UserSessions";

const SessionsPage = () => {
  return (
    <div className="flex flex-1 flex-col h-full">
      <PageHeader description="List of your sessions" title="Sessions" />
      <div className="h-full py-6">
        <UserSessions />
      </div>
    </div>
  );
};

export default SessionsPage;
