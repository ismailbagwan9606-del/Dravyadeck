import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";

interface QuestionCountSelectorProps {
  selectedCount: number | null;
  onSelect: (count: 5 | 10 | 20) => void;
  isGuest: boolean;
  guestLimit: number;
}

const QuestionCountSelector = ({ 
  selectedCount, 
  onSelect, 
  isGuest, 
  guestLimit 
}: QuestionCountSelectorProps) => {
  const counts = [5, 10, 20] as const;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Number of Questions</h3>
      {isGuest && (
        <p className="text-sm text-muted-foreground">
          As a guest, you can attempt up to {guestLimit} questions.{" "}
          <a href="/signup" className="text-primary hover:underline">
            Sign up for full access
          </a>
        </p>
      )}
      <div className="flex flex-wrap gap-3">
        {counts.map((count) => {
          const isLimited = isGuest && count > guestLimit;
          const displayCount = isGuest ? Math.min(count, guestLimit) : count;
          
          return (
            <Button
              key={count}
              variant={selectedCount === count ? "default" : "outline"}
              className={cn(
                "min-w-[80px] relative",
                selectedCount === count && "ring-2 ring-primary/20"
              )}
              onClick={() => onSelect(count)}
            >
              <span>{isGuest && count > guestLimit ? guestLimit : count}</span>
              {isLimited && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  Limited
                </Badge>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCountSelector;
