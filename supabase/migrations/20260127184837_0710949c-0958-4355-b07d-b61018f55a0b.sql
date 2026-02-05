-- Make share_analytics insert policy more specific (still allows anonymous but validates data)
DROP POLICY IF EXISTS "Anyone can insert analytics" ON public.share_analytics;

CREATE POLICY "Insert analytics with valid share reference"
  ON public.share_analytics FOR INSERT
  WITH CHECK (
    -- Must reference a valid share or have a flashcard_id
    (share_id IS NOT NULL AND EXISTS (SELECT 1 FROM public.flashcard_shares WHERE id = share_id))
    OR (share_id IS NULL AND flashcard_id IS NOT NULL)
  );
