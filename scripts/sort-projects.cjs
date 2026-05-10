// scripts/sort-projects.cjs
//
// Ez a script arra szolgál, hogy egy vagy több JSON fájlban
// a `projectsPage.items` tömb elemeit egy előre megadott sorrendbe rendezze.
//
// Miért hasznos ez?
// Sokszor a projektek sorrendje nem abc szerint kell, hanem üzleti,
// tartalmi vagy portfólió-logika alapján. Itt ezt a sorrendet a
// `projectOrder` tömb írja le.
//
// Fontos: a fájl `.cjs` kiterjesztésű.
// Ez azt jelenti, hogy CommonJS modult használunk, ami a Node.js egyik
// klasszikus modulrendszere. Ebben a rendszerben az importálás tipikusan
// `require(...)` segítségével történik.

// A `fs` a Node.js beépített "File System" modulja.
// Ezzel tudunk fájlokat ellenőrizni, beolvasni és kiírni.
const fs = require("fs");

// A `path` szintén Node.js beépített modul.
// Útvonalak (path-ok) biztonságos és platformfüggetlen kezelésére való.
// Például segít relatív útvonalból abszolút útvonalat készíteni.
const path = require("path");

// Ez a tömb tartalmazza a kívánt sorrendet.
// A tömb sorrendje számít:
// ami előrébb van a listában, az előrébb fog szerepelni a JSON-ben is.
//
// A tömb (Array) JavaScriptben rendezett lista.
// A tömb elemei index alapján érhetők el:
// 0, 1, 2, 3...
//
// Például:
// projectOrder[0] -> "wordy"
// projectOrder[1] -> "tiszta-muhely"
const projectOrder = [
  "wordy",
  "tiszta-muhely",
  "integrativ-medicina",
  "egs-shop-client",
  "egs-backend",
  "egs-admin-panel",
  "egs-mongodb-database",
  "egs-mssql-database",
  "gitart-frontend",
  "gitart-backend",
  "gitart-mongodb-database",
  "kostoljbele",
  "kostoljbele-desktop",
  "webp-converter",
  "optident-dentist-landing",
  "emberline-tattoo-studio",
  "sculptor-portfolio-website",
  "thomas-coffee-corner",
  "leather-portfolio"
];

// A `process.argv` egy Node.js által biztosított tömb,
// amely a parancssori argumentumokat tartalmazza.
//
// Például ha ezt futtatod:
// node scripts/sort-projects.cjs ./data/hu.json ./data/en.json
//
// akkor a `process.argv` nagyjából ilyen lesz:
// [
//   "node_elérési_út",
//   "scripts/sort-projects.cjs",
//   "./data/hu.json",
//   "./data/en.json"
// ]
//
// Az első két elemet nem akarjuk feldolgozni,
// ezért `slice(2)`-vel levágjuk őket.
//
// A `slice()` egy tömbmetódus:
// visszaad egy új tömböt az eredeti tömb egy részéből.
// Itt a 2-es indextől kezdve minden elemet megtart.
const filePaths = process.argv.slice(2);

// Ha nem kaptunk egyetlen fájlútvonalat sem a parancssorból,
// akkor nincs min dolgozni.
//
// A `length` megmondja, hány elem van egy tömbben.
// Ha ez 0, akkor a `!filePaths.length` kifejezés igaz lesz.
if (!filePaths.length) {
  // A `console.error()` hibajellegű üzenetet ír a terminálra.
  console.error("Használat: node scripts/sort-projects.cjs ./data/hu.json ./data/en.json");

  // A `process.exit(1)` leállítja a programot.
  // A 0 általában sikeres kilépést jelent,
  // a nem 0 érték pedig valamilyen hibát vagy megszakítást.
  process.exit(1);
}

