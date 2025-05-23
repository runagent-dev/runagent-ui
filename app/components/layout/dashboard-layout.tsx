"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, Settings, FileText } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const navItems = [
  {
    name: "Projects",
    href: "/dashboard/projects",
    icon: LayoutDashboard,
  },
  {
    name: "Agents",
    href: "/dashboard/agents",
    icon: Users,
  },
  {
    name: "Templates",
    href: "/dashboard/templates",
    icon: FileText,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-card">
        <div className="flex flex-col h-20 items-center border-b p-6 justify-center">
          <div className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/lovable-uploads/eb3783d4-b821-454b-879d-1b07174beb31.png"
                alt="RunAgent Logo"
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold">
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
                  Run
                </span>
                <span className="text-foreground">Agent</span>
              </span>
            </Link>
          </div>
        </div>
        <nav className="space-y-1 p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-2",
                    isActive && "bg-secondary"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <main className="container mx-auto p-6">{children}</main>
      </div>
    </div>
  );
} 