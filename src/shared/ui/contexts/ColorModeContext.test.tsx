import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ColorModeProvider, useColorMode } from './ColorModeContext';

// A component that displays current mode and a toggle button
const TestComponent = () => {
  const { mode, toggleColorMode } = useColorMode();
  return (
    <div>
      <span data-testid="mode-display">{mode}</span>
      <button onClick={toggleColorMode}>Toggle Mode</button>
    </div>
  );
};

describe('ColorModeContext', () => {
  it('provides default mode as dark', () => {
    // Check initial state within provider
    render(
      <ColorModeProvider>
        <TestComponent />
      </ColorModeProvider>
    );
    expect(screen.getByTestId('mode-display')).toHaveTextContent('dark');
  });

  it('toggles mode when toggleColorMode is called', () => {
    render(
      <ColorModeProvider>
        <TestComponent />
      </ColorModeProvider>
    );

    const toggleButton = screen.getByText('Toggle Mode');
    const modeDisplay = screen.getByTestId('mode-display');

    expect(modeDisplay).toHaveTextContent('dark');

    fireEvent.click(toggleButton);
    expect(modeDisplay).toHaveTextContent('light');

    fireEvent.click(toggleButton);
    expect(modeDisplay).toHaveTextContent('dark');
  });
});
