import { useQuiz } from "@/hooks/useQuiz";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import QuizSelectionScreen from "@/components/quiz/QuizSelectionScreen";
import QuizQuestionCard from "@/components/quiz/QuizQuestionCard";
import QuizFeedbackCard from "@/components/quiz/QuizFeedbackCard";
import QuizResultsScreen from "@/components/quiz/QuizResultsScreen";

const Quiz = () => {
  const navigate = useNavigate();
  const {
    phase,
    questions,
    currentIndex,
    currentQuestion,
    selectedOptionId,
    answers,
    result,
    isGuest,
    guestLimit,
    setSelectedOptionId,
    startQuiz,
    submitAnswer,
    nextQuestion,
    resetQuiz,
    retryQuiz,
  } = useQuiz();

  const handleBackToFlashcards = () => {
    navigate('/flashcards');
  };

  const handleExitQuiz = () => {
    if (window.confirm('Are you sure you want to exit? Your progress will be lost.')) {
      resetQuiz();
    }
  };

  // Selection Phase
  if (phase === 'selection') {
    return (
      <AppLayout>
        <QuizSelectionScreen
          onStart={startQuiz}
          isGuest={isGuest}
          guestLimit={guestLimit}
        />
        <div className="text-center mt-4">
          <button
            onClick={handleBackToFlashcards}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Flashcards
          </button>
        </div>
      </AppLayout>
    );
  }

  // Playing Phase - Show Question
  if (phase === 'playing' && currentQuestion) {
    return (
      <QuizQuestionCard
        question={currentQuestion}
        currentIndex={currentIndex}
        totalQuestions={questions.length}
        selectedOptionId={selectedOptionId}
        onSelect={setSelectedOptionId}
        onSubmit={submitAnswer}
        onBack={handleExitQuiz}
        isAnswered={false}
      />
    );
  }

  // Feedback Phase - Show Answer Feedback
  if (phase === 'feedback' && currentQuestion) {
    const lastAnswer = answers[answers.length - 1];
    
    return (
      <QuizFeedbackCard
        question={currentQuestion}
        selectedOptionId={lastAnswer?.selectedOptionId || null}
        isCorrect={lastAnswer?.isCorrect || false}
        onNext={nextQuestion}
        isLastQuestion={currentIndex === questions.length - 1}
      />
    );
  }

  // Results Phase
  if (phase === 'results' && result) {
    return (
      <QuizResultsScreen
        result={result}
        onRetry={retryQuiz}
        onBackToSelection={resetQuiz}
        onBackToFlashcards={handleBackToFlashcards}
        isGuest={isGuest}
      />
    );
  }

  // Fallback
  return null;
};

export default Quiz;
