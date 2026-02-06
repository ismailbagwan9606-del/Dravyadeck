import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Stethoscope, AlertCircle, Mic, ListChecks, Filter } from "lucide-react";
import { vyadhiTopics, vyadhiCategories } from "@/data/rogaNidanaData";
import {
  RogaNidanaQuizType,
  RogaNidanaQuizConfig,
  rogaNidanaQuizTypeLabels,
  rogaNidanaQuizTypeDescriptions,
  GUEST_ROGA_NIDANA_QUIZ_LIMIT,
} from "@/types/rogaNidanaQuiz";
import { cn } from "@/lib/utils";

interface Props {
  onStart: (config: RogaNidanaQuizConfig) => void;
  isGuest: boolean;
  guestLimit: number;
}

const quizTypeIcons: Record<RogaNidanaQuizType, typeof Mic> = {
  viva: Mic,
  mcq: ListChecks,
};

const questionCounts: (5 | 10 | 20)[] = [5, 10, 20];

const RogaNidanaQuizSelectionScreen = ({ onStart, isGuest, guestLimit }: Props) => {
  const [selectedType, setSelectedType] = useState<RogaNidanaQuizType | null>(null);
  const [selectedCount, setSelectedCount] = useState<5 | 10 | 20 | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [showTopicFilter, setShowTopicFilter] = useState(false);

  const handleToggleTopic = (topicId: string) => {
    setSelectedTopics(prev =>
      prev.includes(topicId)
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleSelectAllTopics = () => {
    if (selectedTopics.length === vyadhiTopics.length) {
      setSelectedTopics([]);
    } else {
      setSelectedTopics(vyadhiTopics.map(t => t.id));
    }
  };

  const handleStart = () => {
    if (selectedType && selectedCount) {
      onStart({
        type: selectedType,
        questionCount: selectedCount,
        selectedTopics,
      });
    }
  };

  const effectiveCount = selectedCount
    ? (isGuest ? Math.min(selectedCount, guestLimit) : selectedCount)
    : null;

  const groupedTopics = vyadhiCategories.slice(1).map(category => ({
    category,
    topics: vyadhiTopics.filter(t => t.category === category),
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl py-8">
        <Card className="border-none shadow-lg">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
              <Stethoscope className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-serif">Roga Nidana Quiz</CardTitle>
            <CardDescription>
              Test your Vyadhi Vigyan knowledge with viva-style questions
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pt-4">
            {isGuest && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Guest mode: Limited to {guestLimit} questions. Sign up for unlimited access.
                </AlertDescription>
              </Alert>
            )}

            {/* Quiz Type Selection */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">Select Quiz Type</h3>
              <div className="grid grid-cols-2 gap-3">
                {(Object.keys(rogaNidanaQuizTypeLabels) as RogaNidanaQuizType[]).map((type) => {
                  const Icon = quizTypeIcons[type];
                  const isSelected = selectedType === type;
                  return (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={cn(
                        "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <Icon className={cn("h-6 w-6", isSelected ? "text-primary" : "text-muted-foreground")} />
                      <span className={cn("font-medium text-sm", isSelected && "text-primary")}>
                        {rogaNidanaQuizTypeLabels[type]}
                      </span>
                      <span className="text-xs text-muted-foreground text-center">
                        {rogaNidanaQuizTypeDescriptions[type]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question Count */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">Number of Questions</h3>
              <div className="flex gap-3">
                {questionCounts.map((count) => {
                  const isDisabled = isGuest && count > guestLimit;
                  const isSelected = selectedCount === count;
                  return (
                    <button
                      key={count}
                      onClick={() => !isDisabled && setSelectedCount(count)}
                      disabled={isDisabled}
                      className={cn(
                        "flex-1 py-3 rounded-lg border-2 font-medium transition-all",
                        isSelected
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border hover:border-primary/50",
                        isDisabled && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {count}
                      {isGuest && count > guestLimit && (
                        <span className="block text-xs text-muted-foreground">Pro</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Topic Filter */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Filter by Topics
                  {selectedTopics.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {selectedTopics.length} selected
                    </Badge>
                  )}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTopicFilter(!showTopicFilter)}
                  className="text-xs"
                >
                  <Filter className="h-3 w-3 mr-1" />
                  {showTopicFilter ? "Hide" : "Show"}
                </Button>
              </div>

              {showTopicFilter && (
                <Card className="p-3">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-muted-foreground">
                      Leave empty to include all topics
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleSelectAllTopics}
                      className="text-xs h-7"
                    >
                      {selectedTopics.length === vyadhiTopics.length ? "Clear All" : "Select All"}
                    </Button>
                  </div>
                  <ScrollArea className="h-48">
                    <div className="space-y-4">
                      {groupedTopics.map(({ category, topics }) => (
                        <div key={category}>
                          <h4 className="text-xs font-semibold text-muted-foreground mb-2">
                            {category}
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {topics.map((topic) => (
                              <label
                                key={topic.id}
                                className="flex items-center gap-2 text-sm cursor-pointer"
                              >
                                <Checkbox
                                  checked={selectedTopics.includes(topic.id)}
                                  onCheckedChange={() => handleToggleTopic(topic.id)}
                                />
                                <span className="truncate">{topic.name}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </Card>
              )}
            </div>

            {/* Start Button */}
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
                {rogaNidanaQuizTypeLabels[selectedType]} • {effectiveCount} questions
                {selectedTopics.length > 0 && ` • ${selectedTopics.length} topics`}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RogaNidanaQuizSelectionScreen;
