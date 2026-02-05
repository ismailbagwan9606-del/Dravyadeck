-- Fix: Restrict flashcard_share_settings to authenticated users only
-- Drop the overly permissive public SELECT policy
DROP POLICY IF EXISTS "Anyone can view share settings" ON public.flashcard_share_settings;

-- Create a more restrictive policy - authenticated users can view share settings
-- This is needed for the share feature to check if sharing is enabled
CREATE POLICY "Authenticated users can view share settings"
ON public.flashcard_share_settings
FOR SELECT
TO authenticated
USING (true);
