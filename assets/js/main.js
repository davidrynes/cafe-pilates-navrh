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

  // Interaktivní rozvrh: <div class="timetable" data-rozvrh></div>
  // Typ lekce se pozná z názvu; podle typu se lekce barevně odliší a dá se podle něj filtrovat.
  var TYPY = [
    { id: "pilates", nazev: "Pilates", test: /pilates level|spine corrector|sm systém/i },
    { id: "barre", nazev: "Barre", test: /barre/i },
    { id: "joga", nazev: "Jóga", test: /jóga/i },
    { id: "bodystyling", nazev: "Bodystyling", test: /bodystyling/i },
    { id: "reformer", nazev: "Reformer", test: /reformer/i },
    { id: "chair", nazev: "Chair", test: /chair/i },
    { id: "jine", nazev: "Další", test: null }
  ];
  var SALY_NAZEV = { velky: "Velký sál", reformery: "Studio s reformery" };

  function typyLekce(l) {
    var t = TYPY.filter(function (t) { return t.test && t.test.test(l.lekce); }).map(function (t) { return t.id; });
    return t.length ? t : ["jine"];
  }
  function lekciText(n) {
    if (n === 1) return "lekce";
    if (n >= 2 && n <= 4) return "lekce";
    return "lekcí";
  }

  each($$("[data-rozvrh]"), function (box) {
    var stav = { den: dnes, sal: "vse", typ: "vse" };
    var pritomne = TYPY.filter(function (t) {
      return rozvrh.some(function (l) { return typyLekce(l).indexOf(t.id) !== -1; });
    });
    box.innerHTML =
      '<div class="tt-days" role="group" aria-label="Den v týdnu"></div>' +
      '<div class="tt-bar">' +
        '<div class="tt-seg" role="group" aria-label="Sál"></div>' +
        '<div class="tt-types" role="group" aria-label="Typ lekce"></div>' +
      "</div>" +
      '<div class="tt-cols" aria-live="polite"></div>';
    var elDays = $(".tt-days", box);
    var elSeg = $(".tt-seg", box);
    var elTypes = $(".tt-types", box);
    var elCols = $(".tt-cols", box);

    function vyhovuje(l) {
      return (stav.sal === "vse" || l.sal === stav.sal) &&
        (stav.typ === "vse" || typyLekce(l).indexOf(stav.typ) !== -1);
    }

    function radek(l) {
      return '<li class="tt-row tt-c-' + typyLekce(l)[0] + '">' +
        "<time>" + esc(l.cas) + "</time>" +
        '<div class="tt-main"><span class="tt-name">' + esc(l.lekce) + "</span>" +
        '<span class="tt-who">' + lektorkyHtml(l) + "</span></div>" +
        '<a class="tt-book" href="#rezervace">Rezervovat</a></li>';
    }

    function vykresli() {
      elDays.innerHTML = DNY.map(function (d) {
        var n = rozvrh.filter(function (l) { return l.den === d && vyhovuje(l); }).length;
        return '<button type="button" class="tt-day' + (d === dnes ? " is-today" : "") + '" data-den="' + d +
          '" aria-pressed="' + (d === stav.den) + '" aria-label="' + DNY_NAZEV[d] + (d === dnes ? " (dnes)" : "") + ", " + n + " " + lekciText(n) + '">' +
          '<b class="tt-day__short">' + DNY_ZKR[d] + "</b>" +
          '<b class="tt-day__full">' + DNY_NAZEV[d] + "</b>" +
          '<small><span class="tt-day__n">' + n + '</span><span class="tt-day__l"> ' + lekciText(n) + (d === dnes ? " · dnes" : "") + "</span></small>" +
          "</button>";
      }).join("");

      elSeg.innerHTML = [["vse", "Oba sály"], ["velky", "Velký sál"], ["reformery", "Reformery"]].map(function (o) {
        return '<button type="button" data-sal="' + o[0] + '" aria-pressed="' + (stav.sal === o[0]) + '">' + o[1] + "</button>";
      }).join("");

      elTypes.innerHTML = ['<button type="button" class="chip" data-typ="vse" aria-pressed="' + (stav.typ === "vse") + '">Všechny lekce</button>']
        .concat(pritomne.map(function (t) {
          return '<button type="button" class="chip tt-chip tt-c-' + t.id + '" data-typ="' + t.id + '" aria-pressed="' + (stav.typ === t.id) + '">' + t.nazev + "</button>";
        })).join("");

      var saly = stav.sal === "vse" ? ["velky", "reformery"] : [stav.sal];
      // sál, kde se vybraný typ lekce za celý týden vůbec nekoná, nezobrazovat
      if (stav.typ !== "vse") {
        var sTypem = saly.filter(function (sal) {
          return rozvrh.some(function (l) { return l.sal === sal && typyLekce(l).indexOf(stav.typ) !== -1; });
        });
        if (sTypem.length) saly = sTypem;
      }
      elCols.className = "tt-cols" + (saly.length === 1 ? " tt-cols--one" : "");
      elCols.innerHTML = saly.map(function (sal) {
        var lekce = rozvrh.filter(function (l) { return l.den === stav.den && l.sal === sal && vyhovuje(l); }).sort(serad);
        var obsah = lekce.length
          ? '<ol class="tt-list">' + lekce.map(radek).join("") + "</ol>"
          : '<p class="tt-empty">' + DNY_NAZEV[stav.den] + ": podle vybraného filtru tu žádná lekce není.</p>";
        return '<section class="tt-col"><h3>' + SALY_NAZEV[sal] + "<small>" + DNY_NAZEV[stav.den] + "</small></h3>" + obsah + "</section>";
      }).join("");
    }

    box.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b || !box.contains(b)) return;
      if (b.hasAttribute("data-den")) stav.den = b.getAttribute("data-den");
      else if (b.hasAttribute("data-sal")) stav.sal = b.getAttribute("data-sal");
      else if (b.hasAttribute("data-typ")) stav.typ = b.getAttribute("data-typ");
      else return;
      vykresli();
    });
    vykresli();
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
