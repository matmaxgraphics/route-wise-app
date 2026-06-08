-- RouteWise schema fix
-- Run this in Supabase SQL Editor after reviewing it.
--
-- Root cause of the current error:
-- locations.id was created as numeric, but routes.source_location_id and
-- routes.destination_location_id were created as uuid. A value like 4 cannot be
-- inserted into a uuid column, so route creation fails after the location insert.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text,
  avatar_url text,
  xp bigint not null default 0,
  level bigint not null default 1,
  trust_score bigint not null default 20,
  city text not null default 'Ibadan',
  contribution_count bigint not null default 0,
  created_at timestamp with time zone not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, username)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

insert into public.profiles (id, username)
select id, split_part(email, '@', 1)
from auth.users
on conflict (id) do nothing;

create table if not exists public.locations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null,
  city text not null default 'Ibadan',
  latitude numeric,
  longitude numeric,
  created_at timestamp with time zone not null default now(),
  unique (slug, city)
);

create table if not exists public.routes (
  id uuid primary key default gen_random_uuid(),
  source_location_id uuid not null references public.locations(id) on delete restrict,
  destination_location_id uuid not null references public.locations(id) on delete restrict,
  confidence_score bigint not null default 0,
  average_duration bigint,
  status text not null default 'pending',
  created_by uuid not null references public.profiles(id) on delete cascade,
  created_at timestamp with time zone not null default now()
);

create table if not exists public.route_steps (
  id uuid primary key default gen_random_uuid(),
  route_id uuid not null references public.routes(id) on delete cascade,
  step_order bigint not null,
  instruction text not null,
  transport_type text not null default 'other',
  fare_min bigint not null default 0,
  fare_max bigint not null default 0
);

create table if not exists public.safety_tips (
  id uuid primary key default gen_random_uuid(),
  route_id uuid not null references public.routes(id) on delete cascade,
  content text not null,
  severity text not null default 'normal',
  created_by uuid not null references public.profiles(id) on delete cascade,
  created_at timestamp with time zone not null default now()
);

create table if not exists public.route_votes (
  id uuid primary key default gen_random_uuid(),
  route_id uuid not null references public.routes(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  vote_type text not null check (vote_type in ('accurate', 'outdated', 'unsafe', 'wrong')),
  created_at timestamp with time zone not null default now(),
  unique (route_id, user_id)
);

create table if not exists public.badges (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text
);

create table if not exists public.user_badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  badge_id uuid not null references public.badges(id) on delete cascade,
  earned_at timestamp with time zone not null default now(),
  unique (user_id, badge_id)
);

create table if not exists public.territories (
  id uuid primary key default gen_random_uuid(),
  location_id uuid not null references public.locations(id) on delete cascade,
  owner_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  assigned_at timestamp with time zone not null default now()
);

-- If your current project already has public.locations.id as numeric, this file
-- will not alter that existing column. For a new/test project, the cleanest fix
-- is to delete the affected route tables and recreate them with this schema.
-- For production data, migrate carefully by creating UUID ids and remapping
-- source_location_id/destination_location_id before adding foreign keys.
