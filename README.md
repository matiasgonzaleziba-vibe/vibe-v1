# VIBE v4.2

Mejoras de flujo de usuario:

- Si alguien empieza a crear una VIBE y luego debe iniciar sesión, el borrador se guarda temporalmente.
- Al volver desde el magic link, se reabre el modal de creación con el avance anterior.
- En “Mis eventos”, si no hay eventos, aparece botón para crear la primera VIBE.
- “Mis eventos” incluye cruz superior izquierda para cerrar la ventana.
- Mantiene botón “Iniciar sesión” y redirección por `VITE_APP_URL`.

## Variables sugeridas en Vercel

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_APP_URL=https://vibe-v1-iota.vercel.app`
