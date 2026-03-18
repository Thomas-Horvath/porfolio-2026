'use client';
import  { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const PageUpBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200 && window.innerWidth > 772) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
<button
  onClick={scrollToTop}
  title="Ugrás a lap tetejére"
  className={`fixed bottom-6 right-6 z-50 shadow-lg hover:scale-110
  flex cursor-pointer rounded-full bg-sky-600/90 p-4
  transition-all duration-500 ease-out
  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"}
  `}
>
  <FaArrowUp className="text-3xl text-white/80" />
</button>
  );
};

export default PageUpBtn;




/** notes 
 1️⃣ Ha nem törölnénk az eseményfigyelőt, mi történne?

    Az useEffect minden egyes komponens újrarenderelésekor új scroll eseményfigyelőt adna hozzá.
    Ez azt jelentené, hogy minden egyes render után egy új eseményfigyelő csatlakozna, és a régiek ott maradnának.
    Idővel ezek felhalmozódnának, és felesleges számításokat végeznének, ami lassíthatja az alkalmazást és memória-szivárgást okozhat.

2️⃣ Miért működik így az useEffect?

    Az useEffect egy „mellékhatás”-kezelő Reactben, amelyet például API hívásokra, eseményfigyelők hozzáadására stb. használunk.
    Az useEffect visszatérési értékének (return utáni kódrészlet) az a szerepe, hogy takarítson, mielőtt a komponens újra renderelődne vagy eltűnne.

3️⃣ Hogyan működik a takarítás (cleanup)?

    Amikor a komponens újra renderelődik, React először lefuttatja a korábbi useEffect törlési funkcióját, hogy eltávolítsa a már nem szükséges eseményfigyelőket.
    Ezután újra létrehozza a scroll figyelőt az új handleScroll függvénnyel.
    Ha a komponens unmountolódik (eltűnik a DOM-ból), akkor véglegesen eltávolítja az eseményfigyelőt.

4️⃣ Mikor fut le a törlés (return)?

✅ Komponens unmountolásakor (amikor eltűnik a DOM-ból)
✅ Újrarenderelés előtt (hogy ne legyen duplikált eseményfigyelő)



*/