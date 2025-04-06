
import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileIcon, ImageIcon, Music, Trash2, CheckCircle, Link } from 'lucide-react';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';

interface ResourceLink {
  id: string;
  name: string;
  url: string;
  type: string;
  uploadDate: Date;
}

const UploadsPage = () => {
  const [driveLinks, setDriveLinks] = useState<ResourceLink[]>([]);
  const [dropboxLinks, setDropboxLinks] = useState<ResourceLink[]>([]);
  const [newDriveLink, setNewDriveLink] = useState({ name: '', url: '' });
  const [newDropboxLink, setNewDropboxLink] = useState({ name: '', url: '' });

  const handleDriveLinkAdd = () => {
    if (!newDriveLink.name || !newDriveLink.url) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    const newResource: ResourceLink = {
      id: `drive-${Date.now()}`,
      name: newDriveLink.name,
      url: newDriveLink.url,
      type: 'pdf',
      uploadDate: new Date(),
    };

    setDriveLinks(prev => [...prev, newResource]);
    setNewDriveLink({ name: '', url: '' });
    toast.success('Link do Google Drive adicionado com sucesso');
  };

  const handleDropboxLinkAdd = () => {
    if (!newDropboxLink.name || !newDropboxLink.url) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    // Ensure the Dropbox link ends with raw=1
    const url = newDropboxLink.url.includes('?') 
      ? `${newDropboxLink.url}&raw=1` 
      : `${newDropboxLink.url}?raw=1`;

    const newResource: ResourceLink = {
      id: `dropbox-${Date.now()}`,
      name: newDropboxLink.name,
      url,
      type: 'audio',
      uploadDate: new Date(),
    };

    setDropboxLinks(prev => [...prev, newResource]);
    setNewDropboxLink({ name: '', url: '' });
    toast.success('Link do Dropbox adicionado com sucesso');
  };

  const deleteLink = (id: string, isDropbox: boolean) => {
    if (isDropbox) {
      setDropboxLinks(prev => prev.filter(link => link.id !== id));
    } else {
      setDriveLinks(prev => prev.filter(link => link.id !== id));
    }
    toast.success('Link removido com sucesso');
  };

  return (
    <div className="container py-8">
      <PageHeader 
        title="Gerenciador de Links"
        description="Gerencie os links do Google Drive e Dropbox para seu curso"
      />
      
      <Tabs defaultValue="drive" className="space-y-6">
        <TabsList>
          <TabsTrigger value="drive">Google Drive</TabsTrigger>
          <TabsTrigger value="dropbox">Dropbox</TabsTrigger>
        </TabsList>
        
        <TabsContent value="drive">
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Link do Google Drive</CardTitle>
              <CardDescription>
                Adicione links de documentos do Google Drive
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Nome do Arquivo</Label>
                  <Input
                    value={newDriveLink.name}
                    onChange={(e) => setNewDriveLink(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ex: Material de Estudo PDF"
                  />
                </div>
                <div>
                  <Label>Link do Google Drive</Label>
                  <Input
                    value={newDriveLink.url}
                    onChange={(e) => setNewDriveLink(prev => ({ ...prev, url: e.target.value }))}
                    placeholder="https://drive.google.com/file/d/..."
                  />
                </div>
                <Button onClick={handleDriveLinkAdd}>
                  <Link className="h-4 w-4 mr-2" />
                  Adicionar Link
                </Button>
              </div>

              {/* Lista de links do Drive */}
              <div className="mt-6">
                {driveLinks.map(link => (
                  <div key={link.id} className="flex items-center justify-between p-3 border-b">
                    <div className="flex items-center gap-2">
                      <FileIcon className="h-5 w-5" />
                      <span>{link.name}</span>
                    </div>
                    <Button variant="destructive" size="sm" onClick={() => deleteLink(link.id, false)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Similar structure for Dropbox tab */}
        <TabsContent value="dropbox">
          {/* ... Similar structure as Drive tab, but for Dropbox links ... */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UploadsPage;
