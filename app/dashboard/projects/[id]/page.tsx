'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { api, Project, Agent } from '@/services/api';
import { useAuth } from '@clerk/nextjs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye } from 'lucide-react';

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const { getToken } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [summaryDialogOpen, setSummaryDialogOpen] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [agentSummary, setAgentSummary] = useState<any>(null);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  useEffect(() => {
    fetchProjectAndAgents();
  }, [params.id]);

  const fetchProjectAndAgents = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const token = await getToken();
      const [projectData, agentsData] = await Promise.all([
        api.getProject(token, params.id),
        api.getAgents(token, params.id),
      ]);
      setProject(projectData);
      setAgents(agentsData);
    } catch (error) {
      console.error('Error fetching project details:', error);
      setError('Failed to load project details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProject = async (data: {
    name: string;
    description: string;
  }) => {
    if (!project) return;
    try {
      setIsEditing(true);
      const token = await getToken();
      await api.updateProject(token, project.id, data);
      await fetchProjectAndAgents();
      setEditDialogOpen(false);
    } catch (err) {
      console.error('Failed to edit project:', err);
    } finally {
      setIsEditing(false);
    }
  };

  const handleDeleteProject = async () => {
    if (!project) return;
    try {
      setIsDeleting(true);
      const token = await getToken();
      await api.deleteProject(token, project.id);
      setDeleteDialogOpen(false);
      router.push('/projects');
    } catch (err) {
      console.error('Failed to delete project:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleViewSummary = async (agent: Agent) => {
    setSummaryLoading(true);
    setSelectedAgentId(agent.id);
    try {
      const token = await getToken();
      const summary = await api.getAgentSummary(
        token,
        agent.project_id,
        agent.id
      );
      setAgentSummary(summary);
      setSummaryDialogOpen(true);
    } catch (err) {
      setAgentSummary(null);
      setSummaryDialogOpen(true);
    } finally {
      setSummaryLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Project Details</h1>
          <Button variant="outline" onClick={() => router.back()}>
            ← Back to Projects
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-4">Loading...</div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">{error}</div>
        ) : project ? (
          <div className="space-y-6">
            {/* Project Information */}
            <div className="bg-card rounded-lg shadow p-6 relative">
              <div className="absolute top-4 right-4 flex gap-2">
                <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setEditDialogOpen(true)}
                    >
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Project</DialogTitle>
                    </DialogHeader>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        handleEditProject({
                          name: formData.get('name') as string,
                          description: formData.get('description') as string,
                        });
                      }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="edit-name">Project Name</Label>
                        <Input
                          id="edit-name"
                          name="name"
                          required
                          defaultValue={project?.name}
                          disabled={isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-description">Description</Label>
                        <Input
                          id="edit-description"
                          name="description"
                          required
                          defaultValue={project?.description}
                          disabled={isEditing}
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isEditing}
                      >
                        {isEditing ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Dialog
                  open={deleteDialogOpen}
                  onOpenChange={setDeleteDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setDeleteDialogOpen(true)}
                    >
                      Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Project</DialogTitle>
                    </DialogHeader>
                    <div>Are you sure you want to delete this project?</div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button
                        variant="ghost"
                        onClick={() => setDeleteDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleDeleteProject}
                        disabled={isDeleting}
                      >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <h2 className="text-2xl font-semibold mb-4">
                Project Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{project.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="font-medium">{project.description}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created At</p>
                  <p className="font-medium">
                    {new Date(project.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="font-medium">
                    {new Date(project.updated_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Agents List */}
            <div className="bg-card rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-4">Project Agents</h2>
              {agents.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  No agents found in this project
                </div>
              ) : (
                <div className="overflow-hidden">
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
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {agents.map((agent) => (
                        <motion.tr
                          key={agent.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          whileHover={{ backgroundColor: 'hsl(var(--muted))' }}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            {agent.name}
                          </td>
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
                            <Dialog
                              open={
                                summaryDialogOpen &&
                                selectedAgentId === agent.id
                              }
                              onOpenChange={(open) => {
                                setSummaryDialogOpen(open);
                                if (!open) setAgentSummary(null);
                              }}
                            >
                              <DialogTrigger asChild>
                                <button
                                  className="p-2 rounded hover:bg-muted"
                                  aria-label="View Summary"
                                  onClick={() => handleViewSummary(agent)}
                                  disabled={summaryLoading}
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                              </DialogTrigger>
                              <DialogContent className="max-w-3xl w-full">
                                <DialogHeader>
                                  <DialogTitle>Agent Summary</DialogTitle>
                                </DialogHeader>
                                {summaryLoading ? (
                                  <div>Loading...</div>
                                ) : agentSummary ? (
                                  <pre className="overflow-x-auto whitespace-pre-wrap text-sm bg-muted p-4 rounded max-h-[60vh]">
                                    {JSON.stringify(agentSummary, null, 2)}
                                  </pre>
                                ) : (
                                  <div>Failed to load summary.</div>
                                )}
                              </DialogContent>
                            </Dialog>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </motion.div>
    </div>
  );
}
