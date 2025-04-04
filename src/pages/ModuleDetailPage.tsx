
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { sampleModules } from '@/data/sampleData';
import { ArrowLeft, Play } from 'lucide-react';
import { Module } from '@/types';

const ModuleDetailPage = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [module, setModule] = useState<Module | null>(null);
  
  useEffect(() => {
    // In a real application, you would fetch this data from your API
    const foundModule = sampleModules.find(m => m.id === moduleId);
    setModule(foundModule || null);
  }, [moduleId]);
  
  if (!module) {
    return (
      <div className="container py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Módulo não encontrado</h2>
          <p className="text-muted-foreground mb-4">O módulo que você está procurando não existe ou foi removido.</p>
          <Button asChild>
            <Link to="/modules">Voltar para Módulos</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-8">
      <div className="mb-6">
        <Button variant="outline" asChild className="mb-4">
          <Link to="/modules" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Módulos
          </Link>
        </Button>
        
        <PageHeader 
          title={module.title}
          description={module.description}
        />
      </div>
      
      <div className="space-y-4">
        {module.lessons.map((lesson, index) => (
          <div 
            key={lesson.id}
            className="border rounded-lg p-4 hover:border-primary/30 transition-all bg-card"
          >
            <div className="flex items-center">
              <div className="bg-primary/10 rounded-full p-2 mr-4 text-primary">
                {index + 1}
              </div>
              <div className="flex-grow">
                <h3 className="font-medium">{lesson.title}</h3>
                <p className="text-sm text-muted-foreground">{lesson.description}</p>
              </div>
              <Button asChild>
                <Link to={`/modules/${module.id}/lessons/${lesson.id}`} className="flex items-center">
                  <Play className="h-4 w-4 mr-2" />
                  Assistir
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModuleDetailPage;
