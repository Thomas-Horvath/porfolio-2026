"use client";
// ↑ Ez kötelező, mert ez a komponens useState-et, useEffect-et és event handlereket használ.
// Az App Routerben a fájlok alapból szerver komponensek.
// Ha böngészős interakció kell (state, kattintás, modal, billentyűzetfigyelés),
// akkor kliens komponenssé kell tenni.

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiZoomIn } from "react-icons/fi";

// -----------------------------
// Props típus
// -----------------------------
//* A komponens kívülről egy images tömböt vár. (a href értékek lesznek ezek!!!!!)
//* pl: [ "/works/gitart/1.webp", "/works/gitart/2.webp", "/works/gitart/3.webp", "/works/gitart/4.webp", "/works/gitart/5.webp", "/works/gitart/6.webp" ]
// Ez a tömb a galériában megjelenő képek útvonalait tartalmazza.
type Props = {
    images: string[];
};

export default function WorkGalleryClient({ images }: Props) {
    // -----------------------------
    // 1. MODAL NYITOTTSÁG STATE
    // -----------------------------
    // open = false → a nagy képes modal nincs nyitva
    // open = true  → a modal látható
    const [open, setOpen] = useState(false);

    // -----------------------------
    // 2. AKTUÁLIS KÉP INDEXE
    // -----------------------------
    // Ez mondja meg, hogy a képtömbből melyik elemet mutassuk nagyban.
    // Példa:
    // activeIndex = 0 → images[0]
    // activeIndex = 1 → images[1]
    const [activeIndex, setActiveIndex] = useState(0);
    const [loadedImages, setLoadedImages] = useState<string[]>([]);

    // -----------------------------
    // 3. DRAG / SWIPE KEZDŐPOZÍCIÓ TÁROLÁSA
    // -----------------------------
    // useRef-et akkor használunk, ha egy értéket szeretnénk tárolni
    // úgy, hogy az NE okozzon újrarenderelést.
    //
    // Itt arra kell, hogy eltároljuk, honnan indult a pointer (egér / érintés).
    // Például pointerdown-nál eltesszük az X koordinátát.
    const startXRef = useRef<number | null>(null);

    // -----------------------------
    // 4. HÚZÁS FOLYAMATBAN VAN-E?
    // -----------------------------
    // Ez is ref, mert csak technikai flag.
    // Nem UI állapot, tehát nem kell belőle render.
    const draggingRef = useRef(false);

    // -----------------------------
    // 5. KÉP MEGNYITÁSA
    // -----------------------------
    // Ha egy thumbnail-re kattintunk:
    // - beállítjuk, melyik képet akarjuk megnyitni
    // - majd megnyitjuk a modalt
    const openAt = (index: number) => {
        setActiveIndex(index);
        setOpen(true);
    };

    // -----------------------------
    // 6. MODAL BEZÁRÁSA
    // -----------------------------
    // Egyszerű helper függvény, hogy ne kelljen mindenhol setOpen(false)-t írni.
    const close = () => setOpen(false);

    // ---------------------------------------------------
    // 7. BILLENTYŰZET KEZELÉS
    // ---------------------------------------------------
    // Cél:
    // - ESC bezárja a modalt
    // - Jobb nyíl → következő kép
    // - Bal nyíl  → előző kép
    useEffect(() => {
        // Ha a modal nincs nyitva, nincs értelme globálisan billentyűzetet figyelni.
        if (!open) return;

        // keydown eseménykezelő
        const onKeyDown = (e: KeyboardEvent) => {
            // ESC → zárás
            if (e.key === "Escape") close();

            // Jobb nyíl → következő kép
            if (e.key === "ArrowRight") {
                // Functional update:
                // Mindig a legfrissebb i értékkel dolgozik.
                setActiveIndex((i) => (i + 1) % images.length);
                // Miért működik ez?
                // Ha például 5 kép van:
                // 0 -> 1
                // 1 -> 2
                // 2 -> 3
                // 3 -> 4
                // 4 -> (4 + 1) % 5 = 0
                // Tehát a végéről visszaugrik az elejére.
            }

            // Bal nyíl → előző kép
            if (e.key === "ArrowLeft") {
                setActiveIndex((i) => (i - 1 + images.length) % images.length);
                // Miért kell hozzáadni images.length-et?
                // Mert ha i = 0, akkor i - 1 = -1 lenne.
                // Például 5 képnél:
                // (0 - 1 + 5) % 5 = 4
                // Vagyis az első képről visszamegy az utolsóra.
            }
        };

        // Feliratkozás a window keydown eseményre
        window.addEventListener("keydown", onKeyDown);

        // Cleanup:
        // Amikor a modal bezáródik vagy a komponens megszűnik,
        // levesszük a listenert, hogy ne maradjon "ott ragadva".
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, images.length]);

    // ---------------------------------------------------
    // 8. HÁTTÉR GÖRGETÉS LETILTÁSA MODAL NYITÁSKOR
    // ---------------------------------------------------
    // Ha modal nyitva van, nem akarjuk, hogy a háttérben lévő oldal görögjön.
    useEffect(() => {
        if (!open) return;

        // Elmentjük az eredeti overflow értéket
        const prev = document.body.style.overflow;

        // Letiltjuk a scrollt
        document.body.style.overflow = "hidden";

        // Bezáráskor visszaállítjuk az eredeti állapotot
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    // ---------------------------------------------------
    // 9. POINTER DOWN
    // ---------------------------------------------------
    // Ez indul el, amikor:
    // - egérrel lenyomunk a modal tartalmán
    // - vagy ujjal megérintjük (pointer events ezt is kezeli)
    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        // Eltesszük, honnan indult a húzás vízszintesen
        startXRef.current = e.clientX;

        // Bejelöljük, hogy húzás folyamatban van
        draggingRef.current = true;
    };

    // ---------------------------------------------------
    // 10. POINTER UP
    // ---------------------------------------------------
    // Ez akkor fut, amikor:
    // - elengedjük az egeret
    // - vagy felengedjük az ujjunkat
    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        // Ha valamiért nincs aktív drag, nincs mit számolni
        if (!draggingRef.current || startXRef.current === null) return;

        // Kiszámoljuk, mennyit mozdult a pointer vízszintesen
        const diff = startXRef.current - e.clientX;

        // Lezárjuk a drag állapotot
        draggingRef.current = false;
        startXRef.current = null;

        // Ha túl kicsi volt a mozgás, azt kattintásnak tekintjük, nem swipe-nak
        // 50 px egy egyszerű küszöbérték.
        if (Math.abs(diff) < 50) return;

        // Ha pozitív a diff:
        // startX nagyobb volt, mint a végső X
        // vagyis balra húztunk → következő kép
        if (diff > 0) {
            setActiveIndex((i) => (i + 1) % images.length);
        } else {
            // Ha negatív a diff:
            // jobbra húztunk → előző kép
            setActiveIndex((i) => (i - 1 + images.length) % images.length);
        }
    };

    // ---------------------------------------------------
    // 11. POINTER CANCEL
    // ---------------------------------------------------
    // Vannak helyzetek, amikor a pointer megszakad:
    // például a böngésző vagy az eszköz másképp kezeli az inputot.
    // Ilyenkor takarítjuk a drag állapotot.
    const handlePointerCancel = () => {
        draggingRef.current = false;
        startXRef.current = null;
    };

    const markImageLoaded = (src: string) => {
        setLoadedImages((current) => (
            current.includes(src) ? current : [...current, src]
        ));
    };

    return (
        <section className="mt-6">
            {/* -----------------------------------------
          THUMBNAIL GRID
          -----------------------------------------
          Itt jelenítjük meg a kis előnézeti képeket.
          A felhasználó ezekre kattintva nyitja meg a modalt.
      */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {images.map((src, i) => (
                    <button
                        key={src + i}
                        type="button"
                        onClick={() => openAt(i)}
                        className="group  overflow-hidden bg-stone-200 cursor-zoom-in"
                    >
                        <div className="relative w-full aspect-video">
                            {!loadedImages.includes(src) && (
                                <>
                                    <div className="absolute inset-0 animate-pulse bg-linear-to-br from-slate-200 via-slate-100 to-slate-200" />
                                    <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-slate-300/35 to-transparent" />
                                </>
                            )}
                            <Image
                                src={src}
                                alt={`kép ${i + 1}`}
                                fill
                                className={`object-cover object-top transition duration-300 group-hover:scale-105 group-hover:brightness-75 ${loadedImages.includes(src) ? "opacity-100" : "opacity-0"}`}
                                onLoad={() => markImageLoaded(src)}
                            />
                            {/* Hover overlay */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                                <FiZoomIn className="text-white w-10 h-10" />
                            </div>
                        </div>

                    </button>
                ))}
            </div>

            {/* -----------------------------------------
          MODAL
          -----------------------------------------
          Csak akkor rendereljük ki, ha open === true
      */}
            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
                    onMouseUp={(e) => {
                        // Ha közvetlenül az overlay-re kattintottunk,
                        // akkor bezárjuk a modalt.
                        // e.currentTarget = maga az overlay div
                        // e.target = amire ténylegesen kattintottunk
                        if (e.target === e.currentTarget) close();
                    }}
                >
                    <div
                        className="relative flex h-[80vh] w-full max-w-350 items-center justify-center"
                        onPointerDown={handlePointerDown}
                        onPointerUp={handlePointerUp}
                        onPointerCancel={handlePointerCancel}
                        style={{ touchAction: "pan-y" }}
                    // touchAction: "pan-y"
                    // Ezzel azt mondjuk a böngészőnek:
                    // a függőleges pan kezelését hagyjuk meg,
                    // de a vízszintes mozdulatokat mi szeretnénk kezelni.
                    // Ez főleg touch/swipe UX szempontból hasznos.
                    >
                        {/* Bezáró gomb */}
                        <button
                            onClick={close}
                            className="absolute -top-12 right-0 cursor-pointer text-4xl text-white/90 transition hover:text-white"
                            aria-label="Bezárás"
                            type="button"
                        >
                            ✕
                        </button>

                        {/* A nagy kép */}
                        <Image
                            src={images[activeIndex]}
                            alt={`Kép ${activeIndex + 1}`}
                            width={1200}
                            height={1200}
                            className="max-h-[80vh] h-auto w-auto border border-sky-100 max-w-full select-none object-contain"
                            priority
                            draggable={false}
                        // select-none: ne lehessen kijelölgetni húzás közben
                        // object-contain: a teljes kép látszódjon, ne vágódjon le
                        />

                        {/* Navigációs nyilak csak akkor, ha több mint 1 kép van */}
                        {images.length > 1 && (
                            <>
                                {/* Előző */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setActiveIndex((i) => (i - 1 + images.length) % images.length)
                                    }
                                    className="absolute left-0 top-1/2 hidden -translate-y-1/2 cursor-pointer rounded-full bg-white/80 px-6 pb-4 pt-2 text-4xl text-black/80 transition hover:text-black lg:block"
                                    aria-label="Előző kép"
                                >
                                    ‹
                                </button>

                                {/* Következő */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setActiveIndex((i) => (i + 1) % images.length)
                                    }
                                    className="absolute right-0 top-1/2 hidden -translate-y-1/2 cursor-pointer rounded-full bg-white/80 px-6 pb-4 pt-2 text-4xl text-black/80 transition hover:text-black lg:block"
                                    aria-label="Következő kép"
                                >
                                    ›
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
