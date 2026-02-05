import { useState, useMemo } from "react";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Eye, ArrowRight, RotateCcw, Timer, TimerOff } from "lucide-react";
import { flashcards, Flashcard as FlashcardType } from "@/data/flashcards";
import { cn } from "@/lib/utils";

const VIVA_QUESTIONS = [
  { key: "rasa", question: "What is the Rasa of" },
  { key: "virya", question: "What is the Virya of" },
  { key: "vipaka", question: "What is the Vipaka of" },
  { key: "doshaKarma", question: "What is the Dosha Karma of" },
  { key: "importantKarma", question: "What are the important Karmas of" },
  { key: "prayoga", question: "What are the main Prayogas of" },
] as const;

const VivaModePage = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const shuffledCards = useMemo(() => {
    return [...flashcards].sort(() => Math.random() - 0.5).slice(0, 20);
  }, [isStarted]);

  const currentCard = shuffledCards[currentCardIndex];
  const currentQuestion = VIVA_QUESTIONS[currentQuestionIndex];

  const startViva = () => {
    setIsStarted(true);
    setCurrentCardIndex(0);
    setCurrentQuestionIndex(0);
    setIsRevealed(false);
    setTimeLeft(30);
  };

  const revealAnswer = () => {
    setIsRevealed(true);
  };

  const nextQuestion = () => {
    setIsRevealed(false);
    setTimeLeft(30);

    if (currentQuestionIndex < VIVA_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else if (currentCardIndex < shuffledCards.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
      setCurrentQuestionIndex(0);
    } else {
      // End of viva
      setIsStarted(false);
    }
  };

  const restartViva = () => {
    setIsStarted(false);
    setCurrentCardIndex(0);
    setCurrentQuestionIndex(0);
    setIsRevealed(false);
  };

  // Timer effect
  useState(() => {
    if (!showTimer || !isStarted || isRevealed) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRevealed(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  });

  if (!isStarted) {
    return (
      <AppLayout>
        <section className="text-center py-12">
          <MessageSquare className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Viva Mode
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Practice oral exam questions. Think first, then reveal the answer.
          </p>

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Button
                variant={showTimer ? "default" : "outline"}
                size="sm"
                onClick={() => setShowTimer(!showTimer)}
                className="gap-1.5"
              >
                {showTimer ? <Timer className="w-4 h-4" /> : <TimerOff className="w-4 h-4" />}
                {showTimer ? "Timer On" : "Timer Off"}
              </Button>
              <span>30 seconds per question</span>
            </div>

            <Button size="lg" onClick={startViva} className="gap-2">
              <MessageSquare className="w-5 h-5" />
              Start Viva Practice
            </Button>
          </div>
        </section>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {/* Progress */}
      <div className="mb-6 flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Dravya {currentCardIndex + 1} of {shuffledCards.length}
        </span>
        <Button variant="ghost" size="sm" onClick={restartViva}>
          <RotateCcw className="w-4 h-4 mr-1" />
          Restart
        </Button>
      </div>

      {/* Question Card */}
      <Card className="mb-6">
        <CardContent className="py-8 text-center">
          {/* Dravya Name */}
          <div className="mb-6">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-1">
              {currentCard.front.sanskritName}
            </h3>
            <p className="text-muted-foreground">
              {currentCard.front.latinName}
            </p>
          </div>

          {/* Question */}
          <p className="text-lg text-foreground mb-6">
            {currentQuestion.question}{" "}
            <span className="font-semibold">{currentCard.front.sanskritName}</span>?
          </p>

          {/* Timer */}
          {showTimer && !isRevealed && (
            <div className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-4",
              timeLeft <= 10 ? "bg-destructive/10 text-destructive" : "bg-secondary text-muted-foreground"
            )}>
              <Timer className="w-4 h-4" />
              {timeLeft}s remaining
            </div>
          )}

          {/* Think First Message or Answer */}
          {!isRevealed ? (
            <div className="space-y-4">
              <p className="text-muted-foreground italic">
                Think of your answer first...
              </p>
              <Button onClick={revealAnswer} className="gap-2">
                <Eye className="w-4 h-4" />
                Reveal Answer
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-foreground">
                  {currentCard.back[currentQuestion.key]}
                </p>
              </div>
              <Button onClick={nextQuestion} className="gap-2">
                Next Question
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Question Progress */}
      <div className="flex justify-center gap-1.5">
        {VIVA_QUESTIONS.map((_, idx) => (
          <div
            key={idx}
            className={cn(
              "w-2 h-2 rounded-full",
              idx === currentQuestionIndex
                ? "bg-primary"
                : idx < currentQuestionIndex
                ? "bg-primary/40"
                : "bg-secondary"
            )}
          />
        ))}
      </div>
    </AppLayout>
  );
};

export default VivaModePage;
