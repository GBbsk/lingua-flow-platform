import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Trash, Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Lesson, ResourceFile, AudioResource } from '@/types';
import { formatMediaUrl } from '@/utils/urlFormatter';

interface LessonFormProps {
  initialLesson?: Lesson;
  onSubmit: (lesson: Lesson) => void;
  onCancel: () => void;
}

const LessonForm: React.FC<LessonFormProps> = ({
  initialLesson,
  onSubmit,
  onCancel,
}) => {
  const [lesson, setLesson] = useState<Lesson>(
    initialLesson || {
      id: `lesson-${Date.now()}`,
      title: '',
      description: '',
      videoUrl: '',
      files: [],
      audios: [],
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLesson((prev) => ({ ...prev, [name]: value }));
  };

  const addFile = () => {
    const newFile: ResourceFile = {
      id: `file-${Date.now()}`,
      name: 'Material de Estudo',
      url: '',
      type: 'pdf',
    };
    setLesson((prev) => ({
      ...prev,
      files: [...prev.files, newFile],
    }));
  };

  const updateFile = (index: number, field: keyof ResourceFile, value: string) => {
    setLesson((prev) => {
      const updatedFiles = [...prev.files];
      updatedFiles[index] = { ...updatedFiles[index], [field]: value };
      return { ...prev, files: updatedFiles };
    });
  };

  const removeFile = (index: number) => {
    setLesson((prev) => {
      const updatedFiles = [...prev.files];
      updatedFiles.splice(index, 1);
      return { ...prev, files: updatedFiles };
    });
  };

  const addAudio = () => {
    const newAudio: AudioResource = {
      id: `audio-${Date.now()}`,
      title: 'Áudio da Aula',
      url: '',
      transcript: '',
    };
    setLesson((prev) => ({
      ...prev,
      audios: [...prev.audios, newAudio],
    }));
  };

  const updateAudio = (index: number, field: keyof AudioResource, value: string) => {
    setLesson((prev) => {
      const updatedAudios = [...prev.audios];
      updatedAudios[index] = { ...updatedAudios[index], [field]: value };
      return { ...prev, audios: updatedAudios };
    });
  };

  const removeAudio = (index: number) => {
    setLesson((prev) => {
      const updatedAudios = [...prev.audios];
      updatedAudios.splice(index, 1);
      return { ...prev, audios: updatedAudios };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format URLs before saving
    const formattedLesson = {
      ...lesson,
      videoUrl: formatMediaUrl(lesson.videoUrl),
      files: lesson.files.map(file => ({
        ...file,
        url: formatMediaUrl(file.url)
      })),
      audios: lesson.audios.map(audio => ({
        ...audio,
        url: formatMediaUrl(audio.url)
      }))
    };
    
    onSubmit(formattedLesson);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Título da Aula</Label>
          <Input
            id="title"
            name="title"
            value={lesson.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            name="description"
            value={lesson.description}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="videoUrl">URL do Vídeo (YouTube)</Label>
          <Input
            id="videoUrl"
            name="videoUrl"
            value={lesson.videoUrl}
            onChange={handleChange}
            placeholder="https://www.youtube.com/watch?v=..."
          />
          <p className="text-xs text-muted-foreground mt-1">
            Cole qualquer formato de URL do YouTube - será convertido automaticamente
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Materiais de Estudo</Label>
            <Button type="button" variant="outline" size="sm" onClick={addFile}>
              <Plus className="h-4 w-4 mr-1" /> Adicionar Material
            </Button>
          </div>

          {lesson.files.map((file, index) => (
            <Card key={file.id}>
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between">
                  <Label htmlFor={`file-name-${index}`}>Nome do Material</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                  >
                    <Trash className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                <Input
                  id={`file-name-${index}`}
                  value={file.name}
                  onChange={(e) => updateFile(index, 'name', e.target.value)}
                />
                <Label htmlFor={`file-url-${index}`}>URL do Material</Label>
                <Input
                  id={`file-url-${index}`}
                  value={file.url}
                  onChange={(e) => updateFile(index, 'url', e.target.value)}
                  placeholder="https://drive.google.com/file/d/..."
                />
                <p className="text-xs text-muted-foreground">
                  Cole qualquer formato de URL do Google Drive - será convertido automaticamente
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Áudios</Label>
            <Button type="button" variant="outline" size="sm" onClick={addAudio}>
              <Plus className="h-4 w-4 mr-1" /> Adicionar Áudio
            </Button>
          </div>

          {lesson.audios.map((audio, index) => (
            <Card key={audio.id}>
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between">
                  <Label htmlFor={`audio-title-${index}`}>Título do Áudio</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAudio(index)}
                  >
                    <Trash className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                <Input
                  id={`audio-title-${index}`}
                  value={audio.title}
                  onChange={(e) => updateAudio(index, 'title', e.target.value)}
                />
                <Label htmlFor={`audio-url-${index}`}>URL do Áudio</Label>
                <Input
                  id={`audio-url-${index}`}
                  value={audio.url}
                  onChange={(e) => updateAudio(index, 'url', e.target.value)}
                  placeholder="https://www.dropbox.com/..."
                />
                <p className="text-xs text-muted-foreground">
                  Cole qualquer formato de URL do Dropbox - será convertido automaticamente
                </p>
                <Label htmlFor={`audio-transcript-${index}`}>Transcrição</Label>
                <Textarea
                  id={`audio-transcript-${index}`}
                  value={audio.transcript}
                  onChange={(e) => updateAudio(index, 'transcript', e.target.value)}
                  rows={3}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Salvar Aula</Button>
      </div>
    </form>
  );
};

export default LessonForm;