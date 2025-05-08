"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/app/components/ui/button"
import { useRouter } from "next/navigation"
import axios from "axios"

interface Agent {
  id: string
  name: string
  description: string
  status: string
  created_at: string
}

export default function ProjectDetail({
  params,
}: {
  params: { id: string }
}) {
  const [agents, setAgents] = useState<Agent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchAgents()
  }, [params.id])

  const fetchAgents = async () => {
    try {
      const response = await axios.get(
        `http://20.205.162.5:8320/projects/${params.id}/agents`
      )
      setAgents(response.data)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching agents:", error)
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="mb-4"
            >
              ← Back to Projects
            </Button>
            <h1 className="text-3xl font-bold">Project Agents</h1>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {agents.map((agent) => (
                  <motion.tr
                    key={agent.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ backgroundColor: "#f9fafb" }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {agent.name}
                    </td>
                    <td className="px-6 py-4">{agent.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          agent.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {agent.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(agent.created_at).toLocaleDateString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
    </main>
  )
} 