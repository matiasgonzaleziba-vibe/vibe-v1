-- VIBE v9.0: permitir gestionar panoramas propios usando host_id
-- Ejecutar en Supabase SQL Editor si "Eliminar mi VIBE" no funciona.

grant select, insert, update, delete on table public.panoramas to authenticated;

drop policy if exists "Hosts can update own panoramas" on public.panoramas;
create policy "Hosts can update own panoramas"
on public.panoramas
for update
to authenticated
using (host_id = auth.uid())
with check (host_id = auth.uid());

drop policy if exists "Hosts can delete own panoramas" on public.panoramas;
create policy "Hosts can delete own panoramas"
on public.panoramas
for delete
to authenticated
using (host_id = auth.uid());
