// utils/verdictConfig.js
//
// Central source of truth for how each verdict looks and reads across the app.
// Keeping this in one place means a card, a badge, or a summary count all
// stay visually in sync — change a color once, it updates everywhere.

export const VERDICTS = {
  SUPPORTED: {
    label: "Supported",
    icon: "check",
    // Card surface + border + text, tuned for dark backgrounds
    card: "bg-emerald-950/40 border-emerald-500/40 hover:border-emerald-400/70",
    glow: "shadow-[0_0_0_1px_rgba(52,211,153,0.15)]",
    badge: "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30",
    dot: "bg-emerald-400",
    node: "bg-emerald-400 shadow-[0_0_12px_2px_rgba(52,211,153,0.55)]",
  },
  CONTRADICTED: {
    label: "Contradicted",
    icon: "x",
    card: "bg-rose-950/40 border-rose-500/40 hover:border-rose-400/70",
    glow: "shadow-[0_0_0_1px_rgba(251,113,133,0.15)]",
    badge: "bg-rose-500/15 text-rose-300 ring-1 ring-rose-400/30",
    dot: "bg-rose-400",
    node: "bg-rose-400 shadow-[0_0_12px_2px_rgba(251,113,133,0.55)]",
  },
  INSUFFICIENT_EVIDENCE: {
    label: "Insufficient evidence",
    icon: "question",
    card: "bg-amber-950/30 border-amber-500/40 hover:border-amber-400/70",
    glow: "shadow-[0_0_0_1px_rgba(251,191,36,0.15)]",
    badge: "bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/30",
    dot: "bg-amber-400",
    node: "bg-amber-400 shadow-[0_0_12px_2px_rgba(251,191,36,0.55)]",
  },
};

// Fallback for any unexpected/unknown verdict string from the backend,
// so the UI degrades gracefully instead of crashing.
export const UNKNOWN_VERDICT = {
  label: "Unknown",
  icon: "question",
  card: "bg-slate-800/40 border-slate-500/40 hover:border-slate-400/70",
  glow: "shadow-[0_0_0_1px_rgba(148,163,184,0.15)]",
  badge: "bg-slate-500/15 text-slate-300 ring-1 ring-slate-400/30",
  dot: "bg-slate-400",
  node: "bg-slate-400 shadow-[0_0_12px_2px_rgba(148,163,184,0.55)]",
};

export function getVerdictStyle(verdict) {
  return VERDICTS[verdict] || UNKNOWN_VERDICT;
}