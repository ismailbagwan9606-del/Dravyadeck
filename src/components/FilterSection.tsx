import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import FilterChip from "./FilterChip";

interface FilterSectionProps {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
  defaultExpanded?: boolean;
}

const FilterSection = ({
  title,
  options,
  selected,
  onToggle,
  defaultExpanded = true,
}: FilterSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between py-3 px-1 text-left hover:bg-muted/50 transition-colors rounded"
      >
        <span className="font-medium text-foreground">
          {title}
          {selected.length > 0 && (
            <span className="ml-2 text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
              {selected.length}
            </span>
          )}
        </span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {isExpanded && (
        <div className="pb-3 px-1">
          <div className="flex flex-wrap gap-2">
            {options.map((option) => (
              <FilterChip
                key={option}
                label={option}
                selected={selected.includes(option)}
                onClick={() => onToggle(option)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSection;
