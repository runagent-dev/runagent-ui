"use client";

import { ReactNode } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const sidebarNavItems = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Introduction",
        href: "/docs",
      },
      {
        title: "Installation",
        href: "/docs/installation",
      },
    ],
  },
  {
    title: "Configuration",
    items: [
      {
        title: "Authentication",
        href: "/docs/authentication",
      },
      {
        title: "Blog",
        href: "/docs/blog",
      },
      {
        title: "Components",
        href: "/docs/components",
      },
      {
        title: "Config Files",
        href: "/docs/config-files",
      },
      {
        title: "Database",
        href: "/docs/database",
      },
      {
        title: "Email",
        href: "/docs/email",
      },
      {
        title: "Layouts",
        href: "/docs/layouts",
      },
      {
        title: "Markdown Files",
        href: "/docs/markdown-files",
      },
      {
        title: "Subscriptions",
        href: "/docs/subscriptions",
      },
    ],
  },
];

interface DocsLayoutProps {
  children: ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 pt-20">
        <MaxWidthWrapper>
          <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
            <aside className="fixed top-20 -ml-2 hidden h-[calc(100vh-5rem)] w-full shrink-0 md:sticky md:block">
              <ScrollArea className="h-full py-6 pr-6 lg:py-8">
                <div className="space-y-6">
                  {sidebarNavItems.map((section) => (
                    <div key={section.title} className="space-y-2">
                      <h4 className="font-medium">{section.title}</h4>
                      <nav className="flex flex-col space-y-1">
                        {section.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                              "text-sm text-muted-foreground hover:text-foreground",
                              pathname === item.href && "text-foreground font-medium"
                            )}
                          >
                            {item.title}
                          </Link>
                        ))}
                      </nav>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </aside>
            <div className="mx-auto w-full min-w-0 pb-16">
              <div className="prose prose-gray dark:prose-invert max-w-none">
                {children}
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
      <Footer />
    </div>
  );
} 