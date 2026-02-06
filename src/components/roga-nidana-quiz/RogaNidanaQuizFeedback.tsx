import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check, X, BookOpen } from "lucide-react";
import { RogaNidanaQuizQuestion, RogaNidanaQuizAnswer } from "@/types/rogaNidanaQuiz";
import { cn } from "@/lib/utils";

interface Props {
  question: RogaNidanaQuizQuestion;
  answer: RogaNidanaQuizAnswer;
  onNext: () => void;
  isLastQuestion: boolean;
}

const RogaNidanaQuizFeedback = ({
  question,
  answer,
  onNext,
  isLastQuestion,
}: Props) => {
  const { flashcard, type, options, correctOptionIndex } = question;
  const isCorrect = answer.wasCorrect;

  return (
    <div className="min-h-screen bg-background py-6">
      <div className="container max-w-2xl">
        {/* Result Banner */}
        <div
          className={cn(
            "flex items-center justify-center gap-3 p-4 rounded-lg mb-6",
            isCorrect 
              ? "bg-green-100 dark:bg-green-900/30" 
              : "bg-red-100 dark:bg-red-900/30"
          )}
        >
          {isCorrect ? (
            <>
              <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
              <span className="font-semibold text-green-700 dark:text-green-400">
                {type === 'viva' ? "Marked as Correct!" : "Correct!"}
              </span>
            </>
          ) : (
            <>
              <X className="h-6 w-6 text-red-600 dark:text-red-400" />
              <span className="font-semibold text-red-700 dark:text-red-400">
                {type === 'viva' ? "Marked as Incorrect" : "Incorrect"}
              </span>
            </>
          )}
        </div>

        {/* Answer Review Card */}
        <Card className="shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <BookOpen className="h-4 w-4" />
              <span>{flashcard.reference}</span>
            </div>
            <h3 className="text-lg font-serif leading-relaxed">
              {flashcard.front}
            </h3>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* For MCQ - Show selected vs correct */}
            {type === 'mcq' && options && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Your Answer:</p>
                <div
                  className={cn(
                    "p-3 rounded-lg border-2",
                    isCorrect
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                      : "border-red-500 bg-red-50 dark:bg-red-900/20"
                  )}
                >
                  <div className="flex items-start gap-2">
                    <span className="font-medium">
                      {String.fromCharCode(65 + (answer.selectedOptionIndex ?? 0))}:
                    </span>
                    <span className="text-sm">
                      {options[answer.selectedOptionIndex ?? 0]?.substring(0, 200)}
                      {(options[answer.selectedOptionIndex ?? 0]?.length ?? 0) > 200 && "..."}
                    </span>
                  </div>
                </div>

                {!isCorrect && correctOptionIndex !== undefined && (
                  <>
                    <p className="text-sm font-medium text-muted-foreground mt-3">
                      Correct Answer:
                    </p>
                    <div className="p-3 rounded-lg border-2 border-green-500 bg-green-50 dark:bg-green-900/20">
                      <div className="flex items-start gap-2">
                        <span className="font-medium">
                          {String.fromCharCode(65 + correctOptionIndex)}:
                        </span>
                        <span className="text-sm">
                          {options[correctOptionIndex]?.substring(0, 200)}
                          {(options[correctOptionIndex]?.length ?? 0) > 200 && "..."}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Full Answer */}
            <div className="p-4 bg-secondary/50 rounded-lg border border-border">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                Complete Answer:
              </h4>
              <div className="text-sm whitespace-pre-wrap leading-relaxed">
                {flashcard.back}
              </div>
            </div>

            {/* Topic Badge */}
            <div className="flex items-center gap-2">
              <Badge variant="outline">{flashcard.topic}</Badge>
            </div>

            {/* Next Button */}
            <Button
              className="w-full h-12 text-lg mt-4"
              onClick={onNext}
            >
              {isLastQuestion ? "See Results" : "Next Question"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RogaNidanaQuizFeedback;
