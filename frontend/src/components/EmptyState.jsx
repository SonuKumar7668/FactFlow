// components/EmptyState.jsx
//
// Shown before the user has run a check yet. Kept separate so the
// "nothing here" message can be tuned without touching FlowResults.

export default function EmptyState() {
  return (
    <div className="w-full rounded-2xl border border-dashed border-slate-700/60 py-12 sm:py-16 px-6 text-center">
      <p className="text-slate-500 text-sm sm:text-base font-mono">
        No claims checked yet.
      </p>
      <p className="text-slate-600 text-xs sm:text-sm mt-1.5">
        Paste a sentence above and run a check to see verdicts stream in here.
      </p>
    </div>
  );
}