import { useState, useCallback } from 'react';
import { Admin, Module, Lesson, Exercise } from '../types/admin';
import { authService, moduleService, lessonService, exerciseService } from '../services/api';

export function useAdmin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);

  // Autenticação
  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authService.login(email, password);
      localStorage.setItem('admin_token', response.data.token);
      return response.data.admin;
    } catch (err) {
      setError('Falha na autenticação. Verifique suas credenciais.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
  }, []);

  // Gerenciamento de Módulos
  const loadModules = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await moduleService.getAll();
      setModules(response.data);
    } catch (err) {
      setError('Erro ao carregar módulos.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createModule = useCallback(async (moduleData: Omit<Module, 'id'>) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await moduleService.create(moduleData);
      setModules(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError('Erro ao criar módulo.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateModule = useCallback(async (id: string, moduleData: Partial<Module>) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await moduleService.update(id, moduleData);
      setModules(prev => prev.map(mod => mod.id === id ? response.data : mod));
      return response.data;
    } catch (err) {
      setError('Erro ao atualizar módulo.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteModule = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await moduleService.delete(id);
      setModules(prev => prev.filter(mod => mod.id !== id));
    } catch (err) {
      setError('Erro ao deletar módulo.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Gerenciamento de Aulas
  const createLesson = useCallback(async (moduleId: string, lessonData: Omit<Lesson, 'id'>) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await lessonService.create(moduleId, lessonData);
      setModules(prev => prev.map(mod => {
        if (mod.id === moduleId) {
          return { ...mod, lessons: [...mod.lessons, response.data] };
        }
        return mod;
      }));
      return response.data;
    } catch (err) {
      setError('Erro ao criar aula.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateLesson = useCallback(async (id: string, lessonData: Partial<Lesson>) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await lessonService.update(id, lessonData);
      setModules(prev => prev.map(mod => ({
        ...mod,
        lessons: mod.lessons.map(lesson =>
          lesson.id === id ? response.data : lesson
        )
      })));
      return response.data;
    } catch (err) {
      setError('Erro ao atualizar aula.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteLesson = useCallback(async (id: string, moduleId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await lessonService.delete(id);
      setModules(prev => prev.map(mod => {
        if (mod.id === moduleId) {
          return { ...mod, lessons: mod.lessons.filter(lesson => lesson.id !== id) };
        }
        return mod;
      }));
    } catch (err) {
      setError('Erro ao deletar aula.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    modules,
    currentModule,
    currentLesson,
    setCurrentModule,
    setCurrentLesson,
    login,
    logout,
    loadModules,
    createModule,
    updateModule,
    deleteModule,
    createLesson,
    updateLesson,
    deleteLesson,
  };
}