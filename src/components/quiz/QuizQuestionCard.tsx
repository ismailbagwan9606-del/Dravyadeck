import { QuizQuestion, QuizType } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";

interface QuizQuestionCardProps {
  question: QuizQuestion;
  currentIndex: number;
  totalQuestions: number;
  selectedOptionId: string | null;
  onSelect: (optionId: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  isAnswered: boolean;
}

const QuizQuestionCard = ({
  question,
  currentIndex,
  totalQuestions,
  selectedOptionId,
  onSelect,
  onSubmit,
  onBack,
  isAnswered,
}: QuizQuestionCardProps) => {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b">
        <div className="container max-w-2xl py-4">
          <div className="flex items-center justify-between mb-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Exit
            </Button>
            <Badge variant="secondary" className="font-mono">
              {currentIndex + 1} / {totalQuestions}
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 container max-w-2xl py-6 flex flex-col">
        <Card className="flex-1 border-none shadow-lg">
          <CardContent className="p-6 flex flex-col h-full">
            {/* Question Type Badge */}
            <div className="mb-4">
              <Badge variant="outline" className="text-xs">
                {question.type === 'mcq' && 'Multiple Choice'}
                {question.type === 'trueFalse' && 'True / False'}
                {question.type === 'fillBlank' && 'Fill in the Blank'}
                {question.type === 'identifyDrug' && 'Identify the Drug'}
              </Badge>
            </div>

            {/* Question Text */}
            <div className="mb-6">
              <h2 className="text-xl font-medium text-foreground whitespace-pre-line leading-relaxed">
                {question.question}
              </h2>
            </div>

            {/* Options */}
            <div className="flex-1 space-y-3">
              {question.options.map((option, index) => {
                const isSelected = selectedOptionId === option.id;
                const letter = String.fromCharCode(65 + index); // A, B, C, D

                return (
                  <button
                    key={option.id}
                    onClick={() => !isAnswered && onSelect(option.id)}
                    disabled={isAnswered}
                    className={cn(
                      "w-full p-4 rounded-xl border-2 text-left transition-all duration-200",
                      "flex items-center gap-3",
                      "focus:outline-none focus:ring-2 focus:ring-primary/20",
                      isSelected && !isAnswered && "border-primary bg-primary/5",
                      !isSelected && !isAnswered && "border-border hover:border-primary/50 hover:bg-muted/50",
                      isAnswered && option.isCorrect && "border-green-500 bg-green-50 dark:bg-green-950/30",
                      isAnswered && isSelected && !option.isCorrect && "border-red-500 bg-red-50 dark:bg-red-950/30",
                      isAnswered && !isSelected && !option.isCorrect && "opacity-50"
                    )}
                  >
                    <span className={cn(
                      "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm",
                      isSelected && !isAnswered && "bg-primary text-primary-foreground",
                      !isSelected && !isAnswered && "bg-muted",
                      isAnswered && option.isCorrect && "bg-green-500 text-white",
                      isAnswered && isSelected && !option.isCorrect && "bg-red-500 text-white"
                    )}>
                      {isAnswered && option.isCorrect ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : isAnswered && isSelected && !option.isCorrect ? (
                        <XCircle className="h-4 w-4" />
                      ) : (
                        letter
                      )}
                    </span>
                    <span className="flex-1 font-medium">{option.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Submit Button */}
            {!isAnswered && (
              <div className="mt-6 pt-4 border-t">
                <Button
                  className="w-full h-12 text-lg"
                  disabled={!selectedOptionId}
                  onClick={onSubmit}
                >
                  Submit Answer
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizQuestionCard;
