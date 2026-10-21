/*
  ROZVRH LEKCÍ — jediné místo, kde se rozvrh upravuje.
  Z těchto dat se vykresluje stránka „Rozvrh a ceník“ i blok „Kdy cvičí“ u lektorek.

  Každá lekce je jeden řádek:
    den       "po", "ut", "st", "ct", "pa", "so" nebo "ne"
    cas       začátek lekce, např. "18:00"
    sal       "velky" = velký sál, "reformery" = studio s reformery
    lekce     název lekce
    lektorka  jméno, jak se má zobrazit
    profil    (nepovinné) id lektorky na stránce Instruktorky, např. "helena".
              Lekce se pak ukáže i v jejím profilu v bloku „Kdy cvičí“.

  Pozor na čárky: za každým řádkem kromě posledního musí být čárka.
*/
window.ROZVRH = [
  /* ---------- Velký sál ---------- */
  { den: "po", cas: "18:00", sal: "velky", lekce: "Pilates level I – začátečníci", lektorka: "Jana" },
  { den: "po", cas: "19:00", sal: "velky", lekce: "Pilates level II – pokročilí", lektorka: "Zuzka", profil: "zuzka" },

  { den: "ut", cas: "9:15",  sal: "velky", lekce: "Port de Bras", lektorka: "Anežka" },
  { den: "ut", cas: "10:30", sal: "velky", lekce: "Bodystyling & baby", lektorka: "Karolína", profil: "karolina" },
  { den: "ut", cas: "18:00", sal: "velky", lekce: "Bodystyling level I", lektorka: "Terka", profil: "terka" },
  { den: "ut", cas: "19:00", sal: "velky", lekce: "Power jóga", lektorka: "Dana", profil: "dana" },

  { den: "st", cas: "10:00", sal: "velky", lekce: "Bodystyling & baby", lektorka: "Karolína", profil: "karolina" },
  { den: "st", cas: "17:00", sal: "velky", lekce: "Barre", lektorka: "Žofie" },
  { den: "st", cas: "18:00", sal: "velky", lekce: "Bodystyling", lektorka: "Helena", profil: "helena" },
  { den: "st", cas: "19:00", sal: "velky", lekce: "Power jóga", lektorka: "Dana", profil: "dana" },

  { den: "ct", cas: "9:00",  sal: "velky", lekce: "Pilates level I – zaměřeno na záda", lektorka: "Kristýna" },
  { den: "ct", cas: "10:00", sal: "velky", lekce: "Bodystyling & baby", lektorka: "Karolína", profil: "karolina" },
  { den: "ct", cas: "18:00", sal: "velky", lekce: "Pilates level I", lektorka: "Kristýna R.", profil: "kristyna-r" },
  { den: "ct", cas: "19:00", sal: "velky", lekce: "Břišní tance – mírně pokročilí", lektorka: "Pavlínka" },

  { den: "pa", cas: "7:30",  sal: "velky", lekce: "Pilates level I", lektorka: "Žofie" },
  { den: "pa", cas: "8:30",  sal: "velky", lekce: "Pilates level II", lektorka: "Veronika" },
  { den: "pa", cas: "17:00", sal: "velky", lekce: "Bodystyling", lektorka: "Karolína", profil: "karolina" },
  { den: "pa", cas: "18:00", sal: "velky", lekce: "Pilates level I", lektorka: "Helena", profil: "helena" },

  { den: "ne", cas: "9:45",  sal: "velky", lekce: "Bodystyling", lektorka: "Karolína", profil: "karolina" },
  { den: "ne", cas: "18:00", sal: "velky", lekce: "Bodystyling level II", lektorka: "Karolína", profil: "karolina" },
  { den: "ne", cas: "19:00", sal: "velky", lekce: "Pilates level II – pokročilí", lektorka: "Žofie" },

  /* ---------- Studio s reformery (skupinové lekce; soukromé lekce se domlouvají zvlášť) ---------- */
  { den: "po", cas: "9:00",  sal: "reformery", lekce: "Reformer", lektorka: "Zuzka", profil: "zuzka" },
  { den: "po", cas: "10:00", sal: "reformery", lekce: "Reformer", lektorka: "Kristýna" },
  { den: "po", cas: "16:00", sal: "reformery", lekce: "Reformer", lektorka: "Veronika" },
  { den: "po", cas: "18:00", sal: "reformery", lekce: "Reformer", lektorka: "Zuzka", profil: "zuzka" },
  { den: "po", cas: "19:00", sal: "reformery", lekce: "Reformer", lektorka: "Žofie" },
  { den: "po", cas: "20:00", sal: "reformery", lekce: "Reformer", lektorka: "Žofie" },

  { den: "ut", cas: "15:00", sal: "reformery", lekce: "Reformer", lektorka: "Danča N." },
  { den: "ut", cas: "16:00", sal: "reformery", lekce: "Reformer", lektorka: "Danča N." },
  { den: "ut", cas: "17:00", sal: "reformery", lekce: "Reformer", lektorka: "Danča N." },
  { den: "ut", cas: "18:00", sal: "reformery", lekce: "Reformer", lektorka: "Mirka", profil: "mirka" },
  { den: "ut", cas: "19:00", sal: "reformery", lekce: "Reformer", lektorka: "Mirka", profil: "mirka" },

  { den: "st", cas: "7:00",  sal: "reformery", lekce: "Reformer", lektorka: "Žofie" },
  { den: "st", cas: "9:00",  sal: "reformery", lekce: "Reformer", lektorka: "Kristýna" },
  { den: "st", cas: "13:00", sal: "reformery", lekce: "Reformer", lektorka: "Kristýna" },
  { den: "st", cas: "16:00", sal: "reformery", lekce: "Reformer", lektorka: "Žofie" },
  { den: "st", cas: "17:00", sal: "reformery", lekce: "Reformer", lektorka: "Veronika" },
  { den: "st", cas: "19:00", sal: "reformery", lekce: "Reformer", lektorka: "Helena", profil: "helena" },

  { den: "ct", cas: "7:00",  sal: "reformery", lekce: "Reformer", lektorka: "Žofie" },
  { den: "ct", cas: "8:00",  sal: "reformery", lekce: "Reformer", lektorka: "Žofie" },
  { den: "ct", cas: "10:00", sal: "reformery", lekce: "Reformer", lektorka: "Danča N." },
  { den: "ct", cas: "17:00", sal: "reformery", lekce: "Reformer", lektorka: "Qaša" },
  { den: "ct", cas: "19:00", sal: "reformery", lekce: "Reformer", lektorka: "Kristýna R.", profil: "kristyna-r" },

  { den: "pa", cas: "7:30",  sal: "reformery", lekce: "Reformer", lektorka: "Verča", profil: "veronika" },
  { den: "pa", cas: "11:00", sal: "reformery", lekce: "Reformer", lektorka: "Veronika" },

  { den: "ne", cas: "17:00", sal: "reformery", lekce: "Reformer", lektorka: "Mirka", profil: "mirka" },
  { den: "ne", cas: "18:00", sal: "reformery", lekce: "Reformer", lektorka: "Mirka", profil: "mirka" }
];
