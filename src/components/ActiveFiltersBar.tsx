import { X } from "lucide-react";
import { FilterState, hasActiveFilters } from "@/types/filters";

interface ActiveFiltersBarProps {
  filters: FilterState;
  onRemove: (category: keyof FilterState, value: string) => void;
  onClearAll: () => void;
}

const ActiveFiltersBar = ({
  filters,
  onRemove,
  onClearAll,
}: ActiveFiltersBarProps) => {
  if (!hasActiveFilters(filters)) return null;

  const allFilters: { category: keyof FilterState; value: string; label: string }[] = [
    ...filters.rasa.map((v) => ({ category: "rasa" as const, value: v, label: v })),
    ...filters.virya.map((v) => ({ category: "virya" as const, value: v, label: v })),
    ...filters.dosha.map((v) => ({ category: "dosha" as const, value: v, label: v })),
    ...filters.usefulPart.map((v) => ({ category: "usefulPart" as const, value: v, label: v })),
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 py-2">
      <span className="text-sm text-muted-foreground">Active:</span>
      {allFilters.map(({ category, value, label }) => (
        <button
          key={`${category}-${value}`}
          onClick={() => onRemove(category, value)}
          className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary text-sm rounded-full hover:bg-primary/20 transition-colors"
        >
          {label}
          <X className="w-3.5 h-3.5" />
        </button>
      ))}
      <button
        onClick={onClearAll}
        className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-2"
      >
        Clear all
      </button>
    </div>
  );
};

export default ActiveFiltersBar;
