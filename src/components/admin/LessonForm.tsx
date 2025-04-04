
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Lesson, ResourceFile, AudioResource } from '@/types';
import { toast } from 'sonner';
import { X, Plus } from 'lucide-react';

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
  
  // New empty file state
  const [newFileName, setNewFileName] = useState('');
  const [newFileUrl, setNewFileUrl] = useState('');
  const [newFileType, setNewFileType] = useState('');
  
  // New empty audio state
  const [newAudioTitle, setNewAudioTitle] = useState('');
  const [newAudioUrl, setNewAudioUrl] = useState('');
  const [newAudioTranscript, setNewAudioTranscript] = useState('');
  
  const handleAddFile = () => {
    if (!newFileName || !newFileUrl || !newFileType) {
      toast.error('Preencha todos os campos do arquivo');
      return;
    }
    
    const newFile: ResourceFile = {
      id: `file-${Date.now()}`,
      name: newFileName,
      url: newFileUrl,
      type: newFileType,
    };
    
    setFiles([...files, newFile]);
    setNewFileName('');
    setNewFileUrl('');
    setNewFileType('');
  };
  
  const handleRemoveFile = (fileId: string) => {
    setFiles(files.filter(file => file.id !== fileId));
  };
  
  const handleAddAudio = () => {
    if (!newAudioTitle || !newAudioUrl || !newAudioTranscript) {
      toast.error('Preencha todos os campos do áudio');
      return;
    }
    
    const newAudio: AudioResource = {
      id: `audio-${Date.now()}`,
      title: newAudioTitle,
      url: newAudioUrl,
      transcript: newAudioTranscript,
    };
    
    setAudios([...audios, newAudio]);
    setNewAudioTitle('');
    setNewAudioUrl('');
    setNewAudioTranscript('');
  };
  
  const handleRemoveAudio = (audioId: string) => {
    setAudios(audios.filter(audio => audio.id !== audioId));
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
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Título da Aula</Label>
          <Input 
            id="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Introdução à Pronúncia"
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
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="videoUrl">URL do Vídeo (YouTube)</Label>
          <Input 
            id="videoUrl" 
            value={videoUrl} 
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://www.youtube.com/embed/..."
          />
          <p className="text-xs text-muted-foreground">
            Use o formato de incorporação do YouTube: https://www.youtube.com/embed/ID_DO_VIDEO
          </p>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Arquivos</h3>
        
        <div className="space-y-4 mb-6">
          {files.map(file => (
            <div key={file.id} className="flex items-center p-3 rounded-md border bg-secondary">
              <div className="flex-grow">
                <h4 className="text-sm font-medium">{file.name}</h4>
                <p className="text-xs text-muted-foreground">{file.url}</p>
              </div>
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                onClick={() => handleRemoveFile(file.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="newFileName">Nome do Arquivo</Label>
            <Input 
              id="newFileName" 
              value={newFileName} 
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="Ex: Material de Apoio"
            />
          </div>
          <div>
            <Label htmlFor="newFileUrl">URL do Arquivo</Label>
            <Input 
              id="newFileUrl" 
              value={newFileUrl} 
              onChange={(e) => setNewFileUrl(e.target.value)}
              placeholder="/files/material.pdf"
            />
          </div>
          <div>
            <Label htmlFor="newFileType">Tipo do Arquivo</Label>
            <Input 
              id="newFileType" 
              value={newFileType} 
              onChange={(e) => setNewFileType(e.target.value)}
              placeholder="pdf, docx, etc"
            />
          </div>
        </div>
        
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleAddFile}
          className="mt-4"
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Arquivo
        </Button>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Áudios</h3>
        
        <div className="space-y-4 mb-6">
          {audios.map(audio => (
            <div key={audio.id} className="flex items-center p-3 rounded-md border bg-secondary">
              <div className="flex-grow">
                <h4 className="text-sm font-medium">{audio.title}</h4>
                <p className="text-xs text-muted-foreground">{audio.url}</p>
              </div>
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                onClick={() => handleRemoveAudio(audio.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="newAudioTitle">Título do Áudio</Label>
            <Input 
              id="newAudioTitle" 
              value={newAudioTitle} 
              onChange={(e) => setNewAudioTitle(e.target.value)}
              placeholder="Ex: Pronúncia de Cumprimentos"
            />
          </div>
          <div>
            <Label htmlFor="newAudioUrl">URL do Áudio</Label>
            <Input 
              id="newAudioUrl" 
              value={newAudioUrl} 
              onChange={(e) => setNewAudioUrl(e.target.value)}
              placeholder="/audios/sample.mp3"
            />
          </div>
          <div>
            <Label htmlFor="newAudioTranscript">Transcrição</Label>
            <Textarea 
              id="newAudioTranscript" 
              value={newAudioTranscript} 
              onChange={(e) => setNewAudioTranscript(e.target.value)}
              placeholder="Hello! Good morning! How are you?"
              rows={3}
            />
          </div>
        </div>
        
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleAddAudio}
          className="mt-4"
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Áudio
        </Button>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {lesson ? 'Atualizar Aula' : 'Criar Aula'}
        </Button>
      </div>
    </form>
  );
};
