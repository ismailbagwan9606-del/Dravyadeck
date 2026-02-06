import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Eye, Check, X, BookOpen } from "lucide-react";
import { RogaNidanaQuizQuestion } from "@/types/rogaNidanaQuiz";
import { cn } from "@/lib/utils";

interface Props {
  question: RogaNidanaQuizQuestion;
  currentIndex: number;
  totalQuestions: number;
  showAnswer: boolean;
  onReveal: () => void;
  onSubmit: (wasCorrect: boolean) => void;
  onBack: () => void;
}

const RogaNidanaVivaCard = ({
  question,
  currentIndex,
  totalQuestions,
  showAnswer,
  onReveal,
  onSubmit,
  onBack,
}: Props) => {
  const { flashcard } = question;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

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
            {/* Answer Section */}
            {!showAnswer ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  Think about your answer, then reveal to check
                </p>
                <Button
                  size="lg"
                  onClick={onReveal}
                  className="gap-2"
                >
                  <Eye className="h-5 w-5" />
                  Reveal Answer
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Answer */}
                <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Answer:</h4>
                  <div className="text-sm whitespace-pre-wrap leading-relaxed">
                    {flashcard.back}
                  </div>
                </div>

                {/* Self Assessment */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-center text-muted-foreground">
                    How did you do?
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => onSubmit(false)}
                      className="border-destructive/50 hover:bg-destructive/10 hover:text-destructive gap-2"
                    >
                      <X className="h-5 w-5" />
                      I Got It Wrong
                    </Button>
                    <Button
                      size="lg"
                      onClick={() => onSubmit(true)}
                      className="bg-green-600 hover:bg-green-700 gap-2"
                    >
                      <Check className="h-5 w-5" />
                      I Got It Right
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Topic Info */}
        <div className="mt-4 text-center">
          <Badge variant="outline" className="text-xs">
            Topic: {flashcard.topic}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default RogaNidanaVivaCard;
