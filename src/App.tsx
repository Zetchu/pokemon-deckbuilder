import { HashRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './shared/components/MainLayout';
import HomePage from './features/home/pages/HomePage';
import DeckBuilderPage from './features/deck-builder/pages/DeckBuilderPage';
import DeckLibraryPage from './features/deck-library/pages/DeckLibraryPage';
import DeckDetailsPage from './features/deck-details/pages/DeckDetailsPage';
import { useCards } from './shared/api/cards';
import { DeckProvider } from './shared/contexts/DeckContext';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';

function AppContent() {
  const [cards] = useCards();

  if (!cards) return <div>Loading resources...</div>;

  return (
    <DeckProvider initialCards={cards}>
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
