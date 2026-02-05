import { useState, useCallback, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { rogaNidanaFlashcards, vyadhiTopics } from "@/data/rogaNidanaData";
import {
  RogaNidanaQuizType,
  RogaNidanaQuizConfig,
  RogaNidanaQuizQuestion,
  RogaNidanaQuizAnswer,
  RogaNidanaQuizResult,
  GUEST_ROGA_NIDANA_QUIZ_LIMIT,
} from "@/types/rogaNidanaQuiz";

type QuizPhase = 'selection' | 'playing' | 'feedback' | 'results';

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateMCQOptions(correctAnswer: string, allAnswers: string[]): { options: string[]; correctIndex: number } {
  // Get unique wrong answers
  const wrongAnswers = shuffleArray(
    allAnswers.filter(a => a !== correctAnswer)
  ).slice(0, 3);
  
  // Combine and shuffle
  const options = shuffleArray([correctAnswer, ...wrongAnswers]);
  const correctIndex = options.indexOf(correctAnswer);
  
  return { options, correctIndex };
}

export function useRogaNidanaQuiz() {
  const { user } = useAuth();
  const isGuest = !user;

  const [phase, setPhase] = useState<QuizPhase>('selection');
  const [questions, setQuestions] = useState<RogaNidanaQuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<RogaNidanaQuizAnswer[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [quizType, setQuizType] = useState<RogaNidanaQuizType>('viva');
  const [showAnswer, setShowAnswer] = useState(false);

  const currentQuestion = questions[currentIndex] || null;
  const guestLimit = GUEST_ROGA_NIDANA_QUIZ_LIMIT;

  const generateQuestions = useCallback((config: RogaNidanaQuizConfig): RogaNidanaQuizQuestion[] => {
    let flashcardPool = [...rogaNidanaFlashcards];
    
    // Filter by selected topics if any
    if (config.selectedTopics.length > 0) {
      flashcardPool = flashcardPool.filter(fc => 
        config.selectedTopics.includes(fc.vyadhiId)
      );
    }

    // Shuffle and take required count
    const effectiveCount = isGuest 
      ? Math.min(config.questionCount, guestLimit)
      : config.questionCount;
    
    const selectedFlashcards = shuffleArray(flashcardPool).slice(0, effectiveCount);
    
    // Get all answers for MCQ options
    const allAnswers = rogaNidanaFlashcards.map(fc => fc.back);

    return selectedFlashcards.map((flashcard): RogaNidanaQuizQuestion => {
      if (config.type === 'mcq') {
        const { options, correctIndex } = generateMCQOptions(flashcard.back, allAnswers);
        return {
          id: flashcard.id,
          flashcard,
          type: 'mcq',
          options,
          correctOptionIndex: correctIndex,
        };
      }
      
      return {
        id: flashcard.id,
        flashcard,
        type: 'viva',
      };
    });
  }, [isGuest, guestLimit]);

  const startQuiz = useCallback((config: RogaNidanaQuizConfig) => {
    const generatedQuestions = generateQuestions(config);
    setQuestions(generatedQuestions);
    setQuizType(config.type);
    setCurrentIndex(0);
    setAnswers([]);
    setStartTime(Date.now());
    setShowAnswer(false);
    setPhase('playing');
  }, [generateQuestions]);

  const revealAnswer = useCallback(() => {
    setShowAnswer(true);
  }, []);

  const submitVivaAnswer = useCallback((wasCorrect: boolean) => {
    if (!currentQuestion) return;

    const answer: RogaNidanaQuizAnswer = {
      questionId: currentQuestion.id,
      wasCorrect,
      timeTaken: Date.now() - startTime,
    };

    setAnswers(prev => [...prev, answer]);
    setPhase('feedback');
  }, [currentQuestion, startTime]);

  const submitMCQAnswer = useCallback((selectedIndex: number) => {
    if (!currentQuestion || currentQuestion.type !== 'mcq') return;

    const isCorrect = selectedIndex === currentQuestion.correctOptionIndex;
    const answer: RogaNidanaQuizAnswer = {
      questionId: currentQuestion.id,
      wasCorrect: isCorrect,
      selectedOptionIndex: selectedIndex,
      timeTaken: Date.now() - startTime,
    };

    setAnswers(prev => [...prev, answer]);
    setPhase('feedback');
  }, [currentQuestion, startTime]);

  const nextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowAnswer(false);
      setPhase('playing');
    } else {
      // Quiz complete
      setPhase('results');
    }
  }, [currentIndex, questions.length]);

  const result = useMemo((): RogaNidanaQuizResult | null => {
    if (phase !== 'results') return null;

    const correctCount = answers.filter(a => a.wasCorrect).length;
    const totalTime = Date.now() - startTime;

    return {
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      incorrectAnswers: questions.length - correctCount,
      accuracy: Math.round((correctCount / questions.length) * 100),
      answers,
      questions,
      timeTaken: totalTime,
    };
  }, [phase, answers, questions, startTime]);

  const resetQuiz = useCallback(() => {
    setPhase('selection');
    setQuestions([]);
    setCurrentIndex(0);
    setAnswers([]);
    setShowAnswer(false);
  }, []);

  const retryQuiz = useCallback(() => {
    // Reshuffle the same questions
    const reshuffled = shuffleArray(questions);
    setQuestions(reshuffled);
    setCurrentIndex(0);
    setAnswers([]);
    setStartTime(Date.now());
    setShowAnswer(false);
    setPhase('playing');
  }, [questions]);

  return {
    phase,
    quizType,
    questions,
    currentIndex,
    currentQuestion,
    answers,
    result,
    isGuest,
    guestLimit,
    showAnswer,
    startQuiz,
    revealAnswer,
    submitVivaAnswer,
    submitMCQAnswer,
    nextQuestion,
    resetQuiz,
    retryQuiz,
  };
}
