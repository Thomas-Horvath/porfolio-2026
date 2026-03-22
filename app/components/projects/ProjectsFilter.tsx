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

        return (
          <button
            key={filter}
            onClick={() => onChange(filter)}
            className={` border px-5 py-2 text-sm font-medium transition cursor-pointer ${
              isActive
                ? "border-sky-600 bg-sky-600 text-white shadow-sm"
                : "border-slate-200 bg-white text-slate-700 hover:border-sky-200 hover:bg-sky-50"
            }`}
          >
            {labels[filter]}
          </button>
        );
      })}
    </div>
  );
}