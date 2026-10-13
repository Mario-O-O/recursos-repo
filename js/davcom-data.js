// Contenido de "Banners Davicom · Usos y experiencia" (portal davivienda.com).
// Fuente: refrentes/Banners Davicom.pptx
// `visuales` = capturas de la presentación; las imágenes están en davcom/img/
// `slides` = número de lámina original; la imagen está en davcom/slides/lamina-NN.jpg
window.DAVCOM = {
  general: [
    {
      id: "contexto",
      name: "Contexto",
      slides: [4],
      intro:
        "Definición de la convivencia entre los diferentes tipos de banners del portal e instancias en las que aparecen.",
    },
    {
      id: "definiciones",
      name: "Definiciones transversales",
      slides: [5],
      reglas: [
        {
          titulo: "Texto alternativo",
          texto:
            "Si las imágenes tienen texto de valor para el usuario (datos o fechas), se debe incluir texto alternativo por accesibilidad.",
        },
        {
          titulo: "Redireccionamiento de URLs",
          lista: [
            "Interna (dentro del mismo Davicom): debe abrirse en la misma pestaña (self).",
            "Externa (otras páginas o PDFs): debe abrir en una nueva ventana (blank).",
          ],
        },
        {
          titulo: "Contraste y fondos",
          texto:
            "Se debe respetar el contraste y la sinergia de fondo: no se debe emplear 2 veces seguidas el mismo color.",
        },
        {
          titulo: "URLs limpias",
          texto:
            "Las URLs deben ser limpias y dicientes sobre su contenido. Ej.: si un documento se llama «Derechos y obligaciones clientes fiduciaria», la URL debería quedar: derechos-y-clientes-fiduciaria",
        },
        {
          titulo: "Paso a producción",
          texto: "Operaciones brindará apoyo con el paso a producción una vez se les asignen usuarios.",
        },
      ],
    },
  ],

  banners: [
    // ───────────────────────────── HERO ─────────────────────────────
    {
      id: "hero",
      name: "Hero Banner",
      alias: "Banner principal",
      cms: "EST - Banner Principal",
      color: "#ed1c27",
      paginas: ["Página principal (Home)", "Home de producto", "Producto"],
      descripcion:
        "Banner principal de la página web, visual de home de producto y visual de producto. Se usa para destacar la campaña más importante del banco definida por mercadeo.",
      opciones: [
        {
          id: "principal",
          name: "Hero Banner",
          plantilla: "https://lion.box.com/s/sni27dh69z6o0tjra1tio21wlcy4mkd0",
          slides: [6, 7, 8],
          partes: [
            ["Imagen", "Paramétrico"],
            ["Título", "Paramétrico"],
            ["Descripción", "Paramétrico"],
            ["CTA (botón)", "Solo cambia el label"],
          ],
          imagen: { desktop: ["560 x 432 px", "1680 x 1296 px"], mobile: ["328 x 253 px", "984 x 759 px"] },
          caracteres: [
            ["Título", "50 caracteres máx. (máx. 3 líneas)"],
            ["Descripción", "150 caracteres máx."],
            ["CTA", "20 caracteres máx."],
          ],
          visuales: [
            { src: "hero-desktop.jpg", w: 1600, h: 1513, label: "Desktop" },
            { src: "hero-mobile.jpg", w: 409, h: 900, label: "Mobile" },
          ],
          dos: [
            "Campañas estratégicas.",
            "Lanzamientos de producto.",
            "Máx. 2 CTA redactados en infinitivo.",
            "Descripción general con keywords.",
            "Contenido corto y directo.",
            "Storytelling estructurado con el resto de secciones.",
          ],
          donts: [
            "No cambiar el título de una página de manera frecuente (afecta SEO).",
            "No disponer mucho contenido en las imágenes (si la imagen lleva texto, debe incluir texto alternativo por accesibilidad).",
            "Repetir contenido que ya está en la visual.",
            "Usarlo para comunicaciones internas o campañas muy pequeñas.",
            "Recomendamos dejar 1 CTA (call to action), aun cuando se pueden hasta 2.",
          ],
          notas: [
            "Su posición es absoluta: solo se puede ubicar en el primer módulo de la visual.",
            "Para el título aplica el máximo de 50 caracteres cuando son campañas. No aplica para nombres de producto y, al ser el H1, debe tener palabras clave.",
          ],
        },
      ],
    },

    // ───────────────────────────── MEDIUM ─────────────────────────────
    {
      id: "medium",
      name: "Banner Medium",
      cms: "EST - Banner Medium",
      color: "#c90c14",
      paginas: ["Todas las páginas"],
      descripcion:
        "Es una sección o módulo secundario. Se usa para resaltar beneficios puntuales, mensajes secundarios y para invitar al usuario a explorar nuevas opciones.",
      opciones: [
        {
          id: "opcion-1",
          name: "Opción 1",
          sub: "Imagen con título, descripción y CTA",
          slides: [9, 10, 11],
          partes: [
            ["Imagen", "Paramétrico"],
            ["Título", "Paramétrico"],
            ["Descripción", "Paramétrico"],
            ["CTA (botón)", "Solo cambia el label"],
          ],
          imagen: { desktop: ["464 x 288 px", "1431 x 882 px"], mobile: ["360 x 288 px", "1080 x 882 px"] },
          caracteres: [
            ["Título", "90 caracteres máx."],
            ["Descripción", "150 caracteres máx."],
            ["CTA", "20 caracteres máx."],
          ],
          visuales: [
            { src: "medium-1-desktop.jpg", w: 1600, h: 1108, label: "Desktop" },
            { src: "medium-1-mobile.jpg", w: 393, h: 900, label: "Mobile" },
          ],
          dos: [
            "Beneficios o contenido a resaltar de un producto o campaña.",
            "Complemento de secciones secundarias.",
            "Puede o no tener CTA (call to action).",
            "Información relevante, no urgente.",
            "Redirecciones a otras páginas.",
            "Destacar contenido.",
          ],
          donts: [
            "No usar como hero banner.",
            "No debe tener más de un CTA (call to action).",
            "No usar gifs.",
            "No usar más de un banner medium por página.",
            "No debería tener imágenes con datos relevantes.",
            "No repetir info de título y descripción del banner dentro de la imagen.",
          ],
        },
        {
          id: "opcion-2",
          name: "Opción 2",
          sub: "Imagen completa",
          slides: [9, 12, 13],
          partes: [["Imagen", "Paramétrico"]],
          imagen: { desktop: ["1280 x 396 px", "3840 x 1188 px"], mobile: ["360 x 619 px", "1080 x 1857 px"] },
          visuales: [{ src: "medium-2-desktop.jpg", w: 1600, h: 495, label: "Desktop" }],
          dos: [
            "Beneficios y contenido a resaltar de un producto o campaña.",
            "Secciones secundarias.",
            "Puede o no tener CTA (call to action).",
            "Información relevante, no urgente.",
            "Redirecciones a otras páginas.",
            "Destacar contenido.",
          ],
          donts: [
            "No usar como hero banner.",
            "No debe tener más de un CTA (call to action).",
            "No usar gifs.",
            "No usar más de un banner medium por página.",
            "No debería tener imágenes con datos relevantes.",
            "No repetir info de título y descripción del banner dentro de la imagen.",
            "Imágenes con bajo contraste: pierden legibilidad.",
          ],
          notas: [
            "Cuando se usa una imagen completa decorativa, esta no debe tener texto y su texto alternativo debería estar vacío dentro del CMS.",
          ],
        },
      ],
    },

    // ───────────────────────────── SMALL ─────────────────────────────
    {
      id: "small",
      name: "Banner Small",
      cms: "EST - Dav Banner Small",
      color: "#444444",
      paginas: ["Todas las páginas"],
      descripcion: "El Banner Small se usa como banner secundario, para promociones menos agresivas.",
      opciones: [
        {
          id: "opcion-1",
          name: "Opción 1",
          sub: "Con imagen, título, descripción y CTA",
          slides: [14, 15, 16],
          partes: [
            ["Imagen", "Paramétrico"],
            ["Título", "Paramétrico"],
            ["Descripción", "Paramétrico"],
            ["CTA (botón)", "Solo cambia el label"],
          ],
          imagen: { desktop: ["570 x 439 px", "1710 x 1317 px"], mobile: ["328 x 236 px", "984 x 708 px"] },
          imagenNota: "En mobile la imagen es opcional: el banner también puede ir sin imagen.",
          caracteres: [
            ["Título", "90 caracteres máx."],
            ["Descripción", "150 caracteres máx."],
            ["CTA", "20 caracteres máx."],
          ],
          visuales: [
            { src: "small-1-desktop.jpg", w: 1600, h: 1015, label: "Desktop" },
            { src: "small-1-mobile.jpg", w: 413, h: 900, label: "Mobile (sin imagen)" },
          ],
          dos: [
            "Mensajes complementarios a campañas.",
            "Información complementaria de producto.",
            "Redirecciones a otros productos (seguros, ecosistemas, etc.).",
            "1 CTA (call to action).",
            "Imagen contextual.",
            "Continúa el storytelling de la página.",
          ],
          donts: [
            "No usar para alertamientos de producto o canal.",
            "No más de un CTA (call to action).",
            "No usar imágenes de fondo que tengan texto.",
          ],
        },
        {
          id: "opcion-2",
          name: "Opción 2",
          sub: "Imagen completa",
          slides: [14, 17, 18],
          partes: [["Imagen", "Paramétrico"]],
          imagen: { desktop: ["1136 x 439 px", "3408 x 1317 px"], mobile: ["328 x 486 px", "984 x 1458 px"] },
          visuales: [
            { src: "small-2-desktop.jpg", w: 1400, h: 483, label: "Desktop" },
            { src: "small-2-mobile.jpg", w: 360, h: 576, label: "Mobile" },
          ],
          dos: [
            "Mensajes complementarios a campañas.",
            "Información complementaria de producto.",
            "Redirecciones a otros productos (seguros, ecosistemas, etc.).",
            "1 CTA (call to action).",
            "Imagen contextual.",
            "Continúa el storytelling de la página.",
          ],
          donts: [
            "No usar para alertamientos de producto o canal.",
            "No más de un CTA (call to action).",
            "No usar imágenes de fondo que tengan texto.",
          ],
        },
      ],
    },

    // ───────────────────────────── MINI ─────────────────────────────
    {
      id: "mini",
      name: "Mini Banner",
      cms: "EST Advertising Banner",
      color: "#231f20",
      paginas: ["Página principal (Home)", "Home de producto", "Producto"],
      descripcion: "Se usa para múltiples novedades de oferta de producto o promociones.",
      opciones: [
        {
          id: "opcion-1",
          name: "Opción 1",
          sub: "Imagen completa con stepper",
          plantilla: "https://lion.box.com/s/hn02914a2k22ing7lspk1085ebfgtdug",
          slides: [19, 21],
          partes: [
            ["Imagen", "Paramétrico"],
            ["Stepper", "Máximo 3 banners"],
          ],
          imagen: { desktop: ["944 x 299 px", "2832 x 897 px"], mobile: ["328 x 416 px", "984 x 1248 px"] },
          visuales: [
            { src: "mini-2-desktop.jpg", w: 1600, h: 1046, label: "Desktop (en contexto)" },
            { src: "mini-2-mobile.jpg", w: 600, h: 800, label: "Mobile" },
            { src: "mini-carrusel.jpg", w: 1600, h: 1046, label: "Desktop · otro banner del carrusel" },
          ],
          dos: [
            "Módulo para múltiples banners o campañas.",
            "Banners informativos o interactivos.",
            "Segundo nivel de jerarquía en la página.",
            "Máx. 3 banners.",
            "Imagen al 100%.",
          ],
          donts: [
            "1 solo banner.",
            "No usar como banner principal.",
            "No usar al final de una página.",
            "No repetir información de un mismo tema en medio de los banners.",
          ],
        },
        {
          id: "opcion-2",
          name: "Opción 2",
          sub: "Imagen con título, descripción, CTA y stepper",
          slides: [19, 20, 22, 23],
          partes: [
            ["Imagen", "Paramétrico"],
            ["Título", "Paramétrico"],
            ["Descripción", "Paramétrico"],
            ["CTA (botón)", "Solo cambia el label"],
            ["Stepper", "Máximo 3 banners"],
          ],
          imagen: { desktop: ["368 x 299 px", "1104 x 897 px"], mobile: ["328 x 208 px", "984 x 624 px"] },
          caracteres: [
            ["Título", "40 caracteres máx."],
            ["Descripción", "100 caracteres máx."],
            ["CTA", "20 caracteres máx."],
          ],
          visuales: [
            { src: "mini-1-desktop.jpg", w: 944, h: 359, label: "Desktop" },
            { src: "mini-1-mobile.jpg", w: 272, h: 408, label: "Mobile" },
          ],
          dos: [
            "Módulo para múltiples banners o campañas.",
            "Banners informativos o interactivos.",
            "Segundo nivel de jerarquía en la página.",
            "Máx. 3 banners.",
            "Imagen al 100%.",
          ],
          donts: [
            "1 solo banner.",
            "No usar como banner principal.",
            "No usar al final de una página.",
            "No repetir información de un mismo tema en medio de los banners.",
          ],
          recomendaciones: {
            img: { src: "mini-recomendaciones.jpg", w: 1208, h: 436 },
            donts: [
              "Usar más de 3 banners con diferentes campañas.",
              "Usar animaciones excesivas.",
              "Ubicar en una zona de difícil acceso.",
              "Llevar más de 1 CTA.",
            ],
          },
        },
      ],
    },
    // ───────────────────────────── EXTRA ─────────────────────────────
    {
      id: "extra",
      name: "Banner extra",
      alias: "Campañas Davivienda",
      color: "#8c0b11",
      paginas: ["Campañas Davivienda"],
      descripcion: "Banner para las páginas de campañas Davivienda.",
      opciones: [
        {
          id: "principal",
          name: "Banner extra",
          plantilla: "https://lion.box.com/s/ja7a8b0cyndkyjbjp0p4dgd97ykjkgzh",
          slides: [],
          partes: [
            ["Imagen", "Paramétrico"],
            ["Título", "Paramétrico"],
            ["Descripción", "Paramétrico"],
            ["CTA (botón)", "Solo cambia el label"],
          ],
          imagen: { desktop: ["1520 x 704 px", "4560 x 2112 px"], mobile: ["392 x 183 px", "1176 x 549 px"] },
          visuales: [{ src: "banner-extra.png", w: 383, h: 530, label: "Ejemplo" }],
        },
      ],
    },
  ],

  // Reglas que aplican a todas las imágenes de banner
  exportacion: [
    ["Formato", "WEBP"],
    ["Peso máximo", "100 KB"],
    ["Dimensión", "Exportar las imágenes en 3X"],
  ],
};
