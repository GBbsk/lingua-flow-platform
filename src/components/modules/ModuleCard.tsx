
import React from 'react';
import { Module } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Clock, Users } from "lucide-react";

interface ModuleCardProps {
  module: Module;
}

export const ModuleCard = ({ module }: ModuleCardProps) => {
  const navigate = useNavigate();

  const handleModuleClick = () => {
    navigate(`/modules/${module.id}`);
  };

  return (
    <Card className="overflow-hidden hover-scale border-primary/5 transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={module.thumbnail || "/placeholder.svg"} 
          alt={module.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-black/60 text-white hover:bg-black/70">
            {module.level || "Intermediário"}
          </Badge>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <Badge className="bg-primary/90 hover:bg-primary">{module.lessons.length} aulas</Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1">{module.title}</CardTitle>
        <CardDescription className="line-clamp-2">{module.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>3 horas</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 mr-1" />
            <span>{module.lessons.length} aulas</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>243 alunos</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button 
          onClick={handleModuleClick} 
          className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 group"
        >
          <span className="flex-1 text-center">Começar Módulo</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};
