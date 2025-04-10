import React, { useState } from 'react';
import { Lesson, ResourceFile, AudioResource } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatMediaUrl } from '@/utils/urlFormatter';

interface LessonDetailViewProps {
  lesson: Lesson;
  onSave: (updatedLesson: Lesson) => void;
  onCancel: () => void;
}

const LessonDetailView: React.FC<LessonDetailViewProps> = ({
  lesson,
  onSave,
  onCancel,
}) => {
  const [editedLesson, setEditedLesson] = useState<Lesson>({...lesson});
  const [previewMode, setPreviewMode] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedLesson((prev) => ({ ...prev, [name]: value }));
  };

  const updateFile = (index: number, field: keyof ResourceFile, value: string) => {
    setEditedLesson((prev) => {
      const updatedFiles = [...prev.files];
      updatedFiles[index] = { ...updatedFiles[index], [field]: value };
      return { ...prev, files: updatedFiles };
    });
  };

  const updateAudio = (index: number, field: keyof AudioResource, value: string) => {
    setEditedLesson((prev) => {
      const updatedAudios = [...prev.audios];
      updatedAudios[index] = { ...updatedAudios[index], [field]: value };
      return { ...prev, audios: updatedAudios };
    });
  };

  const handleSave = () => {
    // Format URLs before saving
    const formattedLesson = {
      ...editedLesson,
      videoUrl: formatMediaUrl(editedLesson.videoUrl),
      files: editedLesson.files.map(file => ({
        ...file,
        url: formatMediaUrl(file.url)
      })),
      audios: editedLesson.audios.map(audio => ({
        ...audio,
        url: formatMediaUrl(audio.url)
      }))
    };
    
    onSave(formattedLesson);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Detalhes da Aula</h2>
        <div className="space-x-2">
          <Button 
            variant={previewMode ? "outline" : "default"} 
            onClick={() => setPreviewMode(false)}
          >
            Editar
          </Button>
          <Button 
            variant={previewMode ? "default" : "outline"} 
            onClick={() => setPreviewMode(true)}
          >
            Visualizar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
          <TabsTrigger value="video">Vídeo</TabsTrigger>
          <TabsTrigger value="files">Materiais</TabsTrigger>
          <TabsTrigger value="audios">Áudios</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          {previewMode ? (
            <Card>
              <CardHeader>
                <CardTitle>{editedLesson.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{editedLesson.description}</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div>
                <Label htmlFor="title">Título da Aula</Label>
                <Input
                  id="title"
                  name="title"
                  value={editedLesson.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={editedLesson.description}
                  onChange={handleChange}
                  rows={3}
                />
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="video" className="space-y-4">
          {previewMode ? (
            <Card>
              <CardHeader>
                <CardTitle>Vídeo da Aula</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video">
                  <iframe 
                    src={editedLesson.videoUrl} 
                    className="w-full h-full" 
                    allowFullScreen
                    title="Vídeo da aula"
                  ></iframe>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium">URL do vídeo:</p>
                  <code className="text-xs bg-muted p-2 rounded block mt-1 overflow-x-auto">
                    {editedLesson.videoUrl}
                  </code>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div>
              <Label htmlFor="videoUrl">URL do Vídeo (YouTube)</Label>
              <Input
                id="videoUrl"
                name="videoUrl"
                value={editedLesson.videoUrl}
                onChange={handleChange}
                placeholder="https://www.youtube.com/watch?v=..."
              />
              <p className="text-xs text-muted-foreground mt-1">
                Cole qualquer formato de URL do YouTube - será convertido automaticamente
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="files" className="space-y-4">
          {editedLesson.files.map((file, index) => (
            <Card key={file.id}>
              <CardContent className="p-4 space-y-3">
                {previewMode ? (
                  <>
                    <h3 className="font-medium">{file.name}</h3>
                    <div className="aspect-[4/3] bg-muted rounded-md">
                      <iframe 
                        src={file.url} 
                        className="w-full h-full" 
                        allowFullScreen
                        title={file.name}
                      ></iframe>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-medium">URL do material:</p>
                      <code className="text-xs bg-muted p-2 rounded block mt-1 overflow-x-auto">
                        {file.url}
                      </code>
                    </div>
                  </>
                ) : (
                  <>
                    <Label htmlFor={`file-name-${index}`}>Nome do Material</Label>
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
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="audios" className="space-y-4">
          {editedLesson.audios.map((audio, index) => (
            <Card key={audio.id}>
              <CardContent className="p-4 space-y-3">
                {previewMode ? (
                  <>
                    <h3 className="font-medium">{audio.title}</h3>
                    <audio controls className="w-full mt-2">
                      <source src={audio.url} type="audio/mpeg" />
                      Seu navegador não suporta o elemento de áudio.
                    </audio>
                    <div className="mt-2">
                      <p className="text-sm font-medium">URL do áudio:</p>
                      <code className="text-xs bg-muted p-2 rounded block mt-1 overflow-x-auto">
                        {audio.url}
                      </code>
                    </div>
                    {audio.transcript && (
                      <div className="mt-4">
                        <p className="text-sm font-medium">Transcrição:</p>
                        <div className="bg-muted p-2 rounded mt-1">
                          <p className="text-sm whitespace-pre-wrap">{audio.transcript}</p>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <Label htmlFor={`audio-title-${index}`}>Título do Áudio</Label>
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
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="button" onClick={handleSave} disabled={previewMode}>
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
};

export default LessonDetailView;