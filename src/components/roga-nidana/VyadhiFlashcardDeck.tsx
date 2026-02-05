import { useState } from "react";
import { VyadhiTopic, VyadhiQAFlashcard } from "@/data/rogaNidanaData";
import QAFlashcard from "./QAFlashcard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Grid, Layers } from "lucide-react";

interface VyadhiFlashcardDeckProps {
  topic: VyadhiTopic;
  flashcards: VyadhiQAFlashcard[];
  onBack: () => void;
  isPreviewMode?: boolean;
  previewLimit?: number;
}

const VyadhiFlashcardDeck = ({ 
  topic, 
  flashcards,
  onBack, 
  isPreviewMode = false,
  previewLimit = 3 
}: VyadhiFlashcardDeckProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"single" | "grid">("single");

  const visibleCards = isPreviewMode 
    ? flashcards.slice(0, previewLimit)
    : flashcards;

  const totalCards = flashcards.length;
  const lockedCount = isPreviewMode ? totalCards - previewLimit : 0;

  const goToNext = () => {
    if (currentIndex < visibleCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">All Topics</span>
        </button>

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "single" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("single")}
          >
            <Layers className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Topic Title */}
      <div className="text-center">
        <h2 className="font-serif text-2xl font-bold text-foreground">
          {topic.name}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {isPreviewMode 
            ? `Showing ${visibleCards.length} of ${totalCards} flashcards`
            : `${totalCards} flashcards`
          }
        </p>
      </div>

      {/* Single Card View */}
      {viewMode === "single" && (
        <div className="space-y-4">
          <div className="max-w-md mx-auto">
            <QAFlashcard card={visibleCards[currentIndex]} />
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrev}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <span className="text-sm text-muted-foreground min-w-[80px] text-center">
              {currentIndex + 1} / {visibleCards.length}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              disabled={currentIndex === visibleCards.length - 1}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleCards.map((card, index) => (
            <div
              key={card.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <QAFlashcard card={card} />
            </div>
          ))}
        </div>
      )}

      {/* Locked cards indicator */}
      {isPreviewMode && lockedCount > 0 && (
        <div className="text-center py-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{lockedCount} more flashcards</span> available with a free account
          </p>
        </div>
      )}
    </div>
  );
};

export default VyadhiFlashcardDeck;
