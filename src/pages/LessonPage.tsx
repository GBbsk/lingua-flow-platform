
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import moduleData from '@/data/moduleData.json';
import { 
  ArrowLeft, 
  FileText, 
  Volume, 
  ArrowRight, 
  CheckCircle, 
  BookOpen,
  Clock,
  PlayCircle
} from 'lucide-react';
import { Lesson, Module } from '@/types';
import { VideoPlayer } from '@/components/lessons/VideoPlayer';
import { FileResource } from '@/components/lessons/FileResource';
import { AudioPlayer } from '@/components/lessons/AudioPlayer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

const LessonPage = () => {
  const { moduleId, lessonId } = useParams<{ moduleId: string, lessonId: string }>();
  const [module, setModule] = useState<Module | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Use moduleData.modules to find the module
    const foundModule = moduleData.modules.find(m => m.id === moduleId);
    setModule(foundModule || null);

    if (foundModule) {
      const foundLesson = foundModule.lessons.find(l => l.id === lessonId);
      setLesson(foundLesson || null);
      setCompleted(false); // Reset completion status on lesson change
    }
  }, [moduleId, lessonId]);

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
    const currentModuleIndex = moduleData.modules.findIndex(m => m.id === moduleId);
    
    if (currentModuleIndex < moduleData.modules.length - 1 && moduleData.modules[currentModuleIndex + 1].lessons.length > 0) {
      // There's another module with lessons
      return {
        moduleId: moduleData.modules[currentModuleIndex + 1].id,
        lessonId: moduleData.modules[currentModuleIndex + 1].lessons[0].id
      };
    }
    
    return null;
  };
  
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
  
  const markAsCompleted = () => {
    setCompleted(true);
    toast.success("Aula marcada como concluída!");
  };
  
  const nextLesson = findNextLesson();
  
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <Button variant="outline" asChild className="self-start">
          <Link to={`/modules/${module.id}`} className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para o Módulo
          </Link>
        </Button>
        
        <Progress value={40} className="md:w-1/3 self-center h-2" />
        
        <div className="text-sm text-muted-foreground self-center md:ml-2">
          Aula {module.lessons.findIndex(l => l.id === lessonId) + 1} de {module.lessons.length}
        </div>
      </div>
      
      <PageHeader 
        title={lesson.title}
        description={lesson.description}
      />
      
      <div className="my-6">
        <Card className="shadow-md border-primary/10">
          <CardContent className="p-0">
            <VideoPlayer videoUrl={lesson.videoUrl} title={lesson.title} />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="md:col-span-3">
          <Tabs defaultValue="resources" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="resources" className="flex items-center flex-1">
                <FileText className="h-4 w-4 mr-2" />
                Arquivos ({lesson.files.length})
              </TabsTrigger>
              <TabsTrigger value="audio" className="flex items-center flex-1">
                <Volume className="h-4 w-4 mr-2" />
                Áudios ({lesson.audios.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="resources" className="space-y-4 p-4">
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
            
            <TabsContent value="audio" className="space-y-6 p-4">
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
        </Card>
        
        <Card className="md:col-span-1">
          <CardContent className="p-4">
            <h3 className="font-medium mb-3 flex items-center">
              <BookOpen className="h-4 w-4 mr-2 text-primary" />
              Outras Aulas
            </h3>
            <div className="space-y-2">
              {module.lessons.map((l, index) => (
                <Link 
                  key={l.id} 
                  to={`/modules/${module.id}/lessons/${l.id}`}
                  className={`flex items-center px-3 py-2 rounded-md text-sm ${l.id === lessonId ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'}`}
                >
                  <span className="mr-2 w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-xs">
                    {index + 1}
                  </span>
                  <span className="truncate">{l.title}</span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-between items-center mt-8">
        {!completed ? (
          <Button onClick={markAsCompleted} variant="outline" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Marcar como concluído
          </Button>
        ) : (
          <Button variant="outline" disabled className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Aula concluída
          </Button>
        )}
        
        {nextLesson ? (
          <Button asChild className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
            <Link to={`/modules/${nextLesson.moduleId}/lessons/${nextLesson.lessonId}`} className="flex items-center">
              Próxima Aula
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        ) : (
          <Button asChild variant="outline">
            <Link to="/modules" className="flex items-center">
              <PlayCircle className="h-4 w-4 mr-2" />
              Concluir Módulo
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default LessonPage;
