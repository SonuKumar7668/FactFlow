// components/Header.jsx
//
// App masthead. Kept separate from App.jsx so branding/copy can change
// independently of the page's logic. Deliberately short — just a title
// and a one-line subtitle — so it doesn't push the input below the fold.

export default function Header() {
  return (
    <header className="w-full">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-5">
        <h1 className="font-serif text-2xl sm:text-3xl text-slate-100 tracking-tight leading-tight">
          Fact<span className="text-slate-500">Flow</span>
        </h1>
        <p className="mt-1 text-slate-400 text-xs sm:text-sm leading-snug">
          Paste a sentence and get each claim checked.
        </p>
      </div>
    </header>
  );
}