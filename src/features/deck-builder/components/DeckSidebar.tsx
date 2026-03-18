import {
  useDeck,
  useDeckActions,
} from '../../../shared/pokemon/contexts/DeckContext';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Typography,
  Box,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export default function DeckSidebar() {
  const { deck } = useDeck();
  const { removeCardFromDeck } = useDeckActions();

  const totalCards = deck.reduce((sum, item) => sum + item.count, 0);

  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
        <Typography variant="h6" component="h2">
          Your Deck ({totalCards}/60)
        </Typography>
      </Box>

      {deck.length === 0 ? (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            Your deck is empty. Add cards from the left!
          </Typography>
        </Box>
      ) : (
        <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
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
              <ListItemAvatar>
                <Avatar
                  src={item.image}
                  variant="rounded"
                  sx={{ width: 40, height: 56 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={item.name}
                secondary={`x${item.count} • ${item.category} ${item.types ? `• ${item.types.join('/')}` : ''}`}
                primaryTypographyProps={{ noWrap: true }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
}
