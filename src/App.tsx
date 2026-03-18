import { HashRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './shared/ui/MainLayout';
import HomePage from './features/home/pages/HomePage';
import DeckBuilderPage from './features/deck-builder/pages/DeckBuilderPage';
import DeckLibraryPage from './features/deck-library/pages/DeckLibraryPage';
import DeckDetailsPage from './features/deck-details/pages/DeckDetailsPage';
import { DeckProvider } from './shared/pokemon/contexts/DeckContext';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense, useEffect, useState } from 'react';
import { fetchBaseSetCards } from './shared/pokemon/api';
import type { PokemonCard } from './shared/pokemon/types';

function AppContent() {
  const [cards, setCards] = useState<PokemonCard[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBaseSetCards()
      .then((data) => {
        setCards(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load cards');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading Pokemon resources...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <DeckProvider initialCards={cards || []}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="builder" element={<DeckBuilderPage />} />
            <Route path="deck/:id" element={<DeckDetailsPage />} />
            <Route path="library" element={<DeckLibraryPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </DeckProvider>
  );
}

export default function App() {
  return (
    <ErrorBoundary fallback={<div>Application Error</div>}>
      <Suspense fallback={<div>Loading App...</div>}>
        <AppContent />
      </Suspense>
    </ErrorBoundary>
  );
}
