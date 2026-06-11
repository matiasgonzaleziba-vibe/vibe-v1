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


## v7.1

Selector de foto:
- Agrega una sección “Foto” dentro de Crear VIBE.
- Muestra preview de la foto del panorama.
- Permite elegir imágenes sugeridas: Café, Outdoor, Juegos, Música, Negocios y Literatura.
- Permite cargar una foto local como preview.
- Las imágenes sugeridas sí se guardan en `panoramas.image_url`.
- La subida local queda como preview por ahora; para persistirla después hay que conectar Supabase Storage.


## v7.2

Cambio de lenguaje:
- “Portada” pasa a “Foto”.
- “Preview de portada” pasa a “Preview de foto”.
- Se mantiene el selector visual y la opción de subir foto.


## v7.3

Crear VIBE con más contexto:
- Se recupera el estilo anterior de opciones con nombre + descripción breve.
- Los íconos quedan moderados, no gigantes.
- Se mantienen más pistas para el usuario sin volver al exceso de texto.
- Se mantiene “Foto” en vez de “Portada”.


## v7.4

Ajuste de categoría:
- Se reemplaza “VIBE Otaku” por “VIBE Cultura Pop”.
- La bajada queda más orientada a actividad: “Anime, gaming, cómics o series”.
- Busca que el usuario entienda mejor qué podría crear dentro de esa VIBE.


## v7.5

Fix de apertura de Crear VIBE:
- Se agrega una función única `openCreateModal()`.
- Todos los botones “Crear una VIBE” usan esa función.
- Al abrir creación, se cierran menú, perfil, Mis VIBEs, sala y detalle anterior.
- Se sube el z-index del modal para asegurar que aparezca por encima del header.


## v7.6

Fix crítico:
- Corrige pantalla negra al abrir “Crear una VIBE”.
- El selector de foto estaba llamando `photoImageUrl` sin tener el estado inicializado en algunas versiones.
- Se agrega `photoImageUrl` / `setPhotoImageUrl`.
- Se corrige `object-fit: photo` a `object-fit: cover`.


## v7.7

VIBEs online + layout más ancho:
- En Crear VIBE se agrega selector de formato: Presencial / Online.
- Si eliges Online, el campo Lugar cambia a “Link o plataforma”.
- Puedes poner un link de Meet, Zoom, Teams o dejar “link por definir”.
- En el detalle del panorama, si el lugar es una URL, aparece como “Abrir reunión online”.
- Se ensancha el layout desktop y el modal de creación.
- No integra Google Meet API ni videollamada nativa todavía; queda preparado para usar links externos.
