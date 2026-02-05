import { Search } from "lucide-react";

interface EmptyStateProps {
  searchQuery: string;
}

const EmptyState = ({ searchQuery }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
        <Search className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
        No drugs found
      </h3>
      <p className="text-muted-foreground max-w-sm">
        No flashcards match "{searchQuery}". Try searching with a different drug name or Sanskrit term.
      </p>
    </div>
  );
};

export default EmptyState;
