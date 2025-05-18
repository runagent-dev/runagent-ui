'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, Twitter, Linkedin, Heart } from 'lucide-react';

interface SocialButtonProps {
  icon: React.ReactNode;
}

const SocialButton: React.FC<SocialButtonProps> = ({ icon }) => (
  <div className="p-2 bg-runagent-light-blue rounded-md text-gray-300 hover:text-white hover:bg-runagent-purple/20 transition-colors">
    {icon}
  </div>
);

export default function Footer() {
  return (
    <footer className="bg-runagent-dark-blue border-t border-runagent-light-blue">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 mb-4">
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
            <p className="text-gray-400 mb-4">
              Deploy AI agents from any framework with just a single command.
            </p>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8"
              onClick={() =>
                window.open(
                  'https://docs.google.com/forms/d/e/1FAIpQLSffYRhZtDcQEdZu_1VomwBbn-rziGTxgha3iHRmAEIkxFL3gQ/viewform?usp=header',
                  '_blank'
                )
              }
            >
              Join Waiting List
            </Button>

            {/* <div className="flex space-x-4 mt-6">
              <SocialButton icon={<Github size={20} />} />
              <SocialButton icon={<Twitter size={20} />} />
              <SocialButton icon={<Linkedin size={20} />} />
            </div> */}
            <div className="flex space-x-4 mt-6">
              <a
                className="bg-runagent-light-blue rounded-md text-gray-300 hover:text-white hover:bg-runagent-purple/20 transition-colors"
                href="https://github.com/runagent-dev/runagent"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialButton icon={<Github size={20} />} />
              </a>
              <a
                className="bg-runagent-light-blue rounded-md text-gray-300 hover:text-white hover:bg-runagent-purple/20 transition-colors"
                href="https://x.com/run_agent"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialButton icon={<Twitter size={20} />} />
              </a>
              <a
                className="bg-runagent-light-blue rounded-md text-gray-300 hover:text-white hover:bg-runagent-purple/20 transition-colors"
                href="https://www.linkedin.com/company/runagent"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialButton icon={<Linkedin size={20} />} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#commands"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Commands
                </a>
              </li>
              <li>
                <a
                  href="#documentation"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#careers"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 RunAgent. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#terms"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms
              </a>
              <a
                href="#privacy"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy
              </a>
              <a
                href="#cookies"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}