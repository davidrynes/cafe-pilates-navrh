/*
  ROZVRH LEKCÍ — jediné místo, kde se rozvrh upravuje.
  Z těchto dat se vykresluje stránka „Rozvrh a ceník“ i blok „Kdy cvičí“ u lektorek.
  Převzato z rezervačního systému Bookeo (týdny 26. 10. – 7. 11. 2026), bez soukromých hodin.

  Každá lekce je jeden řádek:
    den       "po", "ut", "st", "ct", "pa", "so" nebo "ne"
    cas       začátek lekce, např. "18:00"
    sal       "velky" = velký sál, "reformery" = studio s reformery
    lekce     název lekce
    lektorka  jméno, jak se má zobrazit; když se lektorky střídají: "Eva / Helena"
    profil    (nepovinné) id lektorky na stránce Instruktorky, např. "helena".
              Když se lektorky střídají, seznam ve stejném pořadí: ["eva", "helena"]
              (null = lektorka bez profilu). Lekce se pak ukáže i v bloku „Kdy cvičí“.

  Pozor na čárky: za každým řádkem kromě posledního musí být čárka.
*/
window.ROZVRH = [
  /* ---------- Velký sál ---------- */
  { den: "po", cas: "7:30",  sal: "velky", lekce: "Pilates barre", lektorka: "Eva / Helena", profil: ["eva", "helena"] },
  { den: "po", cas: "9:00",  sal: "velky", lekce: "Pilates level I – začátečníci", lektorka: "Dana D. / Kristýna", profil: ["dana", "kristyna-h"] },
  { den: "po", cas: "10:00", sal: "velky", lekce: "Bodystyling & baby", lektorka: "Karolína", profil: "karolina" },
  { den: "po", cas: "16:00", sal: "velky", lekce: "Spine corrector – Pilates level I – zaměřeno na záda", lektorka: "Dana D.", profil: "dana" },
  { den: "po", cas: "17:00", sal: "velky", lekce: "SM systém", lektorka: "Veronika", profil: "veronika" },
  { den: "po", cas: "18:00", sal: "velky", lekce: "Pilates level I – začátečníci", lektorka: "Jana", profil: "jana" },
  { den: "po", cas: "19:00", sal: "velky", lekce: "Pilates barre", lektorka: "Kristýna R." },

  { den: "ut", cas: "8:00",  sal: "velky", lekce: "Pilates barre", lektorka: "Kateřina R.", profil: "katerina" },
  { den: "ut", cas: "9:00",  sal: "velky", lekce: "Pilates barre", lektorka: "Kateřina R.", profil: "katerina" },
  { den: "ut", cas: "16:00", sal: "velky", lekce: "Pilates barre", lektorka: "Helena", profil: "helena" },
  { den: "ut", cas: "17:00", sal: "velky", lekce: "Pilates level I – zaměřeno na záda", lektorka: "Mirka", profil: "mirka" },
  { den: "ut", cas: "18:00", sal: "velky", lekce: "Bodystyling", lektorka: "Terka", profil: "terka" },
  { den: "ut", cas: "19:00", sal: "velky", lekce: "Power jóga", lektorka: "Dana D.", profil: "dana" },

  { den: "st", cas: "8:00",  sal: "velky", lekce: "Pilates barre", lektorka: "Helena", profil: "helena" },
  { den: "st", cas: "9:00",  sal: "velky", lekce: "Pilates level I – zaměřeno na záda", lektorka: "Terka", profil: "terka" },
  { den: "st", cas: "11:00", sal: "velky", lekce: "Core jóga & baby", lektorka: "Adél", profil: "adela" },
  { den: "st", cas: "15:00", sal: "velky", lekce: "Spine corrector – Pilates level I – zaměřeno na záda", lektorka: "Veronika", profil: "veronika" },
  { den: "st", cas: "16:00", sal: "velky", lekce: "Pilates barre", lektorka: "Kateřina R.", profil: "katerina" },
  { den: "st", cas: "17:00", sal: "velky", lekce: "Pilates barre", lektorka: "Kateřina R.", profil: "katerina" },
  { den: "st", cas: "18:00", sal: "velky", lekce: "Bodystyling", lektorka: "Helena", profil: "helena" },
  { den: "st", cas: "19:00", sal: "velky", lekce: "Power jóga", lektorka: "Dana D.", profil: "dana" },

  { den: "ct", cas: "8:00",  sal: "velky", lekce: "Pilates level I – zaměřeno na záda", lektorka: "Helena", profil: "helena" },
  { den: "ct", cas: "9:00",  sal: "velky", lekce: "Pilates barre", lektorka: "Kristýna R." },
  { den: "ct", cas: "10:00", sal: "velky", lekce: "Bodystyling & baby", lektorka: "Karolína", profil: "karolina" },
  { den: "ct", cas: "17:00", sal: "velky", lekce: "Pilates barre", lektorka: "Helena / Zuzka B.", profil: ["helena", null] },
  { den: "ct", cas: "18:00", sal: "velky", lekce: "Spine corrector – Pilates level II", lektorka: "Tereza Č.", profil: "tereza-c" },
  { den: "ct", cas: "19:00", sal: "velky", lekce: "Břišní tance", lektorka: "Pavlínka" },

  { den: "pa", cas: "8:00",  sal: "velky", lekce: "Pilates level II – pokročilí", lektorka: "Veronika", profil: "veronika" },
  { den: "pa", cas: "9:00",  sal: "velky", lekce: "Pilates barre", lektorka: "Helena", profil: "helena" },
  { den: "pa", cas: "15:00", sal: "velky", lekce: "Pilates barre", lektorka: "Kateřina R.", profil: "katerina" },
  { den: "pa", cas: "16:00", sal: "velky", lekce: "Pilates barre", lektorka: "Kateřina R.", profil: "katerina" },
  { den: "pa", cas: "17:00", sal: "velky", lekce: "Bodystyling & baby", lektorka: "Karolína", profil: "karolina" },
  { den: "pa", cas: "18:00", sal: "velky", lekce: "Pilates level II – pokročilí", lektorka: "Helena", profil: "helena" },

  { den: "so", cas: "8:00",  sal: "velky", lekce: "Pilates barre", lektorka: "Helena", profil: "helena" },
  { den: "so", cas: "9:00",  sal: "velky", lekce: "Pilates barre", lektorka: "Helena", profil: "helena" },

  { den: "ne", cas: "8:30",  sal: "velky", lekce: "Bodystyling & baby", lektorka: "Karolína", profil: "karolina" },
  { den: "ne", cas: "9:45",  sal: "velky", lekce: "Bodystyling & baby", lektorka: "Karolína", profil: "karolina" },
  { den: "ne", cas: "11:00", sal: "velky", lekce: "Pilates barre", lektorka: "Kristýna R." },
  { den: "ne", cas: "18:00", sal: "velky", lekce: "Pilates barre", lektorka: "Terka", profil: "terka" },
  { den: "ne", cas: "19:00", sal: "velky", lekce: "Pilates level II – pokročilí", lektorka: "Veronika L. / Mirka", profil: ["veronika-l", "mirka"] },

  /* ---------- Studio s reformery (skupinové lekce; soukromé hodiny se domlouvají zvlášť) ---------- */
  { den: "po", cas: "8:00",  sal: "reformery", lekce: "Reformer (fyzio)", lektorka: "Dana D. / Kristýna", profil: ["dana", "kristyna-h"] },
  { den: "po", cas: "9:00",  sal: "reformery", lekce: "Chair (authentic)", lektorka: "Zuzka", profil: "zuzka" },
  { den: "po", cas: "10:00", sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Dana D.", profil: "dana" },
  { den: "po", cas: "12:00", sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Žofie", profil: "zofie" },
  { den: "po", cas: "13:00", sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Žofie", profil: "zofie" },
  { den: "po", cas: "14:00", sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Veronika", profil: "veronika" },
  { den: "po", cas: "15:00", sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Veronika / Kristýna R.", profil: ["veronika", null] },
  { den: "po", cas: "16:00", sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Veronika / Kristýna R.", profil: ["veronika", null] },
  { den: "po", cas: "17:00", sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Kristýna R." },

  { den: "ut", cas: "7:00",  sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Helena", profil: "helena" },
  { den: "ut", cas: "8:00",  sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Dana D. / Kristýna R.", profil: ["dana", null] },
  { den: "ut", cas: "9:00",  sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Dana D. / Kristýna R.", profil: ["dana", null] },
  { den: "ut", cas: "10:00", sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Dana D. / Kristýna R.", profil: ["dana", null] },
  { den: "ut", cas: "15:00", sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Helena", profil: "helena" },
  { den: "ut", cas: "16:00", sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Dana D.", profil: "dana" },
  { den: "ut", cas: "17:00", sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Helena", profil: "helena" },
  { den: "ut", cas: "18:00", sal: "reformery", lekce: "Reformer (fyzio)", lektorka: "Mirka", profil: "mirka" },
  { den: "ut", cas: "19:00", sal: "reformery", lekce: "Reformer (fyzio)", lektorka: "Mirka", profil: "mirka" },

  { den: "st", cas: "7:00",  sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Helena", profil: "helena" },
  { den: "st", cas: "8:00",  sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Zuzka", profil: "zuzka" },
  { den: "st", cas: "9:00",  sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Helena", profil: "helena" },
  { den: "st", cas: "10:00", sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Dana D.", profil: "dana" },
  { den: "st", cas: "12:00", sal: "reformery", lekce: "Chair (authentic)", lektorka: "Zuzka", profil: "zuzka" },
  { den: "st", cas: "16:00", sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Veronika", profil: "veronika" },
  { den: "st", cas: "17:00", sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Veronika", profil: "veronika" },
  { den: "st", cas: "19:00", sal: "reformery", lekce: "Chair (authentic)", lektorka: "Helena", profil: "helena" },
  { den: "st", cas: "20:00", sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Helena", profil: "helena" },

  { den: "ct", cas: "7:00",  sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Helena", profil: "helena" },
  { den: "ct", cas: "8:00",  sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Kristýna R." },
  { den: "ct", cas: "10:00", sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Helena / Kristýna R.", profil: ["helena", null] },
  { den: "ct", cas: "12:00", sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Zuzka", profil: "zuzka" },
  { den: "ct", cas: "13:00", sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Zuzka", profil: "zuzka" },
  { den: "ct", cas: "14:00", sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Veronika / Dana D.", profil: ["veronika", "dana"] },
  { den: "ct", cas: "15:00", sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Veronika / Dana D.", profil: ["veronika", "dana"] },
  { den: "ct", cas: "16:00", sal: "reformery", lekce: "Chair (authentic)", lektorka: "Tereza Č.", profil: "tereza-c" },
  { den: "ct", cas: "17:00", sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Tereza Č.", profil: "tereza-c" },
  { den: "ct", cas: "18:00", sal: "reformery", lekce: "Chair (authentic)", lektorka: "Veronika L.", profil: "veronika-l" },
  { den: "ct", cas: "19:00", sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Veronika L.", profil: "veronika-l" },

  { den: "pa", cas: "7:00",  sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Helena", profil: "helena" },
  { den: "pa", cas: "8:00",  sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Helena / Kristýna R.", profil: ["helena", null] },
  { den: "pa", cas: "9:00",  sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Helena / Kristýna R.", profil: ["helena", null] },
  { den: "pa", cas: "11:00", sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Veronika", profil: "veronika" },
  { den: "pa", cas: "12:00", sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Veronika", profil: "veronika" },
  { den: "pa", cas: "14:00", sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Žofie", profil: "zofie" },
  { den: "pa", cas: "15:00", sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Žofie", profil: "zofie" },
  { den: "pa", cas: "16:00", sal: "reformery", lekce: "Chair (authentic)", lektorka: "Helena", profil: "helena" },
  { den: "pa", cas: "17:00", sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Helena", profil: "helena" },
  { den: "pa", cas: "19:00", sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Helena", profil: "helena" },

  { den: "so", cas: "10:00", sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Helena", profil: "helena" },

  { den: "ne", cas: "8:00",  sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Kristýna R." },
  { den: "ne", cas: "9:00",  sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Kristýna R." },
  { den: "ne", cas: "10:00", sal: "reformery", lekce: "Reformer (authentic)", lektorka: "Kristýna R." },
  { den: "ne", cas: "16:00", sal: "reformery", lekce: "Chair (authentic) / Reformer (fyzio)", lektorka: "Veronika L. / Mirka", profil: ["veronika-l", "mirka"] },
  { den: "ne", cas: "17:00", sal: "reformery", lekce: "Chair (authentic) / Reformer (fyzio)", lektorka: "Veronika L. / Mirka", profil: ["veronika-l", "mirka"] },
  { den: "ne", cas: "18:00", sal: "reformery", lekce: "Reformer (authentic) / Reformer (fyzio)", lektorka: "Veronika L. / Mirka", profil: ["veronika-l", "mirka"] }
];
