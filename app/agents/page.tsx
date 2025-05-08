"use client";

import { motion } from "framer-motion";

export default function AgentsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Agents</h1>
      </div>
      <div className="text-center py-8 text-muted-foreground">
        Agent management coming soon...
      </div>
    </motion.div>
  );
} 