import { useEffect } from "react";
import { X, RotateCcw, SlidersHorizontal } from "lucide-react";
import { FilterState, hasActiveFilters, countActiveFilters } from "@/types/filters";
import {
  rasaOptions,
  viryaOptions,
  doshaOptions,
  usefulPartOptions,
} from "@/data/flashcards";
import FilterSection from "./FilterSection";

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const FilterPanel = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
}: FilterPanelProps) => {
  const toggleFilter = (
    category: keyof FilterState,
    value: string
  ) => {
    const currentValues = filters[category];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    onFilterChange({
      ...filters,
      [category]: newValues,
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      rasa: [],
      virya: [],
      dosha: [],
      usefulPart: [],
    });
  };

  const activeCount = countActiveFilters(filters);

  // Prevent body scroll when panel is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Panel - slides up from bottom on mobile, side panel on desktop */}
      <div
        className={`fixed z-50 bg-card border-t sm:border-l sm:border-t-0 border-border shadow-xl transition-transform duration-300 ease-out
          inset-x-0 bottom-0 rounded-t-2xl max-h-[85vh] sm:max-h-full
          sm:inset-y-0 sm:right-0 sm:left-auto sm:w-80 sm:rounded-none
          ${isOpen ? "translate-y-0 sm:translate-x-0" : "translate-y-full sm:translate-y-0 sm:translate-x-full"}`}
      >
        {/* Handle bar for mobile */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-primary" />
            <h3 className="font-serif text-lg font-semibold text-foreground">
              Filters
            </h3>
            {activeCount > 0 && (
              <span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                {activeCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters(filters) && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-muted"
              >
                <RotateCcw className="w-4 h-4" />
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Content */}
        <div className="overflow-y-auto max-h-[calc(85vh-120px)] sm:max-h-[calc(100vh-120px)] p-4">
          <FilterSection
            title="Rasa (Taste)"
            options={rasaOptions}
            selected={filters.rasa}
            onToggle={(value) => toggleFilter("rasa", value)}
          />

          <FilterSection
            title="Virya (Potency)"
            options={viryaOptions}
            selected={filters.virya}
            onToggle={(value) => toggleFilter("virya", value)}
          />

          <FilterSection
            title="Dosha Karma"
            options={doshaOptions}
            selected={filters.dosha}
            onToggle={(value) => toggleFilter("dosha", value)}
          />

          <FilterSection
            title="Useful Part"
            options={usefulPartOptions}
            selected={filters.usefulPart}
            onToggle={(value) => toggleFilter("usefulPart", value)}
          />
        </div>

        {/* Apply Button - Mobile */}
        <div className="sm:hidden p-4 border-t border-border bg-card">
          <button
            onClick={onClose}
            className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Apply Filters
            {activeCount > 0 && ` (${activeCount})`}
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;
