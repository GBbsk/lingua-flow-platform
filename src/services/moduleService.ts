
import { Module, Lesson, ResourceFile, AudioResource } from '@/types';
import moduleData from '@/data/moduleData.json';

export const getAllModules = async (): Promise<Module[]> => {
  try {
    // Simply return the modules from the imported JSON file
    return moduleData.modules;
  } catch (error) {
    console.error('Error fetching modules:', error);
    return [];
  }
};

export const saveModule = async (module: Module): Promise<void> => {
  try {
    // Note: In a static JSON approach, changes won't persist after deployment
    // This function would only work during local development
    console.warn('Changes to modules will not persist in production with static JSON files');
    
    // For local development purposes only
    const modules = await getAllModules();
    const moduleIndex = modules.findIndex(m => m.id === module.id);
    
    if (moduleIndex !== -1) {
      modules[moduleIndex] = module;
    } else {
      modules.push(module);
    }
  } catch (error) {
    console.error('Error saving module:', error);
    throw error;
  }
};

export const deleteModule = async (moduleId: string): Promise<void> => {
  try {
    // Note: In a static JSON approach, changes won't persist after deployment
    console.warn('Changes to modules will not persist in production with static JSON files');
    
    // For local development purposes only
    const modules = await getAllModules();
    const updatedModules = modules.filter(m => m.id !== moduleId);
  } catch (error) {
    console.error('Error deleting module:', error);
    throw error;
  }
};

export const saveLesson = async (moduleId: string, lesson: Lesson): Promise<void> => {
  try {
    // Note: In a static JSON approach, changes won't persist after deployment
    console.warn('Changes to modules will not persist in production with static JSON files');
    
    // For local development purposes only
    const modules = await getAllModules();
    const moduleIndex = modules.findIndex(m => m.id === moduleId);
    
    if (moduleIndex === -1) throw new Error('Module not found');
    
    const lessonIndex = modules[moduleIndex].lessons.findIndex(l => l.id === lesson.id);
    
    if (lessonIndex !== -1) {
      modules[moduleIndex].lessons[lessonIndex] = lesson;
    } else {
      modules[moduleIndex].lessons.push(lesson);
    }
  } catch (error) {
    console.error('Error saving lesson:', error);
    throw error;
  }
};

// Add the missing functions that AdminDashboard.tsx is trying to use

export const deleteLesson = async (moduleId: string, lessonId: string): Promise<void> => {
  try {
    // Note: In a static JSON approach, changes won't persist after deployment
    console.warn('Changes to modules will not persist in production with static JSON files');
    
    // For local development purposes only
    const modules = await getAllModules();
    const moduleIndex = modules.findIndex(m => m.id === moduleId);
    
    if (moduleIndex === -1) throw new Error('Module not found');
    
    modules[moduleIndex].lessons = modules[moduleIndex].lessons.filter(l => l.id !== lessonId);
  } catch (error) {
    console.error('Error deleting lesson:', error);
    throw error;
  }
};

export const removeFileFromLesson = async (moduleId: string, lessonId: string, fileId: string): Promise<void> => {
  try {
    // Note: In a static JSON approach, changes won't persist after deployment
    console.warn('Changes to modules will not persist in production with static JSON files');
    
    // For local development purposes only
    const modules = await getAllModules();
    const moduleIndex = modules.findIndex(m => m.id === moduleId);
    
    if (moduleIndex === -1) throw new Error('Module not found');
    
    const lessonIndex = modules[moduleIndex].lessons.findIndex(l => l.id === lessonId);
    
    if (lessonIndex === -1) throw new Error('Lesson not found');
    
    modules[moduleIndex].lessons[lessonIndex].files = 
      modules[moduleIndex].lessons[lessonIndex].files.filter(f => f.id !== fileId);
  } catch (error) {
    console.error('Error removing file from lesson:', error);
    throw error;
  }
};

export const removeAudioFromLesson = async (moduleId: string, lessonId: string, audioId: string): Promise<void> => {
  try {
    // Note: In a static JSON approach, changes won't persist after deployment
    console.warn('Changes to modules will not persist in production with static JSON files');
    
    // For local development purposes only
    const modules = await getAllModules();
    const moduleIndex = modules.findIndex(m => m.id === moduleId);
    
    if (moduleIndex === -1) throw new Error('Module not found');
    
    const lessonIndex = modules[moduleIndex].lessons.findIndex(l => l.id === lessonId);
    
    if (lessonIndex === -1) throw new Error('Lesson not found');
    
    modules[moduleIndex].lessons[lessonIndex].audios = 
      modules[moduleIndex].lessons[lessonIndex].audios.filter(a => a.id !== audioId);
  } catch (error) {
    console.error('Error removing audio from lesson:', error);
    throw error;
  }
};
