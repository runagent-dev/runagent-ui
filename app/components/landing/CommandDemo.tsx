'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

type CommandType = 'init' | 'deploy' | 'execute' | 'logs';

interface CommandOutput {
  text: string;
  type:
    | 'process'
    | 'success'
    | 'info'
    | 'directory'
    | 'file'
    | 'command'
    | 'url'
    | 'heading'
    | 'result'
    | 'log-info'
    | 'log-debug'
    | 'log-warn'
    | 'blank';
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
        { text: '> Analyzing agent structure...', type: 'process' },
        { text: '> Detecting framework: LangGraph', type: 'process' },
        { text: '> Packaging agent...', type: 'process' },
        { text: '> Uploading to runagent cloud...', type: 'process' },
        { text: '✓ Agent deployed successfully!', type: 'success' },
        { text: '', type: 'blank' },
        { text: 'Agent URL: https://agent.runagent.ai/my-agent', type: 'url' },
        { text: 'Agent ID: ra_a1b2c3d4e5', type: 'info' },
        { text: '', type: 'blank' },
        { text: 'Monitor logs: runagent logs', type: 'command' },
        {
          text: 'Execute commands: runagent execute "Ask a question"',
          type: 'command',
        },
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
      description: 'Monitor your agent activity with real-time logs',
      command: 'runagent logs --follow',
      output: [
        {
          text: '> Connecting to log stream for agent ra_a1b2c3d4e5...',
          type: 'process',
        },
        {
          text: '[2025-05-12 08:14:23] INFO: Agent started successfully',
          type: 'log-info',
        },
        {
          text: '[2025-05-12 08:15:10] INFO: Received query: "Latest financial reports"',
          type: 'log-info',
        },
        {
          text: '[2025-05-12 08:15:12] DEBUG: Connecting to data source...',
          type: 'log-debug',
        },
        {
          text: '[2025-05-12 08:15:14] INFO: Retrieved 5 reports from database',
          type: 'log-info',
        },
        {
          text: '[2025-05-12 08:15:16] INFO: Processing reports with LLM...',
          type: 'log-info',
        },
        {
          text: '[2025-05-12 08:15:20] WARN: Rate limit approaching (80%)',
          type: 'log-warn',
        },
        {
          text: '[2025-05-12 08:15:25] INFO: Response generated and sent to user',
          type: 'log-info',
        },
        {
          text: '[2025-05-12 08:16:02] INFO: New connection from 192.168.1.105',
          type: 'log-info',
        },
        { text: '> Log streaming active... (Ctrl+C to exit)', type: 'process' },
      ],
    },
  };

  const getCommandLineDisplay = () => {
    const command = commands[activeCommand];

    return (
      <div className="gradient-border w-full bg-runagent-light-blue/60 rounded-lg terminal-shadow">
        <div className="bg-runagent-light-blue/80 px-4 py-2 rounded-t-lg border-b border-gray-700 flex items-center">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <p className="text-gray-400 font-mono text-sm">
            Terminal — {command.title}
          </p>
        </div>
        <div className="code-window p-4 text-left">
          <pre className="text-sm md:text-base overflow-x-auto">
            <code>
              <span className="text-gray-400">$</span>{' '}
              <span className="text-runagent-purple">{command.command}</span>
              <br />
              {command.output.map((line: CommandOutput, index: number) => {
                let textClass = '';

                switch (line.type) {
                  case 'process':
                    textClass = 'text-blue-300';
                    break;
                  case 'success':
                    textClass = 'text-green-300';
                    break;
                  case 'info':
                    textClass = 'text-gray-300';
                    break;
                  case 'directory':
                    textClass = 'text-yellow-300 ml-2';
                    break;
                  case 'file':
                    textClass = 'text-blue-200 ml-4';
                    break;
                  case 'command':
                    textClass = 'text-purple-300 ml-4';
                    break;
                  case 'url':
                    textClass = 'text-green-300 font-bold';
                    break;
                  case 'heading':
                    textClass = 'text-yellow-300 font-bold';
                    break;
                  case 'result':
                    textClass = 'text-gray-300 ml-4';
                    break;
                  case 'log-info':
                    textClass = 'text-blue-300';
                    break;
                  case 'log-debug':
                    textClass = 'text-gray-400';
                    break;
                  case 'log-warn':
                    textClass = 'text-yellow-300';
                    break;
                  default:
                    textClass = 'text-gray-300';
                }

                return line.text ? (
                  <span key={index} className={textClass}>
                    {line.text}
                    <br />
                  </span>
                ) : (
                  <br key={index} />
                );
              })}
            </code>
          </pre>
        </div>
      </div>
    );
  };

  return (
    <section
      id="commands"
      className="py-16 md:py-24 px-4 md:px-8 bg-runagent-light-blue/30"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Powerful <span className="text-runagent-purple">CLI Commands</span>
        </h2>
        <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16">
          RunAgent provides intuitive commands for managing your AI agents
          throughout their lifecycle
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-4">
            {Object.keys(commands).map((cmd) => (
              <div
                key={cmd}
                onClick={() => setActiveCommand(cmd as CommandType)}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                  activeCommand === cmd
                    ? 'bg-runagent-purple/20 border border-runagent-purple/50'
                    : 'bg-runagent-light-blue border border-gray-700 hover:border-gray-500'
                }`}
              >
                <h3
                  className={`font-mono font-semibold mb-1 ${
                    activeCommand === cmd
                      ? 'text-runagent-purple'
                      : 'text-white'
                  }`}
                >
                  runagent {cmd}
                </h3>
                <p className="text-sm text-gray-300">
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