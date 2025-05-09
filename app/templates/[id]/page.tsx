"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { api, Template } from "@/services/api";
import { useRouter } from "next/navigation";

export default function TemplateDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [template, setTemplate] = useState<Template | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchTemplate();
  }, [params.id]);

  const fetchTemplate = async () => {
    try {
      setIsLoading(true);
      const data = await api.getTemplate(params.id);
      setTemplate(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch template details");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error || !template) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center text-red-500">{error || "Template not found"}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{template.name}</h1>
          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{template.description}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Framework</h2>
            <p className="text-gray-600">{template.framework}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Complexity</h2>
            <p className="text-gray-600">{template.complexity}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Created At</h2>
            <p className="text-gray-600">
              {new Date(template.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 