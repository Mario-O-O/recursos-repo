(function () {
  "use strict";

  const DATA = window.MANUAL;
  const SLIDE_DIR = "manual/slides/";

  const els = {
    recursos: document.getElementById("view-recursos"),
    marca: document.getElementById("view-marca"),
    manual: document.getElementById("view-manual"),
    nav: document.getElementById("manual-nav"),
    content: document.getElementById("manual-content"),
    footer: document.querySelector(".site-footer"),
    links: document.querySelectorAll(".main-nav__link"),
    toast: document.getElementById("toast"),
    lightbox: document.getElementById("lightbox"),
    lightboxImg: document.getElementById("lightbox-img"),
  };

  const state = { search: "", tab: "ficha" };

  // Titular y subtítulo del encabezado según la sección activa
  const HEADERS = {
    recursos: { title: "Iconos", subtitle: "Iconos de línea, Davivienda y 3D, personalizables y listos para descargar" },
    marca: { title: "Logos y marca", subtitle: "Logos, submarcas, cierres y gráficos del ToolKit general de marca" },
    manual: { title: "Manual de comunicación", subtitle: "Formatos publicitarios por plataforma, requisitos técnicos y uso de legales" },
  };

  // ───────────── helpers ─────────────
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const linkify = (s) =>
    esc(s).replace(/(https?:\/\/[^\s<]+[^\s<.,;)])/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');

  const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

  function toast(message) {
    els.toast.textContent = message;
    els.toast.classList.add("is-visible");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => els.toast.classList.remove("is-visible"), 1800);
  }

  const IMG_DIR = "manual/img/";
  function imagesFor(slides, exclude = []) {
    const seen = new Set();
    const out = [];
    slides.forEach((n) =>
      ((window.MANUAL_IMAGES || {})[n] || []).forEach((im) => {
        if (seen.has(im.id) || exclude.includes(im.src)) return;
        seen.add(im.id);
        out.push(im);
      })
    );
    return out;
  }

  function visualStrip(imgs, name, cls = "") {
    if (!imgs.length) return "";
    return `<div class="visuals ${cls}">${imgs
      .map(
        (im, i) =>
          `<button type="button" class="visual" data-src="${IMG_DIR}${im.src}" style="--ar:${im.w / im.h}" aria-label="Ampliar imagen ${i + 1}"><img src="${IMG_DIR}${im.src}" width="${im.w}" height="${im.h}" alt="${esc(name)}, ejemplo ${i + 1}" loading="lazy" /></button>`
      )
      .join("")}</div>`;
  }

  const slideSrc = (n) => `${SLIDE_DIR}lamina-${String(n).padStart(2, "0")}.jpg`;

  const icon = {
    download:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    check:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    arrowL:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
    arrowR:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
  };

  // ───────────── modelo de navegación ─────────────
  const generalItems = DATA.general.map((g) => ({ ...g, group: "general" }));
  const platformById = Object.fromEntries(DATA.plataformas.map((p) => [p.id, p]));
  const generalById = Object.fromEntries(generalItems.map((g) => [g.id, g]));

  function parseHash() {
    const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    const view = ["manual", "marca"].includes(parts[0]) ? parts[0] : "recursos";
    return { view, a: parts[1], b: parts[2] };
  }

  // ───────────── índice lateral ─────────────
  function renderNav(route) {
    const q = norm(state.search.trim());
    let html = `
      <div class="mnav__search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>
        <input type="search" id="manual-search" placeholder="Buscar formato o plataforma…" value="${esc(state.search)}" autocomplete="off" />
      </div>`;

    if (q) {
      const hits = [];
      generalItems.forEach((g) => {
        if (norm(g.name).includes(q)) hits.push({ href: `#/manual/${g.id}`, title: g.name, sub: "Generalidades" });
      });
      DATA.plataformas.forEach((p) => {
        const platMatch = norm(p.name + " " + p.sub).includes(q);
        p.formatos.forEach((f) => {
          if (platMatch || norm(f.name).includes(q))
            hits.push({ href: `#/manual/${p.id}/${f.id}`, title: f.name, sub: p.name, color: p.color });
        });
      });
      html += `<div class="mnav__group"><div class="mnav__label">${hits.length} resultado${hits.length === 1 ? "" : "s"}</div>`;
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
      html += `<a class="mnav__item${!route.a ? " is-active" : ""}" href="#/manual"><span>Inicio</span></a>`;
      html += generalItems
        .map(
          (g) =>
            `<a class="mnav__item${route.a === g.id ? " is-active" : ""}" href="#/manual/${g.id}"><span>${esc(g.name)}</span></a>`
        )
        .join("");
      html += `</div><div class="mnav__group"><div class="mnav__label">Plataformas y formatos</div>`;
      html += DATA.plataformas
        .map(
          (p) =>
            `<a class="mnav__item${route.a === p.id ? " is-active" : ""}" href="#/manual/${p.id}"><span class="dot" style="background:${p.color}"></span><span>${esc(p.name)}<small>${p.formatos.length} formato${p.formatos.length === 1 ? "" : "s"}</small></span></a>`
        )
        .join("");
      html += "</div>";
    }

    els.nav.innerHTML = html;
    const input = document.getElementById("manual-search");
    input.addEventListener("input", (e) => {
      state.search = e.target.value;
      const pos = e.target.selectionStart;
      renderNav(parseHash());
      const again = document.getElementById("manual-search");
      again.focus();
      again.setSelectionRange(pos, pos);
    });
  }

  // ───────────── bloques reutilizables ─────────────
  const card = (title, body, cls = "") =>
    `<section class="mcard ${cls}"><h3 class="mcard__title">${esc(title)}</h3>${body}</section>`;

  const bulletList = (items) =>
    `<ul class="mlist">${items.map((t) => `<li>${linkify(t)}</li>`).join("")}</ul>`;

  // Marca con ✓ / ✗ las indicaciones que son una instrucción de qué hacer y qué no hacer
  function markedList(items) {
    return `<ul class="mlist mlist--marks">${items
      .map((t) => {
        const no = /^(No colocar|Nunca|No utilizar|No incluir)/.test(t);
        const ok = /^(Dejar un margen|El contenido principal)/.test(t);
        const kind = no ? "no" : ok ? "ok" : "";
        return `<li${kind ? ` class="mark mark--${kind}"` : ""}>${kind ? `<span class="uso__badge uso__badge--sm">${MARK[kind]}</span>` : ""}${linkify(t)}</li>`;
      })
      .join("")}</ul>`;
  }

  function specList(rows) {
    return `<dl class="spec">${rows
      .map(([k, v]) => `<div class="spec__row"><dt>${esc(k)}</dt><dd>${linkify(v)}</dd></div>`)
      .join("")}</dl>`;
  }

  function optimizableBlock(opt) {
    if (typeof opt === "string") return `<p class="mtext">${linkify(opt)}</p>`;
    return `<ul class="opt">${opt
      .map(
        (o) =>
          `<li class="opt__item"><span class="opt__badge ${o.ok ? "is-ok" : "is-no"}">${o.ok ? icon.check : "×"}</span><div><strong>${esc(o.nombre)}</strong><p>${esc(o.detalle)}</p></div></li>`
      )
      .join("")}</ul>`;
  }

  const MARK = {
    ok: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    no: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  };

  function usosBlock(u, name) {
    const col = (kind, label, d) =>
      `<div class="uso uso--${kind}">
        <div class="uso__head"><span class="uso__badge">${MARK[kind]}</span>${label}</div>
        <p>${esc(d.texto)}</p>
        <div class="uso__imgs">${d.imgs
          .map(
            (n, i) =>
              `<button type="button" class="uso__img" data-src="${IMG_DIR}${n}.webp" aria-label="Ampliar ejemplo ${label.toLowerCase()} ${i + 1}"><img src="${IMG_DIR}${n}.webp" alt="${esc(name)}: ejemplo ${label.toLowerCase()} ${i + 1}" loading="lazy" /><span class="uso__badge uso__badge--sm">${MARK[kind]}</span></button>`
          )
          .join("")}</div>
      </div>`;
    return `<div class="usos">${col("ok", "Uso correcto", u.ok)}${col("no", "Uso incorrecto", u.no)}</div>`;
  }

  function stepsBlock(pasos) {
    return `<ol class="steps">${pasos
      .map((p) => `<li><strong>${esc(p.titulo)}</strong><p>${linkify(p.texto)}</p></li>`)
      .join("")}</ol>`;
  }

  function blocksBlock(bloques) {
    return `<div class="addons">${bloques
      .map(
        (b) =>
          `<div class="addon"><h4>${esc(b.titulo)}</h4><p>${linkify(b.texto)}</p>${
            b.enlace ? `<a class="btn-link" href="${esc(b.enlace)}" target="_blank" rel="noopener">Ver guía ${icon.ext}</a>` : ""
          }</div>`
      )
      .join("")}</div>`;
  }

  function gallery(slides, name) {
    return `<div class="gallery">${slides
      .map(
        (n) =>
          `<button type="button" class="gallery__item" data-slide="${n}" aria-label="Ampliar lámina ${n}"><img src="${slideSrc(n)}" alt="Lámina ${n} del manual: ${esc(name)}" loading="lazy" /><span>Lámina ${n}</span></button>`
      )
      .join("")}</div>`;
  }

  // ───────────── ficha de un formato ─────────────
  function formatHeader(plat, f) {
    const chips = (f.requisitos || [])
      .slice(0, 3)
      .map(([k, v]) => `<span class="chip"><b>${esc(k)}</b> ${esc(v.split("·")[0].split(/\.\s/)[0].trim())}</span>`)
      .join("");
    return `
      <header class="fhead">
        <div class="fhead__title">
          <span class="fhead__plat" style="--c:${plat.color}"><span class="dot" style="background:${plat.color}"></span>${esc(plat.name)}</span>
          <h2>${esc(f.name)}</h2>
        </div>
        <div class="fhead__actions">
          ${
            f.plantilla
              ? `<a class="btn btn--primary" href="${esc(f.plantilla)}" target="_blank" rel="noopener">${icon.download} Descargar plantilla</a>`
              : ""
          }
        </div>
        ${chips ? `<div class="fhead__chips">${chips}</div>` : ""}
      </header>`;
  }

  function fichaBody(f) {
    if (f.pendiente && !f.objetivo) {
      return `<div class="pending">
        <strong>Contenido pendiente</strong>
        <p>Este formato ya tiene lámina en el manual, pero todavía no se han definido su objetivo, requisitos técnicos ni recomendaciones de copy. Mientras tanto puedes ver la lámina original en la pestaña <em>Láminas</em>.</p>
        ${f.requisitos ? `<div class="pending__spec">${specList(f.requisitos)}</div>` : ""}
      </div>${imagesFor(f.slides).length ? card("Referencias visuales", visualStrip(imagesFor(f.slides), f.name), "mcard--wide") : ""}`;
    }
    const cards = [];
    const imgs = imagesFor(f.slides, f.sinVisuales);
    if (imgs.length) cards.push(card("Referencias visuales", visualStrip(imgs, f.name), "mcard--wide mcard--visuals"));
    if (f.usos) cards.push(card("Uso correcto e incorrecto", usosBlock(f.usos, f.name), "mcard--wide"));
    if (f.objetivo) {
      let b = `<p class="mtext">${linkify(f.objetivo)}</p>`;
      if (f.comoFunciona) b += `<h4 class="msub">Cómo funciona</h4><p class="mtext">${linkify(f.comoFunciona)}</p>`;
      cards.push(card("Objetivo del formato", b, "mcard--wide"));
    }
    if (f.requisitos) cards.push(card("Requisitos técnicos", specList(f.requisitos)));
    if (f.copy) cards.push(card("Recomendaciones de copy", specList(f.copy)));
    if (f.marca || f.legales) {
      const items = [...(f.marca || []), ...(f.legales || [])];
      cards.push(card("Marca y legales", bulletList(items)));
    }
    if (f.zona) cards.push(card("Zona segura y CTA", markedList(f.zona)));
    if (f.pasos) cards.push(card("Proceso paso a paso", stepsBlock(f.pasos), "mcard--wide"));
    if (f.bloques) cards.push(card("Opciones disponibles", blocksBlock(f.bloques), "mcard--wide"));
    if (f.notas) cards.push(card("Notas", bulletList(f.notas), "mcard--note"));
    if (f.optimizable) cards.push(card("¿Es un formato optimizable?", optimizableBlock(f.optimizable)));
    if (f.entrega) cards.push(card("Entrega de material", bulletList(f.entrega)));
    return `<div class="mgrid">${cards.join("")}</div>`;
  }

  function formatPanel(plat, f) {
    const isLam = state.tab === "laminas";
    return `
      ${formatHeader(plat, f)}
      <div class="stabs" role="tablist" aria-label="Vista del formato">
        <button type="button" role="tab" class="stabs__btn${!isLam ? " is-active" : ""}" data-tab="ficha" aria-selected="${!isLam}">Ficha</button>
        <button type="button" role="tab" class="stabs__btn${isLam ? " is-active" : ""}" data-tab="laminas" aria-selected="${isLam}">Láminas originales <span class="count">${f.slides.length}</span></button>
      </div>
      ${isLam ? gallery(f.slides, `${plat.name} ${f.name}`) : fichaBody(f)}`;
  }

  // ───────────── plataforma ─────────────
  function renderPlatform(plat, formatId) {
    const f = plat.formatos.find((x) => x.id === formatId) || plat.formatos[0];
    const idx = plat.formatos.indexOf(f);
    const prev = plat.formatos[idx - 1];
    const next = plat.formatos[idx + 1];

    const tabs = plat.formatos
      .map(
        (x) =>
          `<a role="tab" class="ftab${x === f ? " is-active" : ""}" aria-selected="${x === f}" href="#/manual/${plat.id}/${x.id}" style="--c:${plat.color}">${esc(x.name)}${x.pendiente && !x.objetivo ? '<i class="ftab__dot" title="Contenido pendiente"></i>' : ""}</a>`
      )
      .join("");

    els.content.innerHTML = `
      <nav class="crumbs" aria-label="Ruta"><a href="#/manual">Manual</a><span>/</span>${esc(plat.name)}<span>/</span><strong>${esc(f.name)}</strong></nav>
      <div class="platform-head" style="--c:${plat.color}">
        <div><h1>${esc(plat.name)}</h1><p>${esc(plat.sub)} · ${plat.formatos.length} formato${plat.formatos.length === 1 ? "" : "s"}</p></div>
      </div>
      <div class="ftabs" role="tablist" aria-label="Formatos de ${esc(plat.name)}">${tabs}</div>
      <div class="fpanel" id="fpanel">${formatPanel(plat, f)}</div>
      <div class="pager">
        ${prev ? `<a class="pager__link" href="#/manual/${plat.id}/${prev.id}">${icon.arrowL}<span><small>Anterior</small>${esc(prev.name)}</span></a>` : "<span></span>"}
        ${next ? `<a class="pager__link pager__link--next" href="#/manual/${plat.id}/${next.id}"><span><small>Siguiente</small>${esc(next.name)}</span>${icon.arrowR}</a>` : ""}
      </div>`;

    bindPanel(document.getElementById("fpanel"), plat, f);
  }

  function bindPanel(panel, plat, f) {
    panel.querySelectorAll(".stabs__btn").forEach((b) =>
      b.addEventListener("click", () => {
        state.tab = b.dataset.tab;
        panel.innerHTML = formatPanel(plat, f);
        bindPanel(panel, plat, f);
      })
    );
    panel.querySelectorAll(".gallery__item").forEach((b) =>
      b.addEventListener("click", () => openLightbox(slideSrc(b.dataset.slide)))
    );
    panel.querySelectorAll(".visual, .uso__img").forEach((b) => b.addEventListener("click", () => openLightbox(b.dataset.src)));
  }

  // ───────────── generalidades ─────────────
  function renderGeneral(g) {
    let body = "";
    if (g.id === "tono") {
      body = `
        <p class="lead">${esc(g.intro)}</p>
        <div class="tone">${g.reglas
          .map(
            (r) =>
              `<article class="tone__card"><h3>${esc(r.titulo)}</h3>${r.texto ? `<p>${esc(r.texto)}</p>` : bulletList(r.lista)}</article>`
          )
          .join("")}</div>
        <p class="highlight">${esc(g.destacado)}</p>`;
    } else if (g.id === "colores") {
      body = g.grupos
        .map(
          (gr) =>
            `<h3 class="msub">${esc(gr.titulo)}</h3><div class="swatches">${gr.colores
              .map((c) => swatch(c.hex, c.nombre))
              .join("")}</div>`
        )
        .join("");
      const pasos = g.escala.pasos
        .map((p) => {
          const hex = mix(g.escala.base, p);
          return `<button type="button" class="mini" data-hex="${hex}" style="background:${hex}" title="${p}% · ${hex}"><span>${p}%</span></button>`;
        })
        .join("");
      body += `<h3 class="msub">${esc(g.escala.titulo)}</h3><div class="scale">${pasos}<button type="button" class="mini mini--white" data-hex="#ffffff" title="Blanco · #ffffff"><span>Blanco</span></button></div>`;
      body += `<p class="callout">${esc(g.nota)}</p>`;
    } else if (g.bloques) {
      body = `<div class="tone">${g.bloques.map((b) => `<article class="tone__card"><h3>${esc(b.titulo)}</h3><p>${esc(b.texto)}</p></article>`).join("")}</div>`;
    } else if (g.intro) {
      body = `<p class="lead">${esc(g.intro)}</p>`;
    }

    els.content.innerHTML = `
      <nav class="crumbs" aria-label="Ruta"><a href="#/manual">Manual</a><span>/</span><strong>${esc(g.name)}</strong></nav>
      <div class="platform-head" style="--c:#ed1c27"><div><h1>${esc(g.name)}</h1><p>Generalidades de marca</p></div></div>
      <div class="general">${body}</div>
      ${g.usos ? `<h3 class="msub msub--lg">Uso correcto e incorrecto</h3>${usosBlock(g.usos, g.name)}` : ""}
      ${imagesFor(g.slides, g.sinVisuales).length ? visualStrip(imagesFor(g.slides, g.sinVisuales), g.name, "visuals--grid") : ""}`;

    els.content.querySelectorAll(".visual, .uso__img").forEach((b) => b.addEventListener("click", () => openLightbox(b.dataset.src)));
    els.content.querySelectorAll("[data-hex]").forEach((b) => b.addEventListener("click", () => copyHex(b.dataset.hex)));
  }

  function swatch(hex, nombre) {
    const light = luminance(hex) > 0.6;
    return `<button type="button" class="swatch${light ? " is-light" : ""}" data-hex="${hex}" style="background:${hex}" title="Copiar ${hex}"><span class="swatch__name">${esc(nombre)}</span><span class="swatch__hex">${hex}</span></button>`;
  }

  function luminance(hex) {
    const n = parseInt(hex.slice(1), 16);
    const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => v / 255);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  // Mezcla el color base con blanco (100% = base, 10% = casi blanco)
  function mix(base, pct) {
    const n = parseInt(base.slice(1), 16);
    const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) =>
      Math.round(v * (pct / 100) + 255 * (1 - pct / 100))
    );
    return "#" + ch.map((v) => v.toString(16).padStart(2, "0")).join("");
  }

  function copyHex(hex) {
    (navigator.clipboard ? navigator.clipboard.writeText(hex) : Promise.reject())
      .then(() => toast(`Copiado ${hex}`))
      .catch(() => toast(hex));
  }

  // ───────────── inicio del manual ─────────────
  function renderHome() {
    const total = DATA.plataformas.reduce((n, p) => n + p.formatos.length, 0);
    els.content.innerHTML = `
      <div class="hero">
        <p class="hero__eyebrow">Davivienda · 2025</p>
        <h1>Manual de comunicación digital</h1>
        <p>Guía de formatos publicitarios por plataforma: requisitos técnicos, zonas seguras, uso de legales, recomendaciones de copy y entrega de material.</p>
        <div class="hero__stats"><span><b>${DATA.plataformas.length}</b> plataformas</span><span><b>${total}</b> formatos</span><span><b>${DATA.general.length}</b> guías de marca</span></div>
      </div>
      <h2 class="msub msub--lg">Generalidades de marca</h2>
      <div class="tiles">${generalItems
        .map((g) => `<a class="tile" href="#/manual/${g.id}"><strong>${esc(g.name)}</strong><span>Ver guía</span></a>`)
        .join("")}</div>
      <h2 class="msub msub--lg">Plataformas</h2>
      <div class="tiles">${DATA.plataformas
        .map(
          (p) =>
            `<a class="tile tile--plat" href="#/manual/${p.id}" style="--c:${p.color}"><span class="dot" style="background:${p.color}"></span><strong>${esc(p.name)}</strong><span>${p.formatos.length} formato${p.formatos.length === 1 ? "" : "s"}</span><em>${p.formatos.slice(0, 3).map((f) => esc(f.name)).join(" · ")}${p.formatos.length > 3 ? "…" : ""}</em></a>`
        )
        .join("")}</div>
      <p class="fine">Contenido tomado de la presentación <em>Manual de comunicación digital</em>. Los formatos marcados con un punto están pendientes de completar en el manual original.</p>`;
  }

  // ───────────── lightbox ─────────────
  function openLightbox(src) {
    els.lightboxImg.src = src;
    els.lightbox.hidden = false;
    document.body.classList.add("no-scroll");
  }
  function closeLightbox() {
    els.lightbox.hidden = true;
    els.lightboxImg.removeAttribute("src");
    document.body.classList.remove("no-scroll");
  }
  els.lightbox.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !els.lightbox.hidden) closeLightbox();
  });

  // ───────────── router ─────────────
  let lastKey = "";
  // El índice (fixed) arranca a la misma altura que el primer bloque del contenido (hero)
  function alignManualNav() {
    if (els.manual.hidden) return;
    const first = els.content && els.content.firstElementChild;
    const target = first || els.content;
    if (!target) return;
    const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY);
    document.documentElement.style.setProperty("--manual-top", Math.round(top) + "px");
  }
  window.addEventListener("resize", alignManualNav);

  function route() {
    const r = parseHash();
    const isManual = r.view === "manual";
    els.recursos.hidden = r.view !== "recursos";
    els.marca.hidden = r.view !== "marca";
    els.manual.hidden = !isManual;
    if (els.footer) els.footer.hidden = r.view !== "recursos";
    els.links.forEach((l) => l.classList.toggle("is-active", l.dataset.view === r.view));
    const head = HEADERS[r.view];
    document.getElementById("site-title").textContent = head.title;
    document.getElementById("site-subtitle").textContent = head.subtitle;
    document.title = isManual
      ? "Manual de comunicación digital"
      : r.view === "marca"
      ? "Logos y marca"
      : "Iconos — descargables y personalizables";
    if (!isManual) return;

    renderNav(r);
    const key = `${r.a || ""}/${r.b || ""}`;
    const changed = key !== lastKey;
    if (changed) state.tab = "ficha";
    lastKey = key;

    if (platformById[r.a]) renderPlatform(platformById[r.a], r.b);
    else if (generalById[r.a]) renderGeneral(generalById[r.a]);
    else renderHome();

    if (changed) window.scrollTo({ top: 0 });
    alignManualNav();
  }

  window.addEventListener("hashchange", route);
  route();
})();
