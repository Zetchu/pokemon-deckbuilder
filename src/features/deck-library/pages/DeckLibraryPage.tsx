import { useState } from 'react';
import { Typography, Paper, Button, Box, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  getDecks,
  deleteDeck,
  type SavedDeck,
} from '../../../shared/pokemon/storage';
import { useDeckActions } from '../../../shared/pokemon/contexts/DeckContext';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';

export default function DeckLibraryPage() {
  const [decks, setDecks] = useState<SavedDeck[]>(() => getDecks());
  const { loadDeck } = useDeckActions();
  const navigate = useNavigate();

  const handleLoadDeck = (deck: SavedDeck) => {
    loadDeck(deck.items, deck.id, deck.name);
    navigate('/builder');
  };

  const handleViewDeck = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/deck/${id}`);
  };

  const handleDeleteDeck = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this deck?')) {
      deleteDeck(id);
      setDecks(getDecks());
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
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
                onClick={() => handleLoadDeck(deck)}
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
                  <Typography variant="body2" gutterBottom>
                    Total Cards:{' '}
                    {deck.items.reduce((sum, item) => sum + item.count, 0)}
                  </Typography>
                </Box>
                <Box
                  sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}
                >
                  <Button
                    size="small"
                    onClick={(e) => handleViewDeck(deck.id, e)}
                  >
                    View Details
                  </Button>
                  <IconButton
                    size="small"
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
