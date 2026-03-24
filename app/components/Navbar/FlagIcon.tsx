type FlagProps = {
  lang: "hu" | "en";
};

export default function FlagIcon({ lang }: FlagProps) {
  if (lang === "hu") {
    return (
      <svg viewBox="0 0 3 2" className="w-full h-full " preserveAspectRatio="none">
        <rect width="3" height="2" fill="#fff" />
        <rect width="3" height="0.666" y="0" fill="#ce2939" />
        <rect width="3" height="0.666" y="1.333" fill="#477050" />
      </svg>
    );
  }

  // EN → UK egyszerűsített
  return (
    <svg   viewBox="0 0 60 30" className="w-full h-full" preserveAspectRatio="none">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
      <rect x="25" width="10" height="30" fill="#fff" />
      <rect y="10" width="60" height="10" fill="#fff" />
      <rect x="27" width="6" height="30" fill="#C8102E" />
      <rect y="12" width="60" height="6" fill="#C8102E" />
    </svg>
  );
}