import { useDeck } from '../../../shared/pokemon/contexts/DeckContext';
import { validateDeck } from '../../../shared/pokemon/rules';
import {
  Alert,
  AlertTitle,
  Box,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import { useState, useMemo } from 'react';

export default function ValidationOverlay() {
  const { deck } = useDeck();
  const errors = useMemo(() => validateDeck(deck), [deck]);
  const [open, setOpen] = useState(false);

  // Consider deck valid if there are no errors
  const hasErrors = errors.length > 0;

  // Only show if there is actually a deck being built
  if (deck.length === 0) return null;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 2000,
        }}
      >
        <Fab
          color={hasErrors ? 'error' : 'primary'}
          aria-label="deck rules"
          onClick={handleOpen}
        >
          {hasErrors ? <WarningIcon /> : <InfoIcon />}
        </Fab>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{hasErrors ? 'Deck Issues' : 'Deck Status'}</DialogTitle>
        <DialogContent>
          {hasErrors ? (
            <Alert severity="error">
              <AlertTitle>Invalid Deck</AlertTitle>
              <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                {errors.map((err, index) => (
                  <li key={index}>{err}</li>
                ))}
              </ul>
            </Alert>
          ) : (
            <Alert severity="success">
              <AlertTitle>Deck Valid</AlertTitle>
              Your deck meets all the requirements!
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
