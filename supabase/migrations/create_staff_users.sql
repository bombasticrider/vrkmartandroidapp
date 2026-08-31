-- ==============================================================================
-- VRK Mart: Staff Users & RBAC Migration
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.staff_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mobile TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  role TEXT NOT NULL CHECK (role IN ('SUPER_ADMIN', 'ADMIN', 'SALES', 'CATEGORY_MANAGER', 'DELIVERY')),
  is_active BOOLEAN DEFAULT true,
  created_by TEXT DEFAULT 'SUPER_ADMIN',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Seed developer as permanent Super Admin
INSERT INTO public.staff_users (mobile, name, role, is_active, created_by)
VALUES ('8008445388', 'Developer / Super Admin', 'SUPER_ADMIN', true, 'SYSTEM')
ON CONFLICT (mobile) DO UPDATE SET role = 'SUPER_ADMIN', is_active = true;

-- Enable RLS
ALTER TABLE public.staff_users ENABLE ROW LEVEL SECURITY;

-- Allow service role full access
CREATE POLICY IF NOT EXISTS "Service role full access on staff_users"
  ON public.staff_users
  FOR ALL
  USING (true)
  WITH CHECK (true);
