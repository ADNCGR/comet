-- Create table for contact form submissions
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('devis', 'demo')),
  nom TEXT NOT NULL,
  entreprise TEXT NOT NULL,
  email TEXT NOT NULL,
  telephone TEXT NOT NULL,
  -- Fields for devis type
  produit TEXT,
  hauteur TEXT,
  -- Fields for demo type
  ville TEXT,
  date_souhaitee DATE,
  message TEXT,
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  status TEXT DEFAULT 'nouveau' CHECK (status IN ('nouveau', 'en_cours', 'traite', 'annule'))
);

-- Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX idx_contact_submissions_type ON public.contact_submissions(type);
CREATE INDEX idx_contact_submissions_created_at ON public.contact_submissions(created_at DESC);
CREATE INDEX idx_contact_submissions_status ON public.contact_submissions(status);

-- Create policy to allow public inserts (for form submissions)
CREATE POLICY "Anyone can submit contact forms"
ON public.contact_submissions
FOR INSERT
TO anon
WITH CHECK (true);

-- Create policy to prevent public reads (for future admin dashboard)
CREATE POLICY "Only authenticated users can view submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (true);