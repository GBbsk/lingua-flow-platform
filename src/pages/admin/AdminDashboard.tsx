
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Book, Edit, Plus, Trash2, Video, Users } from 'lucide-react';
import { toast } from 'sonner';
import type { Module, Lesson, ResourceFile, AudioResource } from '@/types'; // Ensure Lesson is imported as a type
// Remove unused imports
import { 
  getAllModules, 
  saveModule, 
  deleteModule, 
  saveLesson, 
  deleteLesson,
  removeFileFromLesson,
  removeAudioFromLesson
} from '@/services/moduleService';
import ModuleForm from '@/components/admin/ModuleForm';
import LessonForm from '@/components/admin/LessonForm';
import LessonDetailView from '@/admin/components/LessonDetailView';


const AdminDashboard = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [isModuleDialogOpen, setIsModuleDialogOpen] = useState(false);
  const [isLessonDialogOpen, setIsLessonDialogOpen] = useState(false);
  const [isResourceDialogOpen, setIsResourceDialogOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [resourceType, setResourceType] = useState<'file' | 'audio'>('file');
  const [isViewingLessonDetails, setIsViewingLessonDetails] = useState<boolean>(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  
  // Estados para o formulário de módulo
  const [moduleTitle, setModuleTitle] = useState('');
  const [moduleDescription, setModuleDescription] = useState('');
  const [moduleThumbnail, setModuleThumbnail] = useState('');
  
  // Estados para o formulário de aula
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDescription, setLessonDescription] = useState('');
  const [lessonVideoUrl, setLessonVideoUrl] = useState('');
  
  // Estados para o formulário de recurso
  const [resourceName, setResourceName] = useState('');
  const [resourceUrl, setResourceUrl] = useState('');
  const [resourceType2, setResourceType2] = useState(`pdf`);
  
  const handleAddModule = () => {
    setEditingModule(null);
    setIsModuleDialogOpen(true);
  };
  
  const handleEditModule = (module: Module) => {
    setEditingModule(module);
    setIsModuleDialogOpen(true);
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
  
  useEffect(() => {
    loadModules();
  }, []);

  const loadModules = async () => {
    try {
      const data = await getAllModules();
      setModules(data);
    } catch (error) {
      toast.error('Erro ao carregar módulos');
    }
  };

  const handleModuleSubmit = async (moduleData: Partial<Module>) => {
    try {
      if (editingModule) {
        const updatedModule = {
          ...editingModule,
          ...moduleData
        };
        await saveModule(updatedModule);
      } else {
        const newModule: Module = {
          id: `module-${Date.now()}`,
          title: moduleData.title || 'Novo Módulo',
          description: moduleData.description || '',
          thumbnail: moduleData.thumbnail || '',
          lessons: [],
        };
        await saveModule(newModule);
      }
      await loadModules();
      setIsModuleDialogOpen(false);
      toast.success(editingModule ? 'Módulo atualizado com sucesso' : 'Módulo criado com sucesso');
    } catch (error) {
      toast.error('Erro ao salvar módulo');
    }
  };

  const handleDeleteModule = async (moduleId: string) => {
    try {
      await deleteModule(moduleId);
      // Update the local state to remove the deleted module
      setModules(prevModules => prevModules.filter(module => module.id !== moduleId));
      toast.success('Módulo removido com sucesso');
    } catch (error) {
      toast.error('Erro ao remover módulo');
    }
  };
  
  const handleDeleteLesson = async (moduleId: string, lessonId: string) => {
    try {
      await deleteLesson(moduleId, lessonId);
      await loadModules();
      toast.success('Aula removida com sucesso');
    } catch (error) {
      toast.error('Erro ao remover aula');
    }
  };

  const handleLessonSubmit = async (lessonData: Partial<Lesson>) => {
    if (!selectedModuleId) return;
    
    try {
      if (editingLesson) {
        const updatedLesson: Lesson = {
          ...editingLesson,
          ...lessonData
        } as Lesson;
        await saveLesson(selectedModuleId, updatedLesson);
      } else {
        const newLesson: Lesson = {
          id: `lesson-${Date.now()}`,
          title: lessonData.title || 'Nova Aula',
          description: lessonData.description || '',
          videoUrl: lessonData.videoUrl || '',
          files: lessonData.files || [],
          audios: lessonData.audios || [],
        };
        await saveLesson(selectedModuleId, newLesson);
      }
      
      await loadModules();
      setIsLessonDialogOpen(false);
      toast.success(editingLesson ? 'Aula atualizada com sucesso' : 'Aula criada com sucesso');
    } catch (error) {
      toast.error('Erro ao salvar aula');
    }
  };
  
  const handleDeleteFile = async (moduleId: string, lessonId: string, fileId: string) => {
    try {
      await removeFileFromLesson(moduleId, lessonId, fileId);
      await loadModules();
      toast.success('Arquivo removido com sucesso');
    } catch (error) {
      toast.error('Erro ao remover arquivo');
    }
  };

  const handleDeleteAudio = async (moduleId: string, lessonId: string, audioId: string) => {
    try {
      await removeAudioFromLesson(moduleId, lessonId, audioId);
      await loadModules();
      toast.success('Áudio removido com sucesso');
    } catch (error) {
      toast.error('Erro ao remover áudio');
    }
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
                            {/* Add this new button */}
                            <Button 
                              variant="ghost" 
                              size="sm"
onClick={() => {
  const module = modules.find(m => m.id === module.id);
  if (module) {
    const lesson = module.lessons.find(l => l.id === lesson.id);
    if (lesson) {
      setSelectedModule(module);
      setSelectedLesson(lesson);
      setIsViewingLessonDetails(true);
    }
  }
}}
                            >
                              Ver Detalhes
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
            {/* Files section */}
            <div>
              <h2 className="text-xl font-bold mb-4">Arquivos</h2>
              <div className="border rounded-lg overflow-hidden">
                  {modules.flatMap(module => 
                  module.lessons.flatMap(lesson => 
                    lesson.files.map(file => (
                      <div key={file.id} className="p-3 grid grid-cols-12 items-center hover:bg-muted/50">
                        <div className="col-span-4 truncate">{file.name}</div>
                        <div className="col-span-3 uppercase text-xs">{file.type}</div>
                        <div className="col-span-3 text-sm truncate">{lesson.title}</div>
                        <div className="col-span-2 flex space-x-1">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteFile(module.id, lesson.id, file.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                  ))
                ))}
              </div>
            </div>
            
            {/* Audios section */}
            <div>
              <h2 className="text-xl font-bold mb-4">Áudios</h2>
              <div className="border rounded-lg overflow-hidden">
                {modules.flatMap(module => 
                  module.lessons.flatMap(lesson => 
                    lesson.audios.map(audio => (
                      <div key={audio.id} className="p-3 grid grid-cols-12 items-center hover:bg-muted/50">
                        <div className="col-span-4 truncate">{audio.title}</div>
                        <div className="col-span-3">--:--</div>
                        <div className="col-span-3 text-sm truncate">{lesson.title}</div>
                        <div className="col-span-2 flex space-x-1">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteAudio(module.id, lesson.id, audio.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                  ))
                ))}
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
      
      {/* Lesson Details Dialog */}
      <Dialog open={isViewingLessonDetails} onOpenChange={setIsViewingLessonDetails}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes da Aula</DialogTitle>
          </DialogHeader>
          {selectedLesson && (
            <LessonDetailView
              lesson={selectedLesson}
              onSave={async (updatedLesson) => {
                if (selectedModule) {
                  try {
                    await saveLesson(selectedModule.id, updatedLesson);
                    // Update the local state
                    setModules(prevModules =>
                      prevModules.map(module =>
                        module.id === selectedModule.id
                          ? {
                              ...module,
                              lessons: module.lessons.map(lesson =>
                                lesson.id === updatedLesson.id ? updatedLesson : lesson
                              )
                            }
                          : module
                      )
                    );
                    setIsViewingLessonDetails(false);
                    setSelectedLesson(null);
                    setSelectedModule(null);
                    toast.success('Aula atualizada com sucesso');
                  } catch (error) {
                    toast.error('Erro ao salvar detalhes da aula');
                  }
                }
              }}
              onCancel={() => {
                setIsViewingLessonDetails(false);
                setSelectedLesson(null);
                setSelectedModule(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
