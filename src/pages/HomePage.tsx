
import React, { useEffect, useState, useContext } from 'react';
import { getAllModules } from '@/services/moduleService';
import { Module } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, ChevronRight, Clock, GraduationCap, Play, Star, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UserContext } from '@/components/layout/MainLayout';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const HomePage = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        setIsLoading(true);
        const allModules = await getAllModules();
        
        // Add sample progress data for UI purposes
        const modulesWithProgress = allModules.map((module, index) => ({
          ...module,
          progress: Math.floor(Math.random() * 100) // Random progress for demo
        }));
        
        setModules(modulesWithProgress);
      } catch (error) {
        console.error('Error fetching modules:', error);
        toast.error('Não foi possível carregar os módulos.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchModules();
  }, []);

  const recentModules = modules.slice(0, 3);
  const recommendedModules = [...modules].sort(() => 0.5 - Math.random()).slice(0, 2);

  return (
    <div className="container px-4 py-8 max-w-7xl mx-auto">
      {/* Hero section */}
      <div className="relative overflow-hidden rounded-2xl mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/60 opacity-90 z-0"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center mix-blend-overlay opacity-20 z-0"></div>
        <div className="relative z-10 px-8 py-16 text-white">
          <h1 className="text-4xl font-bold mb-4">Bem-vindo de volta, {user?.name}</h1>
          <p className="text-xl max-w-2xl mb-8">Continue sua jornada de aprendizado de inglês com nossos cursos interativos e práticos.</p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-medium shadow-lg">
            <Link to="/modules" className="flex items-center gap-2">
              Continuar Aprendendo <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Recent Progress */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Seu Progresso Recente</h2>
          <Link to="/modules" className="text-primary font-medium hover:underline flex items-center">
            Ver todos <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-muted rounded mb-4 w-3/4"></div>
                  <div className="h-3 bg-muted rounded mb-2 w-full"></div>
                  <div className="h-3 bg-muted rounded mb-4 w-5/6"></div>
                  <div className="h-2 bg-muted rounded mb-6"></div>
                  <div className="h-8 bg-muted rounded mt-6"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentModules.map(module => (
              <Card key={module.id} className="hover-scale">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">{module.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-3">
                  <p className="text-muted-foreground line-clamp-2 mb-4">{module.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progresso</span>
                      <span className="font-medium">{module.progress}%</span>
                    </div>
                    <Progress value={module.progress} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to={`/modules/${module.id}`}>
                      <Play className="h-4 w-4 mr-2" /> Continuar
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Módulos Completos</p>
              <p className="text-2xl font-bold">2</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-500/5 to-orange-500/10">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-orange-500/10 text-orange-500">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Aulas Concluídas</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500/5 to-green-500/10">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-500/10 text-green-500">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Horas de Estudo</p>
              <p className="text-2xl font-bold">24</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-500/5 to-yellow-500/10">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-yellow-500/10 text-yellow-500">
              <Trophy className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pontos Ganhos</p>
              <p className="text-2xl font-bold">850</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Modules */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Recomendados para Você</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendedModules.map(module => (
            <Card key={module.id} className="overflow-hidden hover-scale">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 h-48 md:h-auto bg-muted">
                  <img 
                    src={module.thumbnail || "/placeholder.svg"} 
                    alt={module.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-2">
                      <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary font-medium">
                        {module.level || "Intermediário"}
                      </span>
                      <div className="flex items-center ml-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <Star className="h-4 w-4 text-muted" />
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{module.title}</h3>
                    <p className="text-muted-foreground line-clamp-2 mb-4">{module.description}</p>
                  </div>
                  <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70" asChild>
                    <Link to={`/modules/${module.id}`}>
                      <Play className="h-4 w-4 mr-2" /> Explorar Módulo
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Learning Path */}
      <div className="bg-gradient-to-br from-background to-muted/50 border rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6">Sua Jornada de Aprendizado</h2>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-1 bg-primary/20 rounded"></div>
          <div className="space-y-8">
            {[
              { title: "Introdução ao Inglês", status: "completed" },
              { title: "Gramática Básica", status: "completed" },
              { title: "Conversação Diária", status: "current" },
              { title: "Inglês para Negócios", status: "upcoming" },
              { title: "Preparação para Certificações", status: "upcoming" },
            ].map((step, index) => (
              <div key={index} className="relative pl-12">
                <div className={`absolute left-3 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center
                  ${step.status === "completed" ? "bg-primary text-white" : 
                    step.status === "current" ? "border-4 border-primary bg-white" : "bg-muted border border-muted-foreground/20"}`}
                >
                  {step.status === "completed" && <ChevronRight className="h-4 w-4" />}
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className={`font-medium ${step.status === "current" ? "text-primary" : ""}`}>{step.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {step.status === "completed" ? "Concluído" : 
                     step.status === "current" ? "Em andamento" : "Próximo passo"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
