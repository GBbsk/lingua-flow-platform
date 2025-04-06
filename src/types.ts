
export interface Module {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  lessons: Lesson[];
  level?: string; // Add this line to include the level property
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  files: ResourceFile[]; // Ensure ResourceFile is used correctly
  audios: AudioResource[]; // Use AudioResource instead of Audio
  completed?: boolean; // Add this line to include the completed property
}

export interface ResourceFile {
  id: string; // Add this line to include the id property
  name: string;
  url: string;
  type: string;
}

export interface AudioResource {
  id: string;
  title: string;
  url: string;
  transcript: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student';
}
