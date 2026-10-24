/* Café Pilates — drobná vylepšení stránek. Obsah je čitelný i bez JavaScriptu. */
(function () {
  "use strict";

  function each(list, fn) { Array.prototype.forEach.call(list, fn); }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return (root || document).querySelectorAll(sel); }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* --- Mobilní menu ----------------------------------------------------- */
  var toggle = $(".nav-toggle");
  var nav = document.getElementById("hlavni-menu");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Otevřít menu" : "Zavřít menu");
      nav.classList.toggle("is-open", !open);
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      }
    });
  }

  /* --- Rozvrh ----------------------------------------------------------- */
  var DNY = ["po", "ut", "st", "ct", "pa", "so", "ne"];
  var DNY_NAZEV = { po: "Pondělí", ut: "Úterý", st: "Středa", ct: "Čtvrtek", pa: "Pátek", so: "Sobota", ne: "Neděle" };
  var DNY_ZKR = { po: "Po", ut: "Út", st: "St", ct: "Čt", pa: "Pá", so: "So", ne: "Ne" };
  var SALY = { velky: "velký sál", reformery: "studio s reformery" };
  var rozvrh = window.ROZVRH || [];

  function minuty(cas) {
    var p = String(cas).split(":");
    return parseInt(p[0], 10) * 60 + parseInt(p[1] || "0", 10);
  }
  function serad(a, b) {
    return DNY.indexOf(a.den) - DNY.indexOf(b.den) || minuty(a.cas) - minuty(b.cas);
  }
  var dnes = DNY[(new Date().getDay() + 6) % 7];

  // Profil může být jedno id, nebo seznam, když se lektorky střídají ("Eva / Helena")
  function profily(l) {
    return Array.isArray(l.profil) ? l.profil : [l.profil || null];
  }
  function lektorkyHtml(l) {
    var jmena = String(l.lektorka).split(" / ");
    var ids = profily(l);
    return jmena.map(function (jm, i) {
      var id = ids.length === jmena.length ? ids[i] : ids[0];
      return id ? '<a href="instruktorky.html#' + esc(id) + '">' + esc(jm) + "</a>" : esc(jm);
    }).join(" / ");
  }

  // Týdenní přehled: <div data-rozvrh-sal="velky"></div>
  each($$("[data-rozvrh-sal]"), function (box) {
    var sal = box.getAttribute("data-rozvrh-sal");
    var lekce = rozvrh.filter(function (l) { return l.sal === sal; }).sort(serad);
    var html = DNY.map(function (den) {
      var dne = lekce.filter(function (l) { return l.den === den; });
      var cls = "day" + (den === dnes ? " is-today" : "") + (dne.length ? "" : " day--empty");
      var obsah = dne.length ? dne.map(function (l) {
        return '<div class="lesson"><b>' + esc(l.cas) + "</b><span>" + esc(l.lekce) + "</span><small>" + lektorkyHtml(l) + "</small></div>";
      }).join("") : '<p class="day__empty">Bez lekcí</p>';
      return '<section class="' + cls + '"><h3>' + DNY_NAZEV[den] + (den === dnes ? " <small>dnes</small>" : "") + "</h3>" + obsah + "</section>";
    }).join("");
    box.className = "week";
    box.innerHTML = html;
  });

  // Kdy cvičí: <div class="when" data-rozvrh-lektorka="helena" hidden><h4>…</h4><ul></ul></div>
  each($$("[data-rozvrh-lektorka]"), function (box) {
    var id = box.getAttribute("data-rozvrh-lektorka");
    var lekce = rozvrh.filter(function (l) { return profily(l).indexOf(id) !== -1; }).sort(serad);
    if (!lekce.length) return;
    // seskupit po dnech: „Út  7:00 Reformer, 15:00 Pilates barre…“
    var poDnech = {};
    lekce.forEach(function (l) {
      var ids = profily(l);
      var nazev = l.lekce;
      // u střídaného typu lekce („Chair / Reformer (fyzio)“) ukázat jen ten, který vede tahle lektorka
      var typy = String(l.lekce).split(" / ");
      if (typy.length === ids.length) nazev = typy[ids.indexOf(id)];
      nazev = nazev.replace(" (authentic)", "");
      var txt = esc(l.cas) + " " + esc(nazev) + (ids.length > 1 ? " <small>(střídavě)</small>" : "");
      (poDnech[l.den] = poDnech[l.den] || []).push(txt);
    });
    $("ul", box).innerHTML = DNY.filter(function (d) { return poDnech[d]; }).map(function (d) {
      return "<li><b>" + DNY_ZKR[d] + "</b><span>" + poDnech[d].join(", ") + "</span></li>";
    }).join("");
    box.hidden = false;
  });

  /* --- Instruktorky: filtr podle typu lekce ----------------------------- */
  var filters = $(".filters--js");
  if (filters) {
    var chips = $$(".chip", filters);
    var people = $$("[data-tags]");
    var more = $(".more");
    var count = $(".filters__count", filters);
    var empty = $(".empty-note");

    var plural = function (n) {
      if (n === 1) return "1 lektorka";
      if (n >= 2 && n <= 4) return n + " lektorky";
      return n + " lektorek";
    };

    var apply = function (tag) {
      var shown = 0;
      var shownInMore = 0;
      each(people, function (p) {
        var match = tag === "vse" || p.getAttribute("data-tags").split(" ").indexOf(tag) !== -1;
        p.hidden = !match;
        if (match) {
          shown++;
          if (more && more.contains(p)) shownInMore++;
        }
      });
      each(chips, function (c) { c.setAttribute("aria-pressed", String(c.getAttribute("data-filter") === tag)); });
      if (more && tag !== "vse") more.open = shownInMore > 0;
      if (count) count.textContent = tag === "vse" ? "" : plural(shown);
      if (empty) empty.hidden = shown !== 0;
    };

    each(chips, function (c) {
      c.addEventListener("click", function () { apply(c.getAttribute("data-filter")); });
    });

    // odkaz typu instruktorky.html?typ=barre rovnou vyfiltruje
    var typ = (location.search.match(/[?&]typ=([a-z]+)/) || [])[1];
    if (typ && $('[data-filter="' + typ + '"]', filters)) apply(typ);
  }

  // Odkaz na lektorku, která je schovaná v rozbalovací části, ji rovnou ukáže
  var openTarget = function () {
    if (!location.hash) return;
    var el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    var details = el && el.closest("details");
    if (details && !details.open) {
      details.open = true;
      el.scrollIntoView();
    }
  };
  window.addEventListener("hashchange", openTarget);
  openTarget();

  // Po načtení písem a obrázků se stránka může posunout – kotvu (#…) dorovnáme
  window.addEventListener("load", function () {
    if (!location.hash || window.scrollY === 0) return;
    var el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (el) el.scrollIntoView();
  });

  /* --- Menu: zvýraznění aktuální kategorie ------------------------------ */
  var menuLinks = $$(".menu-nav a[href^='#']");
  if (menuLinks.length && "IntersectionObserver" in window) {
    var byId = {};
    each(menuLinks, function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        each(menuLinks, function (a) { a.classList.remove("is-active"); });
        var a = byId[e.target.id];
        if (a) {
          a.classList.add("is-active");
          a.scrollIntoView({ block: "nearest", inline: "nearest" });
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    each($$(".menu-section"), function (s) { io.observe(s); });
  }

  /* --- Galerie s náhledy ------------------------------------------------ */
  var galleries = $$(".gallery");
  if (galleries.length && typeof HTMLDialogElement === "function") {
    var dlg = document.createElement("dialog");
    dlg.className = "lightbox";
    dlg.innerHTML =
      '<img class="lightbox__img" alt="">' +
      '<button class="lightbox__close" type="button" aria-label="Zavřít">✕</button>' +
      '<button class="lightbox__prev" type="button" aria-label="Předchozí fotografie">←</button>' +
      '<button class="lightbox__next" type="button" aria-label="Další fotografie">→</button>';
    document.body.appendChild(dlg);
    var img = $(".lightbox__img", dlg);
    var items = [];
    var index = 0;

    var show = function (i) {
      index = (i + items.length) % items.length;
      var a = items[index];
      img.src = a.getAttribute("href");
      img.alt = ($("img", a) || {}).alt || "";
    };

    each(galleries, function (g) {
      var links = $$("a", g);
      each(links, function (a, i) {
        a.addEventListener("click", function (e) {
          e.preventDefault();
          items = links;
          show(i);
          dlg.showModal();
        });
      });
    });
    $(".lightbox__close", dlg).addEventListener("click", function () { dlg.close(); });
    $(".lightbox__prev", dlg).addEventListener("click", function () { show(index - 1); });
    $(".lightbox__next", dlg).addEventListener("click", function () { show(index + 1); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg || e.target === img) dlg.close(); });
    dlg.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") show(index - 1);
      if (e.key === "ArrowRight") show(index + 1);
    });
  }

  /* --- Mapa se načte až po kliknutí (bez cookies Googlu předem) --------- */
  each($$("[data-map-src]"), function (btn) {
    btn.addEventListener("click", function () {
      var box = btn.closest(".map-box");
      var frame = document.createElement("iframe");
      frame.src = btn.getAttribute("data-map-src");
      frame.title = "Mapa – KD Letňanka";
      frame.loading = "lazy";
      box.innerHTML = "";
      box.appendChild(frame);
      box.classList.add("is-loaded");
    });
  });
})();
