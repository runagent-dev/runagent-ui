'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 md:px-8 bg-runagent-dark-blue/80 backdrop-blur-md border-b border-runagent-light-blue">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
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
          </div>

          <div className="hidden ml-10 space-x-6 md:flex items-center">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="/dashboard/projects">Dashboard</NavLink>
            <NavLink href="#documentation">Docs</NavLink>
            <NavLink href="#community">Community</NavLink>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Button
            variant="outline"
            className="border-runagent-purple text-runagent-purple hover:bg-runagent-purple/10 rounded-full"
          >
            Sign In
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white w-full rounded-full"
            onClick={() =>
              window.open(
                'https://docs.google.com/forms/d/e/1FAIpQLSffYRhZtDcQEdZu_1VomwBbn-rziGTxgha3iHRmAEIkxFL3gQ/viewform?usp=header',
                '_blank'
              )
            }
          >
            Join Waiting List
          </Button>
        </div>

        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 p-4 bg-runagent-dark-blue/90 backdrop-blur-md border-b border-runagent-light-blue">
          <div className="flex flex-col space-y-4">
            <NavLink href="#features" onClick={() => setIsMenuOpen(false)}>
              Features
            </NavLink>
            <NavLink
              href="/dashboard/projects"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </NavLink>
            <NavLink href="#documentation" onClick={() => setIsMenuOpen(false)}>
              Docs
            </NavLink>
            <NavLink href="#community" onClick={() => setIsMenuOpen(false)}>
              Community
            </NavLink>
            <div className="pt-4 flex flex-col space-y-3">
              <Button
                variant="outline"
                className="border-runagent-purple text-runagent-purple hover:bg-runagent-purple/10 w-full rounded-full"
              >
                Sign In
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white rounded-full px-10"
                onClick={() =>
                  window.open(
                    'https://docs.google.com/forms/d/e/1FAIpQLSffYRhZtDcQEdZu_1VomwBbn-rziGTxgha3iHRmAEIkxFL3gQ/viewform?usp=header',
                    '_blank'
                  )
                }
              >
                Join Waitlist
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
        className="text-gray-300 hover:text-white transition-colors duration-200"
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="text-gray-300 hover:text-white transition-colors duration-200"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Header;
