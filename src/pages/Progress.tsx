import { useMemo } from "react";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { TrendingUp, BookOpen, Clock, Loader2 } from "lucide-react";
import { flashcards } from "@/data/flashcards";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/hooks/useProgress";
import { formatDistanceToNow } from "date-fns";

const ProgressPage = () => {
  const { user } = useAuth();
  const { loading, getRevisedCount, getRecentlyRevised, getLastActiveDate } = useProgress();
  const totalDravyas = flashcards.length;

  const revisedCount = getRevisedCount();
  const progressPercent = (revisedCount / totalDravyas) * 100;
  const lastActiveDate = getLastActiveDate();
  const recentProgress = getRecentlyRevised(5);

  const recentlyRevisedCards = useMemo(() => {
    return recentProgress
      .map((p) => {
        const card = flashcards.find((f) => f.id === p.flashcard_id);
        return card ? { ...card, revisedAt: p.revised_at } : null;
      })
      .filter(Boolean);
  }, [recentProgress]);

  if (!user) {
    return (
      <AppLayout>
        <section className="text-center py-12">
          <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
            Track Your Progress
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Sign in to track which dravyas you've revised and monitor your learning journey.
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
            Your Progress
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Track your revision journey through Dravya Guna Vigyan
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
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Your Progress
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Track your revision journey through Dravya Guna Vigyan
        </p>
      </section>

      {/* Progress Overview */}
      <div className="grid gap-4 sm:gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="w-5 h-5 text-primary" />
              Revision Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Dravyas Revised</span>
                <span className="font-medium text-foreground">
                  {revisedCount} / {totalDravyas}
                </span>
              </div>
              <ProgressBar value={progressPercent} className="h-3" />
              <p className="text-xs text-muted-foreground">
                {revisedCount === 0
                  ? "Start your revision journey today!"
                  : `${Math.round(progressPercent)}% complete — keep going!`}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="w-5 h-5 text-primary" />
              Last Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lastActiveDate ? (
              <>
                <p className="text-foreground font-medium">
                  {formatDistanceToNow(lastActiveDate, { addSuffix: true })}
                </p>
                <p className="text-sm text-muted-foreground">
                  Keep revising regularly for best results.
                </p>
              </>
            ) : (
              <>
                <p className="text-foreground font-medium">No activity yet</p>
                <p className="text-sm text-muted-foreground">
                  Start revising to track your progress.
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recently Revised */}
      <section>
        <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
          Recently Revised
        </h3>
        {recentlyRevisedCards.length > 0 ? (
          <div className="space-y-2">
            {recentlyRevisedCards.map((card: any) => (
              <div
                key={card.id}
                className="flex items-center justify-between p-3 bg-card rounded-lg border border-border"
              >
                <div>
                  <p className="font-medium text-foreground text-sm">
                    {card.front.sanskritName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {card.front.latinName}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                  {card.category}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">
            No dravyas revised yet. Start your Daily Revision to track progress.
          </p>
        )}
      </section>
    </AppLayout>
  );
};

export default ProgressPage;
