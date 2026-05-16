# VIBE v5.4

Login más simple, sin Google por ahora:

- Se elimina el botón “Continuar con Google”.
- Se mantiene inicio de sesión con correo + contraseña.
- Se mantiene creación de cuenta con correo + contraseña.
- Se mantiene recuperación de contraseña.
- Se mantiene link mágico como alternativa secundaria.
- Mantiene perfil, intereses clickeables, Mis VIBEs y creación de VIBEs.

## Configuración necesaria en Supabase

Authentication → Sign In / Providers:
- Email: habilitado.

Authentication → URL Configuration:
- Site URL: https://vibe-v1-iota.vercel.app
- Redirect URLs:
  - https://vibe-v1-iota.vercel.app
  - https://vibe-v1-iota.vercel.app/*

No requiere Google OAuth.
