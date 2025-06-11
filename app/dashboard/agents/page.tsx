'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api, Agent } from '@/services/api';
import { Eye, Trash2 } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function AgentsPage() {
  const { getToken } = useAuth();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isViewing, setIsViewing] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAgentToDelete, setSelectedAgentToDelete] =
    useState<Agent | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      setIsLoading(true);
      const token = await getToken();
      const data = await api.getAgents(token);
      setAgents(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch agents');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewAgent = async (agentId: string) => {
    setIsViewing(true);
    try {
      const token = await getToken();
      const agent = await api.getAgent(token, agentId);
      setSelectedAgent(agent);
      setViewDialogOpen(true);
    } catch (err) {
      setSelectedAgent(null);
    } finally {
      setIsViewing(false);
    }
  };

  const handleDeleteAgent = async () => {
    if (!selectedAgentToDelete) return;
    try {
      setIsDeleting(true);
      const token = await getToken();
      await api.deleteAgent(token, selectedAgentToDelete.id);
      setDeleteDialogOpen(false);
      setSelectedAgentToDelete(null);
      fetchAgents();
    } catch (err) {
      // Optionally handle error
    } finally {
      setIsDeleting(false);
    }
  };

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
      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Project ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {agents.map((agent) => (
                <tr key={agent.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{agent.name}</td>
                  <td className="px-6 py-4">{agent.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        agent.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {agent.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(agent.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {agent.project_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                    <Dialog
                      open={viewDialogOpen && selectedAgent?.id === agent.id}
                      onOpenChange={(open) => {
                        setViewDialogOpen(open);
                        if (!open) setSelectedAgent(null);
                      }}
                    >
                      <DialogTrigger asChild>
                        <button
                          className="p-2 rounded hover:bg-muted"
                          aria-label="View"
                          onClick={() => handleViewAgent(agent.id)}
                          disabled={isViewing}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl w-full">
                        <DialogHeader>
                          <DialogTitle>Agent Details</DialogTitle>
                        </DialogHeader>
                        {selectedAgent ? (
                          <div className="space-y-4">
                            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                              <div>
                                <dt className="text-xs text-muted-foreground">
                                  ID
                                </dt>
                                <dd className="font-medium break-words break-all whitespace-pre-wrap">
                                  {selectedAgent.id}
                                </dd>
                              </div>
                              <div>
                                <dt className="text-xs text-muted-foreground">
                                  Agent ID
                                </dt>
                                <dd className="font-medium break-words break-all whitespace-pre-wrap">
                                  {selectedAgent.agent_id}
                                </dd>
                              </div>
                              <div className="md:col-span-2">
                                <dt className="text-xs text-muted-foreground">
                                  Name
                                </dt>
                                <dd className="font-medium break-words break-all whitespace-pre-wrap">
                                  {selectedAgent.name}
                                </dd>
                              </div>
                              <div>
                                <dt className="text-xs text-muted-foreground">
                                  Status
                                </dt>
                                <dd className="font-medium break-words break-all whitespace-pre-wrap">
                                  {selectedAgent.status}
                                </dd>
                              </div>
                              <div className="md:col-span-2">
                                <dt className="text-xs text-muted-foreground">
                                  Description
                                </dt>
                                <dd className="font-medium break-words break-all whitespace-pre-wrap">
                                  {selectedAgent.description}
                                </dd>
                              </div>
                              <div>
                                <dt className="text-xs text-muted-foreground">
                                  Framework
                                </dt>
                                <dd className="font-medium break-words break-all whitespace-pre-wrap">
                                  {selectedAgent.framework}
                                </dd>
                              </div>
                              <div>
                                <dt className="text-xs text-muted-foreground">
                                  Project ID
                                </dt>
                                <dd className="font-medium break-words break-all whitespace-pre-wrap">
                                  {selectedAgent.project_id}
                                </dd>
                              </div>
                              <div>
                                <dt className="text-xs text-muted-foreground">
                                  User ID
                                </dt>
                                <dd className="font-medium break-words break-all whitespace-pre-wrap">
                                  {selectedAgent.user_id}
                                </dd>
                              </div>
                              <div>
                                <dt className="text-xs text-muted-foreground">
                                  Template ID
                                </dt>
                                <dd className="font-medium break-words break-all whitespace-pre-wrap">
                                  {selectedAgent.template_id}
                                </dd>
                              </div>
                              <div>
                                <dt className="text-xs text-muted-foreground">
                                  Deployment ID
                                </dt>
                                <dd className="font-medium break-words break-all whitespace-pre-wrap">
                                  {selectedAgent.deployment_id}
                                </dd>
                              </div>
                              <div className="md:col-span-2">
                                <dt className="text-xs text-muted-foreground">
                                  Endpoint URL
                                </dt>
                                <dd className="font-medium break-words break-all whitespace-pre-wrap">
                                  {selectedAgent.endpoint_url}
                                </dd>
                              </div>
                              <div>
                                <dt className="text-xs text-muted-foreground">
                                  Created At
                                </dt>
                                <dd className="font-medium">
                                  {new Date(
                                    selectedAgent.created_at
                                  ).toLocaleString()}
                                </dd>
                              </div>
                              <div>
                                <dt className="text-xs text-muted-foreground">
                                  Updated At
                                </dt>
                                <dd className="font-medium">
                                  {new Date(
                                    selectedAgent.updated_at
                                  ).toLocaleString()}
                                </dd>
                              </div>
                              <div className="md:col-span-2">
                                <dt className="text-xs text-muted-foreground">
                                  Last Run At
                                </dt>
                                <dd className="font-medium">
                                  {selectedAgent.last_run_at
                                    ? new Date(
                                        selectedAgent.last_run_at
                                      ).toLocaleString()
                                    : '-'}
                                </dd>
                              </div>
                            </dl>
                          </div>
                        ) : (
                          <div>Loading...</div>
                        )}
                      </DialogContent>
                    </Dialog>
                    <Dialog
                      open={
                        deleteDialogOpen &&
                        selectedAgentToDelete?.id === agent.id
                      }
                      onOpenChange={(open) => {
                        setDeleteDialogOpen(open);
                        if (!open) setSelectedAgentToDelete(null);
                      }}
                    >
                      <DialogTrigger asChild>
                        <button
                          className="p-2 rounded hover:bg-muted text-red-600"
                          aria-label="Delete"
                          onClick={() => {
                            setSelectedAgentToDelete(agent);
                            setDeleteDialogOpen(true);
                          }}
                          disabled={isDeleting}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete Agent</DialogTitle>
                        </DialogHeader>
                        <div>Are you sure you want to delete this agent?</div>
                        <div className="flex justify-end gap-2 mt-4">
                          <Button
                            variant="ghost"
                            onClick={() => setDeleteDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={handleDeleteAgent}
                            disabled={isDeleting}
                          >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}
