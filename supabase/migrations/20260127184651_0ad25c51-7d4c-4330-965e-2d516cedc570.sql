-- Create table for tracking flashcard shares
CREATE TABLE public.flashcard_shares (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  flashcard_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  share_token TEXT NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(8), 'hex'),
  platform TEXT, -- 'whatsapp', 'telegram', 'twitter', 'instagram', 'link'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for tracking share analytics/conversions
CREATE TABLE public.share_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  share_id UUID REFERENCES public.flashcard_shares(id) ON DELETE CASCADE,
  flashcard_id TEXT NOT NULL,
  event_type TEXT NOT NULL, -- 'view', 'signup', 'login'
  visitor_id TEXT, -- anonymous tracking ID
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  referrer TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for admin share controls
CREATE TABLE public.flashcard_share_settings (
  flashcard_id TEXT PRIMARY KEY,
  sharing_enabled BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Enable RLS on all tables
ALTER TABLE public.flashcard_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.share_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcard_share_settings ENABLE ROW LEVEL SECURITY;

-- RLS policies for flashcard_shares
CREATE POLICY "Anyone can view shares"
  ON public.flashcard_shares FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create shares"
  ON public.flashcard_shares FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete their own shares"
  ON public.flashcard_shares FOR DELETE
  USING (auth.uid() = user_id);

-- RLS policies for share_analytics (insert-only for tracking)
CREATE POLICY "Anyone can insert analytics"
  ON public.share_analytics FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view analytics for their shares"
  ON public.share_analytics FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.flashcard_shares fs 
      WHERE fs.id = share_id AND fs.user_id = auth.uid()
    )
  );

-- RLS policies for flashcard_share_settings (admin only - for now allow read)
CREATE POLICY "Anyone can view share settings"
  ON public.flashcard_share_settings FOR SELECT
  USING (true);

-- Add login_provider column to profiles for tracking social logins
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS login_provider TEXT DEFAULT 'email';

-- Create indexes for performance
CREATE INDEX idx_flashcard_shares_flashcard ON public.flashcard_shares(flashcard_id);
CREATE INDEX idx_flashcard_shares_token ON public.flashcard_shares(share_token);
CREATE INDEX idx_share_analytics_share ON public.share_analytics(share_id);
CREATE INDEX idx_share_analytics_flashcard ON public.share_analytics(flashcard_id);
