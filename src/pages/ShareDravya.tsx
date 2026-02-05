import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { flashcards, Flashcard as FlashcardType } from "@/data/flashcards";
import FlashcardPreview from "@/components/flashcard/FlashcardPreview";

import { Button } from "@/components/ui/button";
import { Loader2, BookOpen, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { trackShareView } from "@/hooks/useShareAnalytics";
import Flashcard from "@/components/Flashcard";

const ShareDravya = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [card, setCard] = useState<FlashcardType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadShare = async () => {
      if (!token) {
        setError("Invalid share link");
        setLoading(false);
        return;
      }

      try {
        // Fetch the share record using secure RPC function (prevents token enumeration)
        const { data: shareData, error: shareError } = await supabase
          .rpc('get_share_by_token', { p_token: token })
          .maybeSingle();

        if (shareError || !shareData) {
          setError("This share link is invalid or has expired");
          setLoading(false);
          return;
        }

        // Find the flashcard in our data
        const foundCard = flashcards.find((fc) => fc.id === shareData.flashcard_id);
        if (!foundCard) {
          setError("Flashcard not found");
          setLoading(false);
          return;
        }

        setCard(foundCard);

        // Track the view
        trackShareView(shareData.flashcard_id, token);
      } catch (err) {
        console.error("Error loading share:", err);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadShare();
  }, [token]);

  // If user is logged in, show full card and redirect option
  useEffect(() => {
    if (user && card && !authLoading) {
      // User is logged in, they can see full content
    }
  }, [user, card, authLoading]);

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !card) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <BookOpen className="w-16 h-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-serif font-bold text-foreground mb-2">
          {error || "Card not found"}
        </h1>
        <p className="text-muted-foreground mb-6 text-center">
          The flashcard you're looking for might have been removed or the link is incorrect.
        </p>
        <Button onClick={() => navigate("/")} className="gap-2">
          <BookOpen className="w-4 h-4" />
          Explore DravyaDeck
        </Button>
      </div>
    );
  }

  // Logged-in user sees full card
  if (user) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Success Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm mb-4">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Full access unlocked
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-2">
                {card.front.sanskritName}
              </h1>
              <p className="text-muted-foreground">
                You're viewing the complete flashcard with all exam properties.
              </p>
            </div>

            {/* Full Flashcard */}
            <div className="mb-8">
              <Flashcard card={card} />
            </div>

            {/* Explore More CTA */}
            <div className="text-center space-y-4">
              <Button onClick={() => navigate("/flashcards")} className="gap-2">
                Explore All 97 Dravyas
                <ArrowRight className="w-4 h-4" />
              </Button>
              <p className="text-sm text-muted-foreground">
                Access quiz mode, bookmarks, and track your progress.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Guest sees preview with CTA
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="font-serif text-xl font-bold text-foreground">
              DravyaDeck
            </span>
          </Link>
          <Button variant="outline" size="sm" onClick={() => navigate("/login")}>
            Sign In
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto">
          {/* Hero Text */}
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Shared Flashcard
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-3">
              Master Dravya Guna with Exam-Focused Flashcards
            </h1>
            <p className="text-muted-foreground">
              Access comprehensive Ayurvedic drug information designed for BAMS exam success.
            </p>
          </div>

          {/* Flashcard Preview */}
          <div className="mb-8">
            <FlashcardPreview card={card} showPartialBack={true} />
          </div>

          {/* CTA Section */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold text-center">
              Unlock the Full Flashcard
            </h2>
            <p className="text-sm text-muted-foreground text-center">
              Sign in to access all 97 Dravya flashcards, quiz mode, and track your progress.
            </p>

            <div className="space-y-3">
              <Button
                className="w-full"
                onClick={() => navigate("/signup", { state: { returnTo: window.location.pathname } })}
              >
                Create Free Account
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                state={{ returnTo: window.location.pathname }}
                className="text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">97</p>
              <p className="text-xs text-muted-foreground">Drug Flashcards</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">5+</p>
              <p className="text-xs text-muted-foreground">Study Modes</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">Free</p>
              <p className="text-xs text-muted-foreground">Forever</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShareDravya;
