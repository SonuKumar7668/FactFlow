// components/ErrorBanner.jsx
//
// Surfaces network/API failures without a generic browser alert().
// Kept separate so error copy and styling can evolve independently.

export default function ErrorBanner({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="w-full rounded-xl border border-rose-500/30 bg-rose-950/30 px-4 py-3 flex items-start justify-between gap-3">
      <p className="text-rose-300 text-sm leading-relaxed">{message}</p>
      <button
        onClick={onDismiss}
        className="text-rose-400 hover:text-rose-200 text-xs font-mono shrink-0"
        aria-label="Dismiss error"
      >
        Dismiss
      </button>
    </div>
  );
}