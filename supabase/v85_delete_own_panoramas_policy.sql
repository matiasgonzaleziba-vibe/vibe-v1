-- VIBE v8.5: permitir eliminar/cancelar panoramas propios
-- Ejecutar en Supabase SQL Editor si el botón "Eliminar" en Mis VIBEs no funciona.

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
