
import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { sampleModules } from '@/data/sampleData';
import { ModuleForm } from '@/components/admin/ModuleForm';
import { LessonForm } from '@/components/admin/LessonForm';
import { Module, Lesson } from '@/types';
import { ModuleCard } from '@/components/modules/ModuleCard';
import { Edit, Plus, Trash2, Book, Video, Users } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [modules, setModules] = useState(sampleModules);
  const [isModuleDialogOpen, setIsModuleDialogOpen] = useState(false);
  const [isLessonDialogOpen, setIsLessonDialogOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  
  const handleAddModule = () => {
    setEditingModule(null);
    setIsModuleDialogOpen(true);
  };
  
  const handleEditModule = (module: Module) => {
    setEditingModule(module);
    setIsModuleDialogOpen(true);
  };
  
  const handleDeleteModule = (moduleId: string) => {
    setModules(modules.filter(m => m.id !== moduleId));
    toast.success('Módulo removido com sucesso');
  };
  
  const handleModuleSubmit = (moduleData: Partial<Module>) => {
    if (editingModule) {
      // Update existing module
      setModules(modules.map(m => 
        m.id === editingModule.id 
          ? { ...m, ...moduleData }
          : m
      ));
      toast.success('Módulo atualizado com sucesso');
    } else {
      // Create new module
      const newModule: Module = {
        id: `module-${Date.now()}`,
        title: moduleData.title || 'Novo Módulo',
        description: moduleData.description || '',
        thumbnail: moduleData.thumbnail,
        lessons: [],
      };
      setModules([...modules, newModule]);
      toast.success('Módulo criado com sucesso');
    }
    setIsModuleDialogOpen(false);
  };
  
  const handleAddLesson = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    setEditingLesson(null);
    setIsLessonDialogOpen(true);
  };
  
  const handleEditLesson = (moduleId: string, lesson: Lesson) => {
    setSelectedModuleId(moduleId);
    setEditingLesson(lesson);
    setIsLessonDialogOpen(true);
  };
  
  const handleDeleteLesson = (moduleId: string, lessonId: string) => {
    setModules(modules.map(m => 
      m.id === moduleId 
        ? { ...m, lessons: m.lessons.filter(l => l.id !== lessonId) }
        : m
    ));
    toast.success('Aula removida com sucesso');
  };
  
  const handleLessonSubmit = (lessonData: Partial<Lesson>) => {
    if (!selectedModuleId) return;
    
    if (editingLesson) {
      // Update existing lesson
      setModules(modules.map(m => 
        m.id === selectedModuleId 
          ? {
              ...m,
              lessons: m.lessons.map(l => 
                l.id === editingLesson.id 
                  ? { ...l, ...lessonData } as Lesson
                  : l
              )
            }
          : m
      ));
      toast.success('Aula atualizada com sucesso');
    } else {
      // Create new lesson
      const newLesson: Lesson = {
        id: `lesson-${Date.now()}`,
        title: lessonData.title || 'Nova Aula',
        description: lessonData.description || '',
        videoUrl: lessonData.videoUrl || '',
        files: lessonData.files || [],
        audios: lessonData.audios || [],
      };
      
      setModules(modules.map(m => 
        m.id === selectedModuleId 
          ? { ...m, lessons: [...m.lessons, newLesson] }
          : m
      ));
      toast.success('Aula criada com sucesso');
    }
    setIsLessonDialogOpen(false);
  };
  
  const totalLessons = modules.reduce((total, module) => total + module.lessons.length, 0);
  const totalFiles = modules.reduce((total, module) => 
    total + module.lessons.reduce((lessonTotal, lesson) => 
      lessonTotal + lesson.files.length, 0
    ), 0
  );
  const totalAudios = modules.reduce((total, module) => 
    total + module.lessons.reduce((lessonTotal, lesson) => 
      lessonTotal + lesson.audios.length, 0
    ), 0
  );
  
  return (
    <div className="container py-8">
      <PageHeader 
        title="Painel de Administração"
        description="Gerencie o conteúdo do seu curso"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Book className="h-4 w-4 mr-2" />
              Módulos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{modules.length}</div>
            <p className="text-sm text-muted-foreground">Módulos ativos</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Video className="h-4 w-4 mr-2" />
              Aulas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalLessons}</div>
            <p className="text-sm text-muted-foreground">Total de aulas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Recursos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalFiles + totalAudios}</div>
            <p className="text-sm text-muted-foreground">{totalFiles} arquivos, {totalAudios} áudios</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="modules" className="space-y-6">
        <TabsList>
          <TabsTrigger value="modules">Módulos</TabsTrigger>
          <TabsTrigger value="lessons">Aulas</TabsTrigger>
          <TabsTrigger value="resources">Recursos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="modules">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Módulos</h2>
            <Button onClick={handleAddModule}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Módulo
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map(module => (
              <Card key={module.id} className="overflow-hidden">
                <div className="relative">
                  {module.thumbnail ? (
                    <img 
                      src={module.thumbnail} 
                      alt={module.title}
                      className="w-full h-40 object-cover"
                    />
                  ) : (
                    <div className="w-full h-40 bg-muted flex items-center justify-center">
                      <Book className="h-16 w-16 text-muted-foreground/50" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <Button variant="secondary" size="icon" onClick={() => handleEditModule(module)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDeleteModule(module.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{module.title}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {module.lessons.length} {module.lessons.length === 1 ? 'Aula' : 'Aulas'}
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleAddLesson(module.id)}>
                      <Plus className="h-3 w-3 mr-1" /> Aula
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="lessons">
          <div className="space-y-6">
            {modules.map(module => (
              <div key={module.id} className="border rounded-lg overflow-hidden">
                <div className="bg-muted p-4 flex justify-between items-center">
                  <h3 className="font-medium">{module.title}</h3>
                  <Button size="sm" onClick={() => handleAddLesson(module.id)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Aula
                  </Button>
                </div>
                
                {module.lessons.length > 0 ? (
                  <div className="divide-y">
                    {module.lessons.map(lesson => (
                      <div key={lesson.id} className="p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{lesson.title}</h4>
                            <p className="text-sm text-muted-foreground">{lesson.description}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              asChild
                            >
                              <Link to={`/modules/${module.id}/lessons/${lesson.id}`}>
                                <Video className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleEditLesson(module.id, lesson)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDeleteLesson(module.id, lesson.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground flex space-x-4">
                          <span>{lesson.files.length} arquivos</span>
                          <span>{lesson.audios.length} áudios</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    Nenhuma aula adicionada a este módulo
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="resources">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-4">Arquivos</h2>
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted p-3 grid grid-cols-12 text-sm font-medium">
                  <div className="col-span-4">Nome</div>
                  <div className="col-span-3">Tipo</div>
                  <div className="col-span-3">Aula</div>
                  <div className="col-span-2">Ações</div>
                </div>
                <div className="divide-y">
                  {modules.flatMap(module => 
                    module.lessons.flatMap(lesson => 
                      lesson.files.map(file => (
                        <div key={file.id} className="p-3 grid grid-cols-12 items-center hover:bg-muted/50">
                          <div className="col-span-4 truncate">{file.name}</div>
                          <div className="col-span-3 uppercase text-xs">{file.type}</div>
                          <div className="col-span-3 text-sm truncate">{lesson.title}</div>
                          <div className="col-span-2 flex space-x-1">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )
                  )}
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4">Áudios</h2>
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted p-3 grid grid-cols-12 text-sm font-medium">
                  <div className="col-span-4">Título</div>
                  <div className="col-span-3">Duração</div>
                  <div className="col-span-3">Aula</div>
                  <div className="col-span-2">Ações</div>
                </div>
                <div className="divide-y">
                  {modules.flatMap(module => 
                    module.lessons.flatMap(lesson => 
                      lesson.audios.map(audio => (
                        <div key={audio.id} className="p-3 grid grid-cols-12 items-center hover:bg-muted/50">
                          <div className="col-span-4 truncate">{audio.title}</div>
                          <div className="col-span-3">--:--</div>
                          <div className="col-span-3 text-sm truncate">{lesson.title}</div>
                          <div className="col-span-2 flex space-x-1">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Module Dialog */}
      <Dialog open={isModuleDialogOpen} onOpenChange={setIsModuleDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingModule ? 'Editar Módulo' : 'Novo Módulo'}
            </DialogTitle>
          </DialogHeader>
          <ModuleForm 
            module={editingModule || undefined}
            onSubmit={handleModuleSubmit}
            onCancel={() => setIsModuleDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
      
      {/* Lesson Dialog */}
      <Dialog open={isLessonDialogOpen} onOpenChange={setIsLessonDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingLesson ? 'Editar Aula' : 'Nova Aula'}
            </DialogTitle>
          </DialogHeader>
          {selectedModuleId && (
            <LessonForm 
              moduleId={selectedModuleId}
              lesson={editingLesson || undefined}
              onSubmit={handleLessonSubmit}
              onCancel={() => setIsLessonDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
