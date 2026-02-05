import { VyadhiTopic } from "@/data/rogaNidanaData";
import { Lock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface VyadhiTopicCardProps {
  topic: VyadhiTopic;
  isLocked: boolean;
  onClick: () => void;
}

const VyadhiTopicCard = ({ topic, isLocked, onClick }: VyadhiTopicCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative p-4 rounded-lg border transition-all duration-200",
        isLocked
          ? "bg-muted/50 border-border cursor-pointer hover:border-primary/30"
          : "bg-card border-border cursor-pointer hover:shadow-md hover:border-primary/50"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-serif text-lg font-semibold text-foreground">
              {topic.name}
            </h3>
            {isLocked && (
              <Lock className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {topic.cardCount} flashcards • {topic.category}
          </p>
        </div>
        <ChevronRight className={cn(
          "w-5 h-5",
          isLocked ? "text-muted-foreground" : "text-primary"
        )} />
      </div>

      {/* Preview badge for unlocked topics */}
      {topic.isPreviewTopic && !isLocked && (
        <span className="absolute top-2 right-2 px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded">
          Preview
        </span>
      )}
    </div>
  );
};

export default VyadhiTopicCard;
