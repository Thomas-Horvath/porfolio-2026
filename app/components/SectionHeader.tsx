import RevealOnScroll from "./RevealOnScroll";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  maxWidth?: "sm" | "md" | "lg" | "xl";
};

const maxWidthClasses = {
  sm: "max-w-2xl",
  md: "max-w-3xl",
  lg: "max-w-4xl",
  xl: "max-w-5xl",
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  maxWidth = "md",
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={["  mb-20 ",
        maxWidthClasses[maxWidth],
        isCenter ? "mx-auto text-center" : "text-left",
      ].join(" ")}
    >
      {eyebrow && (
        <RevealOnScroll delay={0}>
          <p className="mb-4 text-lg font-semibold uppercase tracking-[0.22em] text-sky-600 sm:text-sm">
            {eyebrow}
          </p>
        </RevealOnScroll>
      )}

      <RevealOnScroll delay={80}>
        <h2 className="heading-font text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          {title}
        </h2>
      </RevealOnScroll>

      {description && (
        <RevealOnScroll delay={160}>
          <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
            {description}
          </p>
        </RevealOnScroll>
      )}
    </div>
  );
}
