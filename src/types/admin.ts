export interface Admin {
  id: string;
  name: string;
  email: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  content: string;
  order: number;
  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  lessonId: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}