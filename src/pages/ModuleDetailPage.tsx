
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import moduleData from '@/data/moduleData.json'; // Import the JSON data correctly
import { ArrowLeft, Play, CheckCircle, Clock, BookOpen, BarChart } from 'lucide-react';
import { Module } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const ModuleDetailPage = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [module, setModule] = useState<Module | null>(null);

  useEffect(() => {
    // Use moduleData.modules to find the module
    const foundModule = moduleData.modules.find(m => m.id === moduleId);
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
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="md:col-span-3 space-y-6">
          <div className="space-y-4">
            {module.lessons.map((lesson, index) => (
              <Card
                key={lesson.id}
                className="hover:shadow-md transition-all border-primary/5 hover:border-primary/20"
              >
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className="bg-primary/10 rounded-full p-2 mr-4 text-primary font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{lesson.title}</h3>
                      <p className="text-sm text-muted-foreground">{lesson.description}</p>
                      <div className="flex items-center mt-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>15 minutos</span>
                        {lesson.completed && (
                          <span className="ml-3 flex items-center text-green-600">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Concluído
                          </span>
                        )}
                      </div>
                    </div>
                    <Button asChild className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                      <Link to={`/modules/${module.id}/lessons/${lesson.id}`} className="flex items-center">
                        <Play className="h-4 w-4 mr-2" />
                        Assistir
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="md:col-span-1">
          <Card className="sticky top-4">
            <CardContent className="p-4 space-y-6">
              <div>
                <h3 className="font-medium mb-2 flex items-center">
                  <BarChart className="h-4 w-4 mr-2 text-primary" />
                  Progresso do Módulo
                </h3>
                <Progress value={30} className="h-2 mb-2" />
                <p className="text-sm text-muted-foreground">30% concluído</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    Total de Aulas
                  </span>
                  <span className="font-medium">{module.lessons.length}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Aulas Concluídas
                  </span>
                  <span className="font-medium">1</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Tempo Estimado
                  </span>
                  <span className="font-medium">3h 15min</span>
                </div>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                <Link to={`/modules/${module.id}/lessons/${module.lessons[0]?.id}`} className="flex items-center">
                  <Play className="h-4 w-4 mr-2" />
                  Continuar Módulo
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ModuleDetailPage;
