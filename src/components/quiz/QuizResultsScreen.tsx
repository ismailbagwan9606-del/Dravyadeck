import { QuizResult, QuizQuestion, QuizAnswer } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  RotateCcw, 
  Home, 
  Eye, 
  CheckCircle2, 
  XCircle,
  Clock,
  Target,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface QuizResultsScreenProps {
  result: QuizResult;
  onRetry: () => void;
  onBackToSelection: () => void;
  onBackToFlashcards: () => void;
  isGuest: boolean;
}

const QuizResultsScreen = ({
  result,
  onRetry,
  onBackToSelection,
  onBackToFlashcards,
  isGuest,
}: QuizResultsScreenProps) => {
  const [showReview, setShowReview] = useState(false);
  
  const getGrade = (accuracy: number) => {
    if (accuracy >= 90) return { label: "Excellent!", emoji: "🏆", color: "text-yellow-600" };
    if (accuracy >= 70) return { label: "Great Job!", emoji: "🌟", color: "text-green-600" };
    if (accuracy >= 50) return { label: "Good Effort", emoji: "💪", color: "text-blue-600" };
    return { label: "Keep Practicing", emoji: "📚", color: "text-orange-600" };
  };

  const grade = getGrade(result.accuracy);
  const timeInSeconds = Math.floor(result.timeTaken / 1000);
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  const incorrectAnswers = result.answers.filter(a => !a.isCorrect);

  if (showReview) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container max-w-2xl py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Review Incorrect Answers</h2>
            <Button variant="ghost" onClick={() => setShowReview(false)}>
              Back to Results
            </Button>
          </div>
          
          <div className="space-y-4">
            {incorrectAnswers.map((answer, index) => {
              const question = result.questions.find(q => q.id === answer.questionId);
              if (!question) return null;
              
              const selectedOption = question.options.find(o => o.id === answer.selectedOptionId);
              
              return (
                <Card key={answer.questionId} className="border-l-4 border-l-red-500">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <Badge variant="outline">Question {index + 1}</Badge>
                    </div>
                    <p className="font-medium whitespace-pre-line">{question.question}</p>
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2 text-sm">
                        <XCircle className="h-4 w-4 text-red-500" />
                        <span className="text-muted-foreground">Your answer:</span>
                        <span className="font-medium">{selectedOption?.text || "Not answered"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span className="text-muted-foreground">Correct answer:</span>
                        <span className="font-medium text-green-600">{question.correctAnswer}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                      {question.explanation}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
            
            {incorrectAnswers.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-lg font-bold">Perfect Score!</h3>
                  <p className="text-muted-foreground">You got all questions correct!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl py-8">
        {/* Score Header */}
        <Card className="border-none shadow-lg overflow-hidden">
          <div className={cn(
            "py-8 text-center",
            result.accuracy >= 70 ? "bg-green-50 dark:bg-green-950/30" : "bg-orange-50 dark:bg-orange-950/30"
          )}>
            <div className="text-6xl mb-4">{grade.emoji}</div>
            <h1 className={cn("text-3xl font-bold mb-2", grade.color)}>
              {grade.label}
            </h1>
            <div className="text-5xl font-bold text-foreground">
              {result.correctAnswers}/{result.totalQuestions}
            </div>
          </div>
          
          <CardContent className="p-6 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-xl bg-muted/50">
                <Target className="h-5 w-5 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold text-foreground">{result.accuracy}%</div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-muted/50">
                <CheckCircle2 className="h-5 w-5 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold text-green-600">{result.correctAnswers}</div>
                <div className="text-xs text-muted-foreground">Correct</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-muted/50">
                <Clock className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                <div className="text-2xl font-bold text-foreground">
                  {minutes > 0 ? `${minutes}m` : ""}{seconds}s
                </div>
                <div className="text-xs text-muted-foreground">Time</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Score Progress</span>
                <span className="font-medium">{result.accuracy}%</span>
              </div>
              <Progress value={result.accuracy} className="h-3" />
            </div>

            {/* Guest CTA */}
            {isGuest && (
              <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-center">
                <TrendingUp className="h-5 w-5 mx-auto mb-2 text-primary" />
                <p className="text-sm text-foreground mb-2">
                  Sign up to track your progress and unlock all quizzes!
                </p>
                <Button variant="link" asChild className="text-primary p-0 h-auto">
                  <a href="/signup">Create free account →</a>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          {result.incorrectAnswers > 0 && (
            <Button
              variant="outline"
              className="w-full h-12"
              onClick={() => setShowReview(true)}
            >
              <Eye className="mr-2 h-5 w-5" />
              Review Wrong Answers ({result.incorrectAnswers})
            </Button>
          )}
          
          <Button
            className="w-full h-12"
            onClick={onRetry}
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Retry Quiz
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-12"
              onClick={onBackToSelection}
            >
              New Quiz
            </Button>
            <Button
              variant="outline"
              className="h-12"
              onClick={onBackToFlashcards}
            >
              <Home className="mr-2 h-4 w-4" />
              Flashcards
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResultsScreen;
