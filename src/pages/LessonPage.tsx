
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { sampleModules } from '@/data/sampleData';
import { ArrowLeft, FileText, Volume } from 'lucide-react';
import { Lesson, Module } from '@/types';
import { VideoPlayer } from '@/components/lessons/VideoPlayer';
import { FileResource } from '@/components/lessons/FileResource';
import { AudioPlayer } from '@/components/lessons/AudioPlayer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const LessonPage = () => {
  const { moduleId, lessonId } = useParams<{ moduleId: string, lessonId: string }>();
  const [module, setModule] = useState<Module | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  
  useEffect(() => {
    // In a real application, you would fetch this data from your API
    const foundModule = sampleModules.find(m => m.id === moduleId);
    setModule(foundModule || null);
    
    if (foundModule) {
      const foundLesson = foundModule.lessons.find(l => l.id === lessonId);
      setLesson(foundLesson || null);
    }
  }, [moduleId, lessonId]);
  
  if (!module || !lesson) {
    return (
      <div className="container py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Aula não encontrada</h2>
          <p className="text-muted-foreground mb-4">A aula que você está procurando não existe ou foi removida.</p>
          <Button asChild>
            <Link to="/modules">Voltar para Módulos</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  const findNextLesson = (): { moduleId: string, lessonId: string } | null => {
    const currentLessonIndex = module.lessons.findIndex(l => l.id === lessonId);
    
    if (currentLessonIndex < module.lessons.length - 1) {
      // There's another lesson in this module
      return {
        moduleId: module.id,
        lessonId: module.lessons[currentLessonIndex + 1].id
      };
    }
    
    // Check if there's another module
    const currentModuleIndex = sampleModules.findIndex(m => m.id === moduleId);
    
    if (currentModuleIndex < sampleModules.length - 1 && sampleModules[currentModuleIndex + 1].lessons.length > 0) {
      // There's another module with lessons
      return {
        moduleId: sampleModules[currentModuleIndex + 1].id,
        lessonId: sampleModules[currentModuleIndex + 1].lessons[0].id
      };
    }
    
    return null;
  };
  
  const nextLesson = findNextLesson();
  
  return (
    <div className="container py-8">
      <Button variant="outline" asChild className="mb-4">
        <Link to={`/modules/${module.id}`} className="flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para o Módulo
        </Link>
      </Button>
      
      <PageHeader 
        title={lesson.title}
        description={lesson.description}
      />
      
      <div className="my-6">
        <VideoPlayer videoUrl={lesson.videoUrl} title={lesson.title} />
      </div>
      
      <Tabs defaultValue="resources" className="mt-8">
        <TabsList className="mb-4">
          <TabsTrigger value="resources" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Arquivos
          </TabsTrigger>
          <TabsTrigger value="audio" className="flex items-center">
            <Volume className="h-4 w-4 mr-2" />
            Áudios
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="resources" className="space-y-4">
          {lesson.files.length > 0 ? (
            lesson.files.map(file => (
              <FileResource key={file.id} file={file} />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum arquivo disponível para esta aula.
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="audio" className="space-y-6">
          {lesson.audios.length > 0 ? (
            lesson.audios.map(audio => (
              <AudioPlayer key={audio.id} audio={audio} />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum áudio disponível para esta aula.
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 flex justify-end">
        {nextLesson ? (
          <Button asChild>
            <Link to={`/modules/${nextLesson.moduleId}/lessons/${nextLesson.lessonId}`}>
              Próxima Aula
            </Link>
          </Button>
        ) : (
          <Button asChild variant="outline">
            <Link to="/modules">Concluir Módulo</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default LessonPage;
