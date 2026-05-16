-- VIBE v3.9 Auth/Profile/My Events policies
-- Run in Supabase SQL Editor after deploying v3.9.

grant usage on schema public to anon, authenticated;

grant select, insert, update on table public.profiles to anon, authenticated;
grant select, insert, update on table public.vibes to anon, authenticated;
grant select, insert, update on table public.panoramas to anon, authenticated;
grant select, insert, update on table public.join_requests to anon, authenticated;
grant select, insert, update on table public.participants to anon, authenticated;

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

drop policy if exists "Users can create own vibes" on public.vibes;
create policy "Users can create own vibes"
on public.vibes
for insert
to authenticated
with check (created_by = auth.uid());

drop policy if exists "Users can create own panoramas" on public.panoramas;
create policy "Users can create own panoramas"
on public.panoramas
for insert
to authenticated
with check (host_id = auth.uid());

drop policy if exists "Hosts can read own panoramas" on public.panoramas;
create policy "Hosts can read own panoramas"
on public.panoramas
for select
to authenticated
using (host_id = auth.uid());

drop policy if exists "Hosts can update own panoramas" on public.panoramas;
create policy "Hosts can update own panoramas"
on public.panoramas
for update
to authenticated
using (host_id = auth.uid())
with check (host_id = auth.uid());

drop policy if exists "Users can create own join requests" on public.join_requests;
create policy "Users can create own join requests"
on public.join_requests
for insert
to authenticated
with check (requester_id = auth.uid());

drop policy if exists "Users can join as themselves" on public.participants;
create policy "Users can join as themselves"
on public.participants
for insert
to authenticated
with check (profile_id = auth.uid());

drop policy if exists "Users can read own join requests" on public.join_requests;
create policy "Users can read own join requests"
on public.join_requests
for select
to authenticated
using (requester_id = auth.uid());
