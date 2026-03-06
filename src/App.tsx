import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import DeckBuilderPage from './pages/DeckBuilderPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="builder" element={<DeckBuilderPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
