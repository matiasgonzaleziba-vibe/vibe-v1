# VIBE v3.7 Supabase MVP

Esta versión conecta la landing con Supabase.

## Variables de entorno recomendadas

En Vercel → Project Settings → Environment Variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

También incluye fallback con la URL/key publishable del proyecto actual para facilitar pruebas.

## Funcionalidades MVP

- Lee panoramas desde la tabla `panoramas`.
- Si Supabase falla, muestra los ejemplos locales.
- Crear una VIBE crea una fila en `vibes` y una fila en `panoramas`.
- Sumarme crea una fila en `participants` si la convocatoria es abierta.
- En evento cerrado crea una fila en `join_requests`.
