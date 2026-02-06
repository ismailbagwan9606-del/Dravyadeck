import { useState } from "react";
import { QuizType, QuizConfig, quizTypeLabels, GUEST_QUIZ_LIMIT } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import QuizTypeSelector from "./QuizTypeSelector";
import QuestionCountSelector from "./QuestionCountSelector";
import { ArrowRight, Brain, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface QuizSelectionScreenProps {
  onStart: (config: QuizConfig) => void;
  isGuest: boolean;
  guestLimit: number;
}

const QuizSelectionScreen = ({ onStart, isGuest, guestLimit }: QuizSelectionScreenProps) => {
  const [selectedType, setSelectedType] = useState<QuizType | null>(null);
  const [selectedCount, setSelectedCount] = useState<5 | 10 | 20 | null>(null);

  const handleStart = () => {
    if (selectedType && selectedCount) {
      onStart({ type: selectedType, questionCount: selectedCount });
    }
  };

  const effectiveCount = selectedCount 
    ? (isGuest ? Math.min(selectedCount, guestLimit) : selectedCount)
    : null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl py-8">
        <Card className="border-none shadow-lg">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-serif">Quiz Mode</CardTitle>
            <CardDescription>
              Test your Dravya Guna knowledge with exam-style questions
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-8 pt-4">
            {isGuest && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  You're in guest mode. Sign up for unlimited quiz access and progress tracking.
                </AlertDescription>
              </Alert>
            )}

            <QuizTypeSelector
              selectedType={selectedType}
              onSelect={setSelectedType}
              isGuest={isGuest}
            />

            <QuestionCountSelector
              selectedCount={selectedCount}
              onSelect={setSelectedCount}
              isGuest={isGuest}
              guestLimit={guestLimit}
            />

            <div className="pt-4">
              <Button
                className="w-full h-12 text-lg"
                disabled={!selectedType || !selectedCount}
                onClick={handleStart}
              >
                Start Quiz
                {effectiveCount && (
                  <span className="ml-2 text-sm opacity-80">
                    ({effectiveCount} questions)
                  </span>
                )}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {selectedType && selectedCount && (
              <p className="text-center text-sm text-muted-foreground">
                {quizTypeLabels[selectedType]} • {effectiveCount} questions
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizSelectionScreen;
