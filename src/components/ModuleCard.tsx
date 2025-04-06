import React from 'react';
import { Module as ImportedModule } from "../types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ModuleCardProps {
  module: ImportedModule;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => {
  const navigate = useNavigate();

  const handleModuleClick = () => {
    navigate(`/module/${module.id}`);
  };

  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{module.title}</CardTitle>
        <CardDescription>{module.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <img 
            src={module.thumbnail} 
            alt={module.title} 
            className="w-full h-48 object-cover rounded-md"
          />
          <Button onClick={handleModuleClick}>
            Começar Módulo
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModuleCard;