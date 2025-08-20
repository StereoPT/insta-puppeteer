import { PageHeader } from "@/components/PageHeader";

const HomePage = () => {
  return (
    <div className="flex flex-1 flex-col h-full">
      <PageHeader
        description="This is your Instagram report"
        title="Welcome, Guido"
      />
      <div className="h-full py-6">InstaPuppeteer Dashboard</div>
    </div>
  );
};

export default HomePage;
