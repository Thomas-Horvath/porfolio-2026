"use client";
// ✅ Ez jelzi a Next.js-nek, hogy ez KLIENS komponens.
// Miért kell? Mert useState/useEffect csak kliensen fut (böngészőben).

import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
    // A mű címe (alt szövegekhez + aria labelhez)
    images: string[]; // A galériában megjelenő képek URL-jei
    // Opcionális: a mű fő képe, ha külön szeretnénk kezelni
};


export default function WorkGalleryClient({ images }: Props) {
    // ✅ open: vezérli, hogy a modal megjelenjen-e
    // false = nincs modal, true = modal látható
    const [open, setOpen] = useState(false);


    // ✅ activeIndex: azt tárolja, hogy a képtömb melyik indexű elemét mutassuk a modalban
    // 0 = images[0], 1 = images[1], stb.
    const [activeIndex, setActiveIndex] = useState(0);

    // ✅ openAt(index): thumbnail kattintáskor hívjuk
    // 1) beállítjuk, hogy melyik képet akarjuk megnyitni
    // 2) megnyitjuk a modalt
    const openAt = (index: number) => {
        setActiveIndex(index);
        setOpen(true);
    };


    // ✅ close(): modal bezárása több helyről (ESC, háttér katt, X gomb)
    const close = () => setOpen(false);

    // ---------------------------
    // 1) BILLENTYŰZET KEZELÉS: ESC + nyilak
    // ---------------------------
    useEffect(() => {
        // ✅ Ha a modal nincs nyitva, nem akarunk billentyű eseményeket figyelni.
        // Így nem fogsz "véletlenül" képeket léptetni a háttérben.
        if (!open) return;

        // ✅ onKeyDown: globális billentyű eseménykezelő
        const onKeyDown = (e: KeyboardEvent) => {
            // ESC = zárjuk be a modalt
            if (e.key === "Escape") close();

            // JOBB nyíl: következő kép
            // setActiveIndex((i) => ...) = "functional update" -> mindig a legfrissebb i-vel számol
            // (i + 1) % images.length -> körbeforgatás:
            //   ha a végén vagy, visszaugrik 0-ra.
            if (e.key === "ArrowRight")
                setActiveIndex((i) => (i + 1) % images.length);

            // BAL nyíl: előző kép
            // (i - 1 + images.length) % images.length -> körbeforgatás negatív index nélkül:
            //   i=0 esetén: (0 - 1 + len) % len = (len-1) -> utolsó kép
            if (e.key === "ArrowLeft")
                setActiveIndex((i) => (i - 1 + images.length) % images.length);
        };

        // ✅ Feliratkozunk a keydown eseményre
        window.addEventListener("keydown", onKeyDown);

        // ✅ Cleanup: amikor a modal bezár / komponens unmount, levesszük a listenert
        // Miért fontos? Különben halmozódnának a listenerek és duplán/triplán reagálna.
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, images.length]);
    // dependencies:
    // open: csak nyitott modal esetén aktív
    // images.length: ha a képszám változik, a logika is frissüljön

    // ---------------------------
    // 2) SCROLL LOCK: modal nyitásakor ne lehessen a háttérben scrollozni
    // ---------------------------
    useEffect(() => {
        // ✅ Csak nyitott modal esetén kell tiltani a scrollt
        if (!open) return;

        // ✅ Elmentjük az eredeti overflow értéket (nehogy felülírjunk egy korábbi beállítást)
        const prev = document.body.style.overflow;

        // ✅ Tiltjuk a scrollt
        document.body.style.overflow = "hidden";

        // ✅ Cleanup: bezáráskor visszaállítjuk az eredetit
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);


    useEffect(() => {
        if (!open) return;

        let startX = 0;
        let isDragging = false;

        const onMouseDown = (e: MouseEvent) => {
            startX = e.clientX;
            isDragging = true;
        };

        const onMouseUp = (e: MouseEvent) => {
            if (!isDragging) return;
            isDragging = false;

            const diff = startX - e.clientX;

            if (Math.abs(diff) < 50) {
                // ez sima kattintás volt, nem drag → hagyjuk a többi handler dolgozni
                return;
            }

            // drag volt → megállítjuk hogy más handler ne fusson
            e.stopPropagation();

            if (diff > 0) {
                setActiveIndex((i) => (i + 1) % images.length);
            } else {
                setActiveIndex((i) => (i - 1 + images.length) % images.length);
            }
        };

        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);

        return () => {
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, [open, images.length]);

    useEffect(() => {
        if (!open) return;

        let startX = 0;

        const onTouchStart = (e: TouchEvent) => {
            startX = e.touches[0].clientX;
        };

        const onTouchEnd = (e: TouchEvent) => {
            const diff = startX - e.changedTouches[0].clientX;

            if (Math.abs(diff) < 50) return; // túl rövid swipe, figyelmen kívül hagyjuk

            if (diff > 0) {
                // balra húzás → következő kép
                setActiveIndex((i) => (i + 1) % images.length);
            } else {
                // jobbra húzás → előző kép
                setActiveIndex((i) => (i - 1 + images.length) % images.length);
            }
        };

        window.addEventListener("touchstart", onTouchStart);
        window.addEventListener("touchend", onTouchEnd);

        return () => {
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchend", onTouchEnd);
        };
    }, [open, images.length]);

    return (
        <section>
            <h2 className="mb-6 text-2xl text-stone-800">Képek</h2>

            {/* ---------------------------
          THUMBNAIL GRID
          - images tömbön végigmegyünk és gombokat készítünk
          - gomb = accessibility: fókuszolható, Enter-rel is aktiválható
         --------------------------- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((src, i) => (
                    <button
                        key={src + i} // ✅ egyedi key (src lehet ismétlődő, ezért i is kell)
                        type="button"
                        onClick={() => openAt(i)} // ✅ kattintásra megnyitjuk a modalt a megfelelő index-szel
                        className="overflow-hidden bg-stone-200 focus:outline-none group cursor-pointer"

                    >
                        {/* ✅ Next/Image fill: a szülő div "relative", így a kép kitölti a dobozt
                object-cover: szépen kivágja
                object-top: felülről igazítja a vágást
                hover: finom zoom */}
                        <Image
                            src={src}
                            alt={`${src} – kép ${i + 1}`}
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-full h-auto object-cover object-top"
                        />
                    </button>
                ))}
            </div>

            {/* ---------------------------
          MODAL (csak akkor renderelődik, ha open === true)
          - overlay: full screen sötét háttér
          - kattintás a háttérre: zárás
          - a belső dobozon stopPropagation, hogy a belső kattintás ne zárjon
         --------------------------- */}
            {open && (

                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90"
                    onMouseUp={(e) => { if (e.target === e.currentTarget) close(); }}
                // ✅ katt a háttérre zárás:
                // mivel ez az overlay, itt zárunk.
                // role="dialog"
                // aria-modal="true"
                >
                    <div
                        className="relative w-full max-w-350 h-[80vh] flex items-center justify-center"

                    onMouseDown={(e) => e.stopPropagation()}
                    // ✅ stopPropagation:
                    // Ha a belső dobozra kattintasz, az esemény "buborékolna" az overlayre,
                    // és az overlay close()-t hívna -> bezárná a modalt.
                    // stopPropagation megállítja ezt, így a belső kattintások nem zárnak.
                    >
                        {/* X gomb */}

                        <button
                            onMouseDown={(e) => e.stopPropagation()}
                            onClick={close}
                            className="absolute text-4xl right-0 text-white/90 hover:text-white transition -top-12 cursor-pointer"
                            aria-label="Bezárás"
                            type="button"
                        >
                            ✕
                        </button>

                        {/* ✅ A nagy kép: images[activeIndex] alapján jelenik meg
                object-contain: teljes kép látszik (nem vágja), arányt tartva */}
                        <Image
                            src={images[activeIndex]}
                            alt={`${images[activeIndex]} – nagy nézet`}
                            width={1200}
                            height={1200}
                            className="max-w-full max-h-[80vh] w-auto h-auto object-contain"
                            priority
                        // onMouseDown={(e) => e.stopPropagation()}
                        />

                        {/* ---------------------------
                NAVIGÁCIÓ GOMBOK
                - bal: előző kép (körbeforgással)
                - jobb: következő kép (körbeforgással)
               --------------------------- */}

                        {/* Előző */}

                        {images.length > 1 &&
                            <>
                                <button
                                    onMouseDown={(e) => e.stopPropagation()}
                                    type="button"
                                    onClick={() =>
                                        setActiveIndex((i) => (i - 1 + images.length) % images.length)
                                    }
                                    // (i - 1 + len) % len:
                                    // - ha i=0, akkor (0-1+len)=len-1 -> utolsó kép
                                    className="absolute left-0 top-1/2 hidden lg:block
                         pb-4 pt-2 px-6 rounded-full
                         text-4xl
                         bg-white/80 hover:text-black text-black/80
                         cursor-pointer transition
                         -translate-y-1/2"
                                    aria-label="Előző kép"
                                >
                                    ‹
                                </button>


                                <button
                                    onMouseDown={(e) => e.stopPropagation()}
                                    type="button"
                                    onClick={() =>
                                        setActiveIndex((i) => (i + 1) % images.length)
                                    }
                                    // (i + 1) % len:
                                    // - ha a végén vagy (i=len-1), akkor (len) % len = 0 -> vissza az elejére
                                    className="absolute right-0 top-1/2
                         pb-4 pt-2 px-6 rounded-full hidden lg:block
                         text-4xl
                         bg-white/80 hover:text-black text-black/80
                         cursor-pointer
                         transition
                         -translate-y-1/2"
                                    aria-label="Következő kép"
                                >
                                    ›
                                </button>
                            </>
                        }
                    </div>
                </div>
            )}
        </section>
    );
}
