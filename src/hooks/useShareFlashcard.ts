import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export type SharePlatform = "whatsapp" | "telegram" | "twitter" | "link";

interface ShareResult {
  shareToken: string;
  shareUrl: string;
}

export const useShareFlashcard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const createShare = async (
    flashcardId: string,
    platform: SharePlatform
  ): Promise<ShareResult | null> => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to share flashcards.",
        variant: "destructive",
      });
      return null;
    }

    setLoading(true);

    try {
      // Check if a share already exists for this user + flashcard
      const { data: existingShare } = await supabase
        .from("flashcard_shares")
        .select("share_token")
        .eq("flashcard_id", flashcardId)
        .eq("user_id", user.id)
        .maybeSingle();

      let shareToken: string;

      if (existingShare) {
        shareToken = existingShare.share_token;
      } else {
        // Create a new share record
        const { data: newShare, error } = await supabase
          .from("flashcard_shares")
          .insert({
            flashcard_id: flashcardId,
            user_id: user.id,
            platform,
          })
          .select("share_token")
          .single();

        if (error) throw error;
        shareToken = newShare.share_token;
      }

      const shareUrl = `${window.location.origin}/share/dravya/${shareToken}`;

      return { shareToken, shareUrl };
    } catch (error) {
      console.error("Error creating share:", error);
      toast({
        title: "Share failed",
        description: "Could not generate share link. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const shareToWhatsApp = async (flashcardId: string, drugName: string) => {
    const result = await createShare(flashcardId, "whatsapp");
    if (result) {
      const text = encodeURIComponent(
        `🌿 Check out this Ayurvedic flashcard for ${drugName}!\n\nMaster Dravya Guna with exam-focused flashcards:\n${result.shareUrl}`
      );
      window.open(`https://wa.me/?text=${text}`, "_blank");
    }
  };

  const shareToTelegram = async (flashcardId: string, drugName: string) => {
    const result = await createShare(flashcardId, "telegram");
    if (result) {
      const text = encodeURIComponent(
        `🌿 Check out this Ayurvedic flashcard for ${drugName}!`
      );
      window.open(
        `https://t.me/share/url?url=${encodeURIComponent(result.shareUrl)}&text=${text}`,
        "_blank"
      );
    }
  };

  const shareToTwitter = async (flashcardId: string, drugName: string) => {
    const result = await createShare(flashcardId, "twitter");
    if (result) {
      const text = encodeURIComponent(
        `🌿 Master Dravya Guna with DravyaDeck!\n\nCheck out this flashcard for ${drugName}:`
      );
      window.open(
        `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(result.shareUrl)}`,
        "_blank"
      );
    }
  };

  const copyShareLink = async (flashcardId: string, drugName: string) => {
    const result = await createShare(flashcardId, "link");
    if (result) {
      try {
        await navigator.clipboard.writeText(result.shareUrl);
        toast({
          title: "Link copied!",
          description: `Share link for ${drugName} copied to clipboard.`,
        });
      } catch {
        toast({
          title: "Copy failed",
          description: result.shareUrl,
        });
      }
    }
  };

  return {
    loading,
    shareToWhatsApp,
    shareToTelegram,
    shareToTwitter,
    copyShareLink,
  };
};
