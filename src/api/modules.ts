import { Module, Lesson } from '@/types';

const API_BASE_URL = '/api/modules';

export const getAllModules = async (): Promise<Module[]> => {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error('Failed to fetch modules');
    return response.json();
  } catch (error) {
    console.error('Error fetching modules:', error);
    return [];
  }
};

export const saveModule = async (module: Module): Promise<void> => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(module)
    });
    if (!response.ok) throw new Error('Failed to save module');
  } catch (error) {
    console.error('Error saving module:', error);
    throw error;
  }
};

export const deleteModule = async (moduleId: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${moduleId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete module');
  } catch (error) {
    console.error('Error deleting module:', error);
    throw error;
  }
};

export const saveLesson = async (moduleId: string, lesson: Lesson): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${moduleId}/lessons`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lesson)
    });
    if (!response.ok) throw new Error('Failed to save lesson');
  } catch (error) {
    console.error('Error saving lesson:', error);
    throw error;
  }
};

export const deleteLesson = async (moduleId: string, lessonId: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${moduleId}/lessons/${lessonId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete lesson');
  } catch (error) {
    console.error('Error deleting lesson:', error);
    throw error;
  }
};