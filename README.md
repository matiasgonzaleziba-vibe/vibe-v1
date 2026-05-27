# VIBE v6.5

Simplificación del flujo de creación:

- Se elimina la pregunta “¿Qué tan armado está tu panorama?”.
- Se eliminan las opciones “Panorama definido”, “Idea abierta” y “Panorama random”.
- El flujo queda más simple: elegir una VIBE, completar panorama, fecha, hora, ubicación y publicar.
- Internamente sigue usando un tipo estándar para no romper la base de datos.
- Mantiene la corrección de `host_id` de v6.4.

## SQL

No requiere SQL nuevo.


## v6.6
- Se agrega la opción **Cerrar sesión** en el encabezado cuando el usuario está logeado (desktop y mobile).
- Al cerrar sesión también se cierran menú y modales relacionados.


## v6.7

Header opción B:
- Desktop queda como: Explorar · Mis VIBEs · Crear una VIBE · [Mi perfil ▾].
- “Cerrar sesión” se mueve dentro del dropdown de perfil.
- El dropdown incluye: Mi perfil, Mis VIBEs y Cerrar sesión.
- En mobile se mantiene el menú hamburguesa con acciones explícitas.


## v6.8

Crear VIBE más simple:
- Se reduce texto en el modal de creación.
- Las tarjetas rápidas quedan casi solo con nombre/icono.
- Se acortan etiquetas: Nombre, Panorama, Lugar.
- Se elimina el badge redundante “Tú organizas”.
- El CTA queda más limpio.


## v6.9

Creación estilo app:
- Selector de categoría con íconos más grandes.
- Texto mínimo: solo nombre de categoría.
- Grilla compacta tipo app.
- Al seleccionar una categoría, el campo nombre se completa como “VIBE + categoría”.
- Mantiene el prefijo VIBE en el nombre creado.


## v7.0

Creación más simple:
- Se elimina completamente el bloque “Más opciones”.
- Se eliminan las opciones “Panorama definido”, “Idea abierta” y “Random”.
- El tipo queda como valor interno estándar para no complejizar al usuario.
