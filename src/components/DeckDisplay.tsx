import { useDeck, useDeckActions } from '../contexts/DeckContext';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export default function DeckDisplay() {
  const { deck } = useDeck();
  const { removeCardFromDeck } = useDeckActions();

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
                  onClick={() => removeCardFromDeck(item.id)}
                  color="error"
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
              }
              divider
            >
              <ListItemText
                primary={`${item.name} (x${item.count})`}
                secondary={`${item.type} • Cost: ${item.cost}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
}
