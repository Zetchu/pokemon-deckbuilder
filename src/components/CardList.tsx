import type { Card } from '../types';
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface Props {
  cards: Card[];
  onAddCard: (card: Card) => void;
}

export default function CardList({ cards, onAddCard }: Props) {
  return (
    <Paper
      elevation={3}
      sx={{ padding: 2, flex: 1, height: '100%', overflow: 'auto' }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        📚 Card Database
      </Typography>
      <List>
        {cards.map((card) => (
          <ListItem
            key={card.id}
            secondaryAction={
              <Button
                variant="contained"
                size="small"
                startIcon={<AddIcon />}
                onClick={() => onAddCard(card)}
              >
                Add
              </Button>
            }
            divider
          >
            <ListItemText
              primary={
                <Box component="span" fontWeight="bold">
                  {card.name}
                </Box>
              }
              secondary={`Cost: ${card.cost} • ${card.type}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
