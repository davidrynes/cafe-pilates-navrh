# Café Pilates – web

Čistě statický web (HTML + CSS + trocha JavaScriptu), bez sestavování. Obsah této složky se nahraje do kořene repozitáře na GitHubu a servíruje přes GitHub Pages.

## Nasazení na GitHub Pages

1. Obsah složky `web/` nahrajte do kořene repozitáře (včetně skrytého souboru `.nojekyll`).
2. V repozitáři: **Settings → Pages → Build and deployment → Deploy from a branch**, větev `main`, složka `/ (root)`.
3. Vlastní doménu nastavte tamtéž v poli **Custom domain** (GitHub sám vytvoří soubor `CNAME`).

Web počítá s doménou `https://www.cafepilates.cz` (odkazy pro Google a sociální sítě v hlavičkách stránek, `sitemap.xml`, `robots.txt`). Pokud bude doména jiná, nahraďte ji hromadně ve všech souborech.

Adresy fungují i bez `.html` – GitHub Pages servíruje `menu.html` i na `/menu`.

## Stránky

| Soubor | Obsah |
|---|---|
| `index.html` | Úvodní stránka (nahoře lišta s oznámením) |
| `menu.html` | Jídelní a nápojový lístek |
| `pilates.html` | Co je pilates, pro koho je, historie |
| `instruktorky.html` | Lektorky – hlavní tým a další lektorky |
| `rozvrh-a-cenik.html` | Rozvrh, rezervace (Bookeo), ceník, storno podmínky |
| `oslavy.html` | Oslavy a nabídka občerstvení |
| `vystavy.html` | Vernisáže a výstavy |
| `kontakt.html` | Kontakt, mapa, fakturační údaje |
| `ochrana-osobnich-udaju.html` | Souhlas se zpracováním osobních údajů |
| `blog/elixir-prodlouzeneho-mladi.html` | Článek |
| `obrazovka.html` | Prezentace pro obrazovku v kavárně (bez menu, mimo vyhledávače) |
| `404.html` | Stránka pro neexistující adresu |
| `cafe-pilates-l-*.html` | Přesměrování ze starých adres webu (nemazat) |

## Časté úpravy

**Rozvrh** – jen v souboru `assets/js/rozvrh.js`. Každá lekce je jeden řádek; postup je popsaný na začátku souboru. Z těchto dat se vykresluje stránka Rozvrh i blok „Kdy cvičí“ u lektorek (přes `profil: "id-lektorky"`).

**Oznámení nahoře** – v `index.html` blok `<div class="announce">…</div>`. Když není co oznamovat, celý blok smažte.

**Ceny** – `rozvrh-a-cenik.html` (ceník) a v `index.html` „Ceník v kostce“. Při změně upravte obě místa.

**Lektorky** – `instruktorky.html`. Každá lektorka je jeden blok `<article … id="…">`. Fotky patří do `assets/img/lektorky/`, ideálně na výšku 600 × 1000 px. Dokud fotka chybí, použijte `silueta.svg`. Řada fotek na úvodní stránce je v `index.html` (sekce „Náš tým“).

**Obrazovka v kavárně** – `obrazovka.html`. Obrázky na výšku 2160 × 3840 px nahrajte do `assets/img/obrazovka/` a přidejte řádek `<img>`; pořadí řádků = pořadí na obrazovce. Každý obrázek svítí 8 s, prolnutí trvá 5 s.

**Hlavička a patička** jsou v každé stránce zvlášť. Když se mění menu, telefon nebo otevírací doba, upravte je ve všech `.html` souborech (hledat a nahradit).

## Technické poznámky

- Písma: Panchang je uložený ve webu (`assets/fonts/`), DM Sans se načítá z Google Fonts.
- Mapa na stránce Kontakt se načte až po kliknutí (bez cookies Googlu předem). Web sám nepoužívá analytiku ani sledovací cookies, proto nemá cookie lištu. Rezervační systém na stránce Rozvrh je vložený z bookeo.com.
- Styly: `assets/css/styles.css`, barvy jsou na začátku souboru v `:root`.
