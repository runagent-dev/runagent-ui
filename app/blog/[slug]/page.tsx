import { BlogPostLayout } from "@/components/layout/blog-post-layout";
import { notFound } from "next/navigation";
import { markdownToHtml } from "@/lib/markdown";

// This would typically come from a CMS or database
const blogPosts = {
  "getting-started": {
    title: "Getting Started with RunAgent",
    description: "Learn how to deploy your first AI agent using RunAgent's powerful platform.",
    date: "2024-03-15",
    authors: ["RunAgent Team"],
    image: "/blog/getting-started.jpg",
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLjg0PjU1Oj4+NTU1Oj4+NTU1Oj4+NTU1Oj7/2wBDAR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=",
    content: `
      # Getting Started with RunAgent

      Welcome to RunAgent! This guide will help you deploy your first AI agent using our powerful platform.

      ## Prerequisites

      Before you begin, make sure you have:
      - A RunAgent account
      - Basic knowledge of AI agents
      - Your agent code ready to deploy

      ## Step 1: Create Your First Agent

      To create your first agent:

      1. Log in to your RunAgent dashboard
      2. Click "New Agent"
      3. Choose your agent framework
      4. Upload your agent code

      ## Step 2: Configure Your Agent

      Configure your agent settings:
      - Set resource limits
      - Define environment variables
      - Configure networking options

      ## Step 3: Deploy

      Once configured, click "Deploy" to launch your agent. You can monitor its status in the dashboard.

      ## Next Steps

      After deployment, you can:
      - Monitor agent performance
      - Scale resources as needed
      - Integrate with other services

      For more advanced topics, check out our documentation.
    `,
  },
  // Add more blog posts here
};

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug as keyof typeof blogPosts];

  if (!post) {
    notFound();
  }

  const content = await markdownToHtml(post.content);

  return (
    <BlogPostLayout post={post}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </BlogPostLayout>
  );
} 