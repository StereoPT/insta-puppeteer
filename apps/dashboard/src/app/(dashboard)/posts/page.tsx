import { PageHeader } from "@/components/PageHeader";
import { PostGallery } from "@/components/posts/PostGallery";

const PostsPage = () => {
  return (
    <div className="flex flex-1 flex-col h-full">
      <PageHeader description="List of your Liked Posts" title="Posts" />
      <div className="h-full py-6">
        <PostGallery />
      </div>
    </div>
  );
};

export default PostsPage;
