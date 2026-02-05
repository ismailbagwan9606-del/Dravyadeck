-- Add explicit deny policy for anonymous users on profiles table
-- This ensures anonymous users cannot access any profile data
CREATE POLICY "Deny anonymous access to profiles"
ON public.profiles
FOR SELECT
TO anon
USING (false);
