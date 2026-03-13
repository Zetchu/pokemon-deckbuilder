import { describe, it, expect } from 'vitest';
import { getTheme } from './theme';

describe('theme', () => {
  it('returns a theme object for dark mode', () => {
    const theme = getTheme('dark');
    expect(theme).toBeDefined();
    expect(theme.palette.mode).toBe('dark');
  });

  it('returns a theme object for light mode', () => {
    const theme = getTheme('light');
    expect(theme).toBeDefined();
    expect(theme.palette.mode).toBe('light');
  });
});
