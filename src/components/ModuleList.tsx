import React, { useEffect, useState } from 'react';
import { Module as ImportedModule } from "../types";
import { getAllModules } from '../services/moduleService';
import ModuleCard from './ModuleCard'; // Assumindo que você tem este componente

const ModuleList: React.FC = () => {
  const [modules, setModules] = useState<ImportedModule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadModules = async () => {
      try {
        const data = await getAllModules();
        setModules(data);
      } catch (error) {
        console.error("Erro ao carregar módulos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadModules();
  }, []);

  if (loading) {
    return <div>Carregando módulos...</div>;
  }

  return (
    <div className="module-list">
      {modules.map(module => (
        <ModuleCard key={module.id} module={module} />
      ))}
    </div>
  );
};

export default ModuleList;