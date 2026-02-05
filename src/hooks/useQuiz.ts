import { useState, useCallback } from 'react';
import { QuizType, QuizQuestion, QuizAnswer, QuizResult, QuizConfig, GUEST_QUIZ_LIMIT } from '@/types/quiz';
import { generateQuiz, calculateResults } from '@/lib/quizGenerator';
import { useAuth } from '@/contexts/AuthContext';

export type QuizPhase = 'selection' | 'playing' | 'feedback' | 'results';

export const useQuiz = () => {
  const { user } = useAuth();
  const [phase, setPhase] = useState<QuizPhase>('selection');
  const [config, setConfig] = useState<QuizConfig | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [startTime, setStartTime] = useState(0);
  const [result, setResult] = useState<QuizResult | null>(null);

  const effectiveQuestionCount = useCallback((count: number) => {
    if (!user) {
      return Math.min(count, GUEST_QUIZ_LIMIT);
    }
    return count;
  }, [user]);

  const startQuiz = useCallback((quizConfig: QuizConfig) => {
    const count = effectiveQuestionCount(quizConfig.questionCount);
    const generatedQuestions = generateQuiz(quizConfig.type, count);
    
    setConfig({ ...quizConfig, questionCount: count as 5 | 10 | 20 });
    setQuestions(generatedQuestions);
    setCurrentIndex(0);
    setAnswers([]);
    setSelectedOptionId(null);
    setStartTime(Date.now());
    setPhase('playing');
  }, [effectiveQuestionCount]);

  const submitAnswer = useCallback(() => {
    if (!selectedOptionId) return;
    
    const currentQuestion = questions[currentIndex];
    const selectedOption = currentQuestion.options.find(o => o.id === selectedOptionId);
    const isCorrect = selectedOption?.isCorrect ?? false;

    const answer: QuizAnswer = {
      questionId: currentQuestion.id,
      selectedOptionId,
      isCorrect,
    };

    setAnswers(prev => [...prev, answer]);
    setPhase('feedback');
  }, [selectedOptionId, questions, currentIndex]);

  const nextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setPhase('playing');
    } else {
      // Quiz complete
      const quizResult = calculateResults(questions, [...answers], startTime);
      setResult(quizResult);
      setPhase('results');
    }
  }, [currentIndex, questions, answers, startTime]);

  const resetQuiz = useCallback(() => {
    setPhase('selection');
    setConfig(null);
    setQuestions([]);
    setCurrentIndex(0);
    setAnswers([]);
    setSelectedOptionId(null);
    setResult(null);
  }, []);

  const retryQuiz = useCallback(() => {
    if (config) {
      startQuiz(config);
    }
  }, [config, startQuiz]);

  return {
    // State
    phase,
    config,
    questions,
    currentIndex,
    currentQuestion: questions[currentIndex],
    answers,
    selectedOptionId,
    result,
    isGuest: !user,
    guestLimit: GUEST_QUIZ_LIMIT,
    
    // Actions
    setSelectedOptionId,
    startQuiz,
    submitAnswer,
    nextQuestion,
    resetQuiz,
    retryQuiz,
    effectiveQuestionCount,
  };
};
