'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Server, Database, Cloud } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative pt-24 pb-16 md:py-32 overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      {/* Background gradient */}
      <div className="absolute top-20 -left-60 w-[500px] h-[500px] bg-gradient-radial from-runagent-purple/20 to-transparent opacity-30 rounded-full"></div>
      <div className="absolute -top-20 -right-60 w-[500px] h-[500px] bg-gradient-radial from-runagent-purple/10 to-transparent opacity-30 rounded-full"></div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-runagent-light-blue/40 text-runagent-purple px-3 py-1.5 rounded-full text-sm font-medium mb-8">
            🚀 Introducing RunAgent CLI: Deploy Agents Anywhere
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Kick off with a bang
            <br />
            with{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
              RunAgent
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-10">
            Deploy AI agents from any framework - LangChain, LangGraph, Agno,
            LlamaIndex, and more with just a single command.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              size="default"
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-12 py-6 rounded-full w-64"
              onClick={() => window.open(
                'https://docs.google.com/forms/d/e/1FAIpQLSffYRhZtDcQEdZu_1VomwBbn-rziGTxgha3iHRmAEIkxFL3gQ/viewform?usp=header',
                '_blank'
              )
              }
            >
              Join Waiting List
            </Button>
          </div>
        </div>

        <div className="gradient-border w-full max-w-3xl mx-auto bg-runagent-light-blue/60 rounded-lg terminal-shadow backdrop-blur-sm">
          <div className="code-window p-4 text-left">
            <pre className="text-sm md:text-base overflow-x-auto">
              <code>
                <span className="text-gray-400">$</span>{' '}
                <span className="text-green-400">pip install runagent</span>
                <br />
                <span className="text-gray-400">$</span>{' '}
                <span className="text-yellow-400">
                  runagent init my-agent --langchain
                </span>
                <br />
                <span className="text-green-300">
                  ✓ Agent initialized successfully!
                </span>
                <br />
                <span className="text-gray-400">$</span>{' '}
                <span className="text-runagent-purple">runagent deploy</span>
                <br />
                <span className="text-green-300">
                  ✓ Agent deployed! Accessible at: runagent.live
                </span>
              </code>
            </pre>
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-sm text-runagent-muted mb-6">POWERED BY</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <div className="flex flex-col items-center">
              <Code className="h-6 w-6 text-gray-400 mb-2" />
              <span className="text-gray-400 font-semibold">LangChain</span>
            </div>
            <div className="flex flex-col items-center">
              <Server className="h-6 w-6 text-gray-400 mb-2" />
              <span className="text-gray-400 font-semibold">LangGraph</span>
            </div>
            <div className="flex flex-col items-center">
              <Database className="h-6 w-6 text-gray-400 mb-2" />
              <span className="text-gray-400 font-semibold">LlamaIndex</span>
            </div>
            <div className="flex flex-col items-center">
              <Cloud className="h-6 w-6 text-gray-400 mb-2" />
              <span className="text-gray-400 font-semibold">Agno</span>
            </div>
            <div className="flex flex-col items-center">
              <Server className="h-6 w-6 text-gray-400 mb-2" />
              <span className="text-gray-400 font-semibold">CrewAI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
