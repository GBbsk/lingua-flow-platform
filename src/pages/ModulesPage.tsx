
import React, { useState, useEffect } from 'react';
import { getAllModules } from '@/services/moduleService';
import { PageHeader } from '@/components/shared/PageHeader';
import { ModuleCard } from '@/components/modules/ModuleCard';
import { Module } from '@/types'; // Add this import
import { Button } from '@/components/ui/button';
import { PlusCircle, Book, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const ModulesPage = () => {
  const [modules, setModules] = useState<Module[]>([]);

  useEffect(() => {
    const loadModules = async () => {
      try {
        const modulesList = await getAllModules();
        setModules(modulesList);
      } catch (error) {
        console.error('Error loading modules:', error);
      }
    };
    loadModules();
  }, []);

  // Remove these lines since we're now using the modules state
  // const beginnerModules = moduleData.modules;
  // const advancedModules = moduleData.modules;
  
  // Update the rendering to use the modules state
  const beginnerModules = modules;
  const advancedModules = modules;
  
  return (
    <div className="container py-8 px-4 md:px-6">
      <PageHeader 
        title="Módulos do Curso"
        description="Explore todos os módulos disponíveis e comece sua jornada de aprendizado de inglês."
      >
        <Button asChild className="shadow-md bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
          <Link to="/admin" className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Painel Admin
          </Link>
        </Button>
      </PageHeader>
      
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <Book className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Módulos para Iniciantes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beginnerModules.map(module => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </div>
      
      <div className="mt-12">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Módulos Avançados</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advancedModules.map(module => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </div>
      
      <div className="mt-16 p-8 bg-gradient-to-br from-primary/5 to-secondary/30 rounded-xl shadow-sm border">
        <h2 className="text-2xl font-bold mb-4">Não sabe por onde começar?</h2>
        <p className="text-muted-foreground mb-6">
          Recomendamos começar pelo módulo básico e ir avançando conforme seu progresso.
          Cada módulo possui aulas específicas para desenvolver suas habilidades em inglês.
        </p>
        <Button variant="outline" className="bg-background/80 backdrop-blur-sm shadow-md">
          <Link to="/modules">Comece agora</Link>
        </Button>
      </div>
    </div>
  );
};

export default ModulesPage;
