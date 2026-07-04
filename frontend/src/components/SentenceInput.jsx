// components/SentenceInput.jsx
//
// Controlled input for the sentence the user wants fact-checked.
// Purely presentational — App.jsx owns the actual state and submit logic.

import { SearchIcon } from "./Icons";

export default function SentenceInput({ value, onChange, onSubmit, isLoading }) {
  function handleSubmit(e) {
    e.preventDefault();
    if (!isLoading && value.trim()) {
      onSubmit();
    }
  }

  function handleKeyDown(e) {
    // Cmd/Ctrl + Enter submits from within the textarea
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      handleSubmit(e);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative rounded-2xl border border-slate-700/70 bg-slate-900/60 focus-within:border-slate-500 transition-colors">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={3}
          placeholder="e.g. OpenAI released ChatGPT in November 2022 and it reached one million users within five days."
          className="w-full resize-none bg-transparent text-slate-100 placeholder-slate-500 text-sm sm:text-base p-4 sm:p-5 pr-4 rounded-2xl outline-none font-mono leading-relaxed"
        />
        <div className="flex items-center justify-between gap-3 px-4 sm:px-5 pb-4 sm:pb-5">
          <span className="text-xs text-slate-500 hidden sm:inline">
            ⌘ / Ctrl + Enter to check
          </span>
          <button
            type="submit"
            disabled={isLoading || !value.trim()}
            className="ml-auto inline-flex items-center gap-2 rounded-xl bg-slate-100 text-slate-900 text-sm font-medium px-4 sm:px-5 py-2.5 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white transition-colors"
          >
            <SearchIcon className="w-4 h-4" />
            {isLoading ? "Checking…" : "Check claims"}
          </button>
        </div>
      </div>
    </form>
  );
}