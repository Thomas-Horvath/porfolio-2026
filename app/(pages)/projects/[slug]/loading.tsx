
export default function Loading() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-50">
            <div className="flex gap-2">
                <span className="dot" />
                <span className="dot delay-150" />
                <span className="dot delay-300" />
                <span className="dot delay-450" />
            </div>
        </div>
    );
}