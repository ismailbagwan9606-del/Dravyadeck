import { Link } from "react-router-dom";
import { vyadhiTopics, rogaNidanaFlashcards } from "@/data/rogaNidanaData";
import QAFlashcard from "./QAFlashcard";
import { Button } from "@/components/ui/button";
import { Lock, ChevronRight, Stethoscope } from "lucide-react";

const RogaNidanaHomePreview = () => {
  // Get preview topics (Jvara and Prameha)
  const previewTopics = vyadhiTopics.filter(t => t.isPreviewTopic);
  
  // Get locked topics count
  const lockedTopicsCount = vyadhiTopics.filter(t => !t.isPreviewTopic).length;

  // Get total flashcard count
  const totalFlashcards = rogaNidanaFlashcards.length;

  // Get flashcards for a specific topic
  const getTopicFlashcards = (topicId: string) => {
    return rogaNidanaFlashcards.filter(c => c.vyadhiId === topicId);
  };

  return (
    <section className="mb-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Stethoscope className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-semibold text-foreground">
              Roga Nidhana – Part 2
            </h3>
            <p className="text-sm text-muted-foreground">
              {totalFlashcards}+ NCISM-aligned Vyadhi Vigyan flashcards
            </p>
          </div>
        </div>
        <Link to="/roga-nidana">
          <Button variant="outline" size="sm" className="gap-1">
            View All
            <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      {/* Preview Topics with Sample Cards */}
      <div className="space-y-8">
        {previewTopics.map((topic) => {
          const topicFlashcards = getTopicFlashcards(topic.id);
          return (
            <div key={topic.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-lg font-medium text-foreground">
                  {topic.name}
                </h4>
                <span className="text-xs text-muted-foreground">
                  Preview • {topicFlashcards.length} cards
                </span>
              </div>
              
              {/* Show 2 preview cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {topicFlashcards.slice(0, 2).map((card, index) => (
                  <div
                    key={card.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <QAFlashcard card={card} />
                  </div>
                ))}
              </div>

              {/* More cards indicator */}
              {topicFlashcards.length > 2 && (
                <p className="text-center text-sm text-muted-foreground">
                  +{topicFlashcards.length - 2} more flashcards in this topic
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Locked Topics Teaser */}
      <div className="mt-8 p-6 bg-muted/50 rounded-xl border border-border">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-muted rounded-lg">
            <Lock className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-foreground mb-1">
              {lockedTopicsCount} more Vyadhi topics available
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Atisara, Grahani, Kushta, Pandu, Kamala, Amlapitta, Kasa, Shwasa, 
              and more – all with complete Nidana Panchaka flashcards.
            </p>
            <Link to="/signup">
              <Button size="sm">
                Sign up to unlock all topics
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RogaNidanaHomePreview;
