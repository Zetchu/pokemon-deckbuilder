import { Paper, Typography, Stack, Chip, Alert } from '@mui/material';
import Grid from '@mui/material/Grid';
import type { DeckItem } from '../pokemon/types';

interface DeckStatsProps {
  items: DeckItem[];
}

export default function DeckStats({ items }: DeckStatsProps) {
  // Category Breakdown
  const categoryCounts = items.reduce(
    (acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.count;
      return acc;
    },
    { Pokemon: 0, Trainer: 0, Energy: 0 } as Record<string, number>
  );

  // Type Distribution
  const typeCounts = items.reduce(
    (acc, item) => {
      if (item.types) {
        item.types.forEach((t) => {
          acc[t] = (acc[t] || 0) + item.count;
        });
      }
      return acc;
    },
    {} as Record<string, number>
  );

  // Average HP
  const pokemonItems = items.filter((i) => i.category === 'Pokemon');
  const totalHp = pokemonItems.reduce(
    (sum, item) => sum + (item.hp || 0) * item.count,
    0
  );
  const totalPokemonCount = pokemonItems.reduce((sum, i) => sum + i.count, 0);
  const avgHp = totalPokemonCount ? Math.round(totalHp / totalPokemonCount) : 0;

  // Evolution Check
  const hasStage1Or2 = items.some(
    (i) =>
      i.category === 'Pokemon' &&
      (i.stage === 'Stage 1' || i.stage === 'Stage 2')
  );
  const hasBasic = items.some(
    (i) => i.category === 'Pokemon' && i.stage === 'Basic'
  );

  const showEvolutionWarning = hasStage1Or2 && !hasBasic;

  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3, height: '100%', bgcolor: 'background.paper' }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              textTransform: 'uppercase',
              fontSize: '0.9rem',
              letterSpacing: '1px',
            }}
          >
            Category Breakdown
          </Typography>
          <Stack direction="row" spacing={1} mb={2}>
            <Chip
              label={`Pokemon: ${categoryCounts['Pokemon'] || 0}`}
              sx={{ bgcolor: '#7c4dff', color: 'white', fontWeight: 'bold' }}
            />
            <Chip
              label={`Trainer: ${categoryCounts['Trainer'] || 0}`}
              sx={{ bgcolor: '#00e5ff', color: 'black', fontWeight: 'bold' }}
            />
            <Chip
              label={`Energy: ${categoryCounts['Energy'] || 0}`}
              sx={{ bgcolor: '#ff9100', color: 'black', fontWeight: 'bold' }}
            />
          </Stack>

          <Typography
            variant="h6"
            gutterBottom
            sx={{
              textTransform: 'uppercase',
              fontSize: '0.9rem',
              letterSpacing: '1px',
              mt: 4,
            }}
          >
            Type Distribution
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {Object.entries(typeCounts).map(([type, count]) => (
              <Chip key={type} label={`${type}: ${count}`} variant="outlined" />
            ))}
            {Object.keys(typeCounts).length === 0 && (
              <Typography variant="body2" color="text.secondary">
                No types found
              </Typography>
            )}
          </Stack>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3, height: '100%', bgcolor: 'background.paper' }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              textTransform: 'uppercase',
              fontSize: '0.9rem',
              letterSpacing: '1px',
            }}
          >
            Pokemon Stats
          </Typography>
          <Typography variant="body1">
            <strong>Average HP:</strong> {avgHp}
          </Typography>

          {showEvolutionWarning && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              Evolution Warning: You have evolved Pokémon but no Basic Pokémon!
            </Alert>
          )}
          {!showEvolutionWarning && hasStage1Or2 && (
            <Alert severity="info" sx={{ mt: 2 }}>
              Ensure you have the correct Basic Pokémon for your evolutions.
            </Alert>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
