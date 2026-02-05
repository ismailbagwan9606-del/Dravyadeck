-- Create a secure function to look up share by token (only returns non-sensitive fields)
CREATE OR REPLACE FUNCTION public.get_share_by_token(p_token TEXT)
RETURNS TABLE(
  id UUID,
  flashcard_id TEXT,
  created_at TIMESTAMPTZ
) 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT fs.id, fs.flashcard_id, fs.created_at
  FROM public.flashcard_shares fs
  WHERE fs.share_token = p_token
  LIMIT 1;
END;
$$;

-- Grant execute permissions to both anon and authenticated users
GRANT EXECUTE ON FUNCTION public.get_share_by_token(TEXT) TO anon, authenticated;

-- Drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Anyone can view shares" ON public.flashcard_shares;

-- Create a restricted policy: users can only view their own shares
CREATE POLICY "Users can view their own shares"
  ON public.flashcard_shares FOR SELECT
  USING (auth.uid() = user_id);
