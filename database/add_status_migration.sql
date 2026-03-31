-- Migration: Add status column to audit_responses
-- Run this in the Supabase SQL Editor

ALTER TABLE public.audit_responses
ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'pendiente'
CHECK (status IN ('pendiente', 'contactado', 'atendido'));

-- Allow admins to update status
CREATE POLICY "Admins can update audit responses" ON audit_responses
  FOR UPDATE USING (public.is_admin());
