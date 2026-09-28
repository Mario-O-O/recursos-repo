(function () {
  "use strict";

  const SVG_NS = "http://www.w3.org/2000/svg";

  // Las categorías las genera scripts/generate-manifest.js (window.RESOURCE_CATEGORIES)
  const CATEGORIES = window.RESOURCE_CATEGORIES || [
    { type: "icon", label: "Iconos (línea)", hint: "Añade tus SVG en /icons y corre el generador." },
    { type: "icon-3d", label: "Iconos 3D (PNG)", hint: "Añade tus PNG en /resources/png-3d y corre el generador." },
    { type: "logo", label: "Logos", hint: "Añade SVG o PNG en /resources/logos y corre el generador." },
  ];

  const state = {
    search: "",
    type: "all",
    color: "#0f172a",
    colorTouched: false, // hasta que el usuario elige un color, los recursos con brandColor usan el suyo
    strokeWidth: 1.5,
    fillMode: "outline", // 'outline' | 'fill'
    size: 24,
    marcaSize: 512, // lado mayor (px) de los PNG de logos y elementos de marca
  };

  const els = {
    grid: document.getElementById("grid"),
    emptyState: document.getElementById("empty-state"),
    stats: document.getElementById("stats"),
    search: document.getElementById("search"),
    typeFilter: document.getElementById("type-filter"),
    color: document.getElementById("color"),
    colorSwatch: document.getElementById("color-swatch"),
    stroke: document.getElementById("stroke"),
    strokeValue: document.getElementById("stroke-value"),
    fillMode: document.getElementById("fill-mode"),
    size: document.getElementById("size"),
    toast: document.getElementById("toast"),
  };

  const RESOURCES = window.RESOURCES || [];

  const fold = (t) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  function matchesSearch(resource, query) {
    if (!query) return true;
    const haystack = fold([resource.name, ...(resource.tags || [])].join(" "));
    return fold(query).split(/\s+/).every((w) => haystack.includes(w));
  }

  // Proporciones de salida: los iconos son cuadrados; los logos (wide) conservan su proporción
  function dimsFor(resource, size) {
    if (!resource.wide) return { w: size, h: size };
    const [, , vw, vh] = (resource.viewBox || "0 0 1 1").split(/\s+/).map(Number);
    return vw >= vh ? { w: size, h: Math.round((size * vh) / vw) } : { w: Math.round((size * vw) / vh), h: size };
  }

  function naturalMarkup(resource) {
    const [, , vw, vh] = resource.viewBox.split(/\s+/).map(Number);
    return `<svg xmlns="${SVG_NS}" viewBox="${resource.viewBox}" width="${Math.round(vw)}" height="${Math.round(vh)}">${resource.svg}</svg>`;
  }

  function fixedMarkup(resource, w, h) {
    return `<svg xmlns="${SVG_NS}" viewBox="${resource.viewBox}" width="${w}" height="${h}">${resource.svg}</svg>`;
  }

  // Dos catálogos comparten las tarjetas: "Recursos" (iconos, 3D, logos sueltos) y "Logos y marca" (ToolKit)
  const isMarca = (r) => r.type.startsWith("marca-");
  const catalogs = {
    recursos: {
      grid: els.grid,
      empty: els.emptyState,
      search: els.search,
      filter: els.typeFilter,
      cats: CATEGORIES.filter((c) => !c.type.startsWith("marca-")),
      scope: (r) => !isMarca(r),
      state: { search: "", type: "all" },
      emptyHint: "Sin iconos todavía.",
    },
    marca: {
      grid: document.getElementById("marca-grid"),
      empty: document.getElementById("marca-empty"),
      search: document.getElementById("marca-search"),
      filter: document.getElementById("marca-filter"),
      cats: CATEGORIES.filter((c) => c.type.startsWith("marca-")),
      scope: isMarca,
      state: { search: "", type: "all" },
      emptyHint: "Sin elementos todavía.",
    },
  };

  window.CATALOG_STATS = {
    recursos: RESOURCES.filter(catalogs.recursos.scope).length,
    marca: RESOURCES.filter(catalogs.marca.scope).length,
  };

  function filteredResources(cat) {
    return RESOURCES.filter((r) => {
      const typeOk = cat.state.type === "all" || r.type === cat.state.type;
      return cat.scope(r) && typeOk && matchesSearch(r, cat.state.search);
    });
  }

  function colorFor(resource) {
    return !state.colorTouched && resource.brandColor ? resource.brandColor : state.color;
  }

  function buildPreviewSvg(resource, { forDownload = false, size = 32 } = {}) {
    const color = colorFor(resource);
    const svgEl = document.createElementNS(SVG_NS, "svg");
    svgEl.setAttribute("viewBox", resource.viewBox || "0 0 24 24");
    svgEl.setAttribute("width", String(size));
    svgEl.setAttribute("height", String(size));

    if (resource.filled) {
      svgEl.setAttribute("fill", forDownload ? color : "currentColor");
      svgEl.setAttribute("stroke", "none");
      if (!forDownload) svgEl.style.color = color;
    } else if (resource.customizable) {
      const isFill = state.fillMode === "fill";
      svgEl.setAttribute("fill", isFill ? (forDownload ? color : "currentColor") : "none");
      svgEl.setAttribute("stroke", forDownload ? color : "currentColor");
      svgEl.setAttribute("stroke-width", String(state.strokeWidth));
      svgEl.setAttribute("stroke-linecap", "round");
      svgEl.setAttribute("stroke-linejoin", "round");
      if (!forDownload) svgEl.style.color = color;
    } else {
      svgEl.setAttribute("xmlns", SVG_NS);
    }

    svgEl.innerHTML = resource.svg || "";
    return svgEl;
  }

  function serializeForDownload(resource, size) {
    const svgEl = buildPreviewSvg(resource, { forDownload: true, size });
    svgEl.setAttribute("xmlns", SVG_NS);
    return svgEl.outerHTML;
  }

  function iconEl(name) {
    const icons = {
      download: '<path d="M12 3v12"></path><path d="M7 10l5 5 5-5"></path><path d="M5 21h14"></path>',
      image: '<path d="M4 5h16v14H4z"></path><circle cx="9" cy="10" r="1.5"></circle><path d="M4 17l5-5 4 4 3-3 4 4"></path>',
      copy: '<path d="M9 9h11v11H9z"></path><path d="M5 15V4h11"></path>',
    };
    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.innerHTML = icons[name] || "";
    return svg;
  }

  function showToast(message) {
    els.toast.textContent = message;
    els.toast.classList.add("is-visible");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => els.toast.classList.remove("is-visible"), 1800);
  }

  function triggerDownload(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function downloadSVG(resource) {
    if (resource.format !== "svg") return downloadOriginal(resource);
    const markup = resource.customizable
      ? serializeForDownload(resource, state.size)
      : resource.wide
      ? naturalMarkup(resource)
      : fixedMarkup(resource, state.size, state.size);
    const blob = new Blob([markup], { type: "image/svg+xml" });
    triggerDownload(blob, `${resource.id}.svg`);
    showToast(`Descargado ${resource.name}.svg`);
  }

  function downloadPNG(resource) {
    const px = resource.wide ? state.marcaSize : state.size;
    const { w, h } = dimsFor(resource, px);
    const markup = resource.format === "svg"
      ? (resource.customizable
          ? serializeForDownload(resource, state.size)
          : fixedMarkup(resource, w, h))
      : null;

    if (!markup) return downloadOriginal(resource);

    const svgBlob = new Blob([markup], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      canvas.toBlob((blob) => {
        triggerDownload(blob, `${resource.id}.png`);
        showToast(`Descargado ${resource.name}.png`);
      }, "image/png");
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      showToast("No se pudo generar el PNG");
    };
    img.src = url;
  }

  function downloadOriginal(resource) {
    const a = document.createElement("a");
    a.href = resource.path;
    a.download = resource.path.split("/").pop();
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast(`Descargando ${resource.name}...`);
  }

  function copySVGCode(resource) {
    const markup = resource.customizable
      ? serializeForDownload(resource, state.size)
      : resource.wide
      ? naturalMarkup(resource)
      : fixedMarkup(resource, state.size, state.size);
    navigator.clipboard
      .writeText(markup)
      .then(() => showToast("SVG copiado al portapapeles"))
      .catch(() => showToast("No se pudo copiar"));
  }

  function buildCard(resource) {
    const card = document.createElement("div");
    card.className = "card";

    const interactive = resource.customizable || resource.wide;
    if (resource.wide) card.classList.add("card--wide");

    if (!interactive) {
      const badge = document.createElement("span");
      badge.className = "card__badge";
      badge.textContent = resource.format === "png" ? "PNG" : "fijo";
      card.appendChild(badge);
    }

    const preview = document.createElement("div");
    preview.className = "card__preview";
    if (resource.previewBg) {
      preview.style.background = resource.previewBg;
      preview.classList.add("card__preview--bg");
    }
    if (resource.format === "png") {
      const img = document.createElement("img");
      img.src = resource.path;
      img.alt = resource.name;
      img.loading = "lazy";
      preview.appendChild(img);
    } else {
      preview.appendChild(buildPreviewSvg(resource, { size: 32 }));
    }
    card.appendChild(preview);

    const name = document.createElement("div");
    name.className = "card__name";
    name.textContent = resource.name;
    card.appendChild(name);

    const actions = document.createElement("div");
    actions.className = "card__actions";

    if (interactive) {
      card.classList.add("card--clickable");
      card.title = "Descargar SVG";
      card.addEventListener("click", () => downloadSVG(resource));

      const downloadCorner = document.createElement("span");
      downloadCorner.className = "card__download";
      downloadCorner.appendChild(iconEl("download"));
      card.appendChild(downloadCorner);

      const btnPng = document.createElement("button");
      btnPng.type = "button";
      btnPng.title = "Descargar PNG";
      btnPng.appendChild(iconEl("image"));
      btnPng.addEventListener("click", (e) => {
        e.stopPropagation();
        downloadPNG(resource);
      });
      actions.appendChild(btnPng);

      const btnCopy = document.createElement("button");
      btnCopy.type = "button";
      btnCopy.title = "Copiar código SVG";
      btnCopy.appendChild(iconEl("copy"));
      btnCopy.addEventListener("click", (e) => {
        e.stopPropagation();
        copySVGCode(resource);
      });
      actions.appendChild(btnCopy);
    } else {
      const btnSvg = document.createElement("button");
      btnSvg.type = "button";
      btnSvg.title = resource.format === "svg" ? "Descargar SVG" : "Descargar original";
      btnSvg.appendChild(iconEl("download"));
      btnSvg.addEventListener("click", () => downloadSVG(resource));
      actions.appendChild(btnSvg);
    }

    card.appendChild(actions);
    return card;
  }

  function buildPlaceholderCard(hint) {
    const card = document.createElement("div");
    card.className = "card placeholder-card";
    card.textContent = hint;
    return card;
  }

  function render() {
    renderCatalog(catalogs.recursos);
    els.stats.textContent = `${window.CATALOG_STATS.recursos} iconos en total`;
    document.getElementById("marca-stats").textContent = `${window.CATALOG_STATS.marca} logos y elementos en total`;
  }

  function renderCatalog(cat) {
    const grid = cat.grid;
    const items = filteredResources(cat);
    const { search, type } = cat.state;
    grid.innerHTML = "";

    if (type === "all") {
      let anyVisible = false;
      let lastGroup = null;
      for (const c of cat.cats) {
        const catItems = items.filter((r) => r.type === c.type);
        if (search && catItems.length === 0) continue;
        if (c.group && c.group !== lastGroup) {
          lastGroup = c.group;
          const gh = document.createElement("div");
          gh.className = "group-heading";
          gh.textContent = c.group;
          grid.appendChild(gh);
        }
        const heading = document.createElement("div");
        heading.className = "category-heading";
        heading.innerHTML = `${c.label} <span class="category-heading__count">(${catItems.length})</span>`;
        grid.appendChild(heading);

        if (catItems.length === 0) {
          grid.appendChild(buildPlaceholderCard(c.hint));
        } else {
          anyVisible = true;
          catItems.forEach((r) => grid.appendChild(buildCard(r)));
        }
      }
      cat.empty.hidden = anyVisible || search === "";
    } else {
      if (items.length === 0) {
        const c = cat.cats.find((x) => x.type === type);
        grid.appendChild(buildPlaceholderCard(c ? c.hint : cat.emptyHint));
      } else {
        items.forEach((r) => grid.appendChild(buildCard(r)));
      }
      cat.empty.hidden = true;
    }
  }

  // Wiring
  // Select agrupado por "tablero" (p. ej. Iconos / Logos Davivienda y productos / Aliados…)
  function buildTypeFilter(cat) {
    let html = '<option value="all">Todos</option>';
    let group = null;
    cat.cats.forEach((c) => {
      const g = c.group || "";
      if (g !== group) {
        if (group !== null) html += "</optgroup>";
        if (g) html += `<optgroup label="${g}">`;
        group = g;
      }
      html += `<option value="${c.type}">${c.label}</option>`;
    });
    if (group) html += "</optgroup>";
    cat.filter.innerHTML = html;
  }

  Object.values(catalogs).forEach((cat) => {
    buildTypeFilter(cat);
    cat.search.addEventListener("input", (e) => {
      cat.state.search = e.target.value.trim();
      renderCatalog(cat);
    });
    cat.filter.addEventListener("change", (e) => {
      cat.state.type = e.target.value;
      renderCatalog(cat);
    });
  });

  document.getElementById("marca-size").addEventListener("change", (e) => {
    state.marcaSize = parseInt(e.target.value, 10);
  });

  els.color.addEventListener("input", (e) => {
    let v = e.target.value.trim();
    if (v && v[0] !== "#") v = "#" + v;
    const ok = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v);
    els.color.classList.toggle("is-invalid", !ok);
    if (!ok) return;
    state.color = v.length === 4 ? "#" + [...v.slice(1)].map((c) => c + c).join("") : v.toLowerCase();
    state.colorTouched = true;
    els.colorSwatch.style.background = state.color;
    render();
  });
  els.color.addEventListener("blur", () => {
    els.color.value = state.color;
    els.color.classList.remove("is-invalid");
  });

  els.stroke.addEventListener("input", (e) => {
    state.strokeWidth = parseFloat(e.target.value);
    els.strokeValue.textContent = state.strokeWidth;
    render();
  });

  els.fillMode.addEventListener("click", (e) => {
    const btn = e.target.closest(".segmented__btn");
    if (!btn) return;
    state.fillMode = btn.dataset.mode;
    els.fillMode.querySelectorAll(".segmented__btn").forEach((b) => b.classList.toggle("is-active", b === btn));
    render();
  });

  els.size.addEventListener("change", (e) => {
    state.size = parseInt(e.target.value, 10);
    document.documentElement.style.setProperty("--icon-size", state.size + "px");
  });

  document.documentElement.style.setProperty("--icon-size", state.size + "px");
  render();
  renderCatalog(catalogs.marca);
})();
