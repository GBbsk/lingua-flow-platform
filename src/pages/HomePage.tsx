
import React, { useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserContext } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Award } from 'lucide-react';
import { sampleModules } from '@/data/sampleData';

const HomePage = () => {
  const { user } = useContext(UserContext);
  const recentModules = sampleModules.slice(0, 2);
  
  return (
    <div className="container py-8">
      <PageHeader 
        title={`Bem-vindo, ${user?.name}!`}
        description="Continue seu progresso no curso de inglês"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Progresso Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end space-x-1">
              <span className="text-3xl font-bold">25%</span>
              <span className="text-muted-foreground pb-1">completado</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full mt-2 overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '25%' }}></div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Aulas Assistidas</CardTitle>
          </CardHeader>
          <CardContent className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold">3</span>
            <span className="text-muted-foreground">/ 12 aulas</span>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tempo Estudado</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-3xl font-bold">4:30</span>
            <span className="text-muted-foreground ml-1">horas</span>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Continue Estudando</h2>
          <Button variant="outline" asChild>
            <Link to="/modules">Ver Todos os Módulos</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentModules.map(module => (
            <Card key={module.id} className="course-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{module.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm">
                    <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{module.lessons.length} {module.lessons.length === 1 ? 'Aula' : 'Aulas'}</span>
                  </div>
                  <Button asChild>
                    <Link to={`/modules/${module.id}`}>Continuar</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-bold mb-4">Conquistas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {['Iniciante', 'Dedicação', 'Fluência', 'Vocabulário'].map((badge, index) => (
            <div key={index} className="flex flex-col items-center p-4 border rounded-lg bg-muted/30">
              <div className="bg-primary/10 rounded-full p-3 mb-2">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <span className="font-medium">{badge}</span>
              <span className="text-xs text-muted-foreground">Desbloqueado</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
