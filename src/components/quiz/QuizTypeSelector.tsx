import { QuizType, quizTypeLabels, quizTypeDescriptions } from "@/types/quiz";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, HelpCircle, FileQuestion, Search, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizTypeSelectorProps {
  selectedType: QuizType | null;
  onSelect: (type: QuizType) => void;
  isGuest: boolean;
}

const quizTypeIcons: Record<QuizType, React.ReactNode> = {
  mcq: <CheckCircle2 className="h-6 w-6" />,
  trueFalse: <HelpCircle className="h-6 w-6" />,
  fillBlank: <FileQuestion className="h-6 w-6" />,
  identifyDrug: <Search className="h-6 w-6" />,
};

const QuizTypeSelector = ({ selectedType, onSelect, isGuest }: QuizTypeSelectorProps) => {
  const quizTypes: QuizType[] = ['mcq', 'trueFalse', 'fillBlank', 'identifyDrug'];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Select Quiz Type</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {quizTypes.map((type) => (
          <Card
            key={type}
            className={cn(
              "cursor-pointer transition-all duration-200 hover:shadow-md",
              selectedType === type
                ? "ring-2 ring-primary bg-primary/5"
                : "hover:bg-muted/50"
            )}
            onClick={() => onSelect(type)}
          >
            <CardContent className="p-4 flex items-start gap-3">
              <div className={cn(
                "p-2 rounded-lg",
                selectedType === type ? "bg-primary text-primary-foreground" : "bg-muted"
              )}>
                {quizTypeIcons[type]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-foreground">{quizTypeLabels[type]}</h4>
                  {isGuest && type === 'identifyDrug' && (
                    <Lock className="h-3 w-3 text-muted-foreground" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{quizTypeDescriptions[type]}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuizTypeSelector;
