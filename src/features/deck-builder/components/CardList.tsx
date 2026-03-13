import { useState, useMemo } from 'react';
import { useDeck, useDeckActions } from '../../../shared/contexts/DeckContext';
import {
  Card as MuiCard,
  CardMedia,
  Typography,
  Button,
  Box,
  Tooltip,
  Fade,
  TextField,
  InputAdornment,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Stack,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { formatCardText } from '../../../shared/utils/textFormatter';

export default function CardList() {
  const { availableCards } = useDeck();
  const { addCardToDeck } = useDeckActions();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterDomain, setFilterDomain] = useState('All');

  // Derive unique Types and Domains for filter options
  const uniqueTypes = useMemo(() => {
    const types = new Set(
      availableCards
        .map((c) => c.classification?.type || c.type)
        .filter(Boolean) as string[]
    );
    return ['All', ...Array.from(types).sort()];
  }, [availableCards]);

  const uniqueDomains = useMemo(() => {
    const domains = new Set<string>();
    availableCards.forEach((c) => {
      if (c.classification?.domain) {
        c.classification.domain.forEach((d) => domains.add(d));
      }
    });
    return ['All', ...Array.from(domains).sort()];
  }, [availableCards]);

  const filteredCards = useMemo(() => {
    return availableCards.filter((card) => {
      const matchSearch =
        card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (card.text?.plain || '')
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (card.description || '')
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchType =
        filterType === 'All' ||
        card.classification?.type === filterType ||
        card.type === filterType;

      const matchDomain =
        filterDomain === 'All' ||
        (card.classification?.domain &&
          card.classification.domain.includes(filterDomain));

      return matchSearch && matchType && matchDomain;
    });
  }, [availableCards, searchQuery, filterType, filterDomain]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 2,
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Filters Header */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          📚 Card Database
        </Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField
            label="Search cards..."
            variant="outlined"
            size="small"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Type</InputLabel>
            <Select
              value={filterType}
              label="Type"
              onChange={(e) => setFilterType(e.target.value)}
            >
              {uniqueTypes.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Domain</InputLabel>
            <Select
              value={filterDomain}
              label="Domain"
              onChange={(e) => setFilterDomain(e.target.value)}
            >
              {uniqueDomains.map((d) => (
                <MenuItem key={d} value={d}>
                  {d}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Box>

      {/* Scrollable Grid Area */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1 }}>
        <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1 }}>
          <Grid container spacing={2}>
            {filteredCards.map((card) => (
              <Grid size={{ xs: 6, sm: 4, md: 3, lg: 3 }} key={card.id}>
                <MuiCard
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      zIndex: 2,
                      boxShadow: (theme) => theme.shadows[10],
                    },
                  }}
                >
                  <Tooltip
                    title={
                      <Box sx={{ p: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {card.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ fontStyle: 'italic', mb: 1 }}
                        >
                          {card.classification?.type || card.type}
                        </Typography>
                        <Typography variant="body2">
                          {formatCardText(
                            card.text?.plain ||
                              card.description ||
                              'No description available.'
                          )}
                        </Typography>
                      </Box>
                    }
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 200 }}
                    placement="right"
                    arrow
                  >
                    <Box sx={{ position: 'relative', flexGrow: 1 }}>
                      <CardMedia
                        component="img"
                        image={
                          card.media?.image_url ||
                          card.imageUrl ||
                          'https://placehold.co/300x420?text=No+Image'
                        }
                        alt={card.name}
                        sx={{
                          aspectRatio: '2.5/3.5',
                          objectFit: 'cover',
                        }}
                      />
                      {/* Energy Cost Badge */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 4,
                          left: 4,
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          bgcolor: 'secondary.main',
                          color: 'secondary.contrastText',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          fontSize: '0.8rem',
                          boxShadow: 2,
                        }}
                      >
                        {card.attributes?.energy ?? card.cost ?? 0}
                      </Box>
                    </Box>
                  </Tooltip>
                  <Button
                    variant="contained"
                    size="small"
                    fullWidth
                    startIcon={<AddIcon />}
                    onClick={() => addCardToDeck(card)}
                    sx={{ borderRadius: 0 }}
                  >
                    Add
                  </Button>
                </MuiCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
