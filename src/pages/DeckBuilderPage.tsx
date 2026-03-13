import { useState, useMemo } from 'react';
import {
  Paper,
  Typography,
  Box,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import SaveIcon from '@mui/icons-material/Save';

import DeckDisplay from '../components/DeckDisplay';
import { useDeck } from '../contexts/DeckContext';
import CardList from '../components/CardList';
import { saveDeck } from '../utils/storage';

function DeckBuilderLayout() {
  const { deck, error } = useDeck();
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [deckName, setDeckName] = useState('');

  const totalCards = useMemo(() => {
    return deck.reduce((sum, item) => sum + item.count, 0);
  }, [deck]);

  const handleSaveDeck = () => {
    if (!deckName.trim()) return;
    saveDeck(deckName, deck);
    setSaveDialogOpen(false);
    setDeckName('');
    alert('Deck saved successfully!');
  };

  return (
    <>
      <Box sx={{ mb: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<SaveIcon />}
          onClick={() => setSaveDialogOpen(true)}
          disabled={deck.length === 0}
        >
          Save Deck
        </Button>
        {error && (
          <Alert severity="error" sx={{ flexGrow: 1 }}>
            {error}
          </Alert>
        )}
      </Box>

      <Dialog open={saveDialogOpen} onClose={() => setSaveDialogOpen(false)}>
        <DialogTitle>Save Your Deck</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Deck Name"
            fullWidth
            variant="outlined"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleSaveDeck}
            variant="contained"
            disabled={!deckName.trim()}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Paper
        elevation={1}
        sx={{
          p: 2,
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h5">Deck Status</Typography>
        <Typography
          variant="h4"
          color={totalCards > 40 ? 'error' : 'secondary'}
        >
          {totalCards} / 40
        </Typography>
      </Paper>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <CardList />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <DeckDisplay />
        </Grid>
      </Grid>
    </>
  );
}

export default function DeckBuilderPage() {
  return <DeckBuilderLayout />;
}
