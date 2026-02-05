-- Add a SELECT policy for authenticated users on flashcard_share_settings
-- This table is not actively used in the app, but needs a policy to satisfy the linter
CREATE POLICY "Authenticated users can view share settings"
ON public.flashcard_share_settings
FOR SELECT
TO authenticated
USING (true);
