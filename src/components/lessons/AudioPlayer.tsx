
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { AudioResource } from '@/types';

interface AudioPlayerProps {
  audio: AudioResource;
}

export const AudioPlayer = ({ audio }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [highlightedWords, setHighlightedWords] = useState<string[]>([]);
  const [processedUrl, setProcessedUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Melhorado o processamento da URL
  useEffect(() => {
    try {
      if (audio.url.includes('drive.google.com/file/d/')) {
        const fileIdMatch = audio.url.match(/\/d\/([^/]+)/);
        if (fileIdMatch && fileIdMatch[1]) {
          const fileId = fileIdMatch[1];
          // Usando um formato de URL alternativo que pode funcionar melhor
          setProcessedUrl(`https://drive.google.com/uc?export=download&id=${fileId}`);
          console.log("URL processada:", `https://drive.google.com/uc?export=download&id=${fileId}`);
        } else {
          setProcessedUrl(audio.url);
          console.log("URL original usada:", audio.url);
        }
      } else {
        setProcessedUrl(audio.url);
        console.log("URL original usada:", audio.url);
      }
    } catch (err) {
      console.error("Erro ao processar URL:", err);
      setProcessedUrl(audio.url);
    }
  }, [audio.url]);

  // Melhorado o gerenciamento de eventos do áudio
  useEffect(() => {
    const audioElement = audioRef.current;
    
    if (audioElement) {
      const handleLoadedMetadata = () => {
        console.log("Áudio carregado, duração:", audioElement.duration);
        setDuration(audioElement.duration);
        setError(null);
      };
      
      const handleTimeUpdate = () => {
        setCurrentTime(audioElement.currentTime);
        if (audio.transcript) {
          highlightCurrentWord(audioElement.currentTime);
        }
      };
      
      const handleEnded = () => {
        console.log("Áudio terminou");
        setIsPlaying(false);
      };
      
      const handleError = (e: Event) => {
        console.error("Erro ao carregar áudio:", e);
        setError("Não foi possível carregar o áudio. Verifique a URL ou tente novamente mais tarde.");
      };
      
      audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioElement.addEventListener('timeupdate', handleTimeUpdate);
      audioElement.addEventListener('ended', handleEnded);
      audioElement.addEventListener('error', handleError);
      
      // Tenta carregar o áudio
      audioElement.load();
      
      return () => {
        audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audioElement.removeEventListener('timeupdate', handleTimeUpdate);
        audioElement.removeEventListener('ended', handleEnded);
        audioElement.removeEventListener('error', handleError);
      };
    }
  }, [processedUrl, audio.transcript]);

  // Melhorado o destaque de palavras
  const highlightCurrentWord = (time: number) => {
    if (!audio.transcript) return;
    
    const words = audio.transcript.split(' ');
    const wordIndex = Math.floor(time * 2) % words.length;
    setHighlightedWords([words[wordIndex]]);
  };

  // Melhorado o controle de reprodução
  const togglePlayPause = () => {
    const audioElement = audioRef.current;
    
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
        setIsPlaying(false);
        console.log("Áudio pausado");
      } else {
        // Limpa qualquer erro anterior
        setError(null);
        
        audioElement.play()
          .then(() => {
            console.log("Áudio reproduzindo");
            setIsPlaying(true);
          })
          .catch(error => {
            console.error("Erro ao reproduzir áudio:", error);
            setError("Não foi possível reproduzir o áudio. Verifique se o arquivo está acessível.");
            setIsPlaying(false);
          });
      }
    }
  };

  // Restante das funções permanece igual
  const handleTimeChange = (newValue: number[]) => {
    const audioElement = audioRef.current;
    
    if (audioElement) {
      audioElement.currentTime = newValue[0];
      setCurrentTime(newValue[0]);
    }
  };

  const handleVolumeChange = (newValue: number[]) => {
    const audioElement = audioRef.current;
    
    if (audioElement) {
      const volumeValue = newValue[0];
      audioElement.volume = volumeValue;
      setVolume(volumeValue);
      setIsMuted(volumeValue === 0);
    }
  };

  const toggleMute = () => {
    const audioElement = audioRef.current;
    
    if (audioElement) {
      if (isMuted) {
        audioElement.volume = volume;
        setIsMuted(false);
      } else {
        audioElement.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="audio-player-custom">
      <audio 
        ref={audioRef} 
        src={processedUrl} 
        preload="metadata" 
        style={{ display: 'none' }}
      />
      
      <div className="flex items-center mb-4">
        <h3 className="text-lg font-medium">{audio.title}</h3>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="flex items-center space-x-4 mb-2">
        <Button 
          type="button" 
          size="icon" 
          variant="outline" 
          onClick={togglePlayPause}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        
        <div className="grow">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <Slider
            max={duration || 100}
            step={0.01}
            value={[currentTime]}
            onValueChange={handleTimeChange}
            className="w-full"
          />
        </div>
        
        <Button 
          type="button" 
          size="icon" 
          variant="ghost" 
          onClick={toggleMute}
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
        
        <div className="w-24">
          <Slider 
            max={1} 
            step={0.01} 
            value={[isMuted ? 0 : volume]} 
            onValueChange={handleVolumeChange}
            className="w-full"
          />
        </div>
      </div>
      
      {audio.transcript && (
        <div className="transcript bg-muted/50 p-4 rounded-lg mt-4">
          <h4 className="font-medium mb-2 text-sm">Transcrição:</h4>
          <p className="leading-relaxed">
            {audio.transcript.split(' ').map((word, index) => (
              <span
                key={index}
                className={highlightedWords.includes(word) ? 'highlighted-word' : ''}
              >
                {word}{' '}
              </span>
            ))}
          </p>
        </div>
      )}
    </div>
  );
};
