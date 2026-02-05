import { supabase } from "@/integrations/supabase/client";

type EventType = "view" | "signup" | "login";

const getVisitorId = (): string => {
  let visitorId = localStorage.getItem("dravyadeck_visitor_id");
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem("dravyadeck_visitor_id", visitorId);
  }
  return visitorId;
};

export const useShareAnalytics = () => {
  const trackEvent = async (
    flashcardId: string,
    eventType: EventType,
    shareId?: string,
    userId?: string
  ) => {
    try {
      await supabase.from("share_analytics").insert({
        share_id: shareId || null,
        flashcard_id: flashcardId,
        event_type: eventType,
        visitor_id: getVisitorId(),
        user_id: userId || null,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent || null,
      });
    } catch (error) {
      console.error("Error tracking analytics:", error);
    }
  };

  const trackView = (flashcardId: string, shareId?: string) => {
    trackEvent(flashcardId, "view", shareId);
  };

  const trackSignup = (flashcardId: string, userId: string, shareId?: string) => {
    trackEvent(flashcardId, "signup", shareId, userId);
  };

  const trackLogin = (flashcardId: string, userId: string, shareId?: string) => {
    trackEvent(flashcardId, "login", shareId, userId);
  };

  return {
    trackView,
    trackSignup,
    trackLogin,
  };
};

export const trackShareView = async (flashcardId: string, shareToken?: string) => {
  try {
  let shareId: string | undefined;
    
    if (shareToken) {
      // Use secure RPC function to look up share (prevents token enumeration)
      const { data } = await supabase
        .rpc('get_share_by_token', { p_token: shareToken })
        .maybeSingle();
      
      shareId = data?.id;
    }

    await supabase.from("share_analytics").insert({
      share_id: shareId || null,
      flashcard_id: flashcardId,
      event_type: "view",
      visitor_id: localStorage.getItem("dravyadeck_visitor_id") || crypto.randomUUID(),
      referrer: document.referrer || null,
      user_agent: navigator.userAgent || null,
    });
  } catch (error) {
    console.error("Error tracking view:", error);
  }
};
