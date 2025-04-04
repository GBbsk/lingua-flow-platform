
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Module } from '@/types';
import { BookOpen } from 'lucide-react';

interface ModuleCardProps {
  module: Module;
}

export const ModuleCard = ({ module }: ModuleCardProps) => {
  return (
    <Link to={`/modules/${module.id}`}>
      <Card className="course-card h-full transition-all hover:border-primary/30">
        <CardHeader className="pb-2">
          {module.thumbnail ? (
            <img 
              src={module.thumbnail} 
              alt={module.title}
              className="w-full h-40 object-cover rounded-t-lg mb-2"
            />
          ) : (
            <div className="w-full h-40 bg-muted rounded-t-lg flex items-center justify-center">
              <BookOpen className="h-16 w-16 text-muted-foreground/50" />
            </div>
          )}
          <CardTitle className="text-lg">{module.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{module.description}</p>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground border-t pt-3">
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 mr-2" />
            {module.lessons.length} {module.lessons.length === 1 ? 'Aula' : 'Aulas'}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
