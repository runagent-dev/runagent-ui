'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

type CommandType = 'init' | 'deploy' | 'execute' | 'logs';

interface CommandOutput {
  text: string;
  type: 'process' | 'success' | 'error' | 'info' | 'command' | 'directory' | 'file' | 'blank' | 'heading' | 'result';
}

interface Command {
  title: string;
  description: string;
  command: string;
  output: CommandOutput[];
}

interface Commands {
  [key: string]: Command;
}

const CommandDemo = () => {
  const [activeCommand, setActiveCommand] = useState<CommandType>('init');

  const commands: Commands = {
    init: {
      title: 'Initialize Agent',
      description:
        'Set up a new agent project structure with minimal configuration',
      command: 'runagent init my-agent --langgraph',
      output: [
        { text: '> Creating langgraph agent template...', type: 'process' },
        { text: '> Setting up configuration...', type: 'process' },
        { text: '✓ Agent initialized successfully!', type: 'success' },
        { text: '> Created directory structure:', type: 'info' },
        { text: '  my-agent/', type: 'directory' },
        { text: '  └── src/', type: 'directory' },
        { text: '      ├── agent.py', type: 'file' },
        { text: '      └── config.json', type: 'file' },
        { text: '', type: 'blank' },
        { text: 'Next steps:', type: 'info' },
        { text: '  1. cd my-agent', type: 'command' },
        {
          text: '  2. Edit src/agent.py with your agent logic',
          type: 'command',
        },
        { text: '  3. Run "runagent deploy" when ready', type: 'command' },
      ],
    },
    deploy: {
      title: 'Deploy Agent',
      description: 'Deploy your agent to production with a single command',
      command: 'runagent deploy',
      output: [
        { text: '> Building agent package...', type: 'process' },
        { text: '> Validating configuration...', type: 'process' },
        { text: '> Deploying to cloud infrastructure...', type: 'process' },
        { text: '✓ Deployment successful!', type: 'success' },
        { text: '', type: 'blank' },
        { text: 'Agent Details:', type: 'heading' },
        { text: '  ID: ra_a1b2c3d4e5', type: 'info' },
        { text: '  Status: Running', type: 'info' },
        { text: '  Endpoint: https://api.runagent.ai/ra_a1b2c3d4e5', type: 'info' },
        { text: '', type: 'blank' },
        { text: 'Monitor your agent:', type: 'info' },
        { text: '  runagent logs ra_a1b2c3d4e5', type: 'command' },
      ],
    },
    execute: {
      title: 'Execute Agent',
      description: 'Run your deployed agent with queries directly from CLI',
      command: 'runagent execute "Analyze market trends for 2025"',
      output: [
        { text: '> Connecting to agent ra_a1b2c3d4e5...', type: 'process' },
        {
          text: '> Executing query: "Analyze market trends for 2025"',
          type: 'process',
        },
        { text: '> Agent processing...', type: 'process' },
        { text: '✓ Response received', type: 'success' },
        { text: '', type: 'blank' },
        { text: 'Market Analysis for 2025:', type: 'heading' },
        {
          text: '1. AI integration in traditional industries accelerating',
          type: 'result',
        },
        {
          text: '2. Renewable energy investment projected to increase by 32%',
          type: 'result',
        },
        {
          text: '3. Remote work tools continuing evolution with VR integration',
          type: 'result',
        },
        {
          text: '4. Healthcare personalization reaching mainstream adoption',
          type: 'result',
        },
        { text: '', type: 'blank' },
        {
          text: 'Full analysis saved to: ./results/analysis-05-12-2025.json',
          type: 'info',
        },
      ],
    },
    logs: {
      title: 'View Logs',
      description: 'Monitor your agent in real-time with detailed logs',
      command: 'runagent logs ra_a1b2c3d4e5',
      output: [
        { text: '> Connecting to agent logs...', type: 'process' },
        { text: '> Stream started', type: 'success' },
        { text: '', type: 'blank' },
        { text: '[2025-05-12 14:23:45] Request received', type: 'info' },
        { text: '[2025-05-12 14:23:46] Processing query...', type: 'info' },
        { text: '[2025-05-12 14:23:47] Query completed', type: 'info' },
        { text: '[2025-05-12 14:23:48] Response sent', type: 'info' },
        { text: '', type: 'blank' },
        { text: 'Performance Metrics:', type: 'heading' },
        { text: '  Response Time: 2.3s', type: 'info' },
        { text: '  Memory Usage: 256MB', type: 'info' },
        { text: '  CPU Usage: 12%', type: 'info' },
      ],
    },
  };

  const getCommandLineDisplay = () => {
    const command = commands[activeCommand];
    return (
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 shadow-lg">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-destructive"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="font-mono text-sm text-muted-foreground">
            {command.command}
          </div>
        </div>
        <div className="font-mono text-sm space-y-1">
          {command.output.map((line, index) => {
            const getTextColor = () => {
              switch (line.type) {
                case 'process':
                  return 'text-blue-400';
                case 'success':
                  return 'text-green-400';
                case 'error':
                  return 'text-red-400';
                case 'info':
                  return 'text-muted-foreground';
                case 'command':
                  return 'text-primary';
                case 'directory':
                  return 'text-blue-400';
                case 'file':
                  return 'text-green-400';
                case 'heading':
                  return 'text-foreground font-semibold';
                case 'result':
                  return 'text-muted-foreground';
                default:
                  return 'text-muted-foreground';
              }
            };

            return (
              <div key={index} className={getTextColor()}>
                {line.text}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section className="py-20 bg-background relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Simple yet powerful commands
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Deploy and manage your AI agents with our intuitive command-line interface.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-4">
            {Object.keys(commands).map((cmd) => (
              <div
                key={cmd}
                onClick={() => setActiveCommand(cmd as CommandType)}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                  activeCommand === cmd
                    ? 'bg-primary/20 border border-primary/50 shadow-lg'
                    : 'bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 hover:shadow-md'
                }`}
              >
                <h3
                  className={`font-mono font-semibold mb-1 ${
                    activeCommand === cmd
                      ? 'text-primary'
                      : 'text-foreground'
                  }`}
                >
                  runagent {cmd}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {commands[cmd].description}
                </p>
              </div>
            ))}
          </div>

          <div className="lg:col-span-8">{getCommandLineDisplay()}</div>
        </div>
      </div>
    </section>
  );
};

export default CommandDemo;