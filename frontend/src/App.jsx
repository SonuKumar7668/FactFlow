import { useState } from 'react'
import './App.css'
import Header from './components/Header';
import SentenceInput from "./components/SentenceInput";
import FlowResults from "./components/Flowresults"
import EmptyState from "./components/EmptyState";
import LoadingState from "./components/LoadingState";
import ErrorBanner from "./components/ErrorBanner";
import { verifySentence } from "./services/factCheckApi";


function App() {
  const [sentence, setSentence] = useState("");
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
 
  async function handleCheck() {
    setIsLoading(true);
    setError("");
    try {
      const data = await verifySentence(sentence);
      setResults(data);
    } catch (err) {
      setError(err.message || "Something went wrong while checking that sentence.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0B1120] bg-[radial-gradient(ellipse_at_top,_rgba(148,163,184,0.06),_transparent_60%)]">
      <Header />

      <main className="mx-auto max-w-3xl px-4 sm:px-6 pb-16 sm:pb-24">
        <SentenceInput
          value={sentence}
          onChange={setSentence}
          onSubmit={handleCheck}
          isLoading={isLoading}
        />
        <div className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
          <ErrorBanner message={error} onDismiss={() => setError("")} />

          {isLoading && <LoadingState />}

          {!isLoading && results && results.length > 0 && (
            <FlowResults results={results} />
          )}

          {!isLoading && results && results.length === 0 && (
            <p className="text-slate-500 text-sm font-mono text-center py-8">
              No claims were detected in that sentence.
            </p>
          )}

          {!isLoading && !results && !error && <EmptyState />}
        </div>
      </main>

    </div>
  )
}

export default App
