
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Lesson, ResourceFile, AudioResource } from '@/types';
import { toast } from 'sonner';
import { X, Plus, Upload, File, Music, Trash2 } from 'lucide-react';
import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { FileUploader } from '@/components/admin/FileUploader';
import { AudioUploader } from '@/components/admin/AudioUploader';

interface LessonFormProps {
  moduleId: string;
  lesson?: Lesson;
  onSubmit: (lessonData: Partial<Lesson>) => void;
  onCancel: () => void;
}

export const LessonForm = ({ moduleId, lesson, onSubmit, onCancel }: LessonFormProps) => {
  const [title, setTitle] = useState(lesson?.title || '');
  const [description, setDescription] = useState(lesson?.description || '');
  const [videoUrl, setVideoUrl] = useState(lesson?.videoUrl || '');
  const [files, setFiles] = useState<ResourceFile[]>(lesson?.files || []);
  const [audios, setAudios] = useState<AudioResource[]>(lesson?.audios || []);
  
  // File references
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  
  const handleAddFile = (file: ResourceFile) => {
    setFiles([...files, file]);
    toast.success('Arquivo adicionado com sucesso!');
  };
  
  const handleRemoveFile = (fileId: string) => {
    setFiles(files.filter(file => file.id !== fileId));
    toast.success('Arquivo removido com sucesso!');
  };
  
  const handleAddAudio = (audio: AudioResource) => {
    setAudios([...audios, audio]);
    toast.success('Áudio adicionado com sucesso!');
  };
  
  const handleRemoveAudio = (audioId: string) => {
    setAudios(audios.filter(audio => audio.id !== audioId));
    toast.success('Áudio removido com sucesso!');
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error('Por favor, insira um título');
      return;
    }
    
    if (!videoUrl.trim()) {
      toast.error('Por favor, insira a URL do vídeo');
      return;
    }
    
    onSubmit({
      title,
      description,
      videoUrl,
      files,
      audios,
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações da Aula</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título da Aula</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Introdução à Pronúncia"
              className="bg-background"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Uma breve descrição da aula"
              rows={3}
              className="bg-background"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="videoUrl">URL do Vídeo (YouTube)</Label>
            <Input 
              id="videoUrl" 
              value={videoUrl} 
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/embed/..."
              className="bg-background"
            />
            <p className="text-xs text-muted-foreground">
              Use o formato de incorporação do YouTube: https://www.youtube.com/embed/ID_DO_VIDEO
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            <File className="mr-2 h-5 w-5" />
            Arquivos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FileUploader onFileUploaded={handleAddFile} />
          
          {files.length > 0 ? (
            <div className="space-y-3 mt-4">
              {files.map(file => (
                <div key={file.id} className="flex items-center p-3 rounded-md border bg-background hover:bg-muted/20 transition-colors">
                  <div className="flex-grow">
                    <h4 className="text-sm font-medium">{file.name}</h4>
                    <p className="text-xs text-muted-foreground">{file.type}</p>
                  </div>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleRemoveFile(file.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground border border-dashed rounded-md">
              Nenhum arquivo adicionado ainda
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            <Music className="mr-2 h-5 w-5" />
            Áudios
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <AudioUploader onAudioUploaded={handleAddAudio} />
          
          {audios.length > 0 ? (
            <div className="space-y-3 mt-4">
              {audios.map(audio => (
                <div key={audio.id} className="flex items-center p-3 rounded-md border bg-background hover:bg-muted/20 transition-colors">
                  <div className="flex-grow">
                    <h4 className="text-sm font-medium">{audio.title}</h4>
                    <p className="text-xs text-muted-foreground">Duração: 0:30</p>
                  </div>
                  <audio 
                    src={audio.url} 
                    controls 
                    className="w-1/3 h-8 mx-2" 
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleRemoveAudio(audio.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground border border-dashed rounded-md">
              Nenhum áudio adicionado ainda
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
          {lesson ? 'Atualizar Aula' : 'Criar Aula'}
        </Button>
      </div>
    </form>
  );
};
