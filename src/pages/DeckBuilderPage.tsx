import { Suspense, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Paper, Typography, Grid, Box, Alert, Button } from '@mui/material';

import DeckDisplay from '../components/DeckDisplay';
import { useCards } from '../api/cards';
import { DeckProvider, useDeck } from '../contexts/DeckContext';
import CardList from '../components/CardList';

function DeckBuilderLayout({ onRefresh }: { onRefresh: () => void }) {
  const { deck, error } = useDeck();

  const totalCards = useMemo(() => {
    return deck.reduce((sum, item) => sum + item.count, 0);
  }, [deck]);

  return (
    <>
      <Box sx={{ mb: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
        <Button variant="contained" onClick={onRefresh}>
          Update Card List
        </Button>
        {error && (
          <Alert severity="error" sx={{ flexGrow: 1 }}>
            {error}
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
          <CardList />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <DeckDisplay />
        </Grid>
      </Grid>
    </>
  );
}

function DeckBuilderContent() {
  const [cards, { refresh }] = useCards();

  // Handle the initial undefined state from useAsync (before effect runs)
  if (!cards) return null;

  return (
    <DeckProvider initialCards={cards}>
      <DeckBuilderLayout onRefresh={refresh} />
    </DeckProvider>
  );
}

export default function DeckBuilderPage() {
  return (
    <ErrorBoundary fallback={<div>Failed to load Riftbound cards.</div>}>
      <Suspense fallback={<div>Loading card database...</div>}>
        <DeckBuilderContent />
      </Suspense>
    </ErrorBoundary>
  );
}
