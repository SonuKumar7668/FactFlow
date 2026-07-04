// components/VerdictBadge.jsx
//
// Small labeled pill used inside a ClaimCard. Separated out because
// the same badge shape could be reused elsewhere (e.g. a summary row).

import { getVerdictStyle } from "../utils/VerdictConfig";
import { ICONS_BY_KEY } from "./Icons"

export default function VerdictBadge({ verdict }) {
  const style = getVerdictStyle(verdict);
  const Icon = ICONS_BY_KEY[style.icon];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] sm:text-xs font-mono uppercase tracking-wide ${style.badge}`}
    >
      {Icon && <Icon className="w-3 h-3" />}
      {style.label}
    </span>
  );
}