-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Create Profiles Table (extends Supabase Auth users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  role text not null default 'Cliente' check (role in ('Cliente', 'Admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security
alter table public.profiles enable row level security;

-- Policies for profiles
-- Users can read their own profile
create policy "Users can view own profile" on profiles
  for select using (auth.uid() = id);

-- Function to check check if a user is an admin without triggering RLS recursion
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'Admin'
  );
end;
$$ language plpgsql security definer;

-- Admins can read all profiles (using the non-recursive function)
create policy "Admins can view all profiles" on profiles
  for select using (public.is_admin());

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'Cliente');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 2. Create Audit Responses Table
create table public.audit_responses (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete set null,
  challenge text not null,
  operational_issues text[] not null,
  security_access text not null,
  impact_projection text[] not null,
  modules_interest text[] not null,
  company_name text not null,
  industry text not null,
  team_size text not null,
  contact_email text not null,
  contact_phone text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security
alter table public.audit_responses enable row level security;

-- Policies for audit_responses
-- Anyone can insert (even unauthenticated users submitting the public form)
create policy "Anyone can insert audit responses" on audit_responses
  for insert with check (true);

-- Admins can read all responses
create policy "Admins can view all audit responses" on audit_responses
  for select using (public.is_admin());

-- (Optional) Clients can read their own responses if linked
create policy "Users can view own responses" on audit_responses
  for select using (auth.uid() = user_id);
