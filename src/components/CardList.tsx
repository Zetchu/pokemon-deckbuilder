import { useDeck, useDeckActions } from '../contexts/DeckContext';
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Paper,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function CardList() {
  const { availableCards } = useDeck();
  const { addCardToDeck } = useDeckActions();

  return (
    <Paper
      elevation={3}
      sx={{ padding: 2, flex: 1, height: '100%', overflow: 'auto' }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        📚 Card Database
      </Typography>
      <List>
        {availableCards.map((card) => (
          <ListItem
            key={card.id}
            secondaryAction={
              <Button
                variant="contained"
                size="small"
                startIcon={<AddIcon />}
                onClick={() => addCardToDeck(card)}
              >
                Add
              </Button>
            }
            divider
          >
            <ListItemText
              primary={card.name}
              secondary={`${card.type} • Cost: ${card.cost}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
