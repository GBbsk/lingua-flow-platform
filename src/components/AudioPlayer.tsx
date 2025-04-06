import React, { useState } from 'react';

interface AudioPlayerProps {
  audioUrl: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    const audioElement = document.getElementById('audio-player') as HTMLAudioElement;
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play().catch(error => {
          console.error("Error playing audio:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div>
      <audio id="audio-player" controls>
        <source src={audioUrl} type="audio/mpeg" />
        Seu navegador não suporta o elemento de áudio.
      </audio>
      <button onClick={togglePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default AudioPlayer;