import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import DeckBuilderPage from './DeckBuilderPage';
import { DeckProvider } from '../../../shared/contexts/DeckContext';
import * as DeckContextModule from '../../../shared/contexts/DeckContext';

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

    expect(screen.getByText('New Deck')).toBeInTheDocument();
    expect(screen.getByText('Save Deck')).toBeInTheDocument();

    expect(screen.getByTestId('card-search')).toBeInTheDocument();
    expect(screen.getByTestId('deck-sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('validation-overlay')).toBeInTheDocument();
  });

  it('shows error alert when context has error', () => {
    // We can spy on useDeck if we want to force an error state,
    // or just trigger it via context actions if we weren't mocking children.
    // Here, let's try to mock the hook return value for specific control.

    // Using vi.spyOn to override the hook implementation for this test
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

  it('opens save dialog on Save Deck click', () => {
    render(
      <DeckProvider
        initialCards={[]}
        initialDeck={[
          {
            id: '1',
            name: 'Pika',
            category: 'Pokemon',
            localId: '1',
            rarity: 'Common',
            set: { id: 'bp', name: 'Base' },
            count: 1,
          },
        ]}
      >
        <DeckBuilderPage />
      </DeckProvider>
    );
    // Enable the button by having a deck item (provided in initialDeck)

    const saveButton = screen.getByText('Save Deck');
    expect(saveButton).not.toBeDisabled();

    fireEvent.click(saveButton);

    expect(screen.getByText('Save Your Deck')).toBeInTheDocument();
    expect(screen.getByLabelText('Deck Name')).toBeInTheDocument();
  });
});
