import { useState, useMemo } from "react";
import AppLayout from "@/components/AppLayout";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import EmptyState from "@/components/EmptyState";
import VyadhiTopicCard from "@/components/roga-nidana/VyadhiTopicCard";
import VyadhiFlashcardDeck from "@/components/roga-nidana/VyadhiFlashcardDeck";
import SignupWall from "@/components/roga-nidana/SignupWall";
import { vyadhiTopics, vyadhiCategories, rogaNidanaFlashcards, VyadhiTopic } from "@/data/rogaNidanaData";
import { useAuth } from "@/contexts/AuthContext";

const RogaNidana = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTopic, setSelectedTopic] = useState<VyadhiTopic | null>(null);
  const [showSignupWall, setShowSignupWall] = useState(false);
  const [pendingTopic, setPendingTopic] = useState<VyadhiTopic | null>(null);

  // Filter topics based on search and category
  const filteredTopics = useMemo(() => {
    return vyadhiTopics.filter((topic) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        topic.name.toLowerCase().includes(searchLower) ||
        topic.category.toLowerCase().includes(searchLower);

      const matchesCategory =
        selectedCategory === "All" || topic.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Get flashcards for selected topic
  const topicFlashcards = useMemo(() => {
    if (!selectedTopic) return [];
    return rogaNidanaFlashcards.filter(c => c.vyadhiId === selectedTopic.id);
  }, [selectedTopic]);

  // Total flashcard count
  const totalFlashcards = rogaNidanaFlashcards.length;

  // Handle topic click
  const handleTopicClick = (topic: VyadhiTopic) => {
    const isLocked = !topic.isPreviewTopic && !user;
    
    if (isLocked) {
      setPendingTopic(topic);
      setShowSignupWall(true);
    } else {
      setSelectedTopic(topic);
    }
  };

  // Close signup wall
  const handleCloseSignupWall = () => {
    setShowSignupWall(false);
    setPendingTopic(null);
  };

  // If a topic is selected, show the flashcard deck
  if (selectedTopic) {
    const isPreviewMode = selectedTopic.isPreviewTopic && !user;
    
    return (
      <AppLayout>
        <VyadhiFlashcardDeck
          topic={selectedTopic}
          flashcards={topicFlashcards}
          onBack={() => setSelectedTopic(null)}
          isPreviewMode={isPreviewMode}
          previewLimit={3}
        />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {/* Signup Wall Modal */}
      {showSignupWall && (
        <SignupWall 
          vyadhiName={pendingTopic?.name} 
          onClose={handleCloseSignupWall} 
        />
      )}

      {/* Page Header */}
      <section className="mb-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Roga Nidhana – Part 2
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          {totalFlashcards}+ NCISM-aligned Vyadhi Vigyan flashcards for BAMS 2nd year
        </p>
      </section>

      {/* Search and Filter Controls */}
      <section className="mb-4 space-y-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by Vyadhi name or category..."
        />

        <div className="overflow-x-auto -mx-4 px-4 pb-1">
          <CategoryFilter
            categories={vyadhiCategories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>
      </section>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">
            {filteredTopics.length}
          </span>{" "}
          of {vyadhiTopics.length} Vyadhi topics
          {(searchQuery || selectedCategory !== "All") && (
            <span className="text-primary"> (filtered)</span>
          )}
        </p>
      </div>

      {/* Topics Grid */}
      {filteredTopics.length > 0 ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTopics.map((topic, index) => {
            const isLocked = !topic.isPreviewTopic && !user;
            return (
              <div
                key={topic.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <VyadhiTopicCard
                  topic={topic}
                  isLocked={isLocked}
                  onClick={() => handleTopicClick(topic)}
                />
              </div>
            );
          })}
        </section>
      ) : (
        <EmptyState searchQuery={searchQuery || "your filters"} />
      )}

      {/* Access Info for guests */}
      {!user && (
        <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Jvara</span> and{" "}
            <span className="font-medium text-foreground">Prameha</span> are available for preview.{" "}
            <a href="/signup" className="text-primary hover:underline">
              Sign up for free
            </a>{" "}
            to unlock all 33 Vyadhi topics.
          </p>
        </div>
      )}
    </AppLayout>
  );
};

export default RogaNidana;
