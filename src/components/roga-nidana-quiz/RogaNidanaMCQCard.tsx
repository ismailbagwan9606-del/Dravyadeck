import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, BookOpen, Check } from "lucide-react";
import { RogaNidanaQuizQuestion } from "@/types/rogaNidanaQuiz";
import { cn } from "@/lib/utils";

interface Props {
  question: RogaNidanaQuizQuestion;
  currentIndex: number;
  totalQuestions: number;
  onSubmit: (selectedIndex: number) => void;
  onBack: () => void;
}

const RogaNidanaMCQCard = ({
  question,
  currentIndex,
  totalQuestions,
  onSubmit,
  onBack,
}: Props) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { flashcard, options } = question;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const handleSubmit = () => {
    if (selectedIndex !== null) {
      onSubmit(selectedIndex);
    }
  };

  return (
    <div className="min-h-screen bg-background py-6">
      <div className="container max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Exit
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} / {totalQuestions}
            </span>
            <Badge variant="secondary">{flashcard.topic}</Badge>
          </div>
        </div>

        {/* Progress */}
        <Progress value={progress} className="h-2 mb-6" />

        {/* Question Card */}
        <Card className="shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <BookOpen className="h-4 w-4" />
              <span>{flashcard.reference}</span>
            </div>
            <CardTitle className="text-lg font-serif leading-relaxed">
              {flashcard.front}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Options */}
            <div className="space-y-3">
              {options?.map((option, index) => {
                const isSelected = selectedIndex === index;
                // Truncate long options for display
                const displayText = option.length > 200 
                  ? option.substring(0, 200) + "..." 
                  : option;
                
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className={cn(
                      "w-full text-left p-4 rounded-lg border-2 transition-all",
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={cn(
                          "flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-muted-foreground"
                        )}
                      >
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="text-sm leading-relaxed">{displayText}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Submit Button */}
            <Button
              className="w-full h-12 text-lg mt-4"
              disabled={selectedIndex === null}
              onClick={handleSubmit}
            >
              <Check className="mr-2 h-5 w-5" />
              Submit Answer
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RogaNidanaMCQCard;
