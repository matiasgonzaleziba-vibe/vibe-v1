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


## v7.8

Onboarding inicial por ubicación, idioma, nombre e intereses:
- Primera pantalla: selector de ubicación con globo visual 3D-style, búsqueda por ciudad/país y selector de idioma.
- Segunda pantalla: nombre del usuario.
- Tercera pantalla: intereses / VIBEs con las que vibra.
- Guarda la configuración en localStorage.
- Usa la ciudad para personalizar la landing y ordenar panoramas iniciales.
- Permite terminar en “Descubrir VIBEs” o “Crear mi primera VIBE”.
- Es un MVP visual de globo; todavía no usa mapas reales, GPS ni reverse geocoding.


## v7.9

Idioma real + intro en onboarding:
- Se agrega una versión real en inglés de la landing principal, activada por idioma del onboarding o selector ES/EN/PT.
- Se agrega selector de idioma en header desktop.
- La sección “Cuando quieres hacer algo...” y “Elige, revisa y súmate” se mueve desde la landing a un paso introductorio del onboarding.
- El onboarding ahora fluye: ubicación/idioma → intro VIBE → nombre → intereses → descubrir/crear.
- La landing queda más orientada a exploración y acción, menos explicativa.


## v8.0

Idiomas agregados:
- Français
- 日本語
- 中文

También se agregan ubicaciones base para:
- Paris, France
- Tokyo, Japan
- Shanghai, China
- Beijing, China

El selector de idioma ahora soporta ES / EN / PT / FR / JA / ZH.


## v8.1

Selector de foto más compacto:
- El bloque “Foto” ahora ocupa el ancho del formulario completo.
- El preview baja de tamaño para no competir con fecha/hora/lugar.
- Las fotos sugeridas pasan a una franja horizontal tipo carrusel.
- “Subir foto” queda como botón pequeño y discreto.
- En mobile se mantiene compacto y apilado.


## v8.5

Versión de reseteo estable:
- Se parte desde la última versión que sí tenía selector de foto y seis idiomas.
- Se cambia la key de onboarding a `vibe_onboarding_v3` para que aparezca aunque el navegador haya guardado la versión anterior.
- Se agrega barra fija visible de idiomas bajo el header.
- Se agrega botón “Cambiar ubicación / onboarding”.
- Se mantiene selector ES/EN/PT/FR/JA/ZH.
- Se compacta y reubica Foto después de Lugar/Link.
- Se fija Node/npm/dependencias para evitar errores de deploy en Vercel.
- Se agrega SQL `v85_delete_own_panoramas_policy.sql` para permitir cancelar/eliminar panoramas propios.


## v8.8 clean source / pnpm Vercel

Esta versión mantiene el código fuente editable y evita la ruta estática.

Estructura esperada:
- `src/main.jsx`
- `src/styles.css`
- `supabase/`
- `package.json`
- `package-lock.json`
- `vercel.json`
- `.npmrc`

Vercel:
- Install Command: `corepack enable && corepack prepare pnpm@9.15.4 --activate && pnpm install --no-frozen-lockfile`
- Build Command: `pnpm build`
- Output Directory: `dist`

Motivo:
- Vercel estaba fallando con el bug interno de npm: `Exit handler never called`.
- Esta versión mantiene React/Vite como fuente, pero usa pnpm en Vercel para saltarse npm.


## v8.9 clean source / Yarn Vercel

Esta versión mantiene el código fuente editable y evita npm/pnpm en Vercel.

Motivo:
- npm fallaba con `Exit handler never called`.
- pnpm fallaba con `ERR_PNPM_META_FETCH_FAIL` / `ERR_INVALID_THIS`.
- Yarn classic usa otra ruta de instalación y suele evitar ese bug de fetch.

Vercel:
- Node: 20.x
- Install Command: `corepack enable && corepack prepare yarn@1.22.22 --activate && yarn install --ignore-engines --network-timeout 600000`
- Build Command: `yarn build`
- Output Directory: `dist`

Estructura correcta:
- `src/main.jsx`
- `src/styles.css`
- `supabase/`
- `index.html`
- `package.json`
- `vercel.json`
- `.yarnrc`


## v9.1 stable hotfix

Base: v8.9, que ya cargaba correctamente en Vercel.

Cambios seguros:
- Ajuste conservador de tipografías.
- Globo más trabajado por CSS, sin reescribir la lógica React del onboarding.
- Más ciudades preseteadas.
- Ver/Ocultar contraseña en login.
- Mis VIBEs y eliminación usando `host_id`.
- Botón Eliminar mi VIBE en detalle cuando el usuario es dueño del panorama.
- SQL `v91_manage_own_panoramas_host_id.sql`.

No se incluyó todavía la traducción dinámica de todos los eventos para evitar repetir el blank screen de v9.0.


## v9.2 incremental

Cambio acotado sobre v9.1 estable:
- Traducción de panoramas precargados al cambiar idioma.
- Traducción básica de eventos creados que coinciden con títulos demo conocidos.
- Traducción de etiquetas de cupos, ubicación y organizador.
- Globo con puntos extra y giro con rueda del mouse, sin reescribir la lógica de onboarding.


## v9.3 incremental

Cambios acotados sobre v9.2:
- Traducción adicional de categorías, chips de intereses, create modal y auth modal.
- Traducción de etiquetas visibles como “Preview”, “Participación”, “Formato”, “Ubicación”, “Publicar”, “Cerrar”.
- Globo visualmente más trabajado: más profundidad, meridianos, labels de ciudad y ciudad activa.
- Sin reescribir la lógica principal para mantener estabilidad.
