import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import DeckBuilderPage from './DeckBuilderPage';
import { DeckProvider } from '../../../shared/pokemon/contexts/DeckContext';
import * as DeckContextModule from '../../../shared/pokemon/contexts/DeckContext';

// Mock child components to simplify test
vi.mock('../components/CardSearch', () => ({
  default: () => <div data-testid="card-search">Card Search Component</div>,
}));
vi.mock('../components/DeckSidebar', () => ({
  default: () => <div data-testid="deck-sidebar">Deck Sidebar Component</div>,
}));
vi.mock('../components/ValidationOverlay', () => ({
  default: () => <div data-testid="validation-overlay">Validation Overlay</div>,
}));

// Mock window.alert and confirm
window.alert = vi.fn();
window.confirm = vi.fn(() => true);

describe('DeckBuilderPage', () => {
  it('renders correctly', () => {
    render(
      <DeckProvider initialCards={[]}>
        <DeckBuilderPage />
      </DeckProvider>
    );

    expect(screen.getByText('Save Deck')).toBeInTheDocument();

    expect(screen.getByTestId('card-search')).toBeInTheDocument();
    expect(screen.getByTestId('deck-sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('validation-overlay')).toBeInTheDocument();
  });

  it('shows error alert when context has error', () => {
    const useDeckSpy = vi.spyOn(DeckContextModule, 'useDeck');
    useDeckSpy.mockReturnValue({
      deck: [],
      availableCards: [],
      error: 'Test Error',
      activeDeckId: null,
      activeDeckName: '',
      addCardToDeck: vi.fn(),
      removeCardFromDeck: vi.fn(),
      loadDeck: vi.fn(),
      clearDeck: vi.fn(),
      // Add other context props if needed by type
      state: { deck: [], availableCards: [] },
      actions: {
        addCardToDeck: vi.fn(),
        removeCardFromDeck: vi.fn(),
        loadDeck: vi.fn(),
        clearDeck: vi.fn(),
      },
    } as ReturnType<typeof DeckContextModule.useDeck>);

    render(<DeckBuilderPage />);

    expect(screen.getByText('Test Error')).toBeInTheDocument();

    useDeckSpy.mockRestore();
  });
});
