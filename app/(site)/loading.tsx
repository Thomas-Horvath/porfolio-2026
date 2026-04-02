export default function Loading() {
    return (
        <div className="fixed inset-0 z-40 overflow-hidden bg-slate-50">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.14),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.10),transparent_34%)]" />

            <div className="relative flex min-h-screen items-center justify-center px-6">
                <div className="relative flex h-32 w-32 items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-6 border-sky-200/80 border-t-sky-500 animate-spin" />
                     <div className="absolute inset-2 rounded-full border border-sky-200/60 bg-white/60" />
                    <div className="relative flex h-22 w-22 items-center justify-center rounded-full border border-sky-100 bg-white text-sky-600 text-2xl font-semibold tracking-[0.18em] shadow-[0_0_40px_rgba(56,189,248,0.14)]">
              TH
            </div>
                </div>
            </div>
        </div>
    );
}
