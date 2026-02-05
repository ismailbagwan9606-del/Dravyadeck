import { useState, useMemo } from "react";
import AppLayout from "@/components/AppLayout";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import Flashcard from "@/components/Flashcard";
import EmptyState from "@/components/EmptyState";
import FilterPanel from "@/components/FilterPanel";
import FilterToggleButton from "@/components/FilterToggleButton";
import ActiveFiltersBar from "@/components/ActiveFiltersBar";
import GuestLimitBanner from "@/components/GuestLimitBanner";
import { flashcards, categories } from "@/data/flashcards";
import { FilterState, initialFilterState, hasActiveFilters } from "@/types/filters";
import { useAuth } from "@/contexts/AuthContext";

const GUEST_CARD_LIMIT = 5;

const Flashcards = () => {
  const { user, loading } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const removeFilter = (category: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].filter((v) => v !== value),
    }));
  };

  const clearAllFilters = () => {
    setFilters(initialFilterState);
  };

  const filteredCards = useMemo(() => {
    return flashcards.filter((card) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        card.front.sanskritName.toLowerCase().includes(searchLower) ||
        card.front.latinName.toLowerCase().includes(searchLower) ||
        card.front.commonName.toLowerCase().includes(searchLower);

      const matchesCategory =
        selectedCategory === "All" || card.category === selectedCategory;

      const matchesRasa =
        filters.rasa.length === 0 ||
        filters.rasa.every((rasa) => card.filters.rasaList.includes(rasa));

      const matchesVirya =
        filters.virya.length === 0 ||
        filters.virya.includes(card.filters.virya);

      const matchesDosha =
        filters.dosha.length === 0 ||
        filters.dosha.every((dosha) => card.filters.doshaList.includes(dosha));

      const matchesUsefulPart =
        filters.usefulPart.length === 0 ||
        filters.usefulPart.includes(card.filters.usefulPart);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesRasa &&
        matchesVirya &&
        matchesDosha &&
        matchesUsefulPart
      );
    });
  }, [searchQuery, selectedCategory, filters]);

  return (
    <AppLayout>
      {/* Page Header */}
      <section className="mb-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Flashcards
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Tap to revise exam properties for each dravya
        </p>
      </section>

      {/* Search and Filter Controls */}
      <section className="mb-4 space-y-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          <FilterToggleButton
            filters={filters}
            onClick={() => setIsFilterPanelOpen(true)}
          />
        </div>

        <div className="overflow-x-auto -mx-4 px-4 pb-1">
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        <ActiveFiltersBar
          filters={filters}
          onRemove={removeFilter}
          onClearAll={clearAllFilters}
        />
      </section>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          {!user ? (
            <>
              Viewing <span className="font-medium text-foreground">{Math.min(GUEST_CARD_LIMIT, filteredCards.length)}</span> preview cards
              <span className="text-primary"> (sign in for all {flashcards.length})</span>
            </>
          ) : (
            <>
              Showing <span className="font-medium text-foreground">{filteredCards.length}</span> of {flashcards.length} drugs
              {(searchQuery || hasActiveFilters(filters) || selectedCategory !== "All") && (
                <span className="text-primary"> (filtered)</span>
              )}
            </>
          )}
        </p>
      </div>

      {/* Guest Limit Banner */}
      {!user && !loading && filteredCards.length > GUEST_CARD_LIMIT && (
        <GuestLimitBanner 
          totalCards={flashcards.length} 
          visibleCards={GUEST_CARD_LIMIT} 
        />
      )}

      {/* Flashcards Grid */}
      {filteredCards.length > 0 ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {(user ? filteredCards : filteredCards.slice(0, GUEST_CARD_LIMIT)).map((card, index) => (
            <div
              key={card.id}
              className="animate-fade-in"
              style={{ animationDelay: `${Math.min(index, 8) * 50}ms` }}
            >
              <Flashcard card={card} />
            </div>
          ))}
        </section>
      ) : (
        <EmptyState searchQuery={searchQuery || "your filters"} />
      )}

      {/* Filter Panel */}
      <FilterPanel
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
      />
    </AppLayout>
  );
};

export default Flashcards;
