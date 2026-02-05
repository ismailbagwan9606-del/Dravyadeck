export type QuizType = 'mcq' | 'trueFalse' | 'fillBlank' | 'identifyDrug';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  type: QuizType;
  question: string;
  options: QuizOption[];
  correctAnswer: string;
  explanation: string;
  drugId: string;
  drugName: string;
}

export interface QuizAnswer {
  questionId: string;
  selectedOptionId: string | null;
  isCorrect: boolean;
  timeTaken?: number;
}

export interface QuizState {
  quizType: QuizType;
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  answers: QuizAnswer[];
  isComplete: boolean;
  startTime: number;
}

export interface QuizConfig {
  type: QuizType;
  questionCount: 5 | 10 | 20;
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracy: number;
  answers: QuizAnswer[];
  questions: QuizQuestion[];
  timeTaken: number;
}

export const GUEST_QUIZ_LIMIT = 3;

export const quizTypeLabels: Record<QuizType, string> = {
  mcq: 'Multiple Choice',
  trueFalse: 'True / False',
  fillBlank: 'Fill in the Blank',
  identifyDrug: 'Identify the Drug',
};

export const quizTypeDescriptions: Record<QuizType, string> = {
  mcq: 'Choose the correct answer from 4 options',
  trueFalse: 'Determine if the statement is true or false',
  fillBlank: 'Complete the sentence with the correct term',
  identifyDrug: 'Name the drug based on its properties',
};
