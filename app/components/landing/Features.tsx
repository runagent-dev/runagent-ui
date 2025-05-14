'use client';

import React from 'react';
import { 
  Zap, 
  Code2, 
  Layers, 
  Shield, 
  BarChartBig, 
  Cloud,
  ArrowUpRight
} from 'lucide-react';
import { Card } from '@/components/ui/card';

const Features = () => {
  const features = [
    {
      icon: <Zap size={24} className="text-runagent-purple" />,
      title: "One-Click Deploy",
      description: "Deploy AI agents to production with a single command - from any framework."
    },
    {
      icon: <Code2 size={24} className="text-runagent-purple" />,
      title: "Framework Agnostic",
      description: "Works with LangChain, LangGraph, Agno, LlamaIndex, and more. Build with what you know."
    },
    {
      icon: <Layers size={24} className="text-runagent-purple" />,
      title: "Powerful CLI",
      description: "Simple yet powerful commands: init, deploy, execute, logs, and more."
    },
    {
      icon: <Shield size={24} className="text-runagent-purple" />,
      title: "Secure By Design",
      description: "Built with security in mind - integrates MCP and A2A for safely deploying and managing your AI agents."
    },
    {
      icon: <BarChartBig size={24} className="text-runagent-purple" />,
      title: "Monitoring & Analytics",
      description: "Get insights into your agent's performance with built-in monitoring tools."
    },
    {
      icon: <Cloud size={24} className="text-runagent-purple" />,
      title: "Lightning Deployment",
      description: "Deploy your agents in seconds with optimized cloud infrastructure and instant scaling."
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-runagent-dark-blue to-runagent-dark-blue/95">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-runagent-purple uppercase text-sm font-medium mb-2">Features</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Discover all features.
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            RunAgent provides all the tools you need to build, deploy, and scale your AI agents efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border border-gray-700/30 bg-white/[0.03] backdrop-blur-lg hover:bg-white/[0.05] transition-all duration-300 overflow-hidden rounded-xl shadow-xl hover:shadow-runagent-purple/10 hover:-translate-y-1"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="h-12 w-12 rounded-md bg-runagent-purple/10 flex items-center justify-center mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400 mb-6 flex-grow">{feature.description}</p>
                <div>
                  <button className="inline-flex items-center text-sm text-runagent-purple hover:text-white transition-colors group">
                    <span>Visit the site</span>
                    <ArrowUpRight size={16} className="ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 