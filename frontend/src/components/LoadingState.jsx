// components/LoadingState.jsx
//
// Skeleton placeholders shown while the backend is verifying claims.
// Mirrors the shape of ClaimCard so the transition to real results
// doesn't cause a layout jump.

export default function LoadingState() {
  return (
    <ul className="relative space-y-4 sm:space-y-5" aria-label="Checking claims">
      <div
        className="absolute left-[15px] sm:left-[19px] top-3 bottom-3 w-px bg-slate-800"
        aria-hidden="true"
      />
      {[0, 1, 2].map((i) => (
        <li key={i} className="relative pl-10 sm:pl-14 animate-pulse">
          <span
            className="absolute left-[9px] sm:left-[13px] top-6 w-3 h-3 rounded-full bg-slate-700"
            aria-hidden="true"
          />
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="h-3 w-6 bg-slate-800 rounded" />
              <div className="h-5 w-24 bg-slate-800 rounded-full" />
            </div>
            <div className="h-3.5 bg-slate-800 rounded w-full mb-2" />
            <div className="h-3.5 bg-slate-800 rounded w-2/3" />
          </div>
        </li>
      ))}
    </ul>
  );
}