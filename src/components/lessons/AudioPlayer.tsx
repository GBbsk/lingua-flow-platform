
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { AudioResource } from '@/types';

interface AudioPlayerProps {
  audio: AudioResource;
}

export const AudioPlayer = ({ audio }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [highlightedWords, setHighlightedWords] = useState<string[]>([]);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  
  useEffect(() => {
    // When the component mounts, create the audio element
    const audioElement = audioRef.current;
    
    if (audioElement) {
      // Set up event listeners
      audioElement.addEventListener('loadedmetadata', () => {
        setDuration(audioElement.duration);
      });
      
      audioElement.addEventListener('timeupdate', () => {
        setCurrentTime(audioElement.currentTime);
        highlightCurrentWord(audioElement.currentTime);
      });
      
      audioElement.addEventListener('ended', () => {
        setIsPlaying(false);
      });
      
      // Clean up event listeners when component unmounts
      return () => {
        audioElement.removeEventListener('loadedmetadata', () => {});
        audioElement.removeEventListener('timeupdate', () => {});
        audioElement.removeEventListener('ended', () => {});
      };
    }
  }, [audio.url]);
  
  // This is a simplified version - in a real application you would need timestamps for each word
  const highlightCurrentWord = (time: number) => {
    // Simplified implementation: We're assuming each word takes about 0.5 seconds
    // In a real app, you'd have actual timestamps for each word
    const words = audio.transcript.split(' ');
    const wordIndex = Math.floor(time * 2) % words.length;
    setHighlightedWords([words[wordIndex]]);
  };
  
  const togglePlayPause = () => {
    const audioElement = audioRef.current;
    
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
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
      <audio ref={audioRef} src={audio.url} preload="metadata" />
      
      <div className="flex items-center mb-4">
        <h3 className="text-lg font-medium">{audio.title}</h3>
      </div>
      
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
            max={duration}
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
    </div>
  );
};
