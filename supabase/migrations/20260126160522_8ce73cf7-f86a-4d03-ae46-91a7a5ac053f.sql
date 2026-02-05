-- Fix 1: Make avatars bucket private and restrict SELECT to user's own avatar
UPDATE storage.buckets 
SET public = false 
WHERE id = 'avatars';

-- Drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Avatar images are publicly accessible" ON storage.objects;

-- Create a more restrictive SELECT policy - users can only view their own avatar
CREATE POLICY "Users can view their own avatar"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'avatars' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Fix 2: Replace the overly permissive anonymous feedback INSERT policy
-- Require authentication for feedback submission to prevent spam
DROP POLICY IF EXISTS "Anyone can submit feedback" ON public.user_feedback;

CREATE POLICY "Authenticated users can submit feedback"
  ON public.user_feedback
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);
