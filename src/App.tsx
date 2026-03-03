// src/App.tsx
import { useState, useEffect, useMemo } from 'react';
import {
  Container,
  Typography,
  Grid,
  Alert,
  Box,
  Paper,
  AppBar,
  Toolbar,
} from '@mui/material';
import CardList from './components/CardList';
import DeckDisplay from './components/DeckDisplay';
import { RIFTBOUND_CARDS } from './data/mockCards';
import { checkDeckLimits } from './utils/deckRules';
import type { Card, DeckItem } from './types';

export default function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [deck, setDeck] = useState<DeckItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setCards(RIFTBOUND_CARDS);
  }, []);

  const totalCards = useMemo(() => {
    return deck.reduce((sum, item) => sum + item.count, 0);
  }, [deck]);

  const handleAddCard = (card: Card) => {
    const validation = checkDeckLimits(deck, card);

    if (!validation.allowed) {
      setErrorMessage(validation.reason || 'Cannot add card.');
      // Auto-hide error after 3s
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    setErrorMessage('');

    setDeck((prevDeck) => {
      const existing = prevDeck.find((item) => item.id === card.id);
      if (existing) {
        return prevDeck.map((item) =>
          item.id === card.id ? { ...item, count: item.count + 1 } : item
        );
      }
      return [...prevDeck, { ...card, count: 1 }];
    });
  };

  const handleRemoveCard = (cardId: string) => {
    setErrorMessage('');
    setDeck((prevDeck) => {
      const existing = prevDeck.find((item) => item.id === cardId);
      if (existing && existing.count > 1) {
        return prevDeck.map((item) =>
          item.id === cardId ? { ...item, count: item.count - 1 } : item
        );
      }
      return prevDeck.filter((item) => item.id !== cardId);
    });
  };

  return (
    <>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ⚔️ Riftbound Decksmith
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          {errorMessage && (
            <Alert severity="error" onClose={() => setErrorMessage('')}>
              {errorMessage}
            </Alert>
          )}
        </Box>

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
            <CardList cards={cards} onAddCard={handleAddCard} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <DeckDisplay deck={deck} onRemoveCard={handleRemoveCard} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
