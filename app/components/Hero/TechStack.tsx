


import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaJs,
  FaDatabase,
  FaDocker,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiMongodb,
  SiTailwindcss,
  SiExpress,
} from "react-icons/si";

const stackItems = [
  { label: "React", icon: <FaReact className="text-sky-500" /> },
  { label: "Next.js", icon: <SiNextdotjs className="text-slate-800" /> },
  { label: "TypeScript", icon: <SiTypescript className="text-sky-600" /> },
  { label: "JavaScript", icon: <FaJs className="text-amber-400" /> },
  { label: "Node.js", icon: <FaNodeJs className="text-green-600" /> },
  { label: "Express", icon: <SiExpress className="text-slate-700" /> },
  { label: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" /> },
  { label: "SQL", icon: <FaDatabase className="text-slate-600" /> },
  { label: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
  { label: "Git", icon: <FaGitAlt className="text-orange-500" /> },
  { label: "Docker", icon: <FaDocker className="text-sky-500" /> },
];

function MarqueeContent() {
  return (
    <>
      {stackItems.map((item, index) => (
        <div
          key={`${item.label}-${index}`}
          className="
            inline-flex h-full shrink-0 items-center justify-center
            gap-2 px-4
            sm:gap-2.5 sm:px-5
            lg:gap-3 lg:px-6
          "
        >
          <span
            className="
              flex items-center justify-center
              text-base
              sm:text-lg
              lg:text-2xl
            "
          >
            {item.icon}
          </span>

          <span
            className="
              flex items-center
              text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-700
              sm:text-xs
              lg:text-sm
            "
          >
            {item.label}
          </span>
        </div>
      ))}
    </>
  );
}

export default function TechStack() {
  return (
    <div
      className="relative
        relativeborder-20 w-full overflow-hidden
        border-y border-sky-200/70
        bg-white/40 z-10
        shadow-[0_8px_30px_rgba(125,211,252,0.12)]
        backdrop-blur-md
        [-webkit-mask-image:linear-gradient(to_right,transparent,black_6rem,black_calc(100%-6rem),transparent)]
        [mask-image:linear-gradient(to_right,transparent,black_6rem,black_calc(100%-6rem),transparent)]
        lg:[-webkit-mask-image:linear-gradient(to_right,transparent,black_10rem,black_calc(100%-10rem),transparent)]
        lg:[mask-image:linear-gradient(to_right,transparent,black_10rem,black_calc(100%-10rem),transparent)]
      "
    >
      <div
        className="
          relative flex items-center
          h-12
          sm:h-14
          lg:h-20
        "
      >
        <div className="flex h-full w-max items-center whitespace-nowrap animate-tech-marquee">
          <MarqueeContent />
          <MarqueeContent />
        </div>
      </div>
    </div>
  );
}