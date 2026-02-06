import { useState } from "react";
import { VyadhiQAFlashcard, vyadhiTopics } from "@/data/rogaNidanaData";
import { RotateCw, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface QAFlashcardProps {
  card: VyadhiQAFlashcard;
  isLocked?: boolean;
}

const QAFlashcard = ({ card, isLocked = false }: QAFlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Get vyadhi name from topics
  const vyadhiName = vyadhiTopics.find(t => t.id === card.vyadhiId)?.name || card.vyadhiId;

  const handleFlip = () => {
    if (!isLocked) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div
      className={cn(
        "flashcard-container w-full h-[280px] group",
        isLocked ? "cursor-not-allowed" : "cursor-pointer"
      )}
      onClick={handleFlip}
    >
      <div
        className={cn(
          "flashcard relative w-full h-full",
          isFlipped && !isLocked && "flipped"
        )}
      >
        {/* Front Side - Question */}
        <div className="flashcard-face absolute inset-0 bg-card rounded-lg shadow-card border border-border overflow-hidden transition-shadow duration-300 group-hover:shadow-card-hover">
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="px-4 pt-4 flex items-center justify-between">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
                {card.topic}
              </span>
              <span className="text-xs text-muted-foreground">
                {vyadhiName}
              </span>
            </div>

            {/* Question */}
            <div className="flex-1 px-4 py-4 flex items-center">
              <p className="text-base sm:text-lg text-foreground leading-relaxed font-medium">
                {card.front}
              </p>
            </div>

            {/* Flip Hint */}
            <div className="px-4 pb-4 flex items-center justify-center gap-2 text-muted-foreground text-sm">
              {isLocked ? (
                <span className="text-xs">Sign up to view answer</span>
              ) : (
                <>
                  <RotateCw className="w-4 h-4" />
                  <span>Tap to reveal answer</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Back Side - Answer */}
        <div className="flashcard-face flashcard-back absolute inset-0 bg-primary rounded-lg shadow-card overflow-hidden">
          <div className="h-full flex flex-col text-primary-foreground">
            {/* Header */}
            <div className="px-4 pt-4 pb-2 border-b border-primary-foreground/20">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-primary-foreground/70">
                  {card.topic}
                </span>
                <span className="text-xs text-primary-foreground/60">
                  {vyadhiName}
                </span>
              </div>
            </div>

            {/* Answer Content */}
            <div className="flex-1 px-4 py-3 overflow-y-auto">
              <div className="text-sm leading-relaxed">
                {formatAnswerLines(card.back).map((line, i) => (
                  <div
                    key={i}
                    className={cn(
                      line.type === 'bullet' && 'ml-2',
                      line.type === 'arrow' && 'ml-4 text-primary-foreground/80'
                    )}
                  >
                    {line.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Reference */}
            <div className="px-4 py-2 border-t border-primary-foreground/20 flex items-center gap-2">
              <BookOpen className="w-3 h-3 text-primary-foreground/60" />
              <span className="text-xs text-primary-foreground/60 truncate">
                {card.reference}
              </span>
            </div>

            {/* Flip Hint */}
            <div className="px-4 pb-3 flex items-center justify-center gap-2 text-primary-foreground/60 text-sm">
              <RotateCw className="w-4 h-4" />
              <span>Tap to flip back</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Format answer text into structured lines for safe JSX rendering
interface FormattedLine {
  type: 'bullet' | 'arrow' | 'normal';
  text: string;
}

const formatAnswerLines = (text: string): FormattedLine[] => {
  return text.split('\n').map(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
      return { type: 'bullet', text: line };
    }
    if (trimmed.startsWith('→')) {
      return { type: 'arrow', text: line };
    }
    return { type: 'normal', text: line };
  });
};

export default QAFlashcard;
