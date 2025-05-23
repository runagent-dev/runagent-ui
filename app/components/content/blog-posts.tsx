import { BlogCard } from "./blog-card";

interface BlogPostsProps {
  posts: {
    title: string;
    description: string;
    date: string;
    authors: string[];
    image: string;
    blurDataURL: string;
    slug: string;
  }[];
}

export function BlogPosts({ posts }: BlogPostsProps) {
  return (
    <main className="space-y-8">
      <BlogCard data={posts[0]} horizontale priority />

      <div className="grid gap-8 md:grid-cols-2 md:gap-x-6 md:gap-y-10 xl:grid-cols-3">
        {posts.slice(1).map((post, idx) => (
          <BlogCard data={post} key={post.slug} priority={idx <= 2} />
        ))}
      </div>
    </main>
  );
} 