import { Module, Lesson } from "@/types";

const API_URL = 'http://localhost:3000/api';

export const getAllModules = async (): Promise<Module[]> => {
  try {
    const response = await fetch(`${API_URL}/modules`);
    const data = await response.json();
    return data.modules;
  } catch (error) {
    console.error("Error loading modules:", error);
    return [];
  }
};

export const saveModule = async (module: Module): Promise<void> => {
  try {
    const currentModules = await getAllModules();
    const updatedModules = currentModules.map(m => m.id === module.id ? module : m);
    if (!updatedModules.find(m => m.id === module.id)) {
      updatedModules.push(module);
    }
    
    await fetch(`${API_URL}/modules`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ modules: updatedModules }),
    });
  } catch (error) {
    console.error("Error saving module:", error);
    throw error;
  }
};

export const deleteModule = async (moduleId: string): Promise<void> => {
  try {
    const currentModules = await getAllModules();
    const updatedModules = currentModules.filter(m => m.id !== moduleId);
    
    await fetch(`${API_URL}/modules`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ modules: updatedModules }),
    });
  } catch (error) {
    console.error("Error deleting module:", error);
    throw error;
  }
};

export const getModuleById = async (moduleId: string): Promise<Module | undefined> => {
  try {
    const response = await fetch(`${API_URL}/modules/${moduleId}`);
    if (!response.ok) return undefined;
    return await response.json();
  } catch (error) {
    console.error("Error loading module:", error);
    return undefined;
  }
};

export const removeFileFromLesson = async (moduleId: string, lessonId: string, fileId: string): Promise<void> => {
  try {
    const modules = await getAllModules();
    const moduleIndex = modules.findIndex(m => m.id === moduleId);
    if (moduleIndex === -1) throw new Error('Module not found');

    const lessonIndex = modules[moduleIndex].lessons.findIndex(l => l.id === lessonId);
    if (lessonIndex === -1) throw new Error('Lesson not found');

    modules[moduleIndex].lessons[lessonIndex].files = 
      modules[moduleIndex].lessons[lessonIndex].files.filter(f => f.id !== fileId);

    await fetch(`${API_URL}/modules`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ modules }),
    });
  } catch (error) {
    console.error('Error removing file:', error);
    throw error;
  }
};

export const removeAudioFromLesson = async (moduleId: string, lessonId: string, audioId: string): Promise<void> => {
  try {
    const modules = await getAllModules();
    const moduleIndex = modules.findIndex(m => m.id === moduleId);
    if (moduleIndex === -1) throw new Error('Module not found');

    const lessonIndex = modules[moduleIndex].lessons.findIndex(l => l.id === lessonId);
    if (lessonIndex === -1) throw new Error('Lesson not found');

    modules[moduleIndex].lessons[lessonIndex].audios = 
      modules[moduleIndex].lessons[lessonIndex].audios.filter(a => a.id !== audioId);

    await fetch(`${API_URL}/modules`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ modules }),
    });
  } catch (error) {
    console.error('Error removing audio:', error);
    throw error;
  }
};

export const saveLesson = async (moduleId: string, lesson: Lesson): Promise<void> => {
  try {
    const modules = await getAllModules();
    const moduleIndex = modules.findIndex(m => m.id === moduleId);
    if (moduleIndex === -1) throw new Error('Module not found');

    const lessonIndex = modules[moduleIndex].lessons.findIndex(l => l.id === lesson.id);
    if (lessonIndex === -1) {
      modules[moduleIndex].lessons.push(lesson);
    } else {
      modules[moduleIndex].lessons[lessonIndex] = lesson;
    }

    await fetch(`${API_URL}/modules`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ modules }),
    });
  } catch (error) {
    console.error('Error saving lesson:', error);
    throw error;
  }
};

export const deleteLesson = async (moduleId: string, lessonId: string): Promise<void> => {
  try {
    const modules = await getAllModules();
    const moduleIndex = modules.findIndex(m => m.id === moduleId);
    if (moduleIndex === -1) throw new Error('Module not found');

    modules[moduleIndex].lessons = modules[moduleIndex].lessons.filter(l => l.id !== lessonId);

    await fetch(`${API_URL}/modules`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ modules }),
    });
  } catch (error) {
    console.error('Error deleting lesson:', error);
    throw error;
  }
};