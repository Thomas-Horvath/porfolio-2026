
"use client";

/*
  FONTOS MEGJEGYZÉS A MEGOLDÁSHOZ
  --------------------------------
  Ebben a verzióban a galériában és a modalban is sima <img> elemet használunk
  a next/image helyett.

  Ennek oka:
  - A jelenlegi props csak egy string[] tömböt ad át, tehát csak a képek src útvonalait ismerjük.
  - A masonry elrendezésnél a képek természetes magasságát szeretnénk használni.
  - A next/image igazán akkor kényelmes, ha width / height metaadatok is rendelkezésre állnak.
  - Mivel itt változó magasságú screenshotokról van szó, a sima <img> egyszerűbb,
    természetesebb és kiszámíthatóbb viselkedést ad.

  Ha később bővíted az adatszerkezetet például így:
    { src: string; alt: string; width: number; height: number }
  akkor vissza lehet térni a next/image használatára is.
*/

import { useEffect, useRef, useState } from "react";
import { FiZoomIn } from "react-icons/fi";
import { useLanguage } from "@/contexts/useLanguage";

type Props = {
  images: string[];
};

export default function WorkGalleryClient({ images }: Props) {
  const { t } = useLanguage();
  const ZOOM_SCALE = 2;

  // ---------------------------------------------------------------------------
  // 1) ÁLLAPOTOK
  // ---------------------------------------------------------------------------
  // open:
  // Azt tárolja, hogy a modal éppen látszik-e.
  //
  // false -> csak a galéria látható
  // true  -> a modal is nyitva van
  const [open, setOpen] = useState(false);

  // activeIndex:
  // Ez mondja meg, hogy az images tömbből éppen melyik képet mutatjuk a modalban.
  //
  // Példa:
  // 0 -> images[0]
  // 3 -> images[3]
  const [activeIndex, setActiveIndex] = useState(0);

  // loadedImages:
  // Azokat a képeket tároljuk benne, amelyek már ténylegesen betöltődtek.
  // Erre azért van szükség, hogy amíg a kép nem érkezik meg,
  // addig egy egyszerű skeleton / placeholder hátteret tudjunk mutatni.
  //
  // A tömbben magukat a src stringeket tároljuk.
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  // ---------------------------------------------------------------------------
  // 1/b) ZOOM + PAN ÁLLAPOTOK
  // ---------------------------------------------------------------------------
  // isZoomed:
  // A nagy képre kattintva 2x-es zoomot kapcsolunk.
  //
  // panOffset:
  // A kinagyított kép eltolását tárolja.
  // Ezzel tudjuk "a dobozon belül" mozgatni a képet.
  //
  // isDraggingZoom:
  // Azt jelzi, hogy éppen aktív-e a grab / dragging művelet.
  //
  // didDragZoomRef:
  // Segít megkülönböztetni a sima kattintást a valódi húzástól.
  // Így drag után nem kapcsoljuk ki véletlenül azonnal a zoomot.
  const [isZoomed, setIsZoomed] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDraggingZoom, setIsDraggingZoom] = useState(false);
  const zoomViewportRef = useRef<HTMLDivElement | null>(null);
  const zoomImageRef = useRef<HTMLImageElement | null>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const dragOriginRef = useRef({ x: 0, y: 0 });
  const didDragZoomRef = useRef(false);

  // ---------------------------------------------------------------------------
  // 2) HELPER FÜGGVÉNYEK
  // ---------------------------------------------------------------------------
  // Ezeket külön függvényekbe szervezzük, mert így:
  // - olvashatóbb lesz a komponens
  // - kevesebb ismétlődő kód lesz
  // - kezdőként is könnyebb követni, melyik logika mit csinál

  // Egy adott indexű kép megnyitása:
  // - beállítjuk az aktuális képet
  // - megnyitjuk a modalt
  const openAt = (index: number) => {
    setActiveIndex(index);
    setIsZoomed(false);
    setPanOffset({ x: 0, y: 0 });
    setIsDraggingZoom(false);
    setOpen(true);
  };

  // A modal bezárása.
  // Külön függvényként kényelmesebb, mint mindenhol setOpen(false)-t írni.
  const closeModal = () => {
    setOpen(false);
    setIsZoomed(false);
    setPanOffset({ x: 0, y: 0 });
    setIsDraggingZoom(false);
  };

  // Következő kép mutatása.
  // Modulo (%) segítségével körbe tudunk érni a tömb végén.
  //
  // Példa 5 képnél:
  // 0 -> 1
  // 1 -> 2
  // 2 -> 3
  // 3 -> 4
  // 4 -> 0
  const showNextImage = () => {
    setIsZoomed(false);
    setPanOffset({ x: 0, y: 0 });
    setIsDraggingZoom(false);
    setActiveIndex((currentIndex) => (currentIndex + 1) % images.length);
  };

  // Előző kép mutatása.
  // Azért adunk hozzá images.length-et, hogy ne legyen negatív index.
  //
  // Példa 5 képnél:
  // 0 -> 4
  // 4 -> 3
  // 3 -> 2
  const showPrevImage = () => {
    setIsZoomed(false);
    setPanOffset({ x: 0, y: 0 });
    setIsDraggingZoom(false);
    setActiveIndex(
      (currentIndex) => (currentIndex - 1 + images.length) % images.length
    );
  };

  // Ha egy thumbnail vagy nagy kép betöltődött, akkor felvesszük a loaded listába.
  // Így eltüntethetjük a placeholder hátteret.
  const markImageLoaded = (src: string) => {
    setLoadedImages((current) =>
      current.includes(src) ? current : [...current, src]
    );
  };

  // Kényelmi változó:
  // ha a modal nyitva van, gyakran szükség van az aktuális kép src-jére.
  const activeImageSrc = images[activeIndex];

  // ---------------------------------------------------------------------------
  // 2/b) ZOOM SEGÉDFÜGGVÉNYEK
  // ---------------------------------------------------------------------------
  // clampPanOffset:
  // Nem engedi, hogy a kinagyított képet a felhasználó "kihúzza" teljesen
  // a viewportból. A maximális eltolást a kép skálázott méretéből és
  // a látható doboz méretéből számoljuk.
  const clampPanOffset = (nextX: number, nextY: number) => {
    const viewport = zoomViewportRef.current;
    const image = zoomImageRef.current;

    if (!viewport || !image) {
      return { x: nextX, y: nextY };
    }

    const scaledWidth = image.clientWidth * ZOOM_SCALE;
    const scaledHeight = image.clientHeight * ZOOM_SCALE;

    const maxX = Math.max((scaledWidth - viewport.clientWidth) / 2, 0);
    const maxY = Math.max((scaledHeight - viewport.clientHeight) / 2, 0);

    return {
      x: Math.min(maxX, Math.max(-maxX, nextX)),
      y: Math.min(maxY, Math.max(-maxY, nextY)),
    };
  };

  // toggleZoom:
  // Kattintásra be- és kikapcsolja a 2x-es nagyítást.
  // Kikapcsoláskor mindig visszaállítjuk az eltolást is.
  const toggleZoom = () => {
    if (isZoomed) {
      setIsZoomed(false);
      setPanOffset({ x: 0, y: 0 });
      setIsDraggingZoom(false);
      return;
    }

    setIsZoomed(true);
    setPanOffset({ x: 0, y: 0 });
  };

  // Pointer események:
  // Csak zoomolt állapotban aktívak.
  // Ilyenkor a képre ráfogva "grab" módon lehet a kinagyított nézetet mozgatni.
  const handleZoomPointerDown = (event: React.PointerEvent<HTMLImageElement>) => {
    if (!isZoomed) {
      return;
    }

    dragStartRef.current = { x: event.clientX, y: event.clientY };
    dragOriginRef.current = panOffset;
    didDragZoomRef.current = false;
    setIsDraggingZoom(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleZoomPointerMove = (event: React.PointerEvent<HTMLImageElement>) => {
    if (!isZoomed || !isDraggingZoom) {
      return;
    }

    const deltaX = event.clientX - dragStartRef.current.x;
    const deltaY = event.clientY - dragStartRef.current.y;

    const nextOffset = clampPanOffset(
      dragOriginRef.current.x + deltaX,
      dragOriginRef.current.y + deltaY
    );

    if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
      didDragZoomRef.current = true;
    }

    setPanOffset(nextOffset);
  };

  const handleZoomPointerUp = (event: React.PointerEvent<HTMLImageElement>) => {
    if (!isZoomed) {
      return;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    setIsDraggingZoom(false);
  };

  // A kattintás és a drag szétválasztása:
  // ha a felhasználó ténylegesen húzta a képet, akkor az egér felengedése után
  // ne váltson rögtön vissza normál nézetre.
  const handleZoomImageClick = () => {
    if (didDragZoomRef.current) {
      didDragZoomRef.current = false;
      return;
    }

    toggleZoom();
  };

  // ---------------------------------------------------------------------------
  // 3) BILLENTYŰZET-KEZELÉS
  // ---------------------------------------------------------------------------
  // A cél:
  // - Escape -> modal bezárása
  // - ArrowRight -> következő kép
  // - ArrowLeft -> előző kép
  //
  // Ez azért fontos, mert desktopon a billentyűzetes vezérlés nagyon természetes UX.
  // Így a lightbox nem csak egérrel, hanem billentyűvel is kényelmesen használható.
  useEffect(() => {
    // Ha nincs nyitva a modal, nincs értelme globális billentyűfigyelést bekapcsolni.
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }

      if (event.key === "ArrowRight" && images.length > 1) {
        setIsZoomed(false);
        setPanOffset({ x: 0, y: 0 });
        setIsDraggingZoom(false);
        setActiveIndex((currentIndex) => (currentIndex + 1) % images.length);
      }

      if (event.key === "ArrowLeft" && images.length > 1) {
        setIsZoomed(false);
        setPanOffset({ x: 0, y: 0 });
        setIsDraggingZoom(false);
        setActiveIndex(
          (currentIndex) => (currentIndex - 1 + images.length) % images.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup:
    // bezáráskor vagy komponens unmountkor eltávolítjuk a listener-t.
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, images.length]);

  // ---------------------------------------------------------------------------
  // 4) HÁTTÉR GÖRGETÉSÉNEK LETILTÁSA NYITOTT MODALNÁL
  // ---------------------------------------------------------------------------
  // Ha a modal nyitva van, nem akarjuk, hogy a háttérben lévő oldal scrollozódjon.
  //
  // Ez nagyon fontos UX részlet:
  // modal közben a felhasználó figyelme a lightboxon legyen,
  // ne a mögötte lévő oldalon.
  useEffect(() => {
    if (!open) return;

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [open]);

  // ---------------------------------------------------------------------------
  // 5) ÜRES TÖMB ESETE
  // ---------------------------------------------------------------------------
  // Ha nincs kép, ne rendereljünk üres galériát.
  // Ez egy apró, de tiszta védelmi megoldás.
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <section className="mt-6">
      {/* ---------------------------------------------------------------------
          MASONRY JELLEGŰ GALÉRIA
          ---------------------------------------------------------------------
          Miért nem sima gridet használunk?
          - A sima CSS grid akkor működik a legjobban, ha a kártyák magassága közel azonos.
          - Nálad a screenshotok magassága nagyon eltérő lehet.
          - Ilyenkor a hagyományos grid sok üres helyet tud hagyni.

          Ezért itt az "oszlopos masonry" trükköt használjuk:
          - columns-1 / sm:columns-2 / xl:columns-3
          - a képek természetes magasságban jelennek meg
          - a kártyák egymás alá esnek oszloponként

          Fontos osztály:
          - break-inside-avoid
            Ez megakadályozza, hogy egy elem oszloptörésnél "szétszakadjon".
      */}
      <div className="columns-1 gap-6 sm:columns-2 xl:columns-3">
        {images.map((src, index) => (
          <button
            key={`${src}-${index}`}
            type="button"
            onClick={() => openAt(index)}
            aria-label={`Kép megnyitása nagy nézetben: ${index + 1}. kép`}
            className="group mb-6 shadow-lg/30 cursor-zoom-in border-2 border-sky-500 block w-full break-inside-avoid overflow-hidden  bg-stone-200 text-left transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            {/* ---------------------------------------------------------------
                THUMBNAIL KÁRTYA BELSŐ TARTALMA
                ---------------------------------------------------------------
                Itt NINCS fix aspect-video arány.
                Ez most direkt döntés.

                Miért?
                - A masonry egyik lényege pont az, hogy a képek természetes arányban jelenjenek meg.
                - Ha minden képet egyforma képarányú dobozba kényszerítenénk,
                  akkor elveszne a screenshotok változó magasságából adódó előny.
            */}
            <div className="relative w-full">
              {/* -------------------------------------------------------------
                  SIMPLE SKELETON / PLACEHOLDER
                  -------------------------------------------------------------
                  Amíg a kép nem töltődött be, addig egy halvány pulzáló hátteret mutatunk.
                  Ez azért jó, mert:
                  - a felhasználó látja, hogy tartalom érkezik
                  - kevésbé tűnik "villogónak" a betöltés
              */}
              {!loadedImages.includes(src) && (
                <>
                  <div className="absolute inset-0 animate-pulse bg-linear-to-br from-slate-200 via-slate-100 to-slate-200" />
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-slate-300/40 to-transparent" />
                </>
              )}

              {/* -------------------------------------------------------------
                  A THUMBNAIL KÉP
                  -------------------------------------------------------------
                  className magyarázat:
                  - block: biztosan kitölti a saját sorát, nem marad alatta inline rés
                  - w-full: mindig töltse ki a kártya szélességét
                  - h-auto: a magasság a kép eredeti arányából számolódjon
                  - object-cover helyett itt nincs szükség vágásra, ezért nem használjuk
                  - group-hover: enyhe nagyítás + fényerő változás, hogy érezhető legyen az interakció
              */}
              <img
                src={src}
                alt={`Galéria előnézet ${index + 1}`}
                loading="lazy"
                onLoad={() => markImageLoaded(src)}
                className={`block h-auto w-full  transition duration-300 ${loadedImages.includes(src) ? "opacity-100" : "opacity-0"
                  } group-hover:scale-[1.015] group-hover:brightness-90`}
              />

              {/* -------------------------------------------------------------
                  HOVER OVERLAY + IKON
                  -------------------------------------------------------------
                  Ez csak egy finom vizuális visszajelzés desktopon,
                  hogy a thumbnail-re kattintva nagy nézet nyitható.
              */}
              <div className="absolute inset-0 hidden items-center justify-center bg-black/15 opacity-0 transition duration-300 group-hover:opacity-100 md:flex">
                <FiZoomIn className="h-10 w-10 text-white drop-shadow-md" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* ---------------------------------------------------------------------
          MODAL / LIGHTBOX
          ---------------------------------------------------------------------
          Csak akkor rendereljük, ha open === true

          A cél itt NEM egy klasszikus fotó-lightbox, hanem inkább egy
          screenshot viewer:

          - majdnem teljes szélesség
          - desktopon maximum szélesség
          - magas képeknél belső scroll
          - egyszerű, stabil navigáció
          - nincs swipe, nincs drag, nincs touch-action hack
      */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 p-3 sm:p-4 md:p-6"
          onMouseDown={(event) => {
            // Ha közvetlenül az overlay-re kattintunk, bezárjuk a modalt.
            // Ez kényelmes és megszokott lightbox viselkedés.
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Képnézegető"
        >
          {/* -----------------------------------------------------------------
              A MODAL PANEL
              -----------------------------------------------------------------
              Ez maga a "doboz", amiben a fejléc, a képnéző és a mobil navigáció van.
              Nem teljes képernyős fix kép, hanem egy rendezett, középre igazított panel.
          */}
          <div className="mx-auto flex h-[92vh] w-full max-w-[1200px] flex-col overflow-hidden  bg-neutral-950 shadow-2xl ring-1 ring-white/10">
            {/* ---------------------------------------------------------------
                FEJLÉC
                ---------------------------------------------------------------
                Külön fejlécet használunk, mert így:
                - kulturáltabban néz ki
                - ide kerülhet a sorszám
                - ide kerülhet a bezáró gomb
            */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
              <p className="text-sm text-white/75">
                {activeIndex + 1} / {images.length}
              </p>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Modal bezárása"
                className="inline-flex cursor-pointer items-center justify-center  px-3 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {t.projectsPage.modalTexts.close}
              </button>
            </div>

            {/* ---------------------------------------------------------------
                KÉPNÉZŐ TERÜLET
                ---------------------------------------------------------------
                Ez a legfontosabb rész UX szempontból.

                Itt az a cél, hogy a kép:
                - szélességben nagy maradjon
                - ne legyen erőszakkal teljes egészében mindig belepréselve
                - ha túl magas, akkor lehessen lefelé görgetni

                Ezért nem pusztán egy object-contain-es, középre rakott kép van,
                hanem egy görgethető belső viewport.
            */}
            <div className="relative flex-1 overflow-hidden px-3 py-3 sm:px-4 sm:py-4">
              {/* -------------------------------------------------------------
                  DESKTOP OLDALSÓ NAVIGÁCIÓ
                  -------------------------------------------------------------
                  Desktopon kényelmes, ha a nyilak oldalt vannak.
                  Mobilon ez sokszor szűk, ezért ott külön alsó navigációt is adunk.
              */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPrevImage}
                    aria-label="Előző kép"
                    className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 cursor-pointer rounded-full bg-white/85 px-4 py-2 text-3xl text-black/80 shadow-md transition hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-sky-500 md:block"
                  >
                    ‹
                  </button>

                  <button
                    type="button"
                    onClick={showNextImage}
                    aria-label="Következő kép"
                    className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 cursor-pointer rounded-full bg-white/85 px-4 py-2 text-3xl text-black/80 shadow-md transition hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-sky-500 md:block"
                  >
                    ›
                  </button>
                </>
              )}

              {/* -------------------------------------------------------------
                  SCROLLOZHATÓ KÉPKONTÉNER
                  -------------------------------------------------------------
                  Ez oldja meg a magas screenshotok problémáját.

                  Mi történik itt?
                  - a wrapper rendelkezik saját függőleges görgetéssel
                  - a kép nagy szélességben jelenhet meg
                  - ha túl magas, lefelé olvasható marad
                  - nem lesz hajszálvékonyra összezsugorítva

                  Ez screenshotoknál sokkal jobb, mint egy klasszikus fotós lightbox.
              */}
              <div
                ref={zoomViewportRef}
                className={`h-full bg-black/20 p-2 sm:p-3 ${isZoomed ? "overflow-hidden" : "overflow-y-auto overflow-x-auto"
                  }`}
              >
                {/* -----------------------------------------------------------
                    ZOOM VIEWPORT
                    -----------------------------------------------------------
                    Normál állapotban a wrapper görgethető, így a magas screenshotok
                    kényelmesen olvashatók maradnak.

                    Zoomolt állapotban a scrollt letiltjuk, és helyette a képet
                    közvetlenül pointer draggel mozgatjuk a dobozon belül.
                */}
                <div className="mx-auto w-full max-w-[1000px]">
                  {/* ---------------------------------------------------------
                      A NAGY KÉP
                      ---------------------------------------------------------
                      - w-full: töltse ki a néző szélességét
                      - h-auto: aránytartó maradjon
                      - block + mx-auto: tiszta középre igazítás
                      - select-none: ne lehessen furcsán kijelölni húzogatás közben
                      - onClick: zoom be / ki
                      - onPointer*: grab alapú mozgatás zoomolt állapotban
                      - transform: translate + scale kombináció a 2x-es zoomhoz
                  */}
                  <img
                    ref={zoomImageRef}
                    src={activeImageSrc}
                    alt={`Nagy nézet ${activeIndex + 1}. kép`}
                    onLoad={() => markImageLoaded(activeImageSrc)}
                    onClick={handleZoomImageClick}
                    onPointerDown={handleZoomPointerDown}
                    onPointerMove={handleZoomPointerMove}
                    onPointerUp={handleZoomPointerUp}
                    onPointerCancel={handleZoomPointerUp}
                    className={`mx-auto block h-auto w-full select-none border border-white/10 transition-transform duration-200 ${isZoomed
                        ? isDraggingZoom
                          ? "cursor-grabbing"
                          : "cursor-grab"
                        : "cursor-zoom-in"
                      }`}
                    style={{
                      transform: isZoomed
                        ? `translate(${panOffset.x}px, ${panOffset.y}px) scale(${ZOOM_SCALE})`
                        : "translate(0px, 0px) scale(1)",
                      transformOrigin: "center center",
                    }}
                    draggable={false}
                  />
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------------------
                MOBIL NAVIGÁCIÓ
                ---------------------------------------------------------------
                Mobilon a szélső oldalsó nyilak gyakran kényelmetlenek vagy túl közel
                esnek a képtartalomhoz, ezért itt külön alsó navigációs sávot adunk.

                Desktopon ezt elrejthetjük, mert ott az oldalsó nyilak kényelmesebbek.
            */}
            {images.length > 1 && (
              <div className="flex items-center justify-center gap-3 border-t border-white/10 px-4 py-3 md:hidden">
                <button
                  type="button"
                  onClick={showPrevImage}
                  aria-label="Előző kép"
                  className="min-w-28 cursor-pointer  bg-white/90 px-4 py-3 text-sm font-medium text-black transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  {t.projectsPage.modalTexts.previous}
                </button>

                <button
                  type="button"
                  onClick={showNextImage}
                  aria-label="Következő kép"
                  className="min-w-28 cursor-pointer bg-white/90 px-4 py-3 text-sm font-medium text-black transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  {t.projectsPage.modalTexts.next}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
