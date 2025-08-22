import { PageHeader } from "@/components/PageHeader";

const PostsPage = () => {
  return (
    <div className="flex flex-1 flex-col h-full">
      <PageHeader description="List of your Liked Posts" title="Posts" />
      <div className="h-full py-6">List Here</div>
    </div>
  );
};

export default PostsPage;
