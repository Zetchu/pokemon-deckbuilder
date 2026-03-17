import { useDeck } from '../../../shared/contexts/DeckContext';
import { validateDeck } from '../../../shared/pokemon/rules';
import { Alert, AlertTitle, Box, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useMemo } from 'react';

export default function ValidationOverlay() {
  const { deck } = useDeck();

  // Memoize errors so referential equality is preserved if deck hasn't changed
  const errors = useMemo(() => validateDeck(deck), [deck]);

  // State to track if user dismissed the current error set
  const [dismissed, setDismissed] = useState(false);
  const [prevDeck, setPrevDeck] = useState(deck);

  // Derived state pattern: reset dismissal when deck updates
  if (deck !== prevDeck) {
    setPrevDeck(deck);
    setDismissed(false);
  }

  if (errors.length === 0) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 2000,
        maxWidth: 400,
      }}
    >
      <Collapse in={!dismissed}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setDismissed(true);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>Deck Issues</AlertTitle>
          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
            {errors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        </Alert>
      </Collapse>
    </Box>
  );
}
