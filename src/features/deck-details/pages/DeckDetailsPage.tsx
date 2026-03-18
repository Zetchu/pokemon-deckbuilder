import { useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Paper, Divider, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';

import { getDeck } from '../../../shared/pokemon/storage';
import { useDeckActions } from '../../../shared/pokemon/contexts/DeckContext';
import DeckStats from '../../../shared/pokemon/components/DeckStats';
import DeckCharts from '../components/DeckCharts';
import type { DeckItem } from '../../../shared/pokemon/types';

export default function DeckDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { loadDeck } = useDeckActions();

  // Need to handle getting deck slightly differently or ensure export matches
  const deck = useMemo(() => (id ? getDeck(id) : null), [id]);

  useEffect(() => {
    if (!deck && id) {
      // If valid ID but not found
    }
  }, [deck, id]);

  if (!deck) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5">Deck not found</Typography>
        <Button onClick={() => navigate('/library')}>Back to Library</Button>
      </Box>
    );
  }

  const handleEdit = () => {
    loadDeck(deck.items, deck.id, deck.name);
    navigate('/builder');
  };

  const totalCards = deck.items.reduce(
    (sum: number, item: DeckItem) => sum + item.count,
    0
  );

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/library')}
        sx={{ mb: 2 }}
      >
        Back to Library
      </Button>

      <Paper sx={{ p: 4, mb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Box>
            <Typography variant="h3" component="h1" gutterBottom>
              {deck.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Created on {new Date(deck.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={handleEdit}
            color="primary"
            size="large"
          >
            Edit Deck
          </Button>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Chip
            label={`${totalCards} Cards`}
            color="primary"
            variant="outlined"
          />
          <Chip
            label={totalCards === 60 ? 'Legal Size' : 'Illegal Size'}
            color={totalCards === 60 ? 'success' : 'error'}
            variant="outlined"
          />
        </Box>

        <DeckStats items={deck.items} />

        <DeckCharts items={deck.items} />
      </Paper>
    </Box>
  );
}
