
import React, { useState, useRef } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileIcon, ImageIcon, Music, Trash2, CheckCircle, AlertCircle, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadDate: Date;
}

const UploadsPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploadedAudios, setUploadedAudios] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate file upload
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            addUploadedFiles(files);
            setIsUploading(false);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };
  
  const handleAudioSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate file upload
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            addUploadedAudios(files);
            setIsUploading(false);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };
  
  const addUploadedFiles = (files: FileList) => {
    const newFiles: UploadedFile[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Create a local URL for the file
      const url = URL.createObjectURL(file);
      
      newFiles.push({
        id: `file-${Date.now()}-${i}`,
        name: file.name,
        size: file.size,
        type: file.type.split('/')[1] || 'unknown',
        url: url,
        uploadDate: new Date(),
      });
    }
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
    toast.success(`${newFiles.length} arquivo(s) enviado(s) com sucesso`);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const addUploadedAudios = (files: FileList) => {
    const newFiles: UploadedFile[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Create a local URL for the file
      const url = URL.createObjectURL(file);
      
      newFiles.push({
        id: `audio-${Date.now()}-${i}`,
        name: file.name,
        size: file.size,
        type: file.type.split('/')[1] || 'unknown',
        url: url,
        uploadDate: new Date(),
      });
    }
    
    setUploadedAudios(prev => [...prev, ...newFiles]);
    toast.success(`${newFiles.length} áudio(s) enviado(s) com sucesso`);
    
    // Reset file input
    if (audioInputRef.current) {
      audioInputRef.current.value = '';
    }
  };
  
  const deleteFile = (id: string, isAudio: boolean) => {
    if (isAudio) {
      setUploadedAudios(prev => prev.filter(file => file.id !== id));
    } else {
      setUploadedFiles(prev => prev.filter(file => file.id !== id));
    }
    toast.success('Arquivo removido com sucesso');
  };
  
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  
  const getFileIcon = (type: string) => {
    const imageTypes = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'image'];
    const audioTypes = ['mp3', 'wav', 'ogg', 'audio'];
    
    if (imageTypes.includes(type.toLowerCase())) {
      return <ImageIcon className="h-5 w-5" />;
    } else if (audioTypes.includes(type.toLowerCase())) {
      return <Music className="h-5 w-5" />;
    } else {
      return <FileIcon className="h-5 w-5" />;
    }
  };
  
  return (
    <div className="container py-8">
      <PageHeader 
        title="Gerenciador de Arquivos"
        description="Faça upload e gerencie arquivos e áudios para seu curso"
      />
      
      <Tabs defaultValue="files" className="space-y-6">
        <TabsList>
          <TabsTrigger value="files">Arquivos</TabsTrigger>
          <TabsTrigger value="audios">Áudios</TabsTrigger>
        </TabsList>
        
        <TabsContent value="files">
          <Card>
            <CardHeader>
              <CardTitle>Upload de Arquivos</CardTitle>
              <CardDescription>
                Faça upload de PDFs, documentos, imagens e outros materiais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex-grow">
                    <Label htmlFor="file-upload" className="sr-only">Escolher arquivo</Label>
                    <Input
                      id="file-upload"
                      type="file"
                      multiple
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      className="cursor-pointer"
                    />
                  </div>
                  <Button disabled={isUploading}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
                
                {isUploading && (
                  <div className="mt-4">
                    <div className="text-sm flex justify-between mb-1">
                      <span>Enviando...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-200" 
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="rounded-md border overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted text-left">
                      <th className="p-3 font-medium text-sm">Nome</th>
                      <th className="p-3 font-medium text-sm">Tipo</th>
                      <th className="p-3 font-medium text-sm">Tamanho</th>
                      <th className="p-3 font-medium text-sm">Data</th>
                      <th className="p-3 font-medium text-sm">Status</th>
                      <th className="p-3 font-medium text-sm w-20">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {uploadedFiles.length > 0 ? (
                      uploadedFiles.map(file => (
                        <tr key={file.id} className="hover:bg-muted/50">
                          <td className="p-3 flex items-center gap-2">
                            <span className="text-muted-foreground">
                              {getFileIcon(file.type)}
                            </span>
                            <span className="truncate max-w-[200px]">{file.name}</span>
                          </td>
                          <td className="p-3 uppercase text-xs">{file.type}</td>
                          <td className="p-3 text-sm">{formatFileSize(file.size)}</td>
                          <td className="p-3 text-sm">
                            {file.uploadDate.toLocaleDateString()}
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1 text-success">
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-xs">Pronto</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => deleteFile(file.id, false)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center p-8 text-muted-foreground">
                          Nenhum arquivo enviado ainda
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="audios">
          <Card>
            <CardHeader>
              <CardTitle>Upload de Áudios</CardTitle>
              <CardDescription>
                Faça upload de áudios para pronúncia e exercícios de compreensão
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex-grow">
                    <Label htmlFor="audio-upload" className="sr-only">Escolher áudio</Label>
                    <Input
                      id="audio-upload"
                      type="file"
                      multiple
                      accept="audio/*"
                      ref={audioInputRef}
                      onChange={handleAudioSelect}
                      className="cursor-pointer"
                    />
                  </div>
                  <Button disabled={isUploading}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
                
                {isUploading && (
                  <div className="mt-4">
                    <div className="text-sm flex justify-between mb-1">
                      <span>Enviando...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-200" 
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="rounded-md border overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted text-left">
                      <th className="p-3 font-medium text-sm">Nome</th>
                      <th className="p-3 font-medium text-sm">Tipo</th>
                      <th className="p-3 font-medium text-sm">Tamanho</th>
                      <th className="p-3 font-medium text-sm">Data</th>
                      <th className="p-3 font-medium text-sm">Status</th>
                      <th className="p-3 font-medium text-sm w-20">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {uploadedAudios.length > 0 ? (
                      uploadedAudios.map(file => (
                        <tr key={file.id} className="hover:bg-muted/50">
                          <td className="p-3 flex items-center gap-2">
                            <span className="text-muted-foreground">
                              <Music className="h-5 w-5" />
                            </span>
                            <span className="truncate max-w-[200px]">{file.name}</span>
                          </td>
                          <td className="p-3 uppercase text-xs">{file.type}</td>
                          <td className="p-3 text-sm">{formatFileSize(file.size)}</td>
                          <td className="p-3 text-sm">
                            {file.uploadDate.toLocaleDateString()}
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1 text-success">
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-xs">Pronto</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => deleteFile(file.id, true)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center p-8 text-muted-foreground">
                          Nenhum áudio enviado ainda
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UploadsPage;
