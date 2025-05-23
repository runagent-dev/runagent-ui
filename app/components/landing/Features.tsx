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
      icon: <Zap size={24} className="text-primary" />,
      title: "One-Click Deploy",
      description: "Deploy AI agents to production with a single command - from any framework."
    },
    {
      icon: <Code2 size={24} className="text-primary" />,
      title: "Framework Agnostic",
      description: "Works with LangChain, LangGraph, Agno, LlamaIndex, and more. Build with what you know."
    },
    {
      icon: <Layers size={24} className="text-primary" />,
      title: "Powerful CLI",
      description: "Simple yet powerful commands: init, deploy, execute, logs, and more."
    },
    {
      icon: <Shield size={24} className="text-primary" />,
      title: "Secure By Design",
      description: "Built with security in mind - integrates MCP and A2A for safely deploying and managing your AI agents."
    },
    {
      icon: <BarChartBig size={24} className="text-primary" />,
      title: "Monitoring & Analytics",
      description: "Get insights into your agent's performance with built-in monitoring tools."
    },
    {
      icon: <Cloud size={24} className="text-primary" />,
      title: "Lightning Deployment",
      description: "Deploy your agents in seconds with optimized cloud infrastructure and instant scaling."
    }
  ];

  return (
    <section className="py-20 bg-secondary/30 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-primary/5 to-background/0" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Everything you need to deploy AI agents
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            RunAgent provides all the tools and infrastructure you need to deploy and manage your AI agents at scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-colors">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 