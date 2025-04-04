
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ResourceFile } from '@/types';
import { FileIcon, FileTextIcon, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileResourceProps {
  file: ResourceFile;
}

export const FileResource = ({ file }: FileResourceProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const getFileIcon = () => {
    switch (file.type) {
      case 'pdf':
        return <FileTextIcon className="h-4 w-4" />;
      case 'image':
      case 'png':
      case 'jpg':
      case 'jpeg':
        return <ImageIcon className="h-4 w-4" />;
      default:
        return <FileIcon className="h-4 w-4" />;
    }
  };
  
  const canPreview = ['pdf', 'image', 'png', 'jpg', 'jpeg'].includes(file.type);
  
  return (
    <>
      <div 
        className="flex items-center p-3 rounded-md border bg-card hover:bg-muted/50 cursor-pointer transition-colors"
        onClick={() => canPreview ? setIsOpen(true) : window.open(file.url, '_blank')}
      >
        <span className="flex-shrink-0 mr-3 text-muted-foreground">
          {getFileIcon()}
        </span>
        <div className="flex-grow">
          <h3 className="text-sm font-medium">{file.name}</h3>
          <p className="text-xs text-muted-foreground uppercase">{file.type}</p>
        </div>
        <Button 
          size="sm" 
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            window.open(file.url, '_blank');
          }}
        >
          Download
        </Button>
      </div>
      
      {canPreview && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>{file.name}</DialogTitle>
            </DialogHeader>
            {file.type === 'pdf' ? (
              <iframe 
                src={file.url} 
                className="w-full h-[70vh]" 
                title={file.name} 
              />
            ) : (
              <img 
                src={file.url} 
                alt={file.name} 
                className="max-w-full max-h-[70vh] mx-auto" 
              />
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
