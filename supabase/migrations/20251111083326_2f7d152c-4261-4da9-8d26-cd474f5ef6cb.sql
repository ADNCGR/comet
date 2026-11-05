-- Remove admin role system entirely as it's not needed for this contact form website

-- Drop policies on contact_submissions that require admin role
DROP POLICY IF EXISTS "Only admins can view contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Only admins can update contact submissions" ON public.contact_submissions;

-- Drop the has_role function
DROP FUNCTION IF EXISTS public.has_role(uuid, app_role);

-- Drop the user_roles table
DROP TABLE IF EXISTS public.user_roles;

-- Drop the app_role enum
DROP TYPE IF EXISTS public.app_role;

-- The contact_submissions table now only allows public INSERT (form submissions)
-- Viewing submissions can be done directly in the Supabase Dashboard → Table Editor