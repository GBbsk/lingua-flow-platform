
import React, { useState } from 'react';
import { Module } from '@/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface ModuleFormProps {
  module?: Module;
  onSubmit: (moduleData: Partial<Module>) => void;
  onCancel: () => void;
}

const ModuleForm: React.FC<ModuleFormProps> = ({ module, onSubmit, onCancel }) => {
  const [moduleTitle, setModuleTitle] = useState(module?.title || '');
  const [moduleDescription, setModuleDescription] = useState(module?.description || '');
  const [moduleThumbnail, setModuleThumbnail] = useState(module?.thumbnail || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newModuleData: Partial<Module> = {
      title: moduleTitle,
      description: moduleDescription,
      thumbnail: moduleThumbnail,
    };

    onSubmit(newModuleData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="moduleTitle">Título do Módulo</Label>
        <Input
          id="moduleTitle"
          value={moduleTitle}
          onChange={(e) => setModuleTitle(e.target.value)}
          placeholder="Ex: Introdução ao Inglês"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="moduleDescription">Descrição</Label>
        <Textarea
          id="moduleDescription"
          value={moduleDescription}
          onChange={(e) => setModuleDescription(e.target.value)}
          placeholder="Uma breve descrição do módulo"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="moduleThumbnail">URL da Thumbnail</Label>
        <Input
          id="moduleThumbnail"
          value={moduleThumbnail}
          onChange={(e) => setModuleThumbnail(e.target.value)}
          placeholder="https://example.com/thumbnail.jpg"
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button type="submit">Salvar Módulo</Button>
      </div>
    </form>
  );
};

export default ModuleForm;
