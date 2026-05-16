# VIBE v5.3

Login más friendly:

- Agrega inicio de sesión con correo + contraseña.
- Agrega creación de cuenta con correo + contraseña.
- Mantiene magic link como alternativa secundaria.
- Agrega botón “Continuar con Google”.
- Agrega recuperación de contraseña.
- Mantiene perfil, intereses clickeables, Mis VIBEs y creación de VIBEs.

## Configuración necesaria en Supabase

Authentication → Sign In / Providers:
- Email: habilitado.
- Google: habilitar si quieres que funcione “Continuar con Google”.

Authentication → URL Configuration:
- Site URL: https://vibe-v1-iota.vercel.app
- Redirect URLs:
  - https://vibe-v1-iota.vercel.app
  - https://vibe-v1-iota.vercel.app/*

## Configuración necesaria en Google

Para Google OAuth necesitarás crear credenciales OAuth en Google Cloud y copiar Client ID / Client Secret en Supabase.
Si no configuras Google, el botón puede mostrar error, pero email/password y magic link siguen funcionando.
