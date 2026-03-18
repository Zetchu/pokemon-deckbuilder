import { useState } from 'react';
import {
  Box,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Snackbar,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';

import DeckSidebar from '../components/DeckSidebar';

import ValidationOverlay from '../components/ValidationOverlay';
import { useDeck } from '../../../shared/contexts/DeckContext';
import { saveDeck, updateDeck } from '../../../shared/utils/storage';
import CardSearch from '../components/CardSearch';

export default function DeckBuilderPage() {
  const { deck, error, activeDeckId, activeDeckName, loadDeck, clearDeck } =
    useDeck();
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [deckName, setDeckName] = useState(activeDeckName || '');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success'
  );

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  const showSnackbar = (
    message: string,
    severity: 'success' | 'error' = 'success'
  ) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleOpenSaveDialog = () => {
    setDeckName(activeDeckName || '');
    setSaveDialogOpen(true);
  };

  const handleSaveDeck = () => {
    if (!deckName.trim()) return;

    let saved;
    try {
      if (activeDeckId) {
        saved = updateDeck(activeDeckId, deckName, deck);
        showSnackbar('Deck updated successfully!', 'success');
      } else {
        saved = saveDeck(deckName, deck);
        showSnackbar('Deck saved successfully!', 'success');
      }
      loadDeck(deck, saved.id, saved.name);
      setSaveDialogOpen(false);
    } catch (e) {
      showSnackbar('Error saving deck', 'error');
      console.error(e);
    }
  };

  const handleNewDeck = () => {
    if (deck.length > 0) {
      if (
        !window.confirm(
          'Are you sure you want to start a new deck? Unsaved changes will be lost.'
        )
      ) {
        return;
      }
    }
    clearDeck();
  };

  return (
    <Box
      sx={{
        height: 'calc(100vh - 100px)',
        display: 'flex',
        flexDirection: 'column',
        p: 2,
      }}
    >
      <ValidationOverlay />

      <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4" component="h1">
          {activeDeckName || 'New Deck'}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleNewDeck}
          >
            New Deck
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<SaveIcon />}
            onClick={handleOpenSaveDialog}
            disabled={deck.length === 0}
          >
            {activeDeckId ? 'Update Deck' : 'Save Deck'}
          </Button>
        </Box>
        {error && (
          <Alert severity="error" sx={{ flexGrow: 1 }}>
            {error}
          </Alert>
        )}
      </Box>

      <Grid container spacing={2} sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <Grid
          size={{ xs: 12, md: 8 }}
          sx={{ height: '100%', overflow: 'hidden' }}
        >
          <CardSearch />
        </Grid>
        <Grid
          size={{ xs: 12, md: 4 }}
          sx={{ height: '100%', overflow: 'hidden' }}
        >
          <DeckSidebar />
        </Grid>
      </Grid>

      <Dialog open={saveDialogOpen} onClose={() => setSaveDialogOpen(false)}>
        <DialogTitle>{activeDeckId ? 'Update Deck' : 'Save Deck'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Deck Name"
            type="text"
            fullWidth
            variant="standard"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveDeck} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
