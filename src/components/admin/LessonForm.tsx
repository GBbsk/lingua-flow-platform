
import React, { useState } from 'react';
import { Lesson } from '@/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface LessonFormProps {
  moduleId: string;
  lesson?: Lesson;
  onSubmit: (lessonData: Partial<Lesson>) => void;
  onCancel: () => void;
}

const LessonForm: React.FC<LessonFormProps> = ({ moduleId, lesson, onSubmit, onCancel }) => {
  const [lessonTitle, setLessonTitle] = useState(lesson?.title || '');
  const [lessonDescription, setLessonDescription] = useState(lesson?.description || '');
  const [lessonVideoUrl, setLessonVideoUrl] = useState(lesson?.videoUrl || '');
  const [driveLink, setDriveLink] = useState('');
  const [dropboxLink, setDropboxLink] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newLessonData: Partial<Lesson> = {
      title: lessonTitle,
      description: lessonDescription,
      videoUrl: lessonVideoUrl,
      files: driveLink ? [{
        id: `file-${Date.now()}`,
        name: 'Material de Estudo',
        url: driveLink,
        type: 'pdf'
      }] : [],
      audios: dropboxLink ? [{
        id: `audio-${Date.now()}`,
        title: 'Áudio da Aula',
        url: dropboxLink,
        transcript: ''
      }] : []
    };

    onSubmit(newLessonData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="lessonTitle">Título da Aula</Label>
        <Input
          id="lessonTitle"
          value={lessonTitle}
          onChange={(e) => setLessonTitle(e.target.value)}
          placeholder="Ex: Introdução à Pronúncia"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="lessonDescription">Descrição</Label>
        <Textarea
          id="lessonDescription"
          value={lessonDescription}
          onChange={(e) => setLessonDescription(e.target.value)}
          placeholder="Uma breve descrição da aula"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="lessonVideoUrl">URL do Vídeo (YouTube)</Label>
        <Input
          id="lessonVideoUrl"
          value={lessonVideoUrl}
          onChange={(e) => setLessonVideoUrl(e.target.value)}
          placeholder="https://www.youtube.com/embed/..."
          required
        />
      </div>
      
      <div>
        <Label htmlFor="driveLink">Link do Google Drive</Label>
        <Input
          id="driveLink"
          value={driveLink}
          onChange={(e) => setDriveLink(e.target.value)}
          placeholder="https://drive.google.com/file/d/..."
        />
      </div>
      
      <div>
        <Label htmlFor="dropboxLink">Link do Dropbox</Label>
        <Input
          id="dropboxLink"
          value={dropboxLink}
          onChange={(e) => setDropboxLink(e.target.value)}
          placeholder="https://www.dropbox.com/scl/fi/..."
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button type="submit">Salvar Aula</Button>
      </div>
    </form>
  );
};

export default LessonForm;
