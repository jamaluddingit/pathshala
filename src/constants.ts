import { Exam, Note, Candidate } from './types';

export const EXAMS: Exam[] = [
  { id: '1', title: 'গণিত ফাইনাল পরীক্ষা', date: '2026-04-15', duration: 120, subject: 'গণিত' },
  { id: '2', title: 'পদার্থবিজ্ঞান মিডটার্ম', date: '2026-04-20', duration: 90, subject: 'পদার্থবিজ্ঞান' },
  { id: '3', title: 'রসায়ন কুইজ', date: '2026-04-25', duration: 45, subject: 'রসায়ন' },
];

export const NOTES: Note[] = [
  { id: '1', title: 'সহজ ক্যালকুলাস', author: 'অধ্যাপক স্মিথ', price: 15.99, subject: 'গণিত', rating: 4.8, previewUrl: 'https://picsum.photos/seed/math/400/600' },
  { id: '2', title: 'জৈব রসায়নের মূলকথা', author: 'ডাঃ জেন', price: 12.50, subject: 'রসায়ন', rating: 4.5, previewUrl: 'https://picsum.photos/seed/chem/400/600' },
  { id: '3', title: 'কোয়ান্টাম মেকানিক্স পরিচিতি', author: 'আলবার্ট ই.', price: 25.00, subject: 'পদার্থবিজ্ঞান', rating: 4.9, previewUrl: 'https://picsum.photos/seed/physics/400/600' },
];

export const CANDIDATES: Candidate[] = [
  { id: '1', name: 'রহিম আহমেদ', division: 'ঢাকা', position: 'সভাপতি', votes: 1250 },
  { id: '2', name: 'করিম উল্লাহ', division: 'চট্টগ্রাম', position: 'সম্পাদক', votes: 980 },
  { id: '3', name: 'ফাতিমা বেগম', division: 'সিলেট', position: 'কোষাধ্যক্ষ', votes: 1100 },
];
