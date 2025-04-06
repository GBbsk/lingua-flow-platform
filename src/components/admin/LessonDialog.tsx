// ... existing imports ...
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import LessonForm from './LessonForm';
import { Lesson } from '@/types'; // Add this import

interface LessonDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (lessonData: Partial<Lesson>) => void;
  initialData?: Lesson;
}

export function LessonDialog({ open, onClose, onSubmit, initialData }: LessonDialogProps) {
  const [lessonData, setLessonData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    videoUrl: initialData?.videoUrl || '',
    driveLink: '',
    dropboxLink: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format video URL if needed
    const videoUrl = lessonData.videoUrl.includes('embed') 
      ? lessonData.videoUrl 
      : lessonData.videoUrl.replace('watch?v=', 'embed/');

    // Create the lesson data
    const newLessonData: Partial<Lesson> = {
      title: lessonData.title,
      description: lessonData.description,
      videoUrl,
      files: lessonData.driveLink ? [{
        id: `file-${Date.now()}`,
        name: 'Material de Estudo',
        url: lessonData.driveLink,
        type: 'pdf'
      }] : [],
      audios: lessonData.dropboxLink ? [{
        id: `audio-${Date.now()}`,
        title: 'Áudio da Aula',
        url: lessonData.dropboxLink,
        transcript: ''
      }] : []
    };

    onSubmit(newLessonData);
  };

  // ... rest of the component with form fields for links ...
}