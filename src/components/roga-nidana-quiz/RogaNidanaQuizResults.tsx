import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Trophy,
  RotateCcw,
  ArrowLeft,
  Stethoscope,
  Check,
  X,
  Clock,
  Target,
  UserPlus,
} from "lucide-react";
import { RogaNidanaQuizResult } from "@/types/rogaNidanaQuiz";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface Props {
  result: RogaNidanaQuizResult;
  onRetry: () => void;
  onBackToSelection: () => void;
  onBackToRogaNidana: () => void;
  isGuest: boolean;
}

const RogaNidanaQuizResults = ({
  result,
  onRetry,
  onBackToSelection,
  onBackToRogaNidana,
  isGuest,
}: Props) => {
  const navigate = useNavigate();
  const { accuracy, totalQuestions, correctAnswers, incorrectAnswers, timeTaken, questions, answers } = result;

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getPerformanceMessage = () => {
    if (accuracy >= 90) return { text: "Outstanding! 🏆", color: "text-green-600" };
    if (accuracy >= 70) return { text: "Great Job! 🌟", color: "text-blue-600" };
    if (accuracy >= 50) return { text: "Good Effort! 📚", color: "text-yellow-600" };
    return { text: "Keep Practicing! 💪", color: "text-orange-600" };
  };

  const performance = getPerformanceMessage();

  return (
    <div className="min-h-screen bg-background py-6">
      <div className="container max-w-2xl">
        <Card className="shadow-lg">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
              <Trophy className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-serif">Quiz Complete!</CardTitle>
            <p className={cn("text-lg font-medium mt-2", performance.color)}>
              {performance.text}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Score Circle */}
            <div className="flex justify-center">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="10"
                    className="text-secondary"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeLinecap="round"
                    className="text-primary"
                    strokeDasharray={`${accuracy * 2.83} 283`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold">{accuracy}%</span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-secondary/50 rounded-lg">
                <Target className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                <p className="text-xl font-bold">{totalQuestions}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
              <div className="text-center p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Check className="h-5 w-5 mx-auto mb-1 text-green-600 dark:text-green-400" />
                <p className="text-xl font-bold text-green-700 dark:text-green-400">{correctAnswers}</p>
                <p className="text-xs text-muted-foreground">Correct</p>
              </div>
              <div className="text-center p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <X className="h-5 w-5 mx-auto mb-1 text-red-600 dark:text-red-400" />
                <p className="text-xl font-bold text-red-700 dark:text-red-400">{incorrectAnswers}</p>
                <p className="text-xs text-muted-foreground">Incorrect</p>
              </div>
            </div>

            {/* Time Taken */}
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Time taken: {formatTime(timeTaken)}</span>
            </div>

            {/* Question Review */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Question Review</h4>
              <ScrollArea className="h-48">
                <div className="space-y-2">
                  {questions.map((question, index) => {
                    const answer = answers[index];
                    return (
                      <div
                        key={question.id}
                        className={cn(
                          "p-3 rounded-lg border",
                          answer.wasCorrect
                            ? "border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800"
                            : "border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800"
                        )}
                      >
                        <div className="flex items-start gap-2">
                          <span
                            className={cn(
                              "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs",
                              answer.wasCorrect
                                ? "bg-green-600 text-white"
                                : "bg-red-600 text-white"
                            )}
                          >
                            {answer.wasCorrect ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              Q{index + 1}: {question.flashcard.topic}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {question.flashcard.front}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>

            {/* Guest CTA */}
            {isGuest && (
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4 text-center">
                  <UserPlus className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium mb-2">Want unlimited quizzes?</p>
                  <Button size="sm" onClick={() => navigate('/signup')}>
                    Sign Up Free
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={onRetry} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Retry Quiz
              </Button>
              <Button variant="outline" onClick={onBackToSelection} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                New Quiz
              </Button>
            </div>
            
            <Button 
              className="w-full gap-2" 
              variant="secondary"
              onClick={onBackToRogaNidana}
            >
              <Stethoscope className="h-4 w-4" />
              Back to Roga Nidana
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RogaNidanaQuizResults;
