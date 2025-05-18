import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RunAgent - Deploy AI Agents Anywhere",
  description: "Deploy AI agents from any framework with just a single command.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider
          appearance={{
            baseTheme: undefined
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
