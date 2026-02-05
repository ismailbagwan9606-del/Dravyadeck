import { VyadhiQAFlashcard, VyadhiTopic } from "@/data/rogaNidanaData";

export type RogaNidanaQuizType = 'viva' | 'mcq';

export interface RogaNidanaQuizQuestion {
  id: string;
  flashcard: VyadhiQAFlashcard;
  type: RogaNidanaQuizType;
  options?: string[]; // For MCQ type
  correctOptionIndex?: number; // For MCQ type
}

export interface RogaNidanaQuizAnswer {
  questionId: string;
  wasCorrect: boolean; // Self-assessed for viva
  selectedOptionIndex?: number; // For MCQ
  timeTaken?: number;
}

export interface RogaNidanaQuizConfig {
  type: RogaNidanaQuizType;
  questionCount: 5 | 10 | 20;
  selectedTopics: string[]; // Topic IDs, empty = all topics
}

export interface RogaNidanaQuizResult {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracy: number;
  answers: RogaNidanaQuizAnswer[];
  questions: RogaNidanaQuizQuestion[];
  timeTaken: number;
}

export const GUEST_ROGA_NIDANA_QUIZ_LIMIT = 3;

export const rogaNidanaQuizTypeLabels: Record<RogaNidanaQuizType, string> = {
  viva: 'Viva Voce',
  mcq: 'Multiple Choice',
};

export const rogaNidanaQuizTypeDescriptions: Record<RogaNidanaQuizType, string> = {
  viva: 'Oral exam style - reveal answer and self-assess',
  mcq: 'Choose the correct answer from 4 options',
};
