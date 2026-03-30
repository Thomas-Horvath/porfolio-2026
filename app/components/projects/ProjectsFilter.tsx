"use client";

type FilterValue = "all" | "frontend" | "backend" | "database" | "fullstack";

type Props = {
  activeFilter: FilterValue;
  onChange: (value: FilterValue) => void;
  labels: {
    all: string;
    frontend: string;
    backend: string;
    database: string;
    fullstack: string;
  };
};

const filterOptions: FilterValue[] = ["all", "frontend", "backend", "database", "fullstack"];

export default function ProjectsFilter({
  activeFilter,
  onChange,
  labels,
}: Props) {





  return (
    <div className="mt-10 flex flex-wrap gap-3">
      {filterOptions.map((filter) => {
        const isActive = activeFilter === filter;
        const colorMap: Record<string, string> = {
          frontend: "bg-cyan-400 border-cyan-400 text-slate-800",
          backend: "bg-indigo-400 border-indigo-400 text-white",
          database: "bg-teal-400 border-teal-400 text-slate-800",
          fullstack: "bg-amber-400 border-amber-400 text-slate-800",
        };

        const color = colorMap[activeFilter] ?? "bg-sky-600 border-sky-600 text-white";

        console.log(filter);
        return (
          <button
            key={filter}
            onClick={() => onChange(filter)}
            className={` border px-5 py-2 text-sm font-medium transition cursor-pointer ${isActive
              ? `${color}  shadow-sm`
              : `border-slate-200 bg-white text-slate-700 hover:border-sky-200 hover:bg-sky-50`
              }`}
          >
            {labels[filter]}
          </button>
        );
      })}
    </div>
  );
}