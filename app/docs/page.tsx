import { DocsLayout } from "@/components/layout/docs-layout";

export default function DocsPage() {
  return (
    <DocsLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl">Introduction</h1>
          <p className="text-muted-foreground mt-2">
            Welcome to the RunAgent documentation.
          </p>
        </div>
        <div className="space-y-4">
          <p>
            RunAgent is a powerful platform for deploying and managing AI agents. This documentation will help you get started with the platform and learn how to use its features.
          </p>
          <p>
            With RunAgent, you can:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Deploy AI agents from various frameworks</li>
            <li>Monitor agent performance in real-time</li>
            <li>Scale resources as needed</li>
            <li>Integrate with popular AI frameworks</li>
            <li>Manage multiple agents efficiently</li>
          </ul>
          <p>
            This documentation is your go-to resource for configuring and using RunAgent effectively. Let's get started and happy coding!
          </p>
        </div>
      </div>
    </DocsLayout>
  );
} 