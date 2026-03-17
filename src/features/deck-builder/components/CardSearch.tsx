import { useState, useMemo } from 'react';
import { useDeck, useDeckActions } from '../../../shared/contexts/DeckContext';
import {
  Card,
  CardMedia,
  Typography,
  Button,
  Box,
  TextField,
  Stack,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';

export default function CardSearch() {
  const { availableCards } = useDeck();
  const { addCardToDeck } = useDeckActions();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCards = useMemo(() => {
    return availableCards.filter((card) => {
      const matchName = card.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchName;
    });
  }, [availableCards, searchQuery]);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Stack spacing={2} sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Search Cards"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Stack>

      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <Grid container spacing={2}>
          {filteredCards.map((card) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={card.id}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={
                    card.image || 'https://placehold.co/200x280?text=No+Image'
                  }
                  alt={card.name}
                  sx={{ objectFit: 'contain', p: 1 }}
                />
                <Box sx={{ p: 2, flexGrow: 1 }}>
                  <Typography variant="subtitle1" component="div">
                    {card.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.category} {card.stage ? `• ${card.stage}` : ''}
                  </Typography>
                  {card.types && (
                    <Typography variant="body2" color="text.secondary">
                      Type: {card.types.join(', ')}
                    </Typography>
                  )}
                  {card.hp && (
                    <Typography variant="body2" color="text.secondary">
                      HP: {card.hp}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ p: 1 }}>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    fullWidth
                    onClick={() => addCardToDeck(card)}
                  >
                    Add
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
