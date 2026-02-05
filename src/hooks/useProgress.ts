import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface ProgressEntry {
  flashcard_id: string;
  revised_at: string;
  revision_count: number;
}

export const useProgress = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<ProgressEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProgress = useCallback(async () => {
    if (!user) {
      setProgress([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("user_progress")
        .select("flashcard_id, revised_at, revision_count")
        .eq("user_id", user.id)
        .order("revised_at", { ascending: false });

      if (error) throw error;
      setProgress(data || []);
    } catch (error) {
      console.error("Error fetching progress:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const markAsRevised = useCallback(
    async (flashcardId: string) => {
      if (!user) return false;

      try {
        // Check if entry exists
        const existing = progress.find((p) => p.flashcard_id === flashcardId);

        if (existing) {
          // Update existing entry
          const { error } = await supabase
            .from("user_progress")
            .update({
              revised_at: new Date().toISOString(),
              revision_count: existing.revision_count + 1,
            })
            .eq("user_id", user.id)
            .eq("flashcard_id", flashcardId);

          if (error) throw error;
        } else {
          // Insert new entry
          const { error } = await supabase.from("user_progress").insert({
            user_id: user.id,
            flashcard_id: flashcardId,
          });

          if (error) throw error;
        }

        await fetchProgress();
        return true;
      } catch (error) {
        console.error("Error marking as revised:", error);
        return false;
      }
    },
    [user, progress, fetchProgress]
  );

  const unmarkAsRevised = useCallback(
    async (flashcardId: string) => {
      if (!user) return false;

      try {
        const { error } = await supabase
          .from("user_progress")
          .delete()
          .eq("user_id", user.id)
          .eq("flashcard_id", flashcardId);

        if (error) throw error;
        await fetchProgress();
        return true;
      } catch (error) {
        console.error("Error unmarking revision:", error);
        return false;
      }
    },
    [user, fetchProgress]
  );

  const isRevised = useCallback(
    (flashcardId: string) => progress.some((p) => p.flashcard_id === flashcardId),
    [progress]
  );

  const getRevisedCount = useCallback(() => progress.length, [progress]);

  const getRecentlyRevised = useCallback(
    (limit: number = 5) => progress.slice(0, limit),
    [progress]
  );

  const getLastActiveDate = useCallback(() => {
    if (progress.length === 0) return null;
    return new Date(progress[0].revised_at);
  }, [progress]);

  return {
    progress,
    loading,
    markAsRevised,
    unmarkAsRevised,
    isRevised,
    getRevisedCount,
    getRecentlyRevised,
    getLastActiveDate,
    refetch: fetchProgress,
  };
};
