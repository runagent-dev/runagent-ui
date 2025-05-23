"use client";

import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  data: {
    title: string;
    description: string;
    date: string;
    authors: string[];
    image: string;
    blurDataURL: string;
    slug: string;
  };
  horizontale?: boolean;
  priority?: boolean;
}

export function BlogCard({ data, horizontale, priority }: BlogCardProps) {
  return (
    <Link
      href={data.slug}
      className={cn(
        "group relative flex flex-col space-y-2 rounded-xl border p-5 transition-colors duration-300 hover:bg-muted/80",
        horizontale && "md:flex-row md:space-x-5 md:space-y-0"
      )}
    >
      <div className={cn("relative aspect-[1200/630] overflow-hidden rounded-lg", horizontale && "md:w-1/2")}>
        <Image
          src={data.image}
          alt={data.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={priority}
          placeholder="blur"
          blurDataURL={data.blurDataURL}
        />
      </div>
      <div className={cn("flex flex-1 flex-col justify-between", horizontale && "md:w-1/2")}>
        <div className="space-y-2">
          <h3 className="font-heading text-xl text-foreground group-hover:text-primary">
            {data.title}
          </h3>
          <p className="line-clamp-2 text-[15px] text-muted-foreground">
            {data.description}
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            {data.authors.map((author) => (
              <span key={author}>{author}</span>
            ))}
          </div>
          <span>•</span>
          <time dateTime={data.date}>{formatDate(data.date)}</time>
        </div>
      </div>
    </Link>
  );
} 