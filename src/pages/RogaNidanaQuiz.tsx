import { useNavigate } from "react-router-dom";
import { useRogaNidanaQuiz } from "@/hooks/useRogaNidanaQuiz";
import AppLayout from "@/components/AppLayout";
import RogaNidanaQuizSelectionScreen from "@/components/roga-nidana-quiz/RogaNidanaQuizSelectionScreen";
import RogaNidanaVivaCard from "@/components/roga-nidana-quiz/RogaNidanaVivaCard";
import RogaNidanaMCQCard from "@/components/roga-nidana-quiz/RogaNidanaMCQCard";
import RogaNidanaQuizFeedback from "@/components/roga-nidana-quiz/RogaNidanaQuizFeedback";
import RogaNidanaQuizResults from "@/components/roga-nidana-quiz/RogaNidanaQuizResults";

const RogaNidanaQuiz = () => {
  const navigate = useNavigate();
  const {
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
  } = useRogaNidanaQuiz();

  const handleBackToRogaNidana = () => {
    navigate('/roga-nidana');
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
        <RogaNidanaQuizSelectionScreen
          onStart={startQuiz}
          isGuest={isGuest}
          guestLimit={guestLimit}
        />
        <div className="text-center mt-4">
          <button
            onClick={handleBackToRogaNidana}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Roga Nidana
          </button>
        </div>
      </AppLayout>
    );
  }

  // Playing Phase - Viva Type
  if (phase === 'playing' && currentQuestion && quizType === 'viva') {
    return (
      <RogaNidanaVivaCard
        question={currentQuestion}
        currentIndex={currentIndex}
        totalQuestions={questions.length}
        showAnswer={showAnswer}
        onReveal={revealAnswer}
        onSubmit={submitVivaAnswer}
        onBack={handleExitQuiz}
      />
    );
  }

  // Playing Phase - MCQ Type
  if (phase === 'playing' && currentQuestion && quizType === 'mcq') {
    return (
      <RogaNidanaMCQCard
        question={currentQuestion}
        currentIndex={currentIndex}
        totalQuestions={questions.length}
        onSubmit={submitMCQAnswer}
        onBack={handleExitQuiz}
      />
    );
  }

  // Feedback Phase
  if (phase === 'feedback' && currentQuestion) {
    const lastAnswer = answers[answers.length - 1];
    return (
      <RogaNidanaQuizFeedback
        question={currentQuestion}
        answer={lastAnswer}
        onNext={nextQuestion}
        isLastQuestion={currentIndex === questions.length - 1}
      />
    );
  }

  // Results Phase
  if (phase === 'results' && result) {
    return (
      <RogaNidanaQuizResults
        result={result}
        onRetry={retryQuiz}
        onBackToSelection={resetQuiz}
        onBackToRogaNidana={handleBackToRogaNidana}
        isGuest={isGuest}
      />
    );
  }

  return null;
};

export default RogaNidanaQuiz;
