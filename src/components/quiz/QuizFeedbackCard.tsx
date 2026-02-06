import { QuizQuestion } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, ArrowRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizFeedbackCardProps {
  question: QuizQuestion;
  selectedOptionId: string | null;
  isCorrect: boolean;
  onNext: () => void;
  isLastQuestion: boolean;
}

const QuizFeedbackCard = ({
  question,
  selectedOptionId,
  isCorrect,
  onNext,
  isLastQuestion,
}: QuizFeedbackCardProps) => {
  const selectedOption = question.options.find(o => o.id === selectedOptionId);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Feedback Header */}
      <div className={cn(
        "py-6 text-center",
        isCorrect ? "bg-green-50 dark:bg-green-950/30" : "bg-red-50 dark:bg-red-950/30"
      )}>
        <div className="container max-w-2xl">
          <div className={cn(
            "mx-auto mb-3 w-16 h-16 rounded-full flex items-center justify-center",
            isCorrect ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"
          )}>
            {isCorrect ? (
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            ) : (
              <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
            )}
          </div>
          <h2 className={cn(
            "text-2xl font-bold",
            isCorrect ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"
          )}>
            {isCorrect ? "Correct!" : "Incorrect"}
          </h2>
          {!isCorrect && selectedOption && (
            <p className="text-muted-foreground mt-1">
              You answered: <span className="font-medium">{selectedOption.text}</span>
            </p>
          )}
        </div>
      </div>

      {/* Answer Details */}
      <div className="flex-1 container max-w-2xl py-6">
        <Card className="border-none shadow-lg">
          <CardContent className="p-6 space-y-6">
            {/* Correct Answer */}
            <div className="space-y-2">
              <Badge variant="outline" className="text-xs">
                Correct Answer
              </Badge>
              <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/30 border-2 border-green-200 dark:border-green-800">
                <p className="font-semibold text-green-800 dark:text-green-300 text-lg">
                  {question.correctAnswer}
                </p>
              </div>
            </div>

            {/* Explanation */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <Badge variant="outline" className="text-xs">
                  Explanation
                </Badge>
              </div>
              <div className="p-4 rounded-xl bg-muted/50 border">
                <p className="text-foreground leading-relaxed">
                  {question.explanation}
                </p>
              </div>
            </div>

            {/* Drug Reference */}
            <div className="text-center text-sm text-muted-foreground">
              <p>
                Drug: <span className="font-medium text-foreground">{question.drugName}</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Next Button */}
        <div className="mt-6">
          <Button
            className="w-full h-12 text-lg"
            onClick={onNext}
          >
            {isLastQuestion ? "See Results" : "Next Question"}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizFeedbackCard;
