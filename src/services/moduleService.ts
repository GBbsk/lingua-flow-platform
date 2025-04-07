import { Module, Lesson, ResourceFile, AudioResource } from '@/types';

// Use relative path for API endpoint
const API_URL = '/api/modules';

export const getAllModules = async (): Promise<Module[]> => {
  try {
    // In development
    if (process.env.NODE_ENV === 'development') {
      const modules = await import('@/data/moduleData.json');
      return modules.modules;
    }
    
    // In production - fetch from public directory
    const response = await fetch('/data/moduleData.json');
    const data = await response.json();
    return data.modules || [];
  } catch (error) {
    console.error('Error fetching modules:', error);
    return [];
  }
};

export const saveModule = async (module: Module): Promise<void> => {
  try {
    const modules = await getAllModules();
    const moduleIndex = modules.findIndex(m => m.id === module.id);
    
    if (moduleIndex !== -1) {
      modules[moduleIndex] = module;
    } else {
      modules.push(module);
    }

    // In development, we can't directly modify the imported JSON
    // In production, use the API route
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ modules }),
    });
  } catch (error) {
    console.error('Error saving module:', error);
    throw error;
  }
};

// Implement other methods similarly
export const deleteModule = async (moduleId: string): Promise<void> => {
  try {
    const modules = await getAllModules();
    const updatedModules = modules.filter(m => m.id !== moduleId);
    
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ modules: updatedModules }),
    });
  } catch (error) {
    console.error('Error deleting module:', error);
    throw error;
  }
};

export const saveLesson = async (moduleId: string, lesson: Lesson): Promise<void> => {
  try {
    const modules = await getAllModules();
    const moduleIndex = modules.findIndex(m => m.id === moduleId);
    
    if (moduleIndex === -1) throw new Error('Module not found');
    
    const lessonIndex = modules[moduleIndex].lessons.findIndex(l => l.id === lesson.id);
    
    if (lessonIndex !== -1) {
      modules[moduleIndex].lessons[lessonIndex] = lesson;
    } else {
      modules[moduleIndex].lessons.push(lesson);
    }
    
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ modules }),
    });
  } catch (error) {
    console.error('Error saving lesson:', error);
    throw error;
  }
};