import { useState, useEffect } from 'react';
import {
  Typography,
  Paper,
  Button,
  Box,
  Divider,
  IconButton,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { loadDecks, deleteDeck, type SavedDeck } from '../utils/storage';
import { useDeckActions } from '../contexts/DeckContext';
import { useNavigate } from 'react-router-dom';

export default function DeckLibraryPage() {
  const [decks, setDecks] = useState<SavedDeck[]>([]);
  const { loadDeck } = useDeckActions();
  const navigate = useNavigate();

  useEffect(() => {
    setDecks(loadDecks());
  }, []);

  const handleLoadDeck = (deck: SavedDeck) => {
    loadDeck(deck.items);
    navigate('/builder');
  };

  const handleDeleteDeck = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this deck?')) {
      deleteDeck(id);
      setDecks(loadDecks());
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        📂 Deck Library
      </Typography>

      {decks.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            No saved decks found. Go to the Deck Builder to create one!
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/builder')}
            sx={{ mt: 2 }}
          >
            Go to Builder
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={4}>
          {decks.map((deck) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={deck.id}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {deck.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Created: {new Date(deck.createdAt).toLocaleDateString()}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2">
                    Startipped Peak:{' '}
                    {deck.items.filter((c) => c.name === 'Startipped Peak')
                      .length > 0
                      ? 'Yes'
                      : 'No'}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Total Cards:{' '}
                    {deck.items.reduce((sum, item) => sum + item.count, 0)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    mt: 2,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 1,
                  }}
                >
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => handleLoadDeck(deck)}
                  >
                    Edit
                  </Button>
                  <IconButton
                    color="error"
                    onClick={(e) => handleDeleteDeck(deck.id, e)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
