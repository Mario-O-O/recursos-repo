# Recursos

Web local (HTML/CSS/JS puro, sin frameworks ni build step) para explorar y descargar
iconos SVG personalizables — estilo [feathericons.com](https://feathericons.com) — con
espacio ya preparado para sumar más tipos de recursos (iconos 3D en PNG, logos, etc.).

## Créditos

Los 287 iconos de `/icons` son el set completo de [Feather](https://feathericons.com)
([github.com/feathericons/feather](https://github.com/feathericons/feather)), de Cole
Bemis, bajo licencia MIT (ver `icons/LICENSE`). Los archivos se renombraron al español
(la equivalencia con el nombre original está en `scripts/feather-es.json`), y el buscador
sigue encontrándolos por su nombre en inglés.

## Cómo abrirla

Basta con abrir `index.html` en el navegador. No requiere servidor ni instalación.

> Si en algún momento quieres servirla por HTTP (por ejemplo para probar rutas relativas
> desde otra carpeta), cualquier servidor estático sirve: `npx serve .` o
> `python3 -m http.server 8080`.

## Secciones

El menú superior separa tres secciones (rutas por `#`, sin servidor):

- **Iconos** (`#/recursos`): iconos de línea, iconos Davivienda, iconos 3D y logos sueltos.
- **Logos y marca** (`#/marca`): los 202 logos y elementos del ToolKit general, organizados en 3 tableros
  y 34 secciones como en el archivo original. Los SVG se bajan en tamaño original; el PNG a 256–2048 px.
- **Manual de comunicación** (`#/manual`): guía de formatos publicitarios por plataforma
  (Meta, TikTok, Google, Programmatic, LinkedIn, X, Teads, Uber) más generalidades de marca
  (tono, colores, fuente, legales). Cada formato tiene una ficha (objetivo, requisitos técnicos,
  copy, marca y legales, zona segura, optimización, entrega) y una pestaña con las láminas originales.

El contenido del manual vive en `js/manual-data.js` (editable a mano) y las láminas en
`manual/slides/`. Fuente: `referencia/Manual-de-comunicacion-digital.pptx`.

## Qué incluye

- **Buscador** por nombre o etiquetas.
- **Filtro por tipo**: Iconos (línea) / Iconos 3D (PNG) / Logos — las categorías vacías
  se muestran igual como "próximamente" para dejar claro que el espacio ya existe.
- **Personalización en vivo** de los iconos SVG:
  - Color (color picker)
  - Grosor de línea (0.5–4px)
  - Estilo: Contorno o Relleno
  - Tamaño de exportación (16 a 128px)
- **Descarga** por icono: SVG, PNG (renderizado a partir del SVG con los ajustes
  aplicados) y copiar el código SVG al portapapeles.

## Estructura del proyecto

```
index.html            Página principal
css/styles.css         Estilos
js/app.js               Lógica de la interfaz (filtros, personalización, descargas)
js/resources.js         Catálogo de recursos — GENERADO, no editar a mano
icons/                  Iconos SVG de línea (fuente de verdad)
resources/iconos-davivienda/  Iconos Davivienda (208, SVG de relleno, viewBox 24x24, color por defecto #ed1c27)
resources/marca/<sección>/  ToolKit general: 34 secciones (Logo Davivienda, Corredores, Cierres de app…) en 3 tableros,
                        con el orden del archivo original en estructura.json
resources/logos/        Logos (SVG o PNG)
resources/png-3d/        Iconos 3D (PNG)
scripts/generate-manifest.js   Script que regenera js/resources.js
```

## Cómo añadir recursos nuevos

1. Copia el archivo en la carpeta que corresponda:
   - Icono de línea personalizable → `/icons/mi-icono.svg`
     (usa el mismo formato que los existentes: `fill="none" stroke="currentColor"
     stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`, viewBox `0 0 24 24`)
   - Icono Davivienda → `/resources/iconos-davivienda/mi-icono.svg` (viewBox `0 0 24 24`, formas rellenas sin atributo `fill`)
   - Logo o elemento de marca → `/resources/marca/<sección>/mi-logo.svg` (secciones, tableros y orden en `resources/marca/estructura.json`; opcional `data-preview-bg="#ed1c27"` en el `<svg>` para previsualizar sobre un fondo)
   - Logo → `/resources/logos/mi-logo.svg` o `.png`
   - Icono 3D → `/resources/png-3d/mi-icono-3d.png`
2. Corre el generador:

   ```
   node scripts/generate-manifest.js
   ```

3. Recarga `index.html`. El nuevo recurso aparece automáticamente en su categoría,
   con nombre y etiquetas derivados del nombre de archivo (usa guiones para separar
   palabras, ej. `flecha-arriba-derecha.svg` → "Flecha arriba derecha").

No hace falta tocar `js/resources.js` a mano ni reiniciar nada más.

## Roadmap / ideas para ampliar

- Descarga masiva en ZIP (por ejemplo con JSZip vía CDN).
- Variantes de peso de trazo predefinidas por icono (como Feather "regular/bold").
- Página de detalle por icono con vista ampliada.
- Soporte de más formatos (WebP, AVIF) para los recursos no vectoriales.
