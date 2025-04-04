
import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { ModuleCard } from '@/components/modules/ModuleCard';
import { sampleModules } from '@/data/sampleData';

const ModulesPage = () => {
  return (
    <div className="container py-8">
      <PageHeader 
        title="Módulos do Curso"
        description="Explore todos os módulos disponíveis"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleModules.map(module => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
};

export default ModulesPage;
