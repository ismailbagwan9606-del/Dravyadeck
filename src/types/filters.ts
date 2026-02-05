export interface FilterState {
  rasa: string[];
  virya: string[];
  dosha: string[];
  usefulPart: string[];
}

export const initialFilterState: FilterState = {
  rasa: [],
  virya: [],
  dosha: [],
  usefulPart: [],
};

export const hasActiveFilters = (filters: FilterState): boolean => {
  return (
    filters.rasa.length > 0 ||
    filters.virya.length > 0 ||
    filters.dosha.length > 0 ||
    filters.usefulPart.length > 0
  );
};

export const countActiveFilters = (filters: FilterState): number => {
  return (
    filters.rasa.length +
    filters.virya.length +
    filters.dosha.length +
    filters.usefulPart.length
  );
};
