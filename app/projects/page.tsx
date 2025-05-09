"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api, Project } from "@/services/api";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Eye } from "lucide-react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const data = await api.getProjects();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch projects");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProject = async (data: { name: string; description: string }) => {
    try {
      setIsCreating(true);
      await api.createProject(data);
      await fetchProjects();
      setIsDialogOpen(false);
    } catch (err) {
      console.error("Failed to create project:", err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleEditProject = async (data: { name: string; description: string }) => {
    if (!selectedProject) return;
    try {
      setIsEditing(true);
      await api.updateProject(selectedProject.id, data);
      await fetchProjects();
      setEditDialogOpen(false);
    } catch (err) {
      console.error("Failed to edit project:", err);
    } finally {
      setIsEditing(false);
    }
  };

  const handleDeleteProject = async () => {
    if (!selectedProject) return;
    try {
      setIsDeleting(true);
      await api.deleteProject(selectedProject.id);
      await fetchProjects();
      setDeleteDialogOpen(false);
    } catch (err) {
      console.error("Failed to delete project:", err);
    } finally {
      setIsDeleting(false);
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
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Projects</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Create Project</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleCreateProject({
                    name: formData.get("name") as string,
                    description: formData.get("description") as string,
                  });
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name</Label>
                  <Input id="name" name="name" required disabled={isCreating} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" name="description" required disabled={isCreating} />
                </div>
                <Button type="submit" className="w-full" disabled={isCreating}>
                  {isCreating ? "Creating..." : "Create Project"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="text-center py-4">Loading...</div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">{error}</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>
                    {new Date(project.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => router.push(`/projects/${project.id}`)}
                      aria-label="View"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Dialog open={editDialogOpen && selectedProject?.id === project.id} onOpenChange={(open) => { setEditDialogOpen(open); if (!open) setSelectedProject(null); }}>
                      <DialogTrigger asChild>
                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={() => { setSelectedProject(project); setEditDialogOpen(true); }}
                          aria-label="Edit"
                        >
                          <Pencil className="w-4 h-4" />
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
                              name: formData.get("name") as string,
                              description: formData.get("description") as string,
                            });
                          }}
                          className="space-y-4"
                        >
                          <div className="space-y-2">
                            <Label htmlFor="edit-name">Project Name</Label>
                            <Input id="edit-name" name="name" required defaultValue={project.name} disabled={isEditing} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-description">Description</Label>
                            <Input id="edit-description" name="description" required defaultValue={project.description} disabled={isEditing} />
                          </div>
                          <Button type="submit" className="w-full" disabled={isEditing}>
                            {isEditing ? "Saving..." : "Save Changes"}
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <Dialog open={deleteDialogOpen && selectedProject?.id === project.id} onOpenChange={(open) => { setDeleteDialogOpen(open); if (!open) setSelectedProject(null); }}>
                      <DialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => { setSelectedProject(project); setDeleteDialogOpen(true); }}
                          aria-label="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete Project</DialogTitle>
                        </DialogHeader>
                        <div>Are you sure you want to delete this project?</div>
                        <div className="flex justify-end gap-2 mt-4">
                          <Button variant="ghost" onClick={() => setDeleteDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button variant="destructive" onClick={handleDeleteProject} disabled={isDeleting}>
                            {isDeleting ? "Deleting..." : "Delete"}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </motion.div>
    </div>
  );
} 