import type { PaletteMode } from '@mui/material';
import { createTheme } from '@mui/material/styles';

// A custom theme for "Riftbound" with a dark, magical aesthetic.
export const getTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        // Deep purple/indigo for that mystical arcane feel
        main: '#7c4dff', // Deep Purple A200
        dark: '#3f1dcb',
        light: '#b47cff',
      },
      secondary: {
        // Cyan/Teal for magical energy
        main: '#00e5ff', // Cyan A400
        dark: '#00b2cc',
        light: '#5cffff',
      },
      background: {
        default: mode === 'dark' ? '#0a0b10' : '#f5f5f5', // Very dark blue-ish grey
        paper: mode === 'dark' ? '#13141f' : '#ffffff', // Slightly lighter
      },
      text: {
        primary: mode === 'dark' ? '#ffffff' : 'rgba(0, 0, 0, 0.87)',
        secondary: mode === 'dark' ? '#b0bec5' : 'rgba(0, 0, 0, 0.6)',
      },
    },
    typography: {
      fontFamily: [
        'Cinzel', // Ensure you import this font or it falls back
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
      h1: { fontWeight: 700, letterSpacing: '0.05em' },
      h2: { fontWeight: 700, letterSpacing: '0.05em' },
      h3: { fontWeight: 600 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 500, letterSpacing: '0.02em' },
      h6: {
        fontWeight: 500,
        letterSpacing: '0.02em',
        textTransform: 'uppercase',
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            border:
              mode === 'dark' ? '1px solid rgba(124, 77, 255, 0.2)' : 'none',
            boxShadow:
              mode === 'dark' ? '0 4px 20px rgba(0,0,0,0.5)' : undefined,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 600,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? '#13141f' : undefined,
            backgroundImage: 'none',
            borderBottom:
              mode === 'dark'
                ? '1px solid rgba(255, 255, 255, 0.1)'
                : undefined,
          },
        },
      },
    },
  });
