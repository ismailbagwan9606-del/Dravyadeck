import { useState, useMemo } from "react";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GitCompare, X, Plus } from "lucide-react";
import { flashcards, Flashcard as FlashcardType } from "@/data/flashcards";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ComparePage = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const maxComparison = 3;

  const selectedCards = useMemo(() => {
    return selectedIds
      .map((id) => flashcards.find((f) => f.id === id))
      .filter(Boolean) as FlashcardType[];
  }, [selectedIds]);

  const availableCards = useMemo(() => {
    return flashcards.filter((f) => !selectedIds.includes(f.id));
  }, [selectedIds]);

  const addCard = (id: string) => {
    if (selectedIds.length < maxComparison && !selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const removeCard = (id: string) => {
    setSelectedIds(selectedIds.filter((sid) => sid !== id));
  };

  const clearAll = () => {
    setSelectedIds([]);
  };

  const comparisonFields = [
    { key: "rasa", label: "Rasa" },
    { key: "guna", label: "Guna" },
    { key: "virya", label: "Virya" },
    { key: "vipaka", label: "Vipaka" },
    { key: "doshaKarma", label: "Dosha Karma" },
    { key: "importantKarma", label: "Important Karma" },
    { key: "prayoga", label: "Prayoga" },
  ] as const;

  return (
    <AppLayout>
      {/* Page Header */}
      <section className="mb-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Compare Dravyas
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Select up to {maxComparison} dravyas for side-by-side comparison
        </p>
      </section>

      {/* Selection Controls */}
      <section className="mb-6">
        <div className="flex flex-wrap gap-3 items-center">
          {selectedIds.length < maxComparison && (
            <Select onValueChange={addCard}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Add a dravya to compare" />
              </SelectTrigger>
              <SelectContent>
                {availableCards.map((card) => (
                  <SelectItem key={card.id} value={card.id}>
                    {card.front.sanskritName} ({card.front.latinName})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {selectedIds.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAll}>
              Clear All
            </Button>
          )}
        </div>

        {/* Selected Pills */}
        {selectedCards.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {selectedCards.map((card) => (
              <div
                key={card.id}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm"
              >
                <span>{card.front.sanskritName}</span>
                <button
                  onClick={() => removeCard(card.id)}
                  className="hover:bg-primary/20 rounded-full p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Empty State */}
      {selectedCards.length === 0 && (
        <div className="text-center py-12">
          <GitCompare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
            Start Comparing
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Select 2 or 3 dravyas above to see their properties side by side. 
            Perfect for exam preparation and understanding differences.
          </p>
        </div>
      )}

      {/* Comparison Table */}
      {selectedCards.length >= 2 && (
        <div className="overflow-x-auto -mx-4 px-4">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-serif text-foreground font-semibold w-32">
                  Property
                </th>
                {selectedCards.map((card) => (
                  <th
                    key={card.id}
                    className="text-left py-3 px-4 font-serif text-foreground font-semibold"
                  >
                    <div className="text-sm">{card.front.sanskritName}</div>
                    <div className="text-xs font-normal text-muted-foreground">
                      {card.front.latinName}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonFields.map((field) => (
                <tr key={field.key} className="border-b border-border/50">
                  <td className="py-3 px-4 font-medium text-muted-foreground text-sm">
                    {field.label}
                  </td>
                  {selectedCards.map((card) => (
                    <td key={card.id} className="py-3 px-4 text-sm text-foreground">
                      {card.back[field.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Single selection message */}
      {selectedCards.length === 1 && (
        <Card>
          <CardContent className="py-8 text-center">
            <Plus className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">
              Add one more dravya to start comparing
            </p>
          </CardContent>
        </Card>
      )}
    </AppLayout>
  );
};

export default ComparePage;
