
import React from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
}

export const VideoPlayer = ({ videoUrl, title }: VideoPlayerProps) => {
  // Extract YouTube video ID if it's from YouTube
  const isYouTubeUrl = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');
  
  return (
    <div className="w-full bg-black rounded-lg overflow-hidden">
      <div className="aspect-video">
        {isYouTubeUrl ? (
          <iframe 
            src={videoUrl} 
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <video
            src={videoUrl}
            controls
            className="w-full h-full"
            title={title}
          />
        )}
      </div>
    </div>
  );
};
