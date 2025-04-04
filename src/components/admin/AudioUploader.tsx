
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AudioResource } from '@/types';
import { Upload, Music, X } from 'lucide-react';
import { toast } from 'sonner';

interface AudioUploaderProps {
  onAudioUploaded: (audio: AudioResource) => void;
}

export const AudioUploader = ({ onAudioUploaded }: AudioUploaderProps) => {
  const audioInputRef = useRef<HTMLInputElement>(null);
  const [selectedAudio, setSelectedAudio] = useState<File | null>(null);
  const [audioTitle, setAudioTitle] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [transcript, setTranscript] = useState('');
  
  const handleAudioSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    // Create a local URL for the file
    const url = URL.createObjectURL(file);
    
    // Set audio info
    setSelectedAudio(file);
    setAudioTitle(file.name.replace(/\.[^/.]+$/, "")); // Remove extension
    setAudioUrl(url);
    
    // Reset file input
    if (audioInputRef.current) {
      audioInputRef.current.value = '';
    }
    
    toast.success('Áudio selecionado com sucesso!');
  };
  
  const handleSubmit = () => {
    if (!audioTitle || !audioUrl) {
      toast.error('Preencha o título do áudio');
      return;
    }
    
    // Create audio resource and pass to parent
    const audioResource: AudioResource = {
      id: `audio-${Date.now()}`,
      title: audioTitle,
      url: audioUrl,
      transcript: transcript,
    };
    
    onAudioUploaded(audioResource);
    
    // Reset state
    resetForm();
  };
  
  const resetForm = () => {
    setSelectedAudio(null);
    setAudioTitle('');
    setAudioUrl('');
    setTranscript('');
  };
  
  return (
    <div className="space-y-4">
      <div className="border border-dashed rounded-lg p-4 text-center bg-muted/30 hover:bg-muted/50 transition-colors">
        <input
          type="file"
          ref={audioInputRef}
          onChange={handleAudioSelect}
          className="hidden"
          accept="audio/*"
        />
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => audioInputRef.current?.click()}
          className="w-full h-20 flex flex-col items-center justify-center gap-2 border-2 border-dashed"
        >
          <Upload className="h-6 w-6" />
          <span>Clique para selecionar um áudio</span>
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          Formatos aceitos: MP3, WAV, etc.
        </p>
      </div>
      
      {selectedAudio && (
        <div className="space-y-4 border rounded-md p-4 bg-background">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Music className="h-5 w-5 mr-2 text-muted-foreground" />
              <span className="text-sm font-medium">{selectedAudio.name}</span>
            </div>
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              onClick={resetForm}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <audio src={audioUrl} controls className="w-full" />
          
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="audioTitle">Título do Áudio</Label>
              <Input
                id="audioTitle"
                value={audioTitle}
                onChange={(e) => setAudioTitle(e.target.value)}
                placeholder="Ex: Pronúncia de Cumprimentos"
                className="bg-muted/30"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="transcript">Transcrição</Label>
              <Textarea
                id="transcript"
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Hello! Good morning! How are you?"
                rows={3}
                className="bg-muted/30"
              />
            </div>
            
            <Button 
              type="button" 
              onClick={handleSubmit} 
              className="w-full"
            >
              Adicionar Áudio
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
