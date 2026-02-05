import { useState, useMemo, useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle2, Circle, RefreshCw, Loader2 } from "lucide-react";
import { flashcards } from "@/data/flashcards";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import Flashcard from "@/components/Flashcard";
import { cn } from "@/lib/utils";
import { useProgress } from "@/hooks/useProgress";

const DAILY_COUNT = 5;

const DailyRevisionPage = () => {
  const { user } = useAuth();
  const { loading, isRevised, markAsRevised, unmarkAsRevised } = useProgress();
  const [localRevisedIds, setLocalRevisedIds] = useState<Set<string>>(new Set());

  // Generate consistent daily selection based on date
  const dailyCards = useMemo(() => {
    const today = new Date().toDateString();
    // Simple hash to get consistent random selection per day
    const seed = today.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    const shuffled = [...flashcards].sort((a, b) => {
      const hashA = (parseInt(a.id) * seed) % 1000;
      const hashB = (parseInt(b.id) * seed) % 1000;
      return hashA - hashB;
    });
    return shuffled.slice(0, DAILY_COUNT);
  }, []);

  // Sync local state with database on load
  useEffect(() => {
    if (!loading && user) {
      const revisedToday = new Set(
        dailyCards.filter((card) => isRevised(card.id)).map((card) => card.id)
      );
      setLocalRevisedIds(revisedToday);
    }
  }, [loading, user, dailyCards, isRevised]);

  const toggleRevised = async (id: string) => {
    if (!user) return;

    const currentlyRevised = localRevisedIds.has(id);

    // Optimistic update
    setLocalRevisedIds((prev) => {
      const next = new Set(prev);
      if (currentlyRevised) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

    // Persist to database
    const success = currentlyRevised
      ? await unmarkAsRevised(id)
      : await markAsRevised(id);

    // Revert if failed
    if (!success) {
      setLocalRevisedIds((prev) => {
        const next = new Set(prev);
        if (currentlyRevised) {
          next.add(id);
        } else {
          next.delete(id);
        }
        return next;
      });
    }
  };

  const allRevised = localRevisedIds.size === DAILY_COUNT;

  if (!user) {
    return (
      <AppLayout>
        <section className="text-center py-12">
          <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
            Daily Revision
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Sign in to get personalized daily revision sets and build consistent study habits.
          </p>
          <Link to="/signup">
            <Button>Create Free Account</Button>
          </Link>
        </section>
      </AppLayout>
    );
  }

  if (loading) {
    return (
      <AppLayout>
        <section className="mb-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Daily Revision
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Loading today's dravyas...
          </p>
        </section>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {/* Page Header */}
      <section className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Daily Revision
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Today's {DAILY_COUNT} dravyas for you to revise
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">
              {localRevisedIds.size}/{DAILY_COUNT}
            </p>
            <p className="text-xs text-muted-foreground">Revised</p>
          </div>
        </div>
      </section>

      {/* Completion Message */}
      {allRevised && (
        <Card className="mb-6 bg-primary/5 border-primary/20">
          <CardContent className="py-4 text-center">
            <CheckCircle2 className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="font-medium text-foreground">
              Great work! You've completed today's revision.
            </p>
            <p className="text-sm text-muted-foreground">
              Come back tomorrow for a fresh set.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Daily Cards */}
      <section className="space-y-4">
        {dailyCards.map((card, index) => {
          const cardRevised = localRevisedIds.has(card.id);

          return (
            <div
              key={card.id}
              className={cn(
                "relative transition-opacity",
                cardRevised && "opacity-60"
              )}
            >
              <div className="flex items-start gap-4">
                {/* Revision Toggle */}
                <button
                  onClick={() => toggleRevised(card.id)}
                  className="mt-4 shrink-0"
                >
                  {cardRevised ? (
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  ) : (
                    <Circle className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
                  )}
                </button>

                {/* Card */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                      #{index + 1}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {card.category}
                    </span>
                  </div>
                  <Flashcard card={card} />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          <RefreshCw className="w-4 h-4 inline mr-1" />
          New set refreshes daily at midnight
        </p>
      </div>
    </AppLayout>
  );
};

export default DailyRevisionPage;
