import { HashRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import DeckBuilderPage from './pages/DeckBuilderPage';
import DeckLibraryPage from './pages/DeckLibraryPage';
import { useCards } from './api/cards';
import { DeckProvider } from './contexts/DeckContext';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';

// Wrapper to provide DeckContext globally so library can inject decks
// Note: In a larger app, you'd likely want a GlobalDeckContext or similar at the root
// But here, we wrap the Routes with a provider that gets data
function AppContent() {
  const [cards] = useCards();

  // While loading cards, we can show a loader or just render children (library might not need cards immediately if just viewing list)
  // However, to 'Edit' correctly, we need the "availableCards" in context.
  // For simplicity, we'll fetch cards here.
  if (!cards) return <div>Loading resources...</div>;

  return (
    <DeckProvider initialCards={cards}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="builder" element={<DeckBuilderPage />} />
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
