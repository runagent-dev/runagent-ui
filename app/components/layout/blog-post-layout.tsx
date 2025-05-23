"use client";

import { useParams } from "next/navigation";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { formatDate } from "@/lib/utils";

interface BlogPostLayoutProps {
  children: React.ReactNode;
  post: {
    title: string;
    date: string;
    authors: string[];
  };
}

export function BlogPostLayout({ children, post }: BlogPostLayoutProps) {
  return (
    <MaxWidthWrapper className="py-6 md:pb-8 md:pt-10">
      <div className="max-w-screen-sm">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            {post.authors.map((author) => (
              <span key={author}>{author}</span>
            ))}
          </div>
          <span>•</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        <h1 className="mt-2 font-heading text-3xl md:text-4xl text-foreground">
          {post.title}
        </h1>
      </div>

      <div className="mt-8 prose prose-gray dark:prose-invert max-w-none">
        {children}
      </div>
    </MaxWidthWrapper>
  );
} 