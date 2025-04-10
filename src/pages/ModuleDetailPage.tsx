
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import moduleData from '@/data/moduleData.json';
import { ArrowLeft, Play, CheckCircle, Clock, BookOpen, BarChart, FileBadge, CalendarDays, GraduationCap } from 'lucide-react';
import { Module } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const ModuleDetailPage = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [module, setModule] = useState<Module | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    try {
      // Use moduleData.modules to find the module
      const foundModule = moduleData.modules.find(m => m.id === moduleId);
      
      // Add sample completion data for demo purposes
      if (foundModule) {
        const moduleCopy = {...foundModule};
        moduleCopy.lessons = moduleCopy.lessons.map((lesson, idx) => ({
          ...lesson,
          completed: idx < 2 // First two lessons are completed
        }));
        setModule(moduleCopy);
      } else {
        setModule(null);
        toast.error('Módulo não encontrado.');
      }
    } catch (error) {
      console.error('Error loading module details:', error);
      toast.error('Erro ao carregar detalhes do módulo.');
    } finally {
      setIsLoading(false);
    }
  }, [moduleId]);

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted w-32 rounded mb-6"></div>
          <div className="h-12 bg-muted w-3/4 rounded mb-4"></div>
          <div className="h-6 bg-muted w-1/2 rounded mb-8"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-3 space-y-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-24 bg-muted rounded"></div>
              ))}
            </div>
            <div className="md:col-span-1">
              <div className="h-80 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
  
  // Calculate progress
  const totalLessons = module.lessons.length;
  const completedLessons = module.lessons.filter(lesson => lesson.completed).length;
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100);
  
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
        >
          <Badge variant="outline" className="text-xs py-1 px-3 bg-primary/5 border-primary/20 text-primary">
            {module.level || "Intermediário"}
          </Badge>
        </PageHeader>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="md:col-span-3 space-y-6">
          <div className="space-y-4">
            {module.lessons.map((lesson, index) => (
              <Card
                key={lesson.id}
                className={`hover:shadow-md transition-all ${
                  lesson.completed 
                    ? "border-green-200 bg-green-50/30" 
                    : "border-primary/5 hover:border-primary/20"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className={`rounded-full p-2 mr-4 font-medium flex items-center justify-center w-8 h-8 ${
                      lesson.completed 
                        ? "bg-green-100 text-green-700" 
                        : "bg-primary/10 text-primary"
                    }`}>
                      {lesson.completed ? <CheckCircle className="h-4 w-4" /> : index + 1}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{lesson.title}</h3>
                      <p className="text-sm text-muted-foreground">{lesson.description}</p>
                      <div className="flex flex-wrap items-center mt-2 gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          15 minutos
                        </span>
                        <span className="flex items-center">
                          <FileBadge className="h-3 w-3 mr-1" />
                          {lesson.files.length} arquivos
                        </span>
                        <span className="flex items-center">
                          <BookOpen className="h-3 w-3 mr-1" />
                          {lesson.audios.length} áudios
                        </span>
                        {lesson.completed && (
                          <span className="flex items-center text-green-600">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Concluído
                          </span>
                        )}
                      </div>
                    </div>
                    <Button 
                      asChild
                      className={lesson.completed 
                        ? "bg-green-600 hover:bg-green-700" 
                        : "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"}
                    >
                      <Link to={`/modules/${module.id}/lessons/${lesson.id}`} className="flex items-center">
                        <Play className="h-4 w-4 mr-2" />
                        {lesson.completed ? "Revisar" : "Assistir"}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="md:col-span-1">
          <Card className="sticky top-4 border-primary/10 shadow-sm">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="font-medium mb-2 flex items-center">
                  <BarChart className="h-4 w-4 mr-2 text-primary" />
                  Progresso do Módulo
                </h3>
                <Progress value={progressPercentage} className="h-2 mb-2" />
                <p className="text-sm text-muted-foreground">{progressPercentage}% concluído</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm items-center">
                  <span className="text-muted-foreground flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Total de Aulas
                  </span>
                  <Badge variant="outline">{totalLessons}</Badge>
                </div>
                
                <div className="flex justify-between text-sm items-center">
                  <span className="text-muted-foreground flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Aulas Concluídas
                  </span>
                  <Badge variant="outline" className={completedLessons > 0 ? "bg-green-100 text-green-800 border-green-200" : ""}>
                    {completedLessons}
                  </Badge>
                </div>
                
                <div className="flex justify-between text-sm items-center">
                  <span className="text-muted-foreground flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Tempo Estimado
                  </span>
                  <Badge variant="outline">3h 15min</Badge>
                </div>

                <div className="flex justify-between text-sm items-center">
                  <span className="text-muted-foreground flex items-center">
                    <CalendarDays className="h-4 w-4 mr-2" />
                    Última atualização
                  </span>
                  <Badge variant="outline">10/04/2025</Badge>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                  <Link to={`/modules/${module.id}/lessons/${module.lessons[0]?.id}`} className="flex items-center">
                    <Play className="h-4 w-4 mr-2" />
                    {completedLessons > 0 ? "Continuar Módulo" : "Começar Módulo"}
                  </Link>
                </Button>
              </div>

              <div className="p-4 rounded-lg bg-primary/5 text-center">
                <div className="rounded-full bg-primary/10 h-12 w-12 flex items-center justify-center mx-auto mb-3">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-medium">Obtenha certificado</p>
                <p className="text-xs text-muted-foreground">Complete este módulo para receber seu certificado</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mt-16 p-8 bg-gradient-to-br from-primary/5 to-secondary/30 rounded-xl shadow-sm border">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold mb-4">Precisa de ajuda com este módulo?</h2>
            <p className="text-muted-foreground mb-6">
              Nossos tutores estão disponíveis para tirar suas dúvidas e ajudá-lo a progredir em seu aprendizado.
              Agende uma sessão de tutoria para maximizar seus resultados.
            </p>
            <Button variant="outline" className="bg-background/80 backdrop-blur-sm shadow-md">
              Agendar Tutoria
            </Button>
          </div>
          <div className="md:w-1/3 bg-card rounded-xl p-6 shadow-sm border">
            <h3 className="font-medium mb-3">Recursos Adicionais</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <FileBadge className="h-4 w-4 text-primary" />
                <a href="#" className="hover:underline">Material Complementar</a>
              </li>
              <li className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <a href="#" className="hover:underline">Glossário de Termos</a>
              </li>
              <li className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-primary" />
                <a href="#" className="hover:underline">Exercícios de Prática</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleDetailPage;
