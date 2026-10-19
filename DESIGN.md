# Design Style

Guía de estilo del sitio. Los valores viven en `src/index.css` como variables `--rc-*` y clases `.rc-*`.

## Colores

| Variable | Valor | Uso |
|---|---|---|
| `--rc-red` | `#e0202a` | Rojo principal |
| `--rc-red-dark` | `#a50d14` | Rojo oscuro |
| `--rc-red-deep` | `#6e070c` | Rojo profundo |
| `--rc-black` | `#0b0b0c` | Fondo del sitio |
| `--rc-surface` | `#111113` | Superficies y tarjetas |
| `--rc-surface-2` | `#26262a` | Superficie secundaria |
| `--rc-border` | `#2c2c31` | Bordes |
| `--rc-white` | `#ffffff` | Texto principal |
| `--rc-text-soft` | `#d4d4d8` | Texto suave, borde de campos |
| `--rc-text-mute` | `#a1a1aa` | Texto atenuado |
| `--rc-gradient` | `linear-gradient(160deg, #e0202a 0%, #a50d14 55%, #6e070c 100%)` | Bloques rojos |

## Tipografía

Fuente: **Plus Jakarta Sans** (Google Fonts, gratis). Respaldo: `system-ui, sans-serif`.

Pesos: 300 itálica (solo en la palabra "WORKSHOP"), 400 párrafos, 600 links y títulos de agenda, 800 títulos, botones y precios.

| Dónde | Tamaño | Peso | Interlineado y espaciado |
|---|---|---|---|
| Título principal (H1) | 88 px | 800 | 1,02 · letras -1,5 px |
| Título de sección (H2) | 56 px | 800 | 1,05 · letras -1 px |
| Título del checkout | 64 px | 800 | 1,03 · letras -1 px |
| Etiqueta (SPEAKERS, AGENDA) | 16 px | 800 | MAYÚSCULAS · +3 px |
| Precio grande | 56 px | 800 | 1 · letras -1 px |
| Nombre del speaker | 26 px | 800 | — |
| Horario de la agenda | 24 px | 800 | números tabulares |
| Charla en la agenda | 22 px | 600 | — |
| Párrafo del bloque principal | 20 px | 400 | 1,55 |
| Párrafo común | 16 a 18 px | 400 | 1,55 |
| Botones | 18 px (menú: 16) | 800 | — |
| Texto chico y aclaraciones | 14 px | 400 o 600 | — |

En pantallas chicas (≤ 768 px) los títulos bajan: H1 48 px, H2 36 px, checkout 40 px, precio 44 px.

## Anchos y espacios

- Contenedor: 1200 px, centrado, con 24 px de margen lateral mínimo en celular.
- Bloque principal y checkout: sobresalen 56 px a cada lado del contenedor (1312 px) por su relleno interno. Bajo 1312 px de pantalla dejan de sobresalir.
- Pantalla de diseño: 1440 px.
- Separación entre secciones: 96 px (48 antes del bloque principal, 56 antes del checkout).
- Separación entre tarjetas: 24 px (`gap-4` de Bootstrap).

## Esquinas

| Elemento | Radio |
|---|---|
| Bloques rojos | 40 px |
| Tarjetas | 32 px |
| Cajas y tarjeta blanca | 28 px |
| Opciones y contador | 18 px |
| Campos | 14 px |
| Botones y chips | 999 px (píldora) |

## Componentes

- **Botones:** alto mínimo 52 px (menú 44 px), forma de píldora.
- **Campos del formulario:** alto 48 px, relleno 14 × 16, borde 2 px `#d4d4d8`.

## Clases principales

`.rc-container`, `.rc-section`, `.rc-section--hero`, `.rc-section--checkout`, `.rc-cards`, `.rc-block`, `.rc-card`, `.rc-card--white`, `.rc-box`, `.rc-option`, `.rc-counter`, `.rc-btn`, `.rc-btn--menu`, `.rc-chip`, `.rc-field`, `.rc-label`, `.rc-price`, `.rc-lead`, `.rc-small`.
