import axios from 'axios';
import { useAuth } from "@clerk/clerk-react";
import { useAuth as useAuthNextjs } from "@clerk/nextjs";

const API_BASE_URL = 'http://4.213.224.27:8330';

function ensureSessionId(session_id: string | null): asserts session_id is string {
  if (!session_id) {
    throw new Error('Session ID is required. User may not be signed in.');
  }
}

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Add request interceptor to add Authorization header
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('clerk-token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface Project {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  framework: string;
  status: string;
  project_id: string;
  user_id: string;
  template_id: string;
  deployment_id: string;
  endpoint_url: string;
  created_at: string;
  updated_at: string;
  last_run_at: string;
  agent_id: string;
}

export interface Template {
  id: string;
  name: string;
  framework: string;
  complexity: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export const api = {
  getProjects: async (session_id: string | null): Promise<Project[]> => {
    ensureSessionId(session_id);
    try {
      const response = await axiosInstance.get<Project[]>(`/projects?session_id=${session_id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  getProject: async (session_id: string | null, projectId: string): Promise<Project> => {
    ensureSessionId(session_id);
    try {
      const response = await axiosInstance.get<Project>(`/projects/${projectId}?session_id=${session_id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching project:', error);
      throw error;
    }
  },

  createProject: async (session_id: string | null, data: { name: string; description: string }): Promise<Project> => {
    ensureSessionId(session_id);
    try {
      const response = await axiosInstance.post<Project>(`/projects?session_id=${session_id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  getAgents: async (session_id: string | null, projectId?: string): Promise<Agent[]> => {
    ensureSessionId(session_id);
    try {
      const url = projectId 
        ? `/agents?project_id=${projectId}&session_id=${session_id}`
        : `/agents?session_id=${session_id}`;
      const response = await axiosInstance.get<Agent[]>(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching agents:', error);
      throw error;
    }
  },

  getAgent: async (session_id: string | null, agentId: string): Promise<Agent> => {
    ensureSessionId(session_id);
    try {
      const response = await axiosInstance.get<Agent>(`/agents/${agentId}?session_id=${session_id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching agent:', error);
      throw error;
    }
  },

  getTemplates: async (session_id: string | null): Promise<Template[]> => {
    ensureSessionId(session_id);
    try {
      const response = await axiosInstance.get<Template[]>(`/templates?session_id=${session_id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching templates:', error);
      throw error;
    }
  },

  getTemplate: async (session_id: string | null, templateId: string): Promise<Template> => {
    ensureSessionId(session_id);
    try {
      const response = await axiosInstance.get<Template>(`/templates/${templateId}?session_id=${session_id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching template:', error);
      throw error;
    }
  },

  createTemplate: async (session_id: string | null, data: { 
    name: string; 
    framework: string;
    complexity: string;
    description: string 
  }): Promise<Template> => {
    ensureSessionId(session_id);
    try {
      const response = await axiosInstance.post<Template>(`/templates?session_id=${session_id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error creating template:', error);
      throw error;
    }
  },

  updateProject: async (
    session_id: string | null,
    projectId: string,
    data: { name: string; description: string }
  ): Promise<Project> => {
    ensureSessionId(session_id);
    try {
      const response = await axiosInstance.put<Project>(`/projects/${projectId}?session_id=${session_id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  deleteProject: async (session_id: string | null, projectId: string): Promise<void> => {
    ensureSessionId(session_id);
    try {
      await axiosInstance.delete(`/projects/${projectId}?session_id=${session_id}`);
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },

  deleteAgent: async (session_id: string | null, agentId: string): Promise<void> => {
    ensureSessionId(session_id);
    try {
      await axiosInstance.delete(`/agents/${agentId}?session_id=${session_id}`);
    } catch (error) {
      console.error('Error deleting agent:', error);
      throw error;
    }
  },

  getAgentSummary: async (session_id: string | null, projectId: string, agentId: string): Promise<any> => {
    ensureSessionId(session_id);
    try {
      const response = await axiosInstance.get(`/projects/${projectId}/agents/${agentId}/summary?session_id=${session_id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching agent summary:', error);
      throw error;
    }
  },

  syncUser: async (session_id: string | null): Promise<void> => {
    ensureSessionId(session_id);
    try {
      await axiosInstance.post(`/users/sync-user?session_id=${session_id}`);
    } catch (error) {
      console.error('Error syncing user:', error);
      throw error;
    }
  }
}; 