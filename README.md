# Café Pilates – web

Čistě statický web (HTML + CSS + trocha JavaScriptu), bez sestavování. Obsah této složky patří do kořene repozitáře `davidrynes/cafepilates` na GitHubu, ze kterého web automaticky publikuje Netlify na `https://www.cafepilates.cz`.

## Nasazení

1. Obsah této složky nahrajte do kořene repozitáře `cafepilates` (včetně souborů `_redirects` a `.nojekyll`). Stejně pojmenované soubory se přepíšou – to je v pořádku.
2. **V repozitáři nechte beze změny** stávající obrazovku a vše, co potřebuje:
   `obrazovka.html`, `cafe-pilates-obrazovka.html` a složky `css/`, `js/`, `images/`, `fonts/`, `documents/` (export z Webflow).
   Nový web tyto soubory nepoužívá ani nepřepisuje – má vše ve složce `assets/`.
3. Netlify po nahrání web sám publikuje (obvykle do minuty). Soubor `_redirects` trvale přesměruje staré adresy `cafe-pilates-l-…` na nové stránky.

Web počítá s doménou `https://www.cafepilates.cz` (odkazy pro Google a sociální sítě v hlavičkách stránek, `sitemap.xml`, `robots.txt`).

Adresy fungují i bez `.html` – Netlify servíruje `menu.html` i na `/menu`.

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
| `obrazovka-nova.html` | Nová, odlehčená verze obrazovky v kavárně (na vyzkoušení na `/obrazovka-nova`) |
| `404.html` | Stránka pro neexistující adresu |
| `cafe-pilates-l-*.html` | Záložní přesměrování ze starých adres webu (nemazat) |
| `_redirects` | Trvalá přesměrování starých adres pro Netlify |

## Časté úpravy

**Rozvrh** – jen v souboru `assets/js/rozvrh.js`. Každá lekce je jeden řádek; postup je popsaný na začátku souboru. Z těchto dat se vykresluje stránka Rozvrh i blok „Kdy cvičí“ u lektorek (přes `profil: "id-lektorky"`).

**Oznámení nahoře** – v `index.html` blok `<div class="announce">…</div>`. Když není co oznamovat, celý blok smažte.

**Ceny** – `rozvrh-a-cenik.html` (ceník) a v `index.html` „Ceník v kostce“. Při změně upravte obě místa.

**Lektorky** – `instruktorky.html`. Každá lektorka je jeden blok `<article … id="…">`. Fotky jsou v `assets/img/lektorky/` jako čtverce 720 × 720 px v rámečku s lístky a logem na bílém pozadí (stejně jako původní grafiky). Bílé pozadí na webu splyne se světlou kartou. Lektorka bez fotky má zatím siluetu v rámečku (`veronika-l.webp`). Řada fotek na úvodní stránce je v `index.html` (sekce „Náš tým“).

**Obrazovka v kavárně – dnešní verze** – `/obrazovka` je export z Webflow a funguje dál beze změny: každý týden se do `images/` nahraje nový `polevky-DDMMRR.jpg` (s variantami z Webflow) a nový `obrazovka.html`.

**Obrazovka v kavárně – nová verze** – `/obrazovka-nova` ukazuje stejné obrázky ve stejném pořadí a tempu (8 s, prolnutí 5 s), ale bez Webflow skriptů. Polévky se mění jen výměnou jednoho souboru:
1. na GitHubu v repozitáři otevřete složku `assets/img/obrazovka/`,
2. **Add file → Upload files**, nahrajte nový obrázek pojmenovaný přesně `polevky.jpg` (2160 × 3840 px) a potvrďte **Commit changes**,
3. obrazovka si nové polévky sama načte do 30 minut – na televizi ani v HTML se nic nemění.

Ostatní obrázky obrazovky jsou ve stejné složce a jejich pořadí je v `obrazovka-nova.html` (jeden řádek `<img>` = jeden obrázek). Až se nová verze na televizi osvědčí, stačí její obsah přesunout do `obrazovka.html` (nebo televizi přepnout na `/obrazovka-nova`) a Webflow složky pak smazat.

**Hlavička a patička** jsou v každé stránce zvlášť. Když se mění menu, telefon nebo otevírací doba, upravte je ve všech `.html` souborech (hledat a nahradit).

## Technické poznámky

- Písma: Panchang je uložený ve webu (`assets/fonts/`), DM Sans se načítá z Google Fonts.
- Mapa na stránce Kontakt se načte až po kliknutí (bez cookies Googlu předem). Web sám nepoužívá analytiku ani sledovací cookies, proto nemá cookie lištu. Rezervační systém na stránce Rozvrh je vložený z bookeo.com.
- Styly: `assets/css/styles.css`, barvy jsou na začátku souboru v `:root`.