// Ez a függvény egyetlen JSON fájlt rendez.
//
// A függvény (function) egy újrahasznosítható kódrész,
// amit név alapján többször is meghívhatunk.
//
// A `filePath` paraméter a feldolgozandó fájl útvonala.
function sortProjects(filePath) {
  // A `path.resolve()` abszolút útvonalat készít.
  // Ez azért kényelmes, mert így a további műveletek már mindig
  // egyértelmű, teljes útvonallal dolgoznak.
  const absolutePath = path.resolve(filePath);

  // Az `fs.existsSync()` ellenőrzi, hogy létezik-e a fájl.
  // A `Sync` végződés azt jelzi, hogy ez szinkron művelet:
  // a JavaScript megvárja, amíg az ellenőrzés befejeződik.
  if (!fs.existsSync(absolutePath)) {
    // A `throw new Error(...)` hibát dob.
    // Ilyenkor a függvény futása megszakad, és a hívó fél hibát kap.
    throw new Error(`Nem található fájl: ${absolutePath}`);
  }

  // A `readFileSync()` szinkron módon beolvassa a fájl tartalmát.
  // A második paraméter, `"utf8"`, azt mondja meg,
  // hogy szövegként szeretnénk visszakapni a tartalmat.
  //
  // Enélkül gyakran Buffer objektumot kapnánk,
  // amit még külön át kellene alakítani.
  const rawContent = fs.readFileSync(absolutePath, "utf8");

  // A JSON fájl tartalma sima szövegként érkezik.
  // A `JSON.parse()` ezt a szöveget JavaScript objektummá alakítja.
  //
  // Példa:
  // '{"name":"Tamás"}' -> { name: "Tamás" }
  const data = JSON.parse(rawContent);

  // Itt megpróbáljuk kiolvasni a `projectsPage.items` értéket.
  //
  // A `?.` az opcionális láncolás (optional chaining).
  // Azt jelenti:
  // - ha `data` létezik, nézd meg a `projectsPage` mezőt
  // - ha az is létezik, nézd meg az `items` mezőt
  // - ha valahol hiányzik egy rész, ne dobj hibát, hanem adj `undefined`-ot
  //
  // Ez biztonságosabb, mint a sima `data.projectsPage.items`,
  // mert ha `projectsPage` hiányzik, a hagyományos forma hibát dobna.
  const items = data?.projectsPage?.items;

  // Itt ellenőrizzük, hogy az `items` valóban tömb-e.
  //
  // Az `Array.isArray(...)` a legbiztonságosabb módja annak,
  // hogy ellenőrizzük, egy érték tömb-e JavaScriptben.
  if (!Array.isArray(items)) {
    throw new Error(`A projectsPage.items nem található vagy nem tömb ebben a fájlban: ${filePath}`);
  }

  // Itt létrehozunk egy Map-et a gyors kereséshez.
  //
  // Miért kell ez?
  // A rendezés közben minden projekthez gyorsan szeretnénk megtalálni,
  // hogy hányadik helyen szerepel a `projectOrder` listában.
  //
  // A `Map` egy olyan adatszerkezet, ami kulcs-érték párokat tárol.
  // Hasonlít egy objektumhoz, de kifejezetten kulcs-alapú keresésre készült,
  // és több esetben kényelmesebb, egyértelműbb.
  //
  // A `projectOrder.map((slug, index) => [slug, index])` ezt állítja elő:
  // [
  //   ["wordy", 0],
  //   ["tiszta-muhely", 1],
  //   ...
  // ]
  //
  // Ebből készül a Map, tehát például:
  // orderMap.get("wordy") -> 0
  // orderMap.get("gitart-backend") -> 9
  const orderMap = new Map(projectOrder.map((slug, index) => [slug, index]));

  // Itt történik maga a rendezés.
  //
  // Fontos részlet: a `sort()` módosítja az eredeti tömböt.
  // Ezt itt nem akarjuk közvetlenül megtenni,
  // ezért előbb készítünk egy másolatot a `[...items]` segítségével.
  //
  // A `...` a spread operátor.
  // Tömb esetén "szétszedi" az elemeket,
  // így egy új tömböt tudunk létrehozni ugyanazokkal az elemekkel.
  const sortedItems = [...items].sort((a, b) => {
    // A rendezőfüggvény két elemet kap:
    // `a` és `b`.
    //
    // Ezek itt a projektek objektumai.
    // Valami ilyesmik lehetnek:
    // { slug: "wordy", title: "...", ... }
    // { slug: "egs-backend", title: "...", ... }

    // Ha a projekt slugja benne van az `orderMap`-ben,
    // akkor lekérjük a hozzá tartozó indexet.
    // Ha nincs benne, akkor egy nagyon nagy számot adunk neki.
    //
    // Miért jó a `Number.MAX_SAFE_INTEGER`?
    // Mert így az ismeretlen slugok a lista végére fognak kerülni.
    const aIndex = orderMap.has(a.slug) ? orderMap.get(a.slug) : Number.MAX_SAFE_INTEGER;
    const bIndex = orderMap.has(b.slug) ? orderMap.get(b.slug) : Number.MAX_SAFE_INTEGER;

    // A `sort()` rendezőfüggvényének visszatérési szabálya:
    // - negatív szám: `a` jöjjön `b` elé
    // - pozitív szám: `b` jöjjön `a` elé
    // - 0: maradhatnak azonos sorrendben
    //
    // Ha `aIndex` kisebb, akkor `a` előrébb kerül.
    return aIndex - bIndex;
  });

  // Itt összegyűjtjük azokat a slugokat,
  // amelyek benne vannak az elvárt `projectOrder` listában,
  // de hiányoznak a JSON fájlból.
  //
  // A `filter()` új tömböt ad vissza azokkal az elemekkel,
  // amelyekre a feltétel igaz.
  //
  // A `some()` pedig azt ellenőrzi, hogy egy tömbben
  // van-e legalább egy olyan elem, amely megfelel a feltételnek.
  const missingFromJson = projectOrder.filter(
    (slug) => !items.some((project) => project.slug === slug)
  );

  // Itt a másik irányt ellenőrizzük:
  // mely slugok szerepelnek a JSON-ben, de nincsenek benne a `projectOrder` listában.
  //
  // Először `map()`-pel kiszedjük az összes slugot.
  // A `map()` minden elemből egy új értéket készít,
  // és ezekből áll össze az új tömb.
  //
  // Utána `filter()`-rel megtartjuk azokat,
  // amelyekre az `orderMap.has(slug)` hamis.
  const unknownSlugs = items
    .map((project) => project.slug)
    .filter((slug) => !orderMap.has(slug));

  // Itt visszaírjuk a rendezett tömböt az eredeti adatstruktúrába.
  //
  // Mivel a `data` egy JavaScript objektum,
  // a benne lévő mezőket egyszerű értékadással tudjuk módosítani.
  data.projectsPage.items = sortedItems;

  // A `JSON.stringify()` a JavaScript objektumot visszaalakítja szöveges JSON-ná.
  //
  // Paraméterek:
  // 1. maga az objektum (`data`)
  // 2. replacer - itt `null`, tehát nem használunk egyedi szűrést
  // 3. behúzás mértéke - itt 2 szóköz, hogy olvasható legyen a fájl
  //
  // A végére hozzáadunk egy `\n` sortörést is,
  // mert sok eszköz és editor szereti, ha a fájl új sorral végződik.
  fs.writeFileSync(absolutePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");

  // Sikeres feldolgozás után tájékoztató üzenetet írunk ki.
  console.log(`Rendezve: ${filePath}`);

  // Ha vannak a JSON-ből hiányzó, de elvárt slugok,
  // akkor figyelmeztetést írunk ki.
  if (missingFromJson.length) {
    console.warn("Hiányzik a JSON-ből:", missingFromJson.join(", "));
  }

  // Ha vannak olyan slugok, amiket a JSON tartalmaz,
  // de a `projectOrder` lista nem ismer,
  // akkor azokról is figyelmeztetünk.
  //
  // A `join(", ")` a tömb elemeit egyetlen szöveggé fűzi össze,
  // vesszővel és szóközzel elválasztva.
  if (unknownSlugs.length) {
    console.warn("Nincs benne a projectOrder listában, ezért a végére került:", unknownSlugs.join(", "));
  }
}

// A `for...of` ciklus végigmegy a `filePaths` tömb összes elemén.
//
// Minden iterációban a `filePath` változó az aktuális fájlútvonalat tartalmazza.
// Ezután meghívjuk rá a `sortProjects()` függvényt.
for (const filePath of filePaths) {
  sortProjects(filePath);
}
