import { useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';

import { getDeck } from '../../../shared/utils/storage';
import { useDeckActions } from '../../../shared/contexts/DeckContext';
import DeckStats from '../../../shared/components/DeckStats';
import { formatCardText } from '../../../shared/utils/textFormatter';
import type { DeckItem } from '../../../shared/types';

export default function DeckDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { loadDeck } = useDeckActions();

  const deck = useMemo(() => (id ? getDeck(id) : null), [id]);

  useEffect(() => {
    if (!deck && id) {
      navigate('/library');
    }
  }, [deck, id, navigate]);

  if (!deck) return null;

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
            label={totalCards === 40 ? 'Tournament Legal' : 'Illegal Size'}
            color={totalCards === 40 ? 'success' : 'error'}
            variant="outlined"
          />
        </Box>
      </Paper>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Deck Statistics
        </Typography>
        <DeckStats items={deck.items} />
      </Box>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Card List
            </Typography>
            <List>
              {deck.items.map((item: DeckItem) => (
                <ListItem key={item.id} divider>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    <Box
                      sx={{
                        width: 30,
                        height: 30,
                        bgcolor: 'primary.main',
                        color: 'white',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        fontWeight: 'bold',
                      }}
                    >
                      {item.count}
                    </Box>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight="bold">
                          {item.name}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          {item.classification?.type || item.type} • Cost:{' '}
                          {item.attributes?.energy ?? item.cost ?? 0}
                        </Typography>
                      }
                    />
                    {item.text && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          maxWidth: '60%',
                          textAlign: 'right',
                          display: { xs: 'none', md: 'block' },
                        }}
                      >
                        {formatCardText(item.text.plain)}
                      </Typography>
                    )}
                  </Box>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
