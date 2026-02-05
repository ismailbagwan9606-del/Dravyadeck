-- Create user_feedback table for storing reviews and feedback
CREATE TABLE public.user_feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  requested_feature TEXT,
  is_approved BOOLEAN NOT NULL DEFAULT false,
  is_testimonial_eligible BOOLEAN GENERATED ALWAYS AS (rating >= 4 AND review_text IS NOT NULL AND LENGTH(review_text) > 10) STORED,
  feedback_type TEXT DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_feedback ENABLE ROW LEVEL SECURITY;

-- Anyone can insert feedback (including guests)
CREATE POLICY "Anyone can submit feedback"
ON public.user_feedback
FOR INSERT
WITH CHECK (true);

-- Users can view their own feedback
CREATE POLICY "Users can view their own feedback"
ON public.user_feedback
FOR SELECT
USING (auth.uid() = user_id);

-- Public can view approved testimonials only (for homepage display)
CREATE POLICY "Public can view approved testimonials"
ON public.user_feedback
FOR SELECT
USING (is_approved = true AND is_testimonial_eligible = true);

-- Add interests array and preferences to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS interests TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS email_notifications BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS study_reminders BOOLEAN DEFAULT false;
