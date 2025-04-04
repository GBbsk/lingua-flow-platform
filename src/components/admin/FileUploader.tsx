
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ResourceFile } from '@/types';
import { Upload, File, X } from 'lucide-react';
import { toast } from 'sonner';

interface FileUploaderProps {
  onFileUploaded: (file: ResourceFile) => void;
}

export const FileUploader = ({ onFileUploaded }: FileUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    // Create a local URL for the file
    const url = URL.createObjectURL(file);
    
    // Set file info
    setSelectedFile(file);
    setFileName(file.name);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    // Create resource file and pass to parent
    const resourceFile: ResourceFile = {
      id: `file-${Date.now()}`,
      name: file.name,
      url: url,
      type: file.type.split('/')[1] || 'file',
    };
    
    onFileUploaded(resourceFile);
    
    // Reset state
    setSelectedFile(null);
    setFileName('');
    
    toast.success('Arquivo selecionado com sucesso!');
  };
  
  const cancelFileSelection = () => {
    setSelectedFile(null);
    setFileName('');
  };
  
  return (
    <div className="space-y-4">
      <div className="border border-dashed rounded-lg p-4 text-center bg-muted/30 hover:bg-muted/50 transition-colors">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png"
        />
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-20 flex flex-col items-center justify-center gap-2 border-2 border-dashed"
        >
          <Upload className="h-6 w-6" />
          <span>Clique para selecionar um arquivo</span>
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          Formatos aceitos: PDF, DOCX, imagens, etc.
        </p>
      </div>
      
      {selectedFile && (
        <div className="flex items-center p-3 rounded-md border bg-secondary">
          <File className="h-5 w-5 mr-2 text-muted-foreground" />
          <div className="flex-grow">
            <p className="text-sm font-medium truncate">{fileName}</p>
            <p className="text-xs text-muted-foreground">{selectedFile.size} bytes</p>
          </div>
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            onClick={cancelFileSelection}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
