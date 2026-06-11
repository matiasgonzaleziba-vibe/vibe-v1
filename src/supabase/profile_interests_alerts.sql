-- VIBE v4.6 profile fields
-- Run in Supabase SQL Editor once.

alter table public.profiles
add column if not exists interests text[] default '{}',
add column if not exists notify_new_vibes boolean default true,
add column if not exists preferred_zone text;

grant select, insert, update on table public.profiles to anon, authenticated;

drop policy if exists "Users can upsert own profile" on public.profiles;
create policy "Users can upsert own profile"
on public.profiles
for insert
to authenticated
with check (id = auth.uid());

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
on public.profiles
for select
to authenticated
using (id = auth.uid());

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
on public.profiles
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());
