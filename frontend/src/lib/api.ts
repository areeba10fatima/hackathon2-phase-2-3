import axios, { AxiosInstance } from 'axios';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add JWT token to requests if available
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Handle token expiration and refresh if needed
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Clear token and redirect to login
          localStorage.removeItem('access_token');
          // Only redirect if not already on a public page
          if (typeof window !== 'undefined') {
            const currentPath = window.location.pathname;
            if (!['/', '/login', '/signup'].includes(currentPath)) {
              window.location.href = '/login';
            }
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async register(userData: { email: string; password: string; first_name?: string; last_name?: string }) {
    const response = await this.client.post('/auth/register', userData);
    return response.data;
  }

  async login(credentials: { email: string; password: string }) {
    const response = await this.client.post('/auth/login', credentials);
    return response.data;
  }

  async logout() {
    const response = await this.client.post('/auth/logout');
    localStorage.removeItem('access_token');
    return response.data;
  }

  // Task endpoints
  async getTasks(completed?: boolean, limit?: number, offset?: number) {
    const params = new URLSearchParams();
    if (completed !== undefined) params.append('completed', completed.toString());
    if (limit) params.append('limit', limit.toString());
    if (offset) params.append('offset', offset.toString());

    const response = await this.client.get(`/tasks?${params}`);
    return response.data;
  }

  async createTask(taskData: { title: string; description?: string; type?: string }) {
    const response = await this.client.post('/tasks', taskData);
    return response.data;
  }

  async getTask(taskId: string) {
    const response = await this.client.get(`/tasks/${taskId}`);
    return response.data;
  }

  async updateTask(taskId: string, taskData: { title?: string; description?: string; completed?: boolean; type?: string }) {
    const response = await this.client.put(`/tasks/${taskId}`, taskData);
    return response.data;
  }

  async toggleTaskCompletion(taskId: string) {
    const response = await this.client.patch(`/tasks/${taskId}/toggle-complete`);
    return response.data;
  }

  async deleteTask(taskId: string) {
    const response = await this.client.delete(`/tasks/${taskId}`);
    return response.data;
  }
}

export const apiClient = new ApiClient();