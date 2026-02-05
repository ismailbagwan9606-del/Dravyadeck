import { SlidersHorizontal } from "lucide-react";
import { FilterState, countActiveFilters, hasActiveFilters } from "@/types/filters";

interface FilterToggleButtonProps {
  filters: FilterState;
  onClick: () => void;
}

const FilterToggleButton = ({ filters, onClick }: FilterToggleButtonProps) => {
  const activeCount = countActiveFilters(filters);
  const hasFilters = hasActiveFilters(filters);

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all shadow-sm ${
        hasFilters
          ? "bg-primary text-primary-foreground"
          : "bg-card border border-border text-foreground hover:bg-muted"
      }`}
    >
      <SlidersHorizontal className="w-5 h-5" />
      <span className="hidden sm:inline">Filters</span>
      {activeCount > 0 && (
        <span
          className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
            hasFilters
              ? "bg-primary-foreground/20 text-primary-foreground"
              : "bg-accent text-accent-foreground"
          }`}
        >
          {activeCount}
        </span>
      )}
    </button>
  );
};

export default FilterToggleButton;
