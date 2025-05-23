'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { UserButton, SignInButton, useUser, SignOutButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/theme-toggle";

const navigation = [
  { name: "Features", href: "/#features" },
  { name: "Pricing", href: "/pricing" },
  { name: "Blog", href: "/blog" },
  { name: "Documentation", href: "/docs" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isSignedIn } = useUser();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 md:px-8 bg-background/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-xl md:text-2xl font-bold flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/lovable-uploads/eb3783d4-b821-454b-879d-1b07174beb31.png"
                alt="RunAgent Logo"
                className="h-8 w-auto mr-2"
              />
              <span>
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
                  Run
                </span>
                Agent
              </span>
            </Link>
          </div>

          <div className="hidden ml-10 space-x-6 md:flex items-center">
            {navigation.map((item) => (
              <NavLink key={item.name} href={item.href}>
                {item.name}
              </NavLink>
            ))}
            {isSignedIn && <NavLink href="/dashboard/projects">Dashboard</NavLink>}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {isSignedIn ? (
            <>
              <UserButton afterSignOutUrl="/" />
              <SignOutButton>
                <Button 
                  variant="ghost" 
                  className="hover:text-foreground"
                >
                  Sign Out
                </Button>
              </SignOutButton>
            </>
          ) : (
            <SignInButton mode="modal">
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:bg-primary/90">
                Sign In
              </button>
            </SignInButton>
          )}
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white rounded-full px-10"
            onClick={() => window.open(
              'https://docs.google.com/forms/d/e/1FAIpQLSffYRhZtDcQEdZu_1VomwBbn-rziGTxgha3iHRmAEIkxFL3gQ/viewform?usp=header',
              '_blank'
            )}
          >
            Join Waiting List
          </Button>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 p-4 bg-background/90 backdrop-blur-md border-b">
          <div className="flex flex-col space-y-4">
            {navigation.map((item) => (
              <NavLink 
                key={item.name} 
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
            {isSignedIn && (
              <NavLink
                href="/dashboard/projects"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </NavLink>
            )}
            <div className="pt-4 flex flex-col space-y-3">
              {isSignedIn ? (
                <>
                  <UserButton afterSignOutUrl="/" />
                  <SignOutButton>
                    <Button 
                      variant="ghost" 
                      className="hover:text-foreground w-full"
                    >
                      Sign Out
                    </Button>
                  </SignOutButton>
                </>
              ) : (
                <SignInButton mode="modal">
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:bg-primary/90 w-full">
                    Sign In
                  </button>
                </SignInButton>
              )}
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white w-full rounded-full"
                onClick={() => window.open(
                  'https://docs.google.com/forms/d/e/1FAIpQLSffYRhZtDcQEdZu_1VomwBbn-rziGTxgha3iHRmAEIkxFL3gQ/viewform?usp=header',
                  '_blank'
                )}
              >
                Join Waiting List
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink = ({ href, children, onClick = () => {} }: NavLinkProps) => {
  if (href.startsWith('#')) {
    return (
      <a
        href={href}
        className="text-muted-foreground hover:text-foreground transition-colors duration-200"
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="text-muted-foreground hover:text-foreground transition-colors duration-200"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Header;
