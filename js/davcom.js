// Sección "dav.com": guía de uso de banners del portal davivienda.com.
// Reutiliza la maquetación del manual (índice lateral, tarjetas, pestañas). El enrutado
// (mostrar/ocultar vistas) lo hace manual.js, que llama a window.DavcomView.render().
(function () {
  "use strict";

  const DATA = window.DAVCOM;
  const IMG_DIR = "davcom/img/";
  const SLIDE_DIR = "davcom/slides/";

  const els = {
    nav: document.getElementById("davcom-nav"),
    content: document.getElementById("davcom-content"),
    lightbox: document.getElementById("lightbox"),
    lightboxImg: document.getElementById("lightbox-img"),
  };

  const state = { search: "", tab: "ficha", key: "" };

  // ───────────── helpers ─────────────
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

  const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

  const icon = {
    download:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    check:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    arrowL:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
    arrowR:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
  };

  const bannerById = Object.fromEntries(DATA.banners.map((b) => [b.id, b]));
  const generalById = Object.fromEntries(DATA.general.map((g) => [g.id, g]));
  const totalOpciones = DATA.banners.reduce((n, b) => n + b.opciones.length, 0);

  // Las páginas del portal donde puede convivir un banner (columnas de la matriz de contexto)
  const PAGINAS = ["Página principal (Home)", "Home de producto", "Producto", "Otras páginas", "Campañas Davivienda"];
  const enPagina = (b, p) => b.paginas.includes("Todas las páginas") || b.paginas.includes(p);

  // Recorrido lineal (banner → opción) para el paginador anterior / siguiente
  const sequence = DATA.banners.flatMap((b) => b.opciones.map((o) => ({ b, o })));
  const href = (b, o) => (b.opciones.length > 1 ? `#/davcom/${b.id}/${o.id}` : `#/davcom/${b.id}`);
  const label = (b, o) => (b.opciones.length > 1 ? `${b.name} · ${o.name}` : b.name);

  // ───────────── índice lateral ─────────────
  function renderNav(route) {
    const q = norm(state.search.trim());
    let html = `
      <div class="mnav__search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>
        <input type="search" id="davcom-search" placeholder="Buscar banner o regla…" value="${esc(state.search)}" autocomplete="off" />
      </div>`;

    if (q) {
      const hits = [];
      DATA.general.forEach((g) => {
        if (norm(g.name).includes(q)) hits.push({ href: `#/davcom/${g.id}`, title: g.name, sub: "Generalidades" });
      });
      sequence.forEach(({ b, o }) => {
        const hay = [b.name, b.alias || "", b.cms || "", o.name, o.sub || "", ...b.paginas].join(" ");
        if (norm(hay).includes(q)) hits.push({ href: href(b, o), title: label(b, o), sub: o.sub || b.cms || b.alias, color: b.color });
      });
      html += `<div class="mnav__group"><div class="mnav__label">${plural(hits.length, "resultado", "resultados")}</div>`;
      html += hits.length
        ? hits
            .map(
              (h) =>
                `<a class="mnav__item" href="${h.href}">${h.color ? `<span class="dot" style="background:${h.color}"></span>` : ""}<span>${esc(h.title)}<small>${esc(h.sub)}</small></span></a>`
            )
            .join("")
        : `<p class="mnav__empty">Nada coincide con “${esc(state.search)}”.</p>`;
      html += "</div>";
    } else {
      html += `<div class="mnav__group"><div class="mnav__label">Generalidades</div>`;
      html += `<a class="mnav__item${!route.a ? " is-active" : ""}" href="#/davcom"><span>Inicio</span></a>`;
      html += DATA.general
        .map(
          (g) =>
            `<a class="mnav__item${route.a === g.id ? " is-active" : ""}" href="#/davcom/${g.id}"><span>${esc(g.name)}</span></a>`
        )
        .join("");
      html += `</div><div class="mnav__group"><div class="mnav__label">Tipos de banner</div>`;
      html += DATA.banners
        .map(
          (b) =>
            `<a class="mnav__item${route.a === b.id ? " is-active" : ""}" href="#/davcom/${b.id}"><span class="dot" style="background:${b.color}"></span><span>${esc(b.name)}<small>${b.opciones.length > 1 ? plural(b.opciones.length, "opción", "opciones") : esc(b.alias || b.cms)}</small></span></a>`
        )
        .join("");
      html += "</div>";
    }

    els.nav.innerHTML = html;
    const input = document.getElementById("davcom-search");
    input.addEventListener("input", (e) => {
      state.search = e.target.value;
      const pos = e.target.selectionStart;
      renderNav(route);
      const again = document.getElementById("davcom-search");
      again.focus();
      again.setSelectionRange(pos, pos);
    });
  }

  // ───────────── bloques reutilizables ─────────────
  const card = (title, body, cls = "") =>
    `<section class="mcard ${cls}"><h3 class="mcard__title">${esc(title)}</h3>${body}</section>`;

  const bulletList = (items) => `<ul class="mlist">${items.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;

  const specList = (rows) =>
    `<dl class="spec">${rows
      .map(([k, v]) => `<div class="spec__row"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`)
      .join("")}</dl>`;

  function visualStrip(imgs, name) {
    return `<div class="visuals">${imgs
      .map(
        (im) =>
          `<figure class="dvis"><button type="button" class="visual" data-src="${IMG_DIR}${im.src}" style="--ar:${im.w / im.h}" aria-label="Ampliar ${esc(name)}, ${esc(im.label || "")}"><img src="${IMG_DIR}${im.src}" width="${im.w}" height="${im.h}" alt="${esc(name)}: ${esc(im.label || "ejemplo")}" loading="lazy" /></button>${im.label ? `<figcaption>${esc(im.label)}</figcaption>` : ""}</figure>`
      )
      .join("")}</div>`;
  }

  // Partes numeradas tal como aparecen marcadas sobre las capturas de la presentación
  const partsList = (partes) =>
    `<ol class="dparts">${partes
      .map(([n, d], i) => `<li><span class="dparts__n">${i + 1}</span><strong>${esc(n)}</strong><em>${esc(d)}</em></li>`)
      .join("")}</ol>`;

  function dosDonts(dos, donts) {
    const col = (kind, title, items) =>
      `<div class="uso uso--${kind}">
        <div class="uso__head"><span class="uso__badge">${icon[kind === "ok" ? "check" : "x"]}</span>${title}</div>
        <ul class="dlist">${items.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
      </div>`;
    return `<div class="usos">${col("ok", "Do’s", dos)}${col("no", "Don’ts", donts)}</div>`;
  }

  const slideSrc = (n) => `${SLIDE_DIR}lamina-${String(n).padStart(2, "0")}.jpg`;

  function gallery(slides, name) {
    return `<div class="gallery">${slides
      .map(
        (n) =>
          `<button type="button" class="gallery__item" data-src="${slideSrc(n)}" aria-label="Ampliar lámina ${n}"><img src="${slideSrc(n)}" alt="Lámina ${n} de la presentación: ${esc(name)}" loading="lazy" /><span>Lámina ${n}</span></button>`
      )
      .join("")}</div>`;
  }

  const pagesChips = (b) =>
    `<div class="dpages">${b.paginas.map((p) => `<span class="chip">${esc(p)}</span>`).join("")}</div>`;

  // ───────────── ficha de un banner ─────────────
  function bannerPanel(b, o) {
    const chips = [
      ["Desktop 3X", o.imagen.desktop[1]],
      ["Mobile 3X", o.imagen.mobile[1]],
      ...DATA.exportacion.slice(0, 2),
    ]
      .map(([k, v]) => `<span class="chip"><b>${esc(k)}</b> ${esc(v)}</span>`)
      .join("");

    const cards = [];
    if (o.visuales.length) cards.push(card("Referencias visuales", visualStrip(o.visuales, label(b, o)), "mcard--wide mcard--visuals"));
    cards.push(
      card(
        "Descripción",
        `<p class="mtext">${esc(b.descripcion)}</p><h4 class="msub">Dónde aparece</h4>${pagesChips(b)}`,
        "mcard--wide"
      )
    );
    cards.push(card("Partes", partsList(o.partes)));
    cards.push(
      card(
        "Imagen",
        specList([
          ["Desktop 1X", o.imagen.desktop[0]],
          ["Desktop 3X", o.imagen.desktop[1]],
          ["Mobile 1X", o.imagen.mobile[0]],
          ["Mobile 3X", o.imagen.mobile[1]],
          ...DATA.exportacion,
        ]) + (o.imagenNota ? `<p class="mtext dnote">${esc(o.imagenNota)}</p>` : "")
      )
    );
    if (o.caracteres) cards.push(card("Caracteres máximos", specList(o.caracteres), "mcard--wide"));
    if (o.dos) cards.push(card("Do’s y don’ts", dosDonts(o.dos, o.donts), "mcard--wide"));
    if (o.recomendaciones) {
      const r = o.recomendaciones;
      cards.push(
        card(
          "Recomendaciones de uso",
          `<div class="drec">${visualStrip([{ ...r.img, label: "" }], `${b.name}, recomendaciones de uso`)}<div class="uso uso--no"><div class="uso__head"><span class="uso__badge">${icon.x}</span>Evitar</div><ul class="dlist">${r.donts
            .map((t) => `<li>${esc(t)}</li>`)
            .join("")}</ul></div></div>`,
          "mcard--wide"
        )
      );
    }
    if (o.notas) cards.push(card("Notas", bulletList(o.notas), "mcard--wide mcard--note"));

    const isLam = state.tab === "laminas" && o.slides.length > 0;
    return `
      <header class="fhead">
        <div class="fhead__title">
          <span class="fhead__plat"><span class="dot" style="background:${b.color}"></span>${esc(b.name)}</span>
          <h2>${esc(b.opciones.length > 1 ? `${o.name}: ${o.sub}` : b.alias || b.name)}</h2>
        </div>
        ${
          o.plantilla
            ? `<div class="fhead__actions"><a class="btn btn--primary" href="${esc(o.plantilla)}" target="_blank" rel="noopener">${icon.download} Descargar plantilla</a></div>`
            : ""
        }
        <div class="fhead__chips">${chips}</div>
      </header>
      <div class="stabs" role="tablist" aria-label="Vista del banner">
        <button type="button" role="tab" class="stabs__btn${!isLam ? " is-active" : ""}" data-tab="ficha" aria-selected="${!isLam}">Ficha</button>
        ${o.slides.length ? `<button type="button" role="tab" class="stabs__btn${isLam ? " is-active" : ""}" data-tab="laminas" aria-selected="${isLam}">Láminas originales <span class="count">${o.slides.length}</span></button>` : ""}
      </div>
      ${isLam ? gallery(o.slides, label(b, o)) : `<div class="mgrid dgrid">${cards.join("")}</div>`}`;
  }

  function renderBanner(b, optId) {
    const o = b.opciones.find((x) => x.id === optId) || b.opciones[0];
    const i = sequence.findIndex((s) => s.o === o);
    const prev = sequence[i - 1];
    const next = sequence[i + 1];

    const tabs =
      b.opciones.length > 1
        ? `<div class="ftabs" role="tablist" aria-label="Opciones de ${esc(b.name)}">${b.opciones
            .map(
              (x) =>
                `<a role="tab" class="ftab${x === o ? " is-active" : ""}" aria-selected="${x === o}" href="${href(b, x)}" style="--c:${b.color}">${esc(x.name)}</a>`
            )
            .join("")}</div>`
        : "";

    els.content.innerHTML = `
      <nav class="crumbs" aria-label="Ruta"><a href="#/davcom">dav.com</a><span>/</span>${
        b.opciones.length > 1 ? `${esc(b.name)}<span>/</span><strong>${esc(o.name)}</strong>` : `<strong>${esc(b.name)}</strong>`
      }</nav>
      <div class="platform-head" style="--c:${b.color}">
        <div><h1>${esc(b.name)}</h1><p>${[b.alias && esc(b.alias), b.cms && `${esc(b.cms)} en el CMS`].filter(Boolean).join(" · ")}${
      b.opciones.length > 1 ? ` · ${plural(b.opciones.length, "opción", "opciones")}` : ""
    }</p></div>
      </div>
      ${tabs}
      <div class="fpanel" id="davcom-panel">${bannerPanel(b, o)}</div>
      <div class="pager">
        ${prev ? `<a class="pager__link" href="${href(prev.b, prev.o)}">${icon.arrowL}<span><small>Anterior</small>${esc(label(prev.b, prev.o))}</span></a>` : "<span></span>"}
        ${next ? `<a class="pager__link pager__link--next" href="${href(next.b, next.o)}"><span><small>Siguiente</small>${esc(label(next.b, next.o))}</span>${icon.arrowR}</a>` : ""}
      </div>`;
  }

  // ───────────── generalidades ─────────────
  function contextMatrix() {
    const head = PAGINAS.map((p) => `<th scope="col">${esc(p)}</th>`).join("");
    const rows = DATA.banners
      .map(
        (b, i) =>
          `<tr><th scope="row"><a href="#/davcom/${b.id}"><span class="dparts__n" style="background:${b.color}">${i + 1}</span>${esc(b.name)}</a></th>${PAGINAS.map(
            (p) =>
              `<td>${enPagina(b, p) ? `<span class="uso__badge uso__badge--sm dmatrix__yes" aria-label="Sí">${icon.check}</span>` : `<span class="dmatrix__no" aria-label="No">–</span>`}</td>`
          ).join("")}</tr>`
      )
      .join("");
    return `<div class="dmatrix"><table><thead><tr><th scope="col">Banner</th>${head}</tr></thead><tbody>${rows}</tbody></table></div>
      <p class="fine">Hero Banner y Mini Banner solo van en Home, home de producto y producto; Banner Medium y Banner Small pueden usarse en todas las páginas del portal.</p>`;
  }

  function renderGeneral(g) {
    let body = "";
    if (g.id === "contexto") {
      body = `<p class="lead">${esc(g.intro)}</p>${contextMatrix()}
        <h3 class="msub msub--lg">Jerarquía</h3>
        <div class="tone">${DATA.banners
          .map((b) => `<article class="tone__card"><h3>${esc(b.name)}</h3><p>${esc(b.descripcion)}</p></article>`)
          .join("")}</div>`;
    } else if (g.reglas) {
      body = `<div class="tone">${g.reglas
        .map(
          (r, i) =>
            `<article class="tone__card"><h3><span class="dparts__n">${i + 1}</span> ${esc(r.titulo)}</h3>${r.texto ? `<p>${esc(r.texto)}</p>` : bulletList(r.lista)}</article>`
        )
        .join("")}</div>
        <h3 class="msub msub--lg">Exportación de imágenes (todos los banners)</h3>
        <div class="mcard">${specList(DATA.exportacion)}</div>`;
    }

    els.content.innerHTML = `
      <nav class="crumbs" aria-label="Ruta"><a href="#/davcom">dav.com</a><span>/</span><strong>${esc(g.name)}</strong></nav>
      <div class="platform-head" style="--c:#ed1c27"><div><h1>${esc(g.name)}</h1><p>Generalidades de banners</p></div></div>
      <div class="general">${body}</div>`;
  }

  // ───────────── inicio ─────────────
  function renderHome() {
    els.content.innerHTML = `
      <div class="hero">
        <p class="hero__eyebrow">Davivienda · davivienda.com</p>
        <h1>Banners Davicom</h1>
        <p>Usos y experiencia de los banners del portal: dónde aparece cada uno, sus partes, medidas de imagen, límites de caracteres y qué hacer y qué no.</p>
        <div class="hero__stats"><span><b>${DATA.banners.length}</b> tipos de banner</span><span><b>${totalOpciones}</b> variantes</span><span><b>${DATA.general.length}</b> guías generales</span></div>
      </div>
      <h2 class="msub msub--lg">Generalidades</h2>
      <div class="tiles">${DATA.general
        .map((g) => `<a class="tile" href="#/davcom/${g.id}"><strong>${esc(g.name)}</strong><span>Ver guía</span></a>`)
        .join("")}</div>
      <h2 class="msub msub--lg">Tipos de banner</h2>
      <div class="tiles">${DATA.banners
        .map(
          (b) =>
            `<a class="tile tile--plat" href="#/davcom/${b.id}" style="--c:${b.color}"><span class="dot" style="background:${b.color}"></span><strong>${esc(b.name)}</strong><span>${esc(b.cms || b.paginas.join(", "))}</span><em>${b.opciones.length > 1 ? b.opciones.map((o) => esc(o.sub)).join(" · ") : esc(b.alias)}</em></a>`
        )
        .join("")}</div>
      <p class="fine">Contenido tomado de la presentación <em>Banners Davicom · Usos y experiencia</em>.</p>`;
  }

  // ───────────── lightbox ─────────────
  els.content.addEventListener("click", (e) => {
    const tab = e.target.closest(".stabs__btn");
    if (tab) {
      state.tab = tab.dataset.tab;
      const r = state.route;
      const banner = bannerById[r.a];
      document.getElementById("davcom-panel").innerHTML = bannerPanel(
        banner,
        banner.opciones.find((x) => x.id === r.b) || banner.opciones[0]
      );
      return;
    }
    const b = e.target.closest("button.visual, .gallery__item");
    if (!b) return;
    els.lightboxImg.src = b.dataset.src;
    els.lightbox.hidden = false;
    els.lightbox.scrollTop = 0;
    document.body.classList.add("no-scroll");
  });

  // route = { a, b } tomado del hash #/davcom/<a>/<b>
  function render(route) {
    // Cada cambio de banner u opción vuelve a la pestaña Ficha
    const key = `${route.a || ""}/${route.b || ""}`;
    if (key !== state.key) state.tab = "ficha";
    state.key = key;
    state.route = route;
    renderNav(route);
    if (bannerById[route.a]) renderBanner(bannerById[route.a], route.b);
    else if (generalById[route.a]) renderGeneral(generalById[route.a]);
    else renderHome();
  }

  window.DavcomView = { render };
})();
