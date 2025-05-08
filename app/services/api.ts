import axios from 'axios';

const API_BASE_URL = 'http://20.205.162.5:8320';

export interface Project {
  id: string;
  name: string;
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

  createProject: async (data: { name: string; description: string }): Promise<Project> => {
    try {
      const response = await axios.post<Project>(`${API_BASE_URL}/projects`, data);
      return response.data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }
}; 