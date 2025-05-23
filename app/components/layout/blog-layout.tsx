"use client";

import { ReactNode } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

interface BlogLayoutProps {
  children: React.ReactNode;
}

export function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <MaxWidthWrapper className="py-6 md:pb-8 md:pt-10">
          <div className="max-w-screen-sm">
            <h1 className="font-heading text-3xl md:text-4xl text-foreground">
              Blog
            </h1>
            <p className="mt-3.5 text-base text-muted-foreground md:text-lg">
              Latest news and updates from RunAgent.
            </p>
          </div>
        </MaxWidthWrapper>
        <MaxWidthWrapper className="pb-16">{children}</MaxWidthWrapper>
      </main>
      <Footer />
    </div>
  );
} 