// components/ClaimCard.jsx
//
// Renders exactly one { claim, verdict, reason } entry. Color, border,
// and the flow-node dot all derive from the verdict via verdictConfig,
// so this component stays dumb — it never decides what a color means.

import { getVerdictStyle } from "../utils/VerdictConfig";
import VerdictBadge from "./VerdictBadge";

export default function ClaimCard({ claim, verdict, reason, index }) {
  const style = getVerdictStyle(verdict);

  return (
    <li className="relative pl-10 sm:pl-14">
      {/* Flow node: sits on the vertical line threading through the list */}
      <span
        className={`absolute left-[9px] sm:left-[13px] top-6 w-3 h-3 rounded-full ${style.node}`}
        aria-hidden="true"
      />

      <div
        className={`rounded-xl border ${style.card} ${style.glow} p-4 sm:p-5 transition-colors duration-200`}
      >
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <span className="text-[11px] font-mono text-slate-500 pt-0.5">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex-1" />
          <VerdictBadge verdict={verdict} />
        </div>

        <p className="text-slate-100 text-sm sm:text-base font-mono leading-relaxed">
          {claim}
        </p>

        {reason && (
          <p className="mt-2.5 text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-white/5 pt-2.5">
            {reason}
          </p>
        )}
      </div>
    </li>
  );
}