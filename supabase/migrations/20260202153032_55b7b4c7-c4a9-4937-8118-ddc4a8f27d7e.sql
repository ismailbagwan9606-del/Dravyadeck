-- Harden access to PII in profiles: remove any anonymous table privileges
REVOKE ALL ON TABLE public.profiles FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.profiles TO authenticated;

-- Lock down share settings table: remove broad-read policy and ensure anon cannot read
DROP POLICY IF EXISTS "Authenticated users can view share settings" ON public.flashcard_share_settings;
REVOKE ALL ON TABLE public.flashcard_share_settings FROM anon;

-- (Optional safety) Keep authenticated privileges, but without SELECT policy it remains inaccessible via RLS
GRANT SELECT ON TABLE public.flashcard_share_settings TO authenticated;
