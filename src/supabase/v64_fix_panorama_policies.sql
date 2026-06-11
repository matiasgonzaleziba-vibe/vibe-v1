-- VIBE v6.4 safety patch
-- Run only if creating panoramas still fails after deploying v6.4.
-- Keeps the database column as host_id, while the UI says "Organizador".

alter table public.panoramas
add column if not exists host_id uuid references auth.users(id);

grant select, insert, update on table public.panoramas to anon, authenticated;
grant select, insert, update on table public.vibes to anon, authenticated;

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
using (host_id = auth.uid() or status = 'published');

drop policy if exists "Hosts can update own panoramas" on public.panoramas;
create policy "Hosts can update own panoramas"
on public.panoramas
for update
to authenticated
using (host_id = auth.uid())
with check (host_id = auth.uid());

drop policy if exists "Public can read published panoramas" on public.panoramas;
create policy "Public can read published panoramas"
on public.panoramas
for select
to anon, authenticated
using (status = 'published');
