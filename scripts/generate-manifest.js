#!/usr/bin/env node
/**
 * Escanea las carpetas de recursos y regenera js/resources.js.
 * Uso: node scripts/generate-manifest.js
 *
 * Para añadir recursos nuevos:
 *   - Iconos SVG de línea  -> pon el archivo en /icons
 *   - Iconos Davivienda     -> pon el archivo en /resources/iconos-davivienda
 *   - Iconos 3D (PNG)      -> pon el archivo en /resources/png-3d
 *   - Marca (logos, cierres, gráficos...) -> /resources/marca/<sección>/  (orden y tableros en estructura.json)
 *   - Logos (SVG o PNG)    -> pon el archivo en /resources/logos
 * y vuelve a correr este script.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const ICONS_DIR = path.join(ROOT, "icons");
const LOGOS_DIR = path.join(ROOT, "resources", "logos");
const DAVI_DIR = path.join(ROOT, "resources", "iconos-davivienda");
const MARCA_DIR = path.join(ROOT, "resources", "marca");
const ICON3D_DIR = path.join(ROOT, "resources", "png-3d");
const OUT_FILE = path.join(ROOT, "js", "resources.js");

// Nombres en español, con tildes para mostrar (los archivos van sin tildes).
const ACCENTS = {
  arroba: "arroba", atras: "atrás", audifonos: "audífonos", aprobacion: "aprobación", avion: "avión",
  bateria: "batería", brujula: "brújula", buzon: "buzón", cafe: "café", camara: "cámara", camion: "camión",
  cedula: "cédula", circulo: "círculo", codigo: "código", configuracion: "configuración",
  corazon: "corazón", cuadricula: "cuadrícula", diseno: "diseño", fusion: "fusión", grafica: "gráfica", estadistica: "estadística",
  hexagono: "hexágono", identificacion: "identificación", informacion: "información",
  maletin: "maletín", mas: "más", menu: "menú", microfono: "micrófono", musica: "música",
  navegacion: "navegación", octagono: "octágono", pelicula: "película", proteccion: "protección",
  rapido: "rápido", sesion: "sesión", telefono: "teléfono", television: "televisión",
  bolivar: "bolívar", cupula: "cúpula", disposicion: "disposición", educacion: "educación", razon: "razón",
  vision: "visión", interrogacion: "interrogación", aki: "akí", silencio: "silencio",
  termometro: "termómetro", tipografia: "tipografía", triangulo: "triángulo", ubicacion: "ubicación",
};

// Nombre original en inglés (Feather) de cada ícono, para que el buscador siga encontrándolos.
const EN_ALIASES = (() => {
  const file = path.join(__dirname, "feather-es.json");
  const map = JSON.parse(fs.readFileSync(file, "utf8"));
  return Object.fromEntries(Object.entries(map).map(([en, es]) => [es, en]));
})();

function toTitleCase(base) {
  const text = base
    .split(/[-_]+/)
    .map((w) => ACCENTS[w] || w)
    .join(" ");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function toTags(base, aliasKey) {
  const tags = base.split(/[-_]+/).filter(Boolean);
  const en = aliasKey && EN_ALIASES[base];
  if (en) tags.push(...en.split("-"));
  return [...new Set(tags)];
}

function listFiles(dir, exts) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => exts.includes(path.extname(f).toLowerCase()))
    .sort();
}

function extractSvg(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const viewBoxMatch = raw.match(/viewBox="([^"]+)"/i);
  const innerMatch = raw.match(/<svg[^>]*>([\s\S]*)<\/svg>/i);
  const bgMatch = raw.match(/data-preview-bg="([^"]+)"/i);
  return {
    viewBox: viewBoxMatch ? viewBoxMatch[1] : "0 0 24 24",
    inner: innerMatch ? innerMatch[1].trim() : "",
    previewBg: bgMatch ? bgMatch[1] : null,
  };
}

// Estructura de /resources/marca: tableros -> secciones (como en el ToolKit general original)
// Cada sección es una carpeta; `files` fija el orden de los elementos dentro de la sección.
const ESTRUCTURA_FILE = path.join(MARCA_DIR, "estructura.json");
const ESTRUCTURA = fs.existsSync(ESTRUCTURA_FILE)
  ? JSON.parse(fs.readFileSync(ESTRUCTURA_FILE, "utf8"))
  : { boards: [] };
const MARCA_CATEGORIAS = ESTRUCTURA.boards.flatMap((board) =>
  board.sections.map((sec) => ({ ...sec, group: board.label }))
);

const resources = [];

// 1) Iconos de línea (SVG, personalizables: color, grosor, relleno)
for (const file of listFiles(ICONS_DIR, [".svg"])) {
  const base = path.basename(file, ".svg");
  const { viewBox, inner } = extractSvg(path.join(ICONS_DIR, file));
  resources.push({
    id: `icon-${base}`,
    name: toTitleCase(base),
    type: "icon",
    style: "line",
    format: "svg",
    path: `icons/${file}`,
    viewBox,
    svg: inner,
    tags: toTags(base, true),
    customizable: true,
  });
}

// 1b) Iconos Davivienda (SVG de relleno; solo el color es personalizable)
for (const file of listFiles(DAVI_DIR, [".svg"])) {
  const base = path.basename(file, ".svg");
  const { viewBox, inner } = extractSvg(path.join(DAVI_DIR, file));
  resources.push({
    id: `icondavi-${base}`,
    name: toTitleCase(base),
    type: "icon-davivienda",
    style: "davivienda",
    format: "svg",
    path: `resources/iconos-davivienda/${file}`,
    viewBox,
    svg: inner,
    tags: toTags(base),
    customizable: true,
    filled: true,
    brandColor: "#ed1c27",
  });
}

// 1c) Marca: logos, cierres, gráficos… (SVG fijos; el color no se puede cambiar)
for (const cat of MARCA_CATEGORIAS) {
  const dir = path.join(MARCA_DIR, cat.dir);
  const present = listFiles(dir, [".svg"]);
  const ordered = [
    ...(cat.files || []).map((n) => `${n}.svg`).filter((f) => present.includes(f)),
    ...present.filter((f) => !(cat.files || []).includes(path.basename(f, ".svg"))),
  ];
  for (const file of ordered) {
    const base = path.basename(file, ".svg");
    const { viewBox, inner, previewBg } = extractSvg(path.join(dir, file));
    const entry = {
      id: `marca-${cat.dir}-${base}`,
      name: toTitleCase(base),
      type: `marca-${cat.dir}`,
      style: "marca",
      format: "svg",
      path: `resources/marca/${cat.dir}/${file}`,
      viewBox,
      svg: inner,
      tags: toTags(base),
      customizable: false,
      wide: true,
    };
    if (previewBg) entry.previewBg = previewBg;
    resources.push(entry);
  }
}

// 2) Logos (SVG personalizable o PNG estático)
for (const file of listFiles(LOGOS_DIR, [".svg", ".png"])) {
  const base = path.basename(file, path.extname(file));
  const isSvg = file.toLowerCase().endsWith(".svg");
  const entry = {
    id: `logo-${base}`,
    name: toTitleCase(base),
    type: "logo",
    style: "logo",
    format: isSvg ? "svg" : "png",
    path: `resources/logos/${file}`,
    tags: toTags(base),
    customizable: false,
  };
  if (isSvg) {
    const { viewBox, inner } = extractSvg(path.join(LOGOS_DIR, file));
    entry.viewBox = viewBox;
    entry.svg = inner;
  }
  resources.push(entry);
}

// 3) Iconos 3D (PNG, no personalizables por color)
for (const file of listFiles(ICON3D_DIR, [".png"])) {
  const base = path.basename(file, path.extname(file));
  resources.push({
    id: `icon3d-${base}`,
    name: toTitleCase(base),
    type: "icon-3d",
    style: "3d",
    format: "png",
    path: `resources/png-3d/${file}`,
    tags: toTags(base),
    customizable: false,
  });
}

const banner = `// ARCHIVO GENERADO AUTOMÁTICAMENTE — no editar a mano.
// Para regenerarlo: node scripts/generate-manifest.js
`;

const categories = [
  { type: "icon", label: "Iconos (línea)", group: "Iconos", hint: "Añade tus SVG en /icons y corre el generador." },
  { type: "icon-davivienda", label: "Iconos Davivienda", group: "Iconos", hint: "Añade tus SVG en /resources/iconos-davivienda y corre el generador." },
  ...MARCA_CATEGORIAS.map((c) => ({
    type: `marca-${c.dir}`,
    label: c.label,
    group: c.group,
    hint: `Añade SVG en /resources/marca/${c.dir}.`,
  })),
  { type: "icon-3d", label: "Iconos 3D (PNG)", group: "Otros recursos", hint: "Añade tus PNG en /resources/png-3d y corre el generador." },
];

const content = `${banner}window.RESOURCE_CATEGORIES = ${JSON.stringify(categories, null, 2)};\nwindow.RESOURCES = ${JSON.stringify(resources)};\n`;

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, content, "utf8");

console.log(`✔ ${resources.length} recursos escritos en ${path.relative(ROOT, OUT_FILE)}`);
