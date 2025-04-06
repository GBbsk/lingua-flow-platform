export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  files: ResourceFile[];
  audios: AudioResource[];
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