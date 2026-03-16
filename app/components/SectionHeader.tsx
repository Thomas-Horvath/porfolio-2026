type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  maxWidth?: "sm" | "md" | "lg";
};

const maxWidthClasses = {
  sm: "max-w-2xl",
  md: "max-w-3xl",
  lg: "max-w-4xl",
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
      className={["max-w-200  mb-20 ",
        maxWidthClasses[maxWidth],
        isCenter ? "mx-auto text-center" : "text-left",
      ].join(" ")}
    >
      {eyebrow && (
        <p className="mb-4 text-lg font-semibold uppercase tracking-[0.22em] text-sky-600 sm:text-sm">
          {eyebrow}
        </p>
      )}

      <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
        {title}
      </h2>

      {description && (
        <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}