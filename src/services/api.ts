import axios from 'axios';
import { Admin, Module, Lesson, Exercise, ApiResponse } from '../types/admin';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Serviços de Autenticação
export const authService = {
  login: async (email: string, password: string): Promise<ApiResponse<{ token: string; admin: Admin }>> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('admin_token');
  },
};

// Serviços de Módulos
export const moduleService = {
  getAll: async (): Promise<ApiResponse<Module[]>> => {
    const response = await api.get('/modules');
    return response.data;
  },
  create: async (module: Omit<Module, 'id'>): Promise<ApiResponse<Module>> => {
    const response = await api.post('/modules', module);
    return response.data;
  },
  update: async (id: string, module: Partial<Module>): Promise<ApiResponse<Module>> => {
    const response = await api.put(`/modules/${id}`, module);
    return response.data;
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/modules/${id}`);
    return response.data;
  },
};

// Serviços de Aulas
export const lessonService = {
  getByModule: async (moduleId: string): Promise<ApiResponse<Lesson[]>> => {
    const response = await api.get(`/modules/${moduleId}/lessons`);
    return response.data;
  },
  create: async (moduleId: string, lesson: Omit<Lesson, 'id'>): Promise<ApiResponse<Lesson>> => {
    const response = await api.post(`/modules/${moduleId}/lessons`, lesson);
    return response.data;
  },
  update: async (id: string, lesson: Partial<Lesson>): Promise<ApiResponse<Lesson>> => {
    const response = await api.put(`/lessons/${id}`, lesson);
    return response.data;
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/lessons/${id}`);
    return response.data;
  },
};

// Serviços de Exercícios
export const exerciseService = {
  getByLesson: async (lessonId: string): Promise<ApiResponse<Exercise[]>> => {
    const response = await api.get(`/lessons/${lessonId}/exercises`);
    return response.data;
  },
  create: async (lessonId: string, exercise: Omit<Exercise, 'id'>): Promise<ApiResponse<Exercise>> => {
    const response = await api.post(`/lessons/${lessonId}/exercises`, exercise);
    return response.data;
  },
  update: async (id: string, exercise: Partial<Exercise>): Promise<ApiResponse<Exercise>> => {
    const response = await api.put(`/exercises/${id}`, exercise);
    return response.data;
  },
  delete: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/exercises/${id}`);
    return response.data;
  },
};