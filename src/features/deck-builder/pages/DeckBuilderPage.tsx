import { useState } from 'react';
import {
  Box,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
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
  const [deckName, setDeckName] = useState(activeDeckName);

  const handleOpenSaveDialog = () => {
    setDeckName(activeDeckName);
    setSaveDialogOpen(true);
  };

  const handleSaveDeck = () => {
    if (!deckName.trim()) return;

    let saved;
    try {
      if (activeDeckId) {
        // Update existing
        saved = updateDeck(activeDeckId, deckName, deck);
        alert('Deck updated successfully!');
      } else {
        // Save new
        saved = saveDeck(deckName, deck);
        alert('Deck saved successfully!');
      }
      loadDeck(deck, saved.id, saved.name);
      setSaveDialogOpen(false);
    } catch (e) {
      alert('Error saving deck');
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

      <Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
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
        <DialogTitle>Save Your Deck</DialogTitle>
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
          <Box
            sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}
          >
            <Button onClick={() => setSaveDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveDeck} variant="contained">
              Save
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
