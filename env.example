-- VIBE MVP insert policies for browser testing
-- Run this in Supabase SQL Editor after the initial schema.

drop policy if exists "Public can insert vibes" on public.vibes;
create policy "Public can insert vibes"
on public.vibes
for insert
with check (true);

drop policy if exists "Public can insert panoramas" on public.panoramas;
create policy "Public can insert panoramas"
on public.panoramas
for insert
with check (status = 'published');

drop policy if exists "Public can insert join requests" on public.join_requests;
create policy "Public can insert join requests"
on public.join_requests
for insert
with check (true);

drop policy if exists "Public can insert participants" on public.participants;
create policy "Public can insert participants"
on public.participants
for insert
with check (true);
