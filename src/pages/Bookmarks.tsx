import { useMemo } from "react";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkX, Layers, Loader2 } from "lucide-react";
import { flashcards } from "@/data/flashcards";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import Flashcard from "@/components/Flashcard";
import { useBookmarks } from "@/hooks/useBookmarks";

const BookmarksPage = () => {
  const { user } = useAuth();
  const { bookmarkedIds, loading, removeBookmark } = useBookmarks();

  const bookmarkedCards = useMemo(() => {
    return flashcards.filter((card) => bookmarkedIds.includes(card.id));
  }, [bookmarkedIds]);

  if (!user) {
    return (
      <AppLayout>
        <section className="text-center py-12">
          <Bookmark className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
            Your Bookmarks
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Sign in to save dravyas for focused revision and quick access.
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
            Bookmarks
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Save dravyas for quick access during revision
          </p>
        </section>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }

  if (bookmarkedCards.length === 0) {
    return (
      <AppLayout>
        <section className="mb-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Bookmarks
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Save dravyas for quick access during revision
          </p>
        </section>

        <div className="text-center py-12">
          <BookmarkX className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
            No Bookmarks Yet
          </h3>
          <p className="text-muted-foreground mb-6">
            Start bookmarking dravyas from the Flashcards page for quick revision.
          </p>
          <Link to="/flashcards">
            <Button variant="outline" className="gap-2">
              <Layers className="w-4 h-4" />
              Browse Flashcards
            </Button>
          </Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {/* Page Header */}
      <section className="mb-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Bookmarks
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          {bookmarkedCards.length} dravya{bookmarkedCards.length !== 1 ? "s" : ""} saved for revision
        </p>
      </section>

      {/* Bookmarked Cards */}
      <section className="space-y-4">
        {bookmarkedCards.map((card) => (
          <div key={card.id} className="relative group">
            <div className="grid gap-4 sm:grid-cols-[1fr_auto] items-start">
              <div className="flex-1">
                <Flashcard card={card} />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeBookmark(card.id)}
                className="text-muted-foreground hover:text-destructive sm:opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <BookmarkX className="w-4 h-4 mr-1" />
                Remove
              </Button>
            </div>
          </div>
        ))}
      </section>
    </AppLayout>
  );
};

export default BookmarksPage;
