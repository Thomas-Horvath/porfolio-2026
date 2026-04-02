const skeletonAccents = [
    "from-sky-200 via-sky-100 to-cyan-100",
    "from-violet-200 via-purple-100 to-indigo-100",
    "from-emerald-200 via-green-100 to-teal-100",
    "from-orange-200 via-amber-100 to-yellow-100",
] as const;

export default function ProjectCardCompactSkeleton({ index }: { index: number }) {
    const accent = skeletonAccents[index % skeletonAccents.length];

    return (
        <div className="overflow-hidden border border-slate-200 bg-white shadow-lg">
            <div className={`h-2.5 w-full bg-linear-to-r ${accent}`} />

            <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                <div className="absolute inset-0 animate-pulse bg-linear-to-br from-slate-200 via-slate-100 to-slate-200" />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-slate-300/35 to-transparent" />
                <div className="absolute right-4 top-4 h-10 w-10 border border-white/50 bg-white/70" />
            </div>

            <div className="flex h-full flex-col px-5 py-5">
                <div className="mb-6">
                    <div className="flex items-start justify-between gap-4">
                        <div className="h-6 w-3/4 animate-pulse bg-slate-200" />
                        <div className="mt-1 h-2 w-2 shrink-0 animate-pulse rounded-full bg-slate-300" />
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                        <span className="h-6 w-16 animate-pulse border border-slate-200 bg-sky-50/70" />
                        <span className="h-6 w-20 animate-pulse border border-slate-200 bg-sky-50/70" />
                        <span className="h-6 w-14 animate-pulse border border-slate-200 bg-sky-50/70" />
                    </div>
                </div>

                <div className="mt-auto h-10 w-full animate-pulse border border-slate-200 bg-slate-50" />
            </div>
        </div>
    );
}
