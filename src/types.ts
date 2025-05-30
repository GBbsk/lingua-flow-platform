
export interface Module {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  lessons: Lesson[];
  level?: string;
  progress?: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  files: ResourceFile[];
  audios: AudioResource[];
  completed?: boolean;
}

export interface ResourceFile {
  id: string;
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
