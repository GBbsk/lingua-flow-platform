
import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { ModuleCard } from '@/components/modules/ModuleCard';
import { sampleModules } from '@/data/sampleData';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ModulesPage = () => {
  return (
    <div className="container py-8 px-4 md:px-6">
      <PageHeader 
        title="Módulos do Curso"
        description="Explore todos os módulos disponíveis e comece sua jornada de aprendizado de inglês."
      >
        <Button asChild className="shadow-md">
          <Link to="/admin" className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Painel Admin
          </Link>
        </Button>
      </PageHeader>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sampleModules.map(module => (
          <ModuleCard key={module.id} module={module} />
        ))}
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
