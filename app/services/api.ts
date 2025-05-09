import axios from 'axios';

const API_BASE_URL = 'http://20.205.162.5:8320';

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
  getProjects: async (): Promise<Project[]> => {
    try {
      const response = await axios.get<Project[]>(`${API_BASE_URL}/projects`);
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  getProject: async (projectId: string): Promise<Project> => {
    try {
      const response = await axios.get<Project>(`${API_BASE_URL}/projects/${projectId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching project:', error);
      throw error;
    }
  },

  createProject: async (data: { name: string; description: string }): Promise<Project> => {
    try {
      const response = await axios.post<Project>(`${API_BASE_URL}/projects`, data);
      return response.data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  getAgents: async (projectId?: string): Promise<Agent[]> => {
    try {
      const url = projectId 
        ? `${API_BASE_URL}/agents?project_id=${projectId}`
        : `${API_BASE_URL}/agents`;
      const response = await axios.get<Agent[]>(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching agents:', error);
      throw error;
    }
  },

  getAgent: async (agentId: string): Promise<Agent> => {
    try {
      const response = await axios.get<Agent>(`${API_BASE_URL}/agents/${agentId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching agent:', error);
      throw error;
    }
  },

  getTemplates: async (): Promise<Template[]> => {
    try {
      const response = await axios.get<Template[]>(`${API_BASE_URL}/templates`);
      return response.data;
    } catch (error) {
      console.error('Error fetching templates:', error);
      throw error;
    }
  },

  getTemplate: async (templateId: string): Promise<Template> => {
    try {
      const response = await axios.get<Template>(`${API_BASE_URL}/templates/${templateId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching template:', error);
      throw error;
    }
  },

  createTemplate: async (data: { 
    name: string; 
    framework: string;
    complexity: string;
    description: string 
  }): Promise<Template> => {
    try {
      const response = await axios.post<Template>(`${API_BASE_URL}/templates`, data);
      return response.data;
    } catch (error) {
      console.error('Error creating template:', error);
      throw error;
    }
  },

  updateProject: async (
    projectId: string,
    data: { name: string; description: string }
  ): Promise<Project> => {
    try {
      const response = await axios.put<Project>(`${API_BASE_URL}/projects/${projectId}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  deleteProject: async (projectId: string): Promise<void> => {
    try {
      await axios.delete(`${API_BASE_URL}/projects/${projectId}`);
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },

  deleteAgent: async (agentId: string): Promise<void> => {
    try {
      await axios.delete(`${API_BASE_URL}/agents/${agentId}`);
    } catch (error) {
      console.error('Error deleting agent:', error);
      throw error;
    }
  },

  getAgentSummary: async (projectId: string, agentId: string): Promise<any> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/projects/${projectId}/agents/${agentId}/summary`);
      return response.data;
    } catch (error) {
      console.error('Error fetching agent summary:', error);
      throw error;
    }
  }
}; 