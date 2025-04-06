import React, { useContext, useState, useEffect } from 'react';
import { getAllModules } from '@/services/moduleService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { UserContext } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Award, ChevronRight, PlayCircle, Book, BarChart, Calendar } from 'lucide-react';
import moduleData from '@/data/moduleData.json'; // Correctly import the JSON data
import { Module } from '@/types'; // Ensure the Module type is imported correctly
import { Progress } from '@/components/ui/progress'; // Ensure this import is correct

const HomePage = () => {
  const { user } = useContext(UserContext);
  const [modules, setModules] = useState<Module[]>([]);
  
  useEffect(() => {
    const loadModules = async () => {
      const data = await getAllModules();
      setModules(data);
    };
    loadModules();
  }, []);

  // Add this before the return statement
  const recentModules = modules.slice(0, 3); // Get the first 3 modules

  return (
    <div className="container py-8 mx-0 px-0 bg-slate-200">
      <PageHeader title={`Bem-vindo, ${user?.name}!`} description="Continue seu progresso no curso de inglês" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="bg-gradient-to-br from-card/80 to-card shadow-md border border-primary/10 hover:border-primary/20 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <BarChart className="mr-2 h-4 w-4 text-primary/70" />
              Progresso Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end space-x-1">
              <span className="text-3xl font-bold">25%</span>
              <span className="text-muted-foreground pb-1">completado</span>
            </div>
            <Progress value={25} className="h-2 mt-2" />
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-card/80 to-card shadow-md border border-primary/10 hover:border-primary/20 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <BookOpen className="mr-2 h-4 w-4 text-primary/70" />
              Aulas Assistidas
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold">3</span>
            <span className="text-muted-foreground">/ 12 aulas</span>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-card/80 to-card shadow-md border border-primary/10 hover:border-primary/20 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Clock className="mr-2 h-4 w-4 text-primary/70" />
              Tempo Estudado
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <span className="text-3xl font-bold">4:30</span>
            <span className="text-muted-foreground ml-1">horas</span>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center mx-0">
            <Calendar className="mr-2 h-5 w-5 text-primary" />
            Continue Estudando
          </h2>
          <Button variant="outline" asChild className="gap-1">
            <Link to="/modules">
              Ver Todos os Módulos
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentModules.map(module => (
            <Card key={module.id} className="course-card bg-gradient-to-br from-card/60 to-card border-primary/5 hover:shadow-lg hover:border-primary/20 transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{module.title}</CardTitle>
                <CardDescription>{module.description.slice(0, 60)}...</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Book className="h-4 w-4 mr-1" />
                    <span>{module.lessons.length} {module.lessons.length === 1 ? 'Aula' : 'Aulas'}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>2h 30min</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button asChild className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                  <Link to={`/modules/${module.id}`} className="flex items-center justify-center">
                    <PlayCircle className="h-4 w-4 mr-1" />
                    Continuar
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-bold mb-6 flex items-center">
          <Award className="mr-2 h-5 w-5 text-primary" />
          Conquistas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[{
          name: 'Iniciante',
          icon: Book,
          earned: true
        }, {
          name: 'Dedicação',
          icon: Clock,
          earned: true
        }, {
          name: 'Fluência',
          icon: BookOpen,
          earned: false
        }, {
          name: 'Vocabulário',
          icon: Award,
          earned: false
        }].map((badge, index) => <Card key={index} className={`flex flex-col items-center p-4 ${badge.earned ? 'bg-gradient-to-br from-primary/10 to-card' : 'bg-muted/20'}`}>
              <div className={`rounded-full p-3 mb-2 ${badge.earned ? 'bg-primary/20 text-primary' : 'bg-muted/40 text-muted-foreground'}`}>
                <badge.icon className="h-6 w-6" />
              </div>
              <span className="font-medium">{badge.name}</span>
              <span className="text-xs text-muted-foreground">
                {badge.earned ? 'Desbloqueado' : 'Bloqueado'}
              </span>
            </Card>)}
        </div>
      </div>
    </div> 
    
  );
};

export default HomePage;