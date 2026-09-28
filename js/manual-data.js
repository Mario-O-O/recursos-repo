// Contenido del "Manual de comunicación digital" (Davivienda · 2025).
// Fuente: referencia/Manual-de-comunicacion-digital.pptx
// `slides` = número de lámina original; la imagen está en manual/slides/lamina-NN.jpg
// `pendiente: true` = la lámina existe en el manual pero aún no tiene contenido definido.
window.MANUAL = {
  general: [
    {
      id: "tono",
      name: "Tono de marca",
      slides: [5],
      intro:
        "Autenticidad y cultura, somos lo que somos: alegría, humor, innovación y cotidianidad, con tres reglas para la comunicación:",
      reglas: [
        { titulo: "Pertinencia", texto: "Ser oportuno en la vida cotidiana de las personas." },
        {
          titulo: "Hiper-sencillez",
          lista: [
            "No usamos un lenguaje bancario o, más bien, lo bancario.",
            "Lo hacemos humano, con explicaciones claras, escritas o animadas (demostraciones).",
            "Preferimos ser claros, aunque esto signifique a veces no ser cortos (snackable).",
          ],
        },
        { titulo: "Relevancia", texto: "Solución significativa de una necesidad." },
      ],
      destacado: "Mayor profundidad en insights",
    },
    {
      id: "colores",
      name: "Colores de marca",
      slides: [6],
      grupos: [
        {
          titulo: "Rojo Davivienda",
          colores: [
            { hex: "#ed1c27", nombre: "Rojo principal" },
            { hex: "#c90c14", nombre: "Rojo oscuro" },
            { hex: "#d20a15", nombre: "Rojo intermedio" },
          ],
        },
        {
          titulo: "Grises Davivienda",
          colores: [
            { hex: "#f2f2f2", nombre: "Gris 1" },
            { hex: "#eaeaea", nombre: "Gris 2" },
            { hex: "#444444", nombre: "Gris 3" },
            { hex: "#231f20", nombre: "Negro Davivienda" },
          ],
        },
      ],
      escala: {
        titulo: "Escala de grises",
        base: "#231f20",
        pasos: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10],
        blanco: true,
      },
      nota: "El color negro en Davivienda es #231f20, evitar siempre el uso de negro #000000.",
    },
    {
      id: "fuente",
      name: "Fuente Davivienda",
      slides: [7],
      intro:
        "La tipografía de marca y su manual tipográfico se descargan desde los enlaces del manual original.",
    },
    {
      id: "legales",
      name: "Uso de legales",
      slides: [8],
      sinVisuales: ["s08-2.webp", "s08-3.webp"],
      usos: {
        ok: {
          texto:
            "Legales legibles, ubicados en el borde del formato y sin exceder el 30% del alto o ancho (según la orientación).",
          imgs: ["uso-legales-ok1", "uso-legales-ok2", "uso-legales-ok3"],
        },
        no: {
          texto:
            "Legales demasiado pequeños o que no respetan el tamaño y la orientación del formato: no se garantiza su legibilidad.",
          imgs: ["uso-legales-no1", "uso-legales-no2"],
        },
      },
      bloques: [
        {
          titulo: "Regla de proporción",
          texto:
            'El tamaño establecido para la razón social es igual al del texto "Superintendencia Financiera" en el Vigilado.',
        },
        {
          titulo: "Tamaño y orientación",
          texto:
            "Si bien el tamaño de los legales depende de las dimensiones del formato, no existe una medida específica, pero sí se debe asegurar la legibilidad y no exceder el 30% del alto o ancho del formato (según la orientación).",
        },
      ],
    },
  ],

  plataformas: [
    // ───────────────────────────── META ─────────────────────────────
    {
      id: "meta",
      name: "Meta",
      sub: "Facebook e Instagram",
      color: "#0866ff",
      formatos: [
        {
          id: "storie",
          name: "Storie",
          slides: [10, 11, 12, 13],
          sinVisuales: ["s11-1.webp", "s11-2.webp"],
          usos: {
            ok: {
              texto:
                "Siempre se debe tener en cuenta que el CTA se genera en la implementación y tiene una altura aproximada de 120 px; en algunos casos se puede contar con esta medida para acomodar algunos elementos en esa zona.",
              imgs: ["uso-storie-ok1", "uso-storie-ok2", "uso-storie-ok3"],
            },
            no: {
              texto:
                "Nunca se debe utilizar CTA en el diseño de las piezas: se incluye en la implementación y siempre hay que considerar su altura aproximada si se necesitan incluir elementos en esa zona.",
              imgs: ["uso-storie-no1", "uso-storie-no2", "uso-storie-no3"],
            },
          },
          objetivo:
            "Captar la atención de la audiencia con contenido breve y visual, generar interacción a través de encuestas, preguntas o enlaces, y mantener una presencia constante en la plataforma de forma dinámica y espontánea.",
          marca: ["NO lleva mosca, solo usamos logo Davivienda como cobranding cuando hay presencia de otras marcas."],
          legales: ["En una secuencia de Stories, los legales se aplican a TODOS los frames."],
          requisitos: [
            ["Dimensiones", "1080x1920 px · Relación de aspecto 9:16"],
            ["Formatos de imagen", "JPG o PNG"],
            ["Formatos de video", "MP4, MOV o GIF"],
            ["Peso máximo archivo", "30 MB"],
            ["Peso máximo video", "4 GB"],
          ],
          copy: [["Texto principal (imagen)", "125 caracteres"]],
          zona: [
            "Dejar un margen aproximado del 14% (250 píxeles) en la parte superior y del 20% (340 píxeles) en la parte inferior.",
            "No colocar texto, logotipos ni otros elementos clave en esa área para evitar que los cubran el icono del perfil o la llamada a la acción.",
            "El CTA se genera en la implementación y tiene una altura aproximada de 120 px; en algunos casos se puede contar con esa medida para acomodar elementos en esa zona.",
          ],
          notas: [
            "Nunca se debe utilizar CTA en el diseño de las piezas: se incluye en la implementación.",
            "Si se decide incluir elementos en la zona del CTA, se debe acordar con Performics en qué posición quedará el CTA.",
            "Secuencia de Stories: cuando el mensaje es muy extenso o hay distintos mensajes para una misma campaña (por ejemplo, múltiples ofertas).",
          ],
          entrega: [
            "Formatos de imagen: JPG o PNG. Formatos de video: MP4, MOV o GIF.",
            "Las piezas animadas siempre se deben revisar con el redactor del equipo y el equipo de video hace la entrega.",
            "Es la forma en la que guardamos los archivos para el tipo de pieza; hará parte de la entrega final del CM que corresponda.",
          ],
        },
        {
          id: "link-ad",
          name: "Link Ad",
          slides: [14, 15, 16, 17],
          sinVisuales: ["s16-1.webp", "s16-2.webp"],
          usos: {
            ok: {
              texto:
                "El CTA no debe ir dentro de la imagen, ya que Meta lo agrega automáticamente en la parte inferior del anuncio, junto con el título y la descripción.",
              imgs: ["uso-linkad-ok"],
            },
            no: {
              texto:
                "Incluir botones dentro del diseño puede generar confusión y afectar la claridad del mensaje. Para un diseño limpio y efectivo, es recomendable dejar que el CTA se muestre en la publicación misma.",
              imgs: ["uso-linkad-no"],
            },
          },
          plantilla: "https://lion.box.com/s/z5cqozzur1pz3j6dh4cpwzxdyisziduo",
          objetivo:
            "Comunicar un mensaje claro y estratégico que oriente al usuario hacia una acción específica. Dependiendo de la estrategia de contenido, puede usarse para generar tráfico, impulsar conversiones o ampliar el alcance de una comunicación.",
          marca: [
            "NO lleva mosca, solo usamos logo Davivienda como cobranding cuando hay presencia de otras marcas.",
            "Link Ad animado: tampoco lleva mosca, pero sí debe incluir el cierre al final junto a los legales de la campaña.",
          ],
          legales: [
            "Si algún frame de un Link Ad animado incluye asteriscos (*) en su copy, el texto legal correspondiente debe estar en el mismo frame.",
          ],
          requisitos: [
            ["Dimensiones", "1080x1080 px (1:1) · 1200x1500 px (4:5)"],
            ["Formatos de imagen", "JPG o PNG"],
            ["Formatos de video", "MP4, MOV o GIF"],
            ["Peso máximo archivo", "30 MB"],
            ["Peso máximo video", "4 GB"],
            ["Duración (animados)", "Ideal entre 6 y 15 segundos. Máximo permitido 241 minutos, pero no es recomendable."],
          ],
          copy: [
            ["Texto principal", "Máximo 125 caracteres"],
            ["Título", "Máximo 40 caracteres"],
            ["Descripción", "Máximo 30 caracteres"],
            ["Imágenes con texto", "Las que contengan más de un 20% de texto pueden verse limitadas"],
          ],
          zona: [
            "El CTA no debe ir dentro de la imagen: Meta lo agrega automáticamente en la parte inferior del anuncio, junto con el título y la descripción.",
            "Incluir botones dentro del diseño puede generar confusión. Es recomendable dejar que el CTA se muestre en la publicación misma.",
          ],
          notas: [
            "Usar la relación de aspecto recomendada en las especificaciones de cada CM.",
            "Los CTAs no son personalizables con texto propio, pero se puede elegir entre múltiples opciones predeterminadas de la plataforma.",
          ],
          optimizable: [
            { nombre: "LinkedIn", ok: true, detalle: "Optimizable en su formato de imagen única para anuncios patrocinados." },
            { nombre: "Twitter (X)", ok: true, detalle: "Optimizable en anuncios con imagen única (recomendado 1:1 o 16:9)." },
            { nombre: "Google Demand Gen", ok: true, detalle: "Optimizable, pero hay que asegurarse de que cumpla con las especificaciones de Google Ads." },
          ],
          entrega: [
            "Formatos de imagen: JPG o PNG. Formatos de video: MP4, MOV o GIF.",
            "Se envía la pieza final junto con el mockup del Link Ad, incluyendo el caption, título, descripción y CTA.",
            "Las piezas animadas siempre se deben revisar con el redactor del equipo y el equipo de video hace la entrega.",
          ],
        },
        {
          id: "carrusel",
          name: "Carrusel",
          slides: [18, 19, 20, 21],
          sinVisuales: ["s19-1.webp", "s19-2.webp"],
          usos: {
            ok: {
              texto:
                "El CTA no debe ir dentro de la imagen, ya que Meta lo agrega automáticamente en la parte inferior del anuncio, junto con el título y la descripción.",
              imgs: ["uso-carrusel-ok"],
            },
            no: {
              texto:
                "Incluir botones dentro del diseño puede generar confusión y afectar la claridad del mensaje. Para un diseño limpio y efectivo, es recomendable dejar que el CTA se muestre en la publicación misma.",
              imgs: ["uso-carrusel-no"],
            },
          },
          plantilla: "https://lion.box.com/s/j0r81tcu2dwc0l7aftcdfjxi7eb702o4",
          objetivo:
            "Mostrar múltiples imágenes o videos en un solo anuncio, cada uno con su propio enlace. Sirve para contar una historia visual, destacar diferentes características de un producto o servicio, o mostrar varias ofertas en una misma publicación.",
          marca: ["NO lleva mosca, solo usamos logo Davivienda como cobranding cuando hay presencia de otras marcas."],
          legales: [
            "No es necesario incluir los legales en cada pieza. Solo la primera pieza lleva el legal de Vigilado y la última pieza lleva el legal del Banco con los legales adicionales.",
            "Si alguna pieza incluye asteriscos (*) en su copy, el texto legal correspondiente debe estar en la misma pieza.",
          ],
          requisitos: [
            ["Dimensiones", "1080x1080 px (1:1) · 1200x1500 px (4:5)"],
            ["Formatos de imagen", "JPG o PNG"],
            ["Formatos de video", "MP4, MOV o GIF"],
            ["Peso máximo archivo", "30 MB"],
            ["Peso máximo video", "4 GB"],
            ["Duración de video", "1 a 15 segundos por tarjeta"],
            ["Número de tarjetas", "Mínimo 2, máximo 10"],
          ],
          copy: [
            ["Texto principal", "80 caracteres"],
            ["Título", "45 caracteres"],
            ["Descripción", "18 caracteres"],
            ["CTA (Call to Action)", "Aparece debajo de cada tarjeta"],
          ],
          zona: [
            "El CTA no debe ir dentro de la imagen: Meta lo agrega automáticamente en la parte inferior del anuncio.",
            "Incluir botones dentro del diseño puede generar confusión. Es recomendable dejar que el CTA se muestre en la publicación misma.",
          ],
          notas: ["Usar la relación de aspecto recomendada en las especificaciones de cada CM."],
          optimizable: [
            { nombre: "LinkedIn (Carrusel Ads)", ok: true, detalle: "Permite deslizar entre varias tarjetas (como en Meta)." },
            { nombre: "Twitter (X) (Carrusel Ads)", ok: true, detalle: "Permite mostrar hasta 6 tarjetas deslizables en una misma publicación." },
            { nombre: "Google Demand Gen (Carrusel Ads)", ok: true, detalle: "Su carrusel se basa en imágenes en secuencia, optimizadas con machine learning." },
          ],
          entrega: [
            "Formatos de imagen: JPG o PNG. Formatos de video: MP4, MOV o GIF.",
            "Se envían las piezas finales junto con el mockup del carrusel incluyendo el caption, título, descripción y CTA.",
            "Las piezas animadas siempre se deben revisar con el redactor del equipo y el equipo de video hace la entrega.",
          ],
        },
        {
          id: "collection",
          name: "Collection",
          slides: [22, 23, 24],
          plantilla: "https://lion.box.com/s/izqo76ziqrd60gqxv0y5sw8f2h8ifv3p",
          objetivo:
            "Facilitar la exploración de productos dentro de la plataforma, ofreciendo una experiencia visual e inmersiva que motive a los usuarios a interactuar con la marca.",
          comoFunciona:
            "Los anuncios de colección incluyen una imagen o un video de portada seguidos de tres imágenes de productos. Cuando alguien toca un anuncio de colección, ve una experiencia instantánea en pantalla completa que impulsa la interacción y fomenta el interés y la intención de compra.",
          marca: ["NO lleva mosca, solo usamos logo Davivienda como cobranding cuando hay presencia de otras marcas."],
          legales: [
            "Se deben incluir los legales de Vigilado y Banco en todas las piezas, y los legales generales van en la última pieza.",
            "Si alguna pieza incluye asteriscos (*) en su copy, el texto legal correspondiente debe estar en la misma pieza.",
          ],
          requisitos: [
            ["Dimensiones", "1080x1080 px (1:1)"],
            ["Miniaturas de productos", "1:1 (cuadrado)"],
            ["Formatos de imagen", "JPG o PNG"],
            ["Formatos de video", "MP4, MOV o GIF"],
            ["Peso máximo archivo", "30 MB"],
            ["Peso máximo video", "4 GB"],
            ["Portada", "Siempre debe ser video"],
          ],
          copy: [
            ["Texto principal", "125 caracteres"],
            ["Título", "40 caracteres"],
            ["URL de la página de destino", "Obligatoria"],
          ],
          zona: [
            "Meta Collection incluye un botón de CTA en la parte inferior del anuncio: no incluir botones de llamada a la acción dentro de la imagen.",
          ],
          optimizable:
            "No. Meta Collection no es directamente optimizable a otros formatos: es una experiencia exclusiva de Meta Ads (Facebook e Instagram) y depende de su función de Instant Experience. Pendiente revisar optimización a Storie.",
          entrega: [
            "Formatos de imagen: JPG o PNG. Formatos de video: MP4, MOV o GIF.",
            "Se envía la pieza final junto con el mockup del Collection.",
            "Las piezas animadas siempre se deben revisar con el redactor del equipo y el equipo de video hace la entrega.",
          ],
        },
        {
          id: "reel",
          name: "Reel",
          slides: [25, 26, 27, 28],
          plantilla: "https://lion.box.com/s/aiwmbcoakcnxaxrexp8neodultkycucx",
          objetivo:
            "Aumentar el alcance y la interacción con videos cortos y dinámicos, ideales para captar la atención y promocionar productos o mensajes de forma rápida.",
          marca: [
            "El Reel no lleva mosca, pero sí debe incluir el cierre al final junto a los legales de la campaña.",
            "Solo usamos logo Davivienda como cobranding cuando hay presencia de otras marcas.",
          ],
          legales: [
            "Si algún frame del reel incluye asteriscos (*) en su copy, el texto legal correspondiente debe estar en el mismo frame.",
          ],
          requisitos: [
            ["Dimensiones", "1080x1920 px · Relación de aspecto 9:16"],
            ["Duración del video", "Entre 3 y 60 segundos; hasta 90 segundos en Instagram"],
            ["Formatos de video", "MP4, MOV o GIF"],
            ["Peso máximo video", "4 GB"],
          ],
          zona: [
            "Dejar un margen aproximado de 252 px arriba, 705 px abajo, 120 px a la izquierda y 240 px a la derecha.",
            "No colocar texto, logotipos ni otros elementos clave en esa área para evitar que los cubran la información del perfil o la interfaz.",
            "Meta agrega automáticamente un botón de CTA en la parte inferior, por lo que no es necesario incluirlo dentro del video.",
            "El contenido principal, que requiere máxima legibilidad, sí debe ubicarse en la zona segura. Imágenes y gráficos pueden extenderse al resto del espacio.",
          ],
          notas: [
            "La zona segura está ligeramente justificada hacia la izquierda, pero no es obligatorio mantener ese alineamiento: el contenido puede centrarse si mejora la armonía del diseño.",
          ],
          optimizable: [
            { nombre: "TikTok", ok: true, detalle: "Formato vertical 9:16, ideal para adaptar Reels." },
            { nombre: "Google Demand Gen", ok: true, detalle: "Soporta videos en YouTube Shorts y Discover, formatos similares a Reels." },
          ],
          entrega: [
            "Formatos de video: MP4, MOV o GIF.",
            "Las piezas animadas siempre se deben revisar con el redactor del equipo y el equipo de video hace la entrega.",
          ],
        },
        {
          id: "video-instream",
          name: "Video instream",
          slides: [29, 30],
          plantilla: "https://lion.box.com/s/xpzrds5c14bcgdpwwvk6w2mf2whaakig",
          objetivo:
            "Captar la atención de los espectadores mientras consumen contenido de video en Facebook. Estos anuncios se insertan durante la reproducción de videos más largos.",
          marca: [
            "NO lleva mosca. Se recomienda incluir el logo de la marca al inicio o al final del video, pero no de forma permanente durante toda la reproducción.",
          ],
          requisitos: [
            ["Dimensiones", "1920x1080 px · Relación de aspecto 16:9"],
            ["Duración del video", "Entre 5 y 15 segundos. Si supera los 15 segundos los usuarios pueden omitir el anuncio"],
            ["Formatos de video", "MP4, MOV o GIF"],
            ["Peso máximo video", "4 GB"],
          ],
          optimizable: [{ nombre: "Google Demand Gen", ok: true, detalle: "YouTube in-stream ads." }],
          entrega: [
            "Formatos de video: MP4, MOV o GIF.",
            "Las piezas animadas siempre se deben revisar con el redactor del equipo y el equipo de video hace la entrega.",
          ],
        },
      ],
    },

    // ───────────────────────────── TIKTOK ─────────────────────────────
    {
      id: "tiktok",
      name: "TikTok",
      sub: "Ads",
      color: "#111111",
      formatos: [
        {
          id: "video-in-feed",
          name: "Video in Feed",
          slides: [32, 33, 34, 35],
          objetivo:
            'Integrarse de manera orgánica en el flujo de contenido que los usuarios consumen en la sección "Para ti", captando la atención de la audiencia de forma natural.',
          marca: [
            "NO lleva mosca, solo usamos logo Davivienda como cobranding cuando hay presencia de otras marcas.",
            "Debe incluir el cierre al final junto a los legales de la campaña.",
          ],
          legales: [
            "Si algún frame incluye asteriscos (*) en su copy, el texto legal correspondiente debe estar en el mismo frame.",
          ],
          requisitos: [
            ["Dimensiones", "1080x1920 px · Relación de aspecto 9:16"],
            ["Duración del video", "Entre 5 y 60 segundos; se recomienda 21 a 30 segundos para mejor rendimiento"],
            ["Formatos de video", ".mp4, .mov, .mpeg, .avi"],
            ["Peso máximo video", "500 MB"],
          ],
          zona: [
            "Dejar un margen aproximado de 126 px arriba, 352 px abajo, 60 px a la izquierda y 120 px a la derecha.",
            "No colocar texto, logotipos ni otros elementos clave en esa área para evitar que los cubran la información del perfil o la interfaz.",
            "No es necesario incluir un botón dentro del video: TikTok coloca el CTA automáticamente.",
            "El contenido principal sí debe ubicarse en la zona segura; imágenes y gráficos pueden extenderse al resto del espacio.",
          ],
          notas: [
            "La zona segura está ligeramente justificada hacia la izquierda, pero no es obligatorio mantener ese alineamiento.",
          ],
          optimizable: [
            { nombre: "Meta Reel", ok: true, detalle: "Formato vertical 9:16, ideal para adaptar a TikTok Feed." },
            { nombre: "Google Demand Gen", ok: true, detalle: "Soporta videos en YouTube Shorts y Discover, formatos similares a TikTok Feed." },
          ],
          entrega: [
            "Formatos de video: MP4, MOV o GIF.",
            "Las piezas animadas siempre se deben revisar con el redactor del equipo y el equipo de video hace la entrega.",
          ],
        },
        {
          id: "display-card",
          name: "Display Card",
          slides: [36, 37],
          objetivo:
            "Imagen personalizada en los anuncios de video en el feed. Resalta mensajes importantes, promociona ofertas exclusivas y aumenta el tráfico hacia sitios web o aplicaciones.",
          marca: ["NO lleva mosca, solo usamos logo Davivienda como cobranding cuando hay presencia de otras marcas."],
          legales: ["NO lleva legales, para que no se repitan con los legales del video in Feed."],
          requisitos: [
            ["Dimensiones", "750 x 421 px"],
            ["Formatos de archivo", ".jpg, .jpeg, .png"],
            ["Peso máximo", "Sin limitación específica"],
          ],
          notas: [
            "Evitar el uso de imágenes de baja resolución.",
            "No utilizar elementos de diseño transparentes en la Display Card.",
            "Una vez que la campaña está activa, los elementos del anuncio no pueden ser editados o reemplazados.",
          ],
          optimizable: "No es directamente optimizable o adaptable a otros formatos.",
          entrega: ["Formatos de imagen: JPG o PNG."],
        },
        {
          id: "gesture-ads",
          name: "Gesture Ads",
          slides: [38, 39],
          objetivo:
            "Versión mejorada de los anuncios en feed, con una interacción especial: cuando el usuario realiza un gesto (como deslizar o inclinar el teléfono), se despliega una tarjeta interactiva con más información, promociones o detalles del producto.",
          marca: [
            "SÍ lleva mosca, se debe usar en la tarjeta interactiva.",
            "Si se pide usar cierre en la tarjeta interactiva, NO lleva mosca.",
          ],
          legales: ["SÍ se deben incluir los legales dentro de la tarjeta interactiva."],
          requisitos: [
            ["Dimensiones", "620 x 788 px"],
            ["Formatos de archivo", ".jpg, .jpeg, .png, .gif"],
            ["Peso máximo", "Menor o igual a 3 MB"],
          ],
          copy: [["Texto del gesto", "Lo define Copy"]],
          notas: ["Evitar un diseño totalmente blanco o transparente."],
          optimizable: "No es directamente optimizable o adaptable a otros formatos.",
          entrega: [
            "Formatos de imagen: JPG o PNG.",
            "Se envía el VIDEO IN FEED con la IMAGEN DE LA CARD del Gesture Ads.",
          ],
        },
        {
          id: "top-view",
          name: "Top View",
          slides: [40, 41],
          objetivo:
            "Captar la atención del usuario desde el primer momento. Al ocupar el espacio más destacado de la aplicación, busca aumentar el reconocimiento de la marca y fomentar la interacción con el contenido presentado.",
          marca: ["NO lleva mosca, solo usamos logo Davivienda como cobranding cuando hay presencia de otras marcas."],
          requisitos: [
            ["Dimensiones", "1080x1920 px · Relación de aspecto 9:16"],
            ["Duración del video", "Entre 5 y 60 segundos"],
            ["Formatos de video", ".mp4, .mov, .mpeg, .avi"],
            ["Peso máximo video", "500 MB"],
          ],
          zona: [
            "Dejar un margen aproximado de 90 px arriba, 140 px abajo, 60 px a la izquierda y 60 px a la derecha.",
            "No colocar texto, logotipos ni otros elementos clave en esa área para evitar que los cubran la información del perfil o la interfaz.",
          ],
          optimizable: [
            { nombre: "Meta Reel", ok: true, detalle: "Formato vertical 9:16, ideal para adaptar a TikTok Feed." },
            { nombre: "Google Demand Gen", ok: true, detalle: "Soporta videos en YouTube Shorts y Discover." },
            { nombre: "TikTok Feed", ok: true, detalle: "Formato vertical 9:16, ideal para adaptar Reels." },
          ],
          entrega: ["Formatos de imagen: JPG o PNG."],
        },
        {
          id: "instant-pages",
          name: "Instant Pages",
          slides: [42, 43],
          objetivo:
            "Proporcionar una experiencia rápida y fluida dentro de la plataforma, permitiendo a los usuarios explorar productos, servicios o contenido adicional sin salir de la aplicación.",
          comoFunciona:
            'El anuncio puede ser un Video in Feed, Top View o cualquier otro formato publicitario. Incluye un botón CTA (por ejemplo, "Más información" o "Comprar ahora") y se abre una Instant Page directamente dentro de TikTok.',
          marca: ["NO lleva mosca, solo usamos logo Davivienda como cobranding cuando hay presencia de otras marcas."],
          requisitos: [
            ["Edición", "Editor de arrastrar y soltar (drag & drop). No requiere codificación ni hosting externo"],
            ["Imágenes", ".jpg, .jpeg, .png con peso máximo de 3 MB"],
            ["Videos", "Duración recomendada 9-15 segundos"],
            ["Texto", "Titulares, descripciones y llamadas a la acción"],
            ["CTA", "Personalizables, con redirección a páginas externas"],
            ["Otros elementos", "Carruseles o galerías de imágenes, formularios interactivos (captación de leads) y enlaces a sitios externos o e-commerce"],
          ],
          notas: [
            "Para crear una Instant Page es necesario enviar el look and feel de la página, junto con los textos y los elementos gráficos que la componen, para que el diseño sea coherente con la identidad y los objetivos de la campaña.",
          ],
        },
        {
          id: "imagen",
          name: "Imagen",
          slides: [44],
          objetivo:
            "Anuncios en formato de imagen estática que aparecen en el feed de los usuarios, diseñados para captar su atención de manera rápida y efectiva.",
          marca: ["NO lleva mosca, solo usamos logo Davivienda como cobranding cuando hay presencia de otras marcas."],
          requisitos: [
            ["Dimensiones", "1080x1920 px (9:16) · 1080x1080 px (1:1) · 1920x1080 px (16:9)"],
            ["Formatos de imagen", "JPG o PNG"],
            ["Peso máximo", "500 KB"],
          ],
        },
        {
          id: "interactive-addons",
          name: "Interactive Add-ons",
          slides: [45],
          objetivo:
            "Elementos visuales adicionales que se pueden agregar a los anuncios de TikTok para hacerlos más llamativos y fomentar la interacción del usuario.",
          bloques: [
            {
              titulo: "Voting Sticker",
              texto:
                "Permite incluir una encuesta en los anuncios de video, presentando una pregunta con dos opciones de respuesta. Los usuarios pueden votar y ver los resultados en tiempo real.",
              enlace: "https://ads.tiktok.com/help/article/interactive-add-on-create-ad-voting-sticker?redirected=1",
            },
            {
              titulo: "Gift Code Sticker",
              texto:
                "Permite ofrecer códigos promocionales directamente en el anuncio. Los usuarios pueden copiar fácilmente el código y utilizarlo en el sitio web o la aplicación de la marca.",
              enlace: "https://ads.tiktok.com/help/article/interactive-add-on-create-ad-gift-code-sticker?redirected=1",
            },
            {
              titulo: "Countdown Sticker",
              texto:
                "Añade un temporizador a los anuncios, creando una sensación de urgencia al mostrar el tiempo restante para el inicio o finalización de un evento o promoción.",
              enlace: "https://ads.tiktok.com/help/article/interactive-add-on-create-ad-countdown-sticker?redirected=1",
            },
          ],
        },
      ],
    },

    // ─────────────────────── GOOGLE DEMAND GEN ───────────────────────
    {
      id: "google-demand-gen",
      name: "Google Demand Gen",
      sub: "Google Ads",
      color: "#4285f4",
      formatos: [
        {
          id: "display",
          name: "Display",
          slides: [47, 48],
          objetivo: "Generar reconocimiento de marca y fomentar la consideración del producto o servicio.",
          marca: ["SÍ lleva mosca, solo usamos logo Davivienda como cobranding cuando hay presencia de otras marcas."],
          legales: ["Sí lleva legales del banco y Vigilado."],
          requisitos: [
            ["Dimensiones", "1200x628 px · 1200x1200 px · 960x1200 px"],
            ["Formatos de imagen", "JPG, PNG"],
            ["Peso máximo imagen", "5 MB"],
            ["Formatos de video", "MPG (MPEG-2 o MPEG-4) recomendado; también AVI, MOV, MP4"],
            ["Peso máximo video", "256 MB"],
          ],
          optimizable:
            "Puede adaptarse a otros formatos y campañas del ecosistema de Google, ya que usa las tres proporciones estándar de imagen (horizontal, cuadrado y vertical): Google Discovery Ads, Google Performance Max, Display Responsive Ads y YouTube Video Action Campaigns. Siempre hay que revisar en el CM qué formatos específicos se adaptan, porque algunas piezas pueden requerir ajustes por legibilidad, peso o proporciones.",
          entrega: ["Formatos de imagen: JPG o PNG."],
        },
        {
          id: "logo-marca",
          name: "Logo marca",
          slides: [49],
          plantilla: null,
          objetivo: "Logotipo de la marca que acompaña a los anuncios.",
          requisitos: [
            ["Tamaño mínimo recomendado", "320 x 320 px"],
            ["Tamaño recomendado", "1200 x 1200 px"],
            ["Relación de aspecto", "1:1 (cuadrado)"],
            ["Peso máximo", "5 MB"],
            ["Formatos admitidos", "JPG, PNG"],
          ],
          notas: ["Se usa el logo estandarizado."],
        },
        {
          id: "video-youtube",
          name: "Video YouTube",
          slides: [50, 51],
          objetivo: "Impulsar la consideración y conversión mediante contenido de video atractivo.",
          marca: ["SÍ lleva mosca, solo usamos logo Davivienda como cobranding cuando hay presencia de otras marcas."],
          legales: ["Sí lleva legales del banco y Vigilado."],
          requisitos: [
            ["Dimensiones", "1920x1080 px · 1080x1080 px · 1080x1920 px"],
            ["Formatos de video", "MP4, MOV, AVI, WMV, FLV"],
            ["Peso máximo", "256 MB"],
            ["Duración mínima", "5 segundos"],
            ["Duración recomendada", "Shorts: 10–20 segundos · Otros formatos: menos de 3 minutos"],
          ],
          optimizable:
            "Puede adaptarse a otros formatos y campañas del ecosistema de Google (proporciones horizontal, cuadrado y vertical): YouTube Ads estándar y Performance Max. Siempre hay que revisar en el CM qué formatos específicos se adaptan.",
          entrega: [
            "Formatos de video: MP4, MOV o GIF.",
            "Las piezas animadas siempre se deben revisar con el redactor del equipo y el equipo de video hace la entrega.",
          ],
        },
      ],
    },

    // ───────────────────────── GOOGLE UAC ─────────────────────────
    {
      id: "google-uac",
      name: "Google UAC",
      sub: "Universal App Campaigns",
      color: "#34a853",
      formatos: [
        {
          id: "display",
          name: "Display",
          slides: [53, 54],
          objetivo: "Promover la instalación de aplicaciones o fomentar interacciones dentro de la aplicación.",
          marca: ["SÍ lleva mosca, solo usamos logo Davivienda como cobranding cuando hay presencia de otras marcas."],
          legales: ["Sí lleva legales del banco y Vigilado."],
          requisitos: [
            ["Dimensiones", "1200x628 px (1.91:1) · 1200x1200 px (1:1) · 1200x1500 px (4:5)"],
            ["Formatos de imagen", "JPG o PNG"],
            ["Peso máximo", "5 MB"],
          ],
          optimizable:
            "Puede adaptarse a otros formatos del ecosistema de Google (proporciones horizontal, cuadrado y vertical): Responsive Display Ads, Performance Max, Demand Gen Display y Discovery Ads. Siempre hay que revisar en el CM qué formatos específicos se adaptan.",
          entrega: ["Formatos de imagen: JPG o PNG."],
        },
        {
          id: "html",
          name: "HTML",
          slides: [55, 56, 57, 58],
          objetivo:
            "Aumentar la calidad de las instalaciones al permitir que los potenciales usuarios interactúen con una experiencia cercana a la app antes de instalarla, lo que filtra usuarios poco interesados y mejora la intención de uso.",
          marca: ["SÍ lleva mosca, solo usamos logo Davivienda como cobranding cuando hay presencia de otras marcas."],
          legales: ["Sí lleva legales del banco y Vigilado."],
          comoFunciona:
            "Las piezas se desarrollan en Creatopy (https://www.creatopy.com/), herramienta especializada para diseño y exportación de anuncios HTML compatibles con plataformas como Google Ads.",
          pasos: [
            { titulo: "Crear el diseño", texto: 'Ingresar a Creatopy y hacer clic en "Nuevo diseño". Seleccionar un formato base y construir la pieza: imágenes, textos, CTAs y demás elementos visuales.' },
            { titulo: "Animar", texto: "Animar los elementos con la línea de tiempo (aparición, duración y salida de cada elemento). Mantener la animación ligera y clara para no afectar la comprensión ni la velocidad de carga." },
            { titulo: "Adaptar a otros tamaños", texto: "Duplicar la pieza base en otros tamaños adaptando los elementos gráficos. En formatos pequeños conviene reducir el texto o simplificar elementos." },
            { titulo: "Revisar cada pieza", texto: "Verificar que el contenido esté adaptado al tamaño del formato, los textos sean legibles y no queden cortados, no haya elementos fuera de los márgenes y las animaciones sean fluidas." },
            { titulo: "Exportar en HTML5", texto: "Exportar desde Creatopy con las opciones técnicas que exige Google Ads. La plataforma genera un archivo .zip por cada formato." },
            { titulo: "Validar", texto: "Usar https://h5validator.appspot.com/dcm para verificar animaciones, que el contenido se vea completo y legible en cada tamaño y que el HTML no tenga errores de carga." },
          ],
          optimizable: "No es directamente optimizable o adaptable a otros formatos.",
        },
        {
          id: "video-youtube",
          name: "Video de YouTube",
          slides: [59, 60],
          objetivo: "Anuncios de video que se muestran en YouTube y en la Red de Display de Google.",
          marca: ["SÍ lleva mosca, solo usamos logo Davivienda como cobranding cuando hay presencia de otras marcas."],
          legales: ["Sí lleva legales del banco y Vigilado."],
          requisitos: [
            ["Dimensiones", "1920x1080 px · 1080x1080 px · 1080x1620 px"],
            ["Formatos de video", "MP4, MOV, AVI, WMV, FLV"],
            ["Peso máximo", "256 MB"],
          ],
          notas: [
            "También es posible diseñar y animar la pieza desde Creatopy, con herramientas visuales para agregar textos, imágenes, animaciones y efectos de entrada/salida.",
          ],
          optimizable:
            "Puede adaptarse a otros formatos del ecosistema de Google: YouTube Ads estándar y Performance Max. Siempre hay que revisar en el CM qué formatos específicos se adaptan.",
          entrega: [
            "Formatos de video: MP4, MOV o GIF.",
            "Las piezas animadas siempre se deben revisar con el redactor del equipo y el equipo de video hace la entrega.",
          ],
        },
      ],
    },

    // ─────────────────── GOOGLE PERFORMANCE MAX ───────────────────
    {
      id: "google-performance-max",
      name: "Google Performance Max",
      sub: "Google Ads",
      color: "#fbbc04",
      formatos: [
        {
          id: "display",
          name: "Display",
          slides: [62, 63],
          objetivo: "Alcanzar a los usuarios con anuncios visuales atractivos en diversos sitios web y aplicaciones.",
          marca: ["SÍ lleva mosca, solo usamos logo Davivienda como cobranding cuando hay presencia de otras marcas."],
          legales: ["Sí lleva legales del banco y Vigilado."],
          requisitos: [
            ["Dimensiones", "1200x628 px (1.91:1) · 1200x1200 px (1:1) · 960x1200 px (4:5)"],
            ["Formatos de imagen", "JPG o PNG"],
            ["Peso máximo", "5 MB"],
          ],
          copy: [["Recomendación", "Evitar el uso excesivo de texto en las imágenes para garantizar claridad y legibilidad"]],
          optimizable:
            "Puede adaptarse a otros formatos del ecosistema de Google: Responsive Display Ads, Google UAC, Demand Gen Display y Discovery Ads. Siempre hay que revisar en el CM qué formatos específicos se adaptan.",
          entrega: ["Formatos de imagen: JPG o PNG."],
        },
        {
          id: "logo-marca",
          name: "Logo marca",
          slides: [64],
          objetivo: "Logotipos utilizados para reforzar la identidad de marca en los anuncios.",
          requisitos: [
            ["Cuadrado", "1200 x 1200 px"],
            ["Horizontal", "1200 x 300 px"],
            ["Peso máximo", "5 MB"],
            ["Formatos admitidos", "JPG, PNG"],
          ],
          notas: ["Se usa el logo estandarizado."],
        },
        {
          id: "video-youtube",
          name: "Video YouTube",
          slides: [65, 66],
          objetivo:
            "Impulsar el alcance, consideración y conversiones mediante anuncios en video que se integran automáticamente en múltiples canales del ecosistema de Google.",
          marca: ["SÍ lleva mosca, solo usamos logo Davivienda como cobranding cuando hay presencia de otras marcas."],
          legales: ["Sí lleva legales del banco y Vigilado."],
          requisitos: [
            ["Dimensiones", "1920x1080 px · 1080x1080 px · 1080x1620 px"],
            ["Formatos de video", "MP4, MOV, AVI, WMV, FLV"],
            ["Peso máximo", "256 MB"],
            ["Duración mínima", "10 segundos"],
          ],
          notas: [
            "También es posible diseñar y animar la pieza desde Creatopy, con herramientas visuales para agregar textos, imágenes, animaciones y efectos de entrada/salida.",
          ],
          optimizable:
            "Puede adaptarse a otros formatos del ecosistema de Google: YouTube Ads estándar y Google UAC. Siempre hay que revisar en el CM qué formatos específicos se adaptan.",
          entrega: [
            "Formatos de video: MP4, MOV o GIF.",
            "Las piezas animadas siempre se deben revisar con el redactor del equipo y el equipo de video hace la entrega.",
          ],
        },
      ],
    },

    // ───────────────────────── GOOGLE DISPLAY ─────────────────────────
    {
      id: "google-display",
      name: "Google Display",
      sub: "Red de Display",
      color: "#ea4335",
      formatos: [
        {
          id: "discovery",
          name: "Discovery",
          slides: [68],
          objetivo: "Alcanzar a los usuarios con anuncios visuales atractivos en diversos sitios web y aplicaciones.",
          marca: ["SÍ lleva mosca, solo usamos logo Davivienda como cobranding cuando hay presencia de otras marcas."],
          legales: ["Sí lleva legales del banco y Vigilado."],
          requisitos: [
            ["Dimensiones", "1200x628 px (1.91:1) · 1200x1200 px (1:1) · 960x1200 px (4:5)"],
            ["Formatos de imagen", "JPG, PNG y GIF estáticos"],
            ["Peso máximo", "5 MB por imagen"],
          ],
          copy: [
            ["Titulares", "De 3 a 5 titulares, hasta 40 caracteres cada uno"],
            ["Descripciones", "De 1 a 5 descripciones, hasta 90 caracteres cada una"],
            ["Nombre de la empresa", "Hasta 25 caracteres"],
          ],
        },
      ],
    },

    // ───────────────────────── PROGRAMMATIC ─────────────────────────
    {
      id: "programatic",
      name: "Programmatic",
      sub: "Banners y video",
      color: "#6b7280",
      formatos: [
        {
          id: "standard-banner",
          name: "Standard Banner",
          slides: [70],
          objetivo: "Incrementar la visibilidad y el reconocimiento de la marca entre los usuarios.",
          marca: ["SÍ lleva mosca, solo usamos logo Davivienda como cobranding cuando hay presencia de otras marcas."],
          legales: ["Sí lleva legales del banco y Vigilado."],
          requisitos: [
            ["Tamaños", "300x250 · 336x280 · 728x90 · 160x600 · 320x50 px"],
            ["Formatos de archivo", "JPG, PNG y GIF"],
            ["Peso máximo", "150 KB"],
            ["Animación (GIF)", "Máximo 30 segundos, con un límite de 5 frames por segundo"],
          ],
          copy: [["Recomendación", "Utilizar mensajes claros y concisos con llamados a la acción efectivos"]],
        },
        {
          id: "video-banner",
          name: "Video Banner",
          slides: [71],
          objetivo: "Captar la atención de los usuarios de manera más efectiva que los anuncios estáticos.",
          marca: ["SÍ lleva mosca, solo usamos logo Davivienda como cobranding cuando hay presencia de otras marcas."],
          legales: ["Sí lleva legales del banco y Vigilado."],
          requisitos: [
            ["Dimensiones", "300x250 px · 336x280 px · 1080x1620 px"],
            ["Formatos de video", "MP4, MOV, AVI, WMV, FLV"],
            ["Peso máximo", "256 MB"],
            ["Duración mínima", "10 segundos"],
          ],
          notas: [
            "Asegurar que el video se cargue rápidamente para evitar tiempos de espera que puedan disuadir al usuario.",
            "También es posible diseñar y animar la pieza desde Creatopy.",
          ],
        },
      ],
    },

    // ───────────────────────── LINKEDIN ─────────────────────────
    {
      id: "linkedin",
      name: "LinkedIn",
      sub: "Ads",
      color: "#0a66c2",
      formatos: [
        { id: "documento-pdf", name: "Documento PDF", slides: [73], pendiente: true },
        { id: "imagen", name: "Imagen", slides: [74], pendiente: true },
        { id: "video-4-5", name: "Video 4:5", slides: [75], pendiente: true, requisitos: [["Relación de aspecto", "4:5 (vertical: 0,8)"]] },
        { id: "video-9-16", name: "Video 9:16", slides: [76], pendiente: true, requisitos: [["Relación de aspecto", "9:16 (vertical: 0,57)"]] },
        { id: "video-16-9", name: "Video 16:9", slides: [77], pendiente: true, requisitos: [["Relación de aspecto", "16:9 (horizontal: 1,78)"]] },
        { id: "video-1-1", name: "Video 1:1", slides: [78], pendiente: true, requisitos: [["Relación de aspecto", "1:1 (cuadrado: 1,0)"]] },
        { id: "carrusel-1-1", name: "Carrusel 1:1", slides: [79], pendiente: true, requisitos: [["Relación de aspecto", "1:1"]] },
        { id: "evento-4-1", name: "Evento 4:1", slides: [80], pendiente: true, requisitos: [["Relación de aspecto", "4:1"]] },
        { id: "conversacion", name: "Conversación", slides: [81], pendiente: true },
        { id: "mensaje", name: "Mensaje", slides: [82], pendiente: true },
      ],
    },

    // ───────────────────────── TWITTER / X ─────────────────────────
    {
      id: "twitter",
      name: "Twitter (X)",
      sub: "Ads",
      color: "#111111",
      formatos: [
        { id: "anuncio-texto", name: "Anuncio de texto", slides: [84], pendiente: true },
        { id: "imagen-1-1", name: "Imagen 1:1", slides: [85], pendiente: true, requisitos: [["Relación de aspecto", "1:1"]] },
        { id: "imagen-1-91", name: "Imagen 1.91:1", slides: [86], pendiente: true, requisitos: [["Relación de aspecto", "1.91:1"]] },
        { id: "video-1-1", name: "Video 1:1", slides: [87], pendiente: true, requisitos: [["Relación de aspecto", "1:1"]] },
        { id: "video-16-9", name: "Video 16:9", slides: [88], pendiente: true, requisitos: [["Relación de aspecto", "16:9"]] },
        { id: "carrusel-imagen-1-1", name: "Carrusel imagen 1:1", slides: [89], pendiente: true, requisitos: [["Relación de aspecto", "1:1"]] },
        { id: "carrusel-imagen-1-91", name: "Carrusel imagen 1.91:1", slides: [90], pendiente: true, requisitos: [["Relación de aspecto", "1.91:1"]] },
        { id: "carrusel-video-1-1", name: "Carrusel video 1:1", slides: [91], pendiente: true, requisitos: [["Relación de aspecto", "1:1"]] },
        { id: "carrusel-video-16-9", name: "Carrusel video 16:9", slides: [92], pendiente: true, requisitos: [["Relación de aspecto", "16:9"]] },
      ],
    },

    // ───────────────────────── TEADS ─────────────────────────
    {
      id: "teads",
      name: "Teads",
      sub: "Formatos premium",
      color: "#e5252e",
      formatos: [
        { id: "skin-landscape", name: "Skin Landscape", slides: [94], pendiente: true },
        { id: "flow-square", name: "Flow Square", slides: [95, 96], pendiente: true },
      ],
    },

    // ───────────────────────── UBER ─────────────────────────
    {
      id: "uber",
      name: "Uber",
      sub: "Ads",
      color: "#111111",
      formatos: [
        { id: "dispatch", name: "Dispatch", slides: [98], pendiente: true },
        { id: "en-route", name: "En Route", slides: [99], pendiente: true },
        { id: "on-trip", name: "On Trip", slides: [100], pendiente: true },
      ],
    },
  ],
};
