import { Flashcard as FlashcardType } from "@/data/flashcards";
import { Lock } from "lucide-react";

interface FlashcardPreviewProps {
  card: FlashcardType;
  showPartialBack?: boolean;
}

const FlashcardPreview = ({ card, showPartialBack = true }: FlashcardPreviewProps) => {
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Front Side Preview */}
      <div className="bg-card rounded-lg shadow-card border border-border overflow-hidden mb-4">
        <div className="h-full flex flex-col">
          {/* Category Badge */}
          <div className="px-4 pt-4">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
              {card.category}
            </span>
          </div>

          {/* Sanskrit Name */}
          <div className="px-4 pt-4 pb-2">
            <h2 className="sanskrit-text text-2xl sm:text-3xl text-primary leading-tight">
              {card.front.sanskritName}
            </h2>
            <p className="text-sm text-muted-foreground italic mt-1">
              {card.front.latinName}
            </p>
          </div>

          {/* Details */}
          <div className="px-4 pb-4 space-y-2">
            <DetailRow label="Family" value={card.front.family} />
            <DetailRow label="Common Name" value={card.front.commonName} />
            <DetailRow label="Useful Part" value={card.front.usefulPart} />
          </div>
        </div>
      </div>

      {/* Partial Back Preview */}
      {showPartialBack && (
        <div className="bg-primary rounded-lg shadow-card overflow-hidden relative">
          <div className="px-4 py-4 text-primary-foreground">
            <h3 className="font-serif text-lg font-semibold mb-3">
              Key Properties
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <PropertyItem label="Rasa" value={card.back.rasa} />
              <PropertyItem label="Virya" value={card.back.virya} />
              <PropertyItem label="Vipaka" value={card.back.vipaka} />
            </div>

            {/* Blurred/Locked Content */}
            <div className="mt-4 pt-4 border-t border-primary-foreground/20 relative">
              <div className="absolute inset-0 backdrop-blur-sm bg-primary/50 flex items-center justify-center rounded z-10">
                <div className="text-center">
                  <Lock className="w-6 h-6 mx-auto mb-2 opacity-80" />
                  <p className="text-sm font-medium opacity-90">
                    Sign in for full content
                  </p>
                </div>
              </div>
              <div className="opacity-30 select-none">
                <p className="text-xs font-medium text-primary-foreground/70 mb-1">
                  More properties...
                </p>
                <p className="text-xs">Guna, Prabhava, Dosha Karma, Important Karma, Prayoga</p>
              </div>
            </div>
          </div>

          {/* Watermark */}
          <div className="px-4 py-2 border-t border-primary-foreground/20 text-center">
            <p className="text-xs text-primary-foreground/60">
              DravyaDeck | dravyadecks.lovable.app
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-start gap-2">
    <span className="text-xs font-medium text-muted-foreground min-w-[80px]">
      {label}:
    </span>
    <span className="text-sm text-foreground">{value}</span>
  </div>
);

const PropertyItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs font-medium text-primary-foreground/70">{label}</p>
    <p className="text-xs leading-tight">{value}</p>
  </div>
);

export default FlashcardPreview;
