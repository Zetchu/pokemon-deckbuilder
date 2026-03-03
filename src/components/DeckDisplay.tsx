import type { DeckItem } from '../types';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Typography,
  Chip,
  Box,
} from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

interface Props {
  deck: DeckItem[];
  onRemoveCard: (cardId: string) => void;
}

export default function DeckDisplay({ deck, onRemoveCard }: Props) {
  return (
    <Paper elevation={3} sx={{ padding: 2, flex: 1, minHeight: '300px' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        🃏 Your Deck
      </Typography>

      {deck.length === 0 ? (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 2, textAlign: 'center' }}
        >
          Your deck is looking a little empty. Add some cards from the database!
        </Typography>
      ) : (
        <List>
          {deck.map((item) => (
            <ListItem
              key={item.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="remove"
                  onClick={() => onRemoveCard(item.id)}
                  color="error"
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
              }
              divider
            >
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center" gap={1}>
                    <Chip
                      label={`${item.count}x`}
                      size="small"
                      color="primary"
                    />
                    <Typography fontWeight="bold">{item.name}</Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
}
