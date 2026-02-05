import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export const useBookmarks = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = useCallback(async () => {
    if (!user) {
      setBookmarkedIds([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("user_bookmarks")
        .select("flashcard_id")
        .eq("user_id", user.id);

      if (error) throw error;
      setBookmarkedIds(data?.map((b) => b.flashcard_id) || []);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  const addBookmark = useCallback(
    async (flashcardId: string) => {
      if (!user) {
        toast({
          title: "Sign in required",
          description: "Please sign in to bookmark dravyas.",
          variant: "destructive",
        });
        return false;
      }

      try {
        const { error } = await supabase.from("user_bookmarks").insert({
          user_id: user.id,
          flashcard_id: flashcardId,
        });

        if (error) throw error;
        setBookmarkedIds((prev) => [...prev, flashcardId]);
        toast({
          title: "Bookmarked",
          description: "Dravya added to your bookmarks.",
        });
        return true;
      } catch (error) {
        console.error("Error adding bookmark:", error);
        toast({
          title: "Error",
          description: "Failed to add bookmark. Please try again.",
          variant: "destructive",
        });
        return false;
      }
    },
    [user, toast]
  );

  const removeBookmark = useCallback(
    async (flashcardId: string) => {
      if (!user) return false;

      try {
        const { error } = await supabase
          .from("user_bookmarks")
          .delete()
          .eq("user_id", user.id)
          .eq("flashcard_id", flashcardId);

        if (error) throw error;
        setBookmarkedIds((prev) => prev.filter((id) => id !== flashcardId));
        toast({
          title: "Removed",
          description: "Dravya removed from bookmarks.",
        });
        return true;
      } catch (error) {
        console.error("Error removing bookmark:", error);
        toast({
          title: "Error",
          description: "Failed to remove bookmark. Please try again.",
          variant: "destructive",
        });
        return false;
      }
    },
    [user, toast]
  );

  const toggleBookmark = useCallback(
    async (flashcardId: string) => {
      if (bookmarkedIds.includes(flashcardId)) {
        return removeBookmark(flashcardId);
      } else {
        return addBookmark(flashcardId);
      }
    },
    [bookmarkedIds, addBookmark, removeBookmark]
  );

  const isBookmarked = useCallback(
    (flashcardId: string) => bookmarkedIds.includes(flashcardId),
    [bookmarkedIds]
  );

  return {
    bookmarkedIds,
    loading,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    isBookmarked,
    refetch: fetchBookmarks,
  };
};
