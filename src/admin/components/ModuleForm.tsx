import React, { useState } from 'react';
import { Module as ImportedModule } from "../../types";

interface ModuleFormProps {
  initialData?: ImportedModule;
  onSubmit: (moduleData: ImportedModule) => void;
}

const ModuleForm: React.FC<ModuleFormProps> = ({ initialData, onSubmit }) => {
  const [moduleData, setModuleData] = useState<ImportedModule>(
    initialData || {
      id: `module-${Date.now()}`,
      title: '',
      description: '',
      thumbnail: '/placeholder.svg',
      lessons: []
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setModuleData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(moduleData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={moduleData.title}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <label htmlFor="description">Descrição:</label>
        <textarea
          id="description"
          name="description"
          value={moduleData.description}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <label htmlFor="thumbnail">URL da Thumbnail:</label>
        <input
          type="text"
          id="thumbnail"
          name="thumbnail"
          value={moduleData.thumbnail}
          onChange={handleChange}
        />
      </div>
      
      <button type="submit">
        {initialData ? 'Atualizar Módulo' : 'Criar Módulo'}
      </button>
    </form>
  );
};

export default ModuleForm;