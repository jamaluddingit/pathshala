export type UserRole = 'student' | 'coaching' | 'parent' | 'candidate' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Exam {
  id: string;
  title: string;
  date: string;
  duration: number; // in minutes
  subject: string;
}

export interface Note {
  id: string;
  title: string;
  author: string;
  price: number;
  subject: string;
  rating: number;
  previewUrl: string;
}

export interface Candidate {
  id: string;
  name: string;
  division: string;
  position: string;
  votes: number;
}
