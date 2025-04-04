
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Module } from '@/types';
import { toast } from 'sonner';

interface ModuleFormProps {
  module?: Module;
  onSubmit: (moduleData: Partial<Module>) => void;
  onCancel: () => void;
}

export const ModuleForm = ({ module, onSubmit, onCancel }: ModuleFormProps) => {
  const [title, setTitle] = React.useState(module?.title || '');
  const [description, setDescription] = React.useState(module?.description || '');
  const [thumbnail, setThumbnail] = React.useState(module?.thumbnail || '');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error('Por favor, insira um título');
      return;
    }
    
    onSubmit({
      title,
      description,
      thumbnail: thumbnail || undefined,
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título do Módulo</Label>
        <Input 
          id="title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Introdução ao Inglês"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea 
          id="description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Uma breve descrição do módulo"
          rows={3}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="thumbnail">Imagem de Capa (URL)</Label>
        <Input 
          id="thumbnail" 
          value={thumbnail} 
          onChange={(e) => setThumbnail(e.target.value)}
          placeholder="https://exemplo.com/imagem.jpg"
        />
        {thumbnail && (
          <div className="mt-2 rounded-md overflow-hidden border w-32 h-24">
            <img 
              src={thumbnail} 
              alt="Thumbnail preview" 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
          </div>
        )}
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {module ? 'Atualizar Módulo' : 'Criar Módulo'}
        </Button>
      </div>
    </form>
  );
};
