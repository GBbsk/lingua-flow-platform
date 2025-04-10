
import { Module, Lesson, ResourceFile, AudioResource } from '@/types';
import { getAllModules as fetchModules, saveModule as saveModuleAPI, deleteModule as deleteModuleAPI, saveLesson as saveLessonAPI, deleteLesson as deleteLessonAPI } from '@/api/modules';

export const getAllModules = async (): Promise<Module[]> => {
  try {
    const modules = await fetchModules();
    return modules;
  } catch (error) {
    console.error('Error fetching modules:', error);
    throw error;
  }
};

export const saveModule = async (module: Module): Promise<void> => {
  try {
    await saveModuleAPI(module);
  } catch (error) {
    console.error('Error saving module:', error);
    throw error;
  }
};

export const deleteModule = async (moduleId: string): Promise<void> => {
  try {
    await deleteModuleAPI(moduleId);
  } catch (error) {
    console.error('Error deleting module:', error);
    throw error;
  }
};

export const saveLesson = async (moduleId: string, lesson: Lesson): Promise<void> => {
  try {
    await saveLessonAPI(moduleId, lesson);
  } catch (error) {
    console.error('Error saving lesson:', error);
    throw error;
  }
};

export const deleteLesson = async (moduleId: string, lessonId: string): Promise<void> => {
  try {
    await deleteLessonAPI(moduleId, lessonId);
  } catch (error) {
    console.error('Error deleting lesson:', error);
    throw error;
  }
};




