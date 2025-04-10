
import React, { useState, useEffect } from 'react';
import { getAllModules } from '@/services/moduleService';
import { PageHeader } from '@/components/shared/PageHeader';
import { ModuleCard } from '@/components/modules/ModuleCard';
import { Module } from '@/types';
import { Button } from '@/components/ui/button';
import { PlusCircle, Book, Sparkles, Filter, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const ModulesPage = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadModules = async () => {
      try {
        setIsLoading(true);
        const modulesList = await getAllModules();
        
        // Add sample levels for modules that don't have them
        const modulesWithLevels = modulesList.map(module => ({
          ...module,
          level: module.level || (Math.random() > 0.5 ? "Iniciante" : "Avançado")
        }));
        
        setModules(modulesWithLevels);
      } catch (error) {
        console.error('Error loading modules:', error);
        toast.error('Não foi possível carregar os módulos.');
      } finally {
        setIsLoading(false);
      }
    };
    loadModules();
  }, []);

  const beginnerModules = modules.filter(module => 
    module.level?.toLowerCase() === 'iniciante' && 
    module.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const advancedModules = modules.filter(module => 
    module.level?.toLowerCase() === 'avançado' && 
    module.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
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
      
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between my-8">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar módulos..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" /> Filtrar
        </Button>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((_, i) => (
            <div key={i} className="border rounded-lg p-6 animate-pulse">
              <div className="h-48 bg-muted rounded-md mb-4"></div>
              <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-muted rounded w-full mb-4"></div>
              <div className="h-10 bg-muted rounded mt-4"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {beginnerModules.length > 0 && (
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
          )}
          
          {advancedModules.length > 0 && (
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
          )}

          {beginnerModules.length === 0 && advancedModules.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold mb-2">Nenhum módulo encontrado</h3>
              <p className="text-muted-foreground">
                Não encontramos nenhum módulo correspondente à sua pesquisa.
              </p>
              {searchQuery && (
                <Button 
                  variant="outline" 
                  className="mt-4" 
                  onClick={() => setSearchQuery('')}
                >
                  Limpar pesquisa
                </Button>
              )}
            </div>
          )}
        </>
      )}
      
      <div className="mt-16 p-8 bg-gradient-to-br from-primary/5 to-secondary/30 rounded-xl shadow-sm border">
        <h2 className="text-2xl font-bold mb-4">Não sabe por onde começar?</h2>
        <p className="text-muted-foreground mb-6">
          Recomendamos começar pelo módulo básico e ir avançando conforme seu progresso.
          Cada módulo possui aulas específicas para desenvolver suas habilidades em inglês.
        </p>
        <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow">
          <Link to="/modules">Comece agora</Link>
        </Button>
      </div>
    </div>
  );
};

export default ModulesPage;
