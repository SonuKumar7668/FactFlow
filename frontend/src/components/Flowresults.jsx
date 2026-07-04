// components/FlowResults.jsx
//
// Lays out the list of claims as a single connected stream (the "flow" in
// FactFlow) — a vertical line runs behind every card, with each card's node
// colored by its own verdict. Also renders the small summary strip above it.

import ClaimCard from "./ClaimCard";
import { getVerdictStyle } from "../utils/VerdictConfig";

function SummaryStrip({ results }) {
  const counts = results.reduce((acc, r) => {
    acc[r.verdict] = (acc[r.verdict] || 0) + 1;
    return acc;
  }, {});

  const order = ["SUPPORTED", "CONTRADICTED", "INSUFFICIENT_EVIDENCE"];

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
      {order
        .filter((key) => counts[key])
        .map((key) => {
          const style = getVerdictStyle(key);
          return (
            <div
              key={key}
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-mono ${style.badge}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
              {counts[key]} {style.label.toLowerCase()}
            </div>
          );
        })}
      <span className="text-slate-500 text-xs font-mono ml-auto">
        {results.length} claim{results.length !== 1 ? "s" : ""} checked
      </span>
    </div>
  );
}

export default function FlowResults({ results }) {
  if (!results || results.length === 0) return null;

  return (
    <div className="w-full">
      <SummaryStrip results={results} />

      <ul className="relative space-y-4 sm:space-y-5">
        {/* The flow line itself, threading through every card's node */}
        <div
          className="absolute left-[15px] sm:left-[19px] top-3 bottom-3 w-px bg-gradient-to-b from-slate-600 via-slate-700 to-slate-800"
          aria-hidden="true"
        />
        {results.map((item, i) => (
          <ClaimCard
            key={`${i}-${item.claim.slice(0, 20)}`}
            index={i}
            claim={item.claim}
            verdict={item.verdict}
            reason={item.reason}
          />
        ))}
      </ul>
    </div>
  );
}