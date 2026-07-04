// components/icons.jsx
//
// Tiny inline icon set so the project doesn't need an icon library
// just to render three glyphs. Each icon inherits color via currentColor.

export function CheckIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function XIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function QuestionIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M9.5 9a2.5 2.5 0 114.2 1.8c-.7.65-1.7 1.1-1.7 2.2"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="17" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function SearchIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth={2} />
      <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

export const ICONS_BY_KEY = {
  check: CheckIcon,
  x: XIcon,
  question: QuestionIcon,
};