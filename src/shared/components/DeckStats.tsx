import {
  Box,
  Paper,
  Typography,
  LinearProgress,
  Stack,
  Tooltip,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import type { DeckItem } from '../types';

interface DeckStatsProps {
  items: DeckItem[];
}

export default function DeckStats({ items }: DeckStatsProps) {
  // Mana Curve Stats
  const manaCurve = items.reduce(
    (acc, item) => {
      const cost = item.attributes?.energy ?? item.cost ?? 0;
      const bucket = cost > 7 ? '7+' : cost.toString();
      acc[bucket] = (acc[bucket] || 0) + item.count;
      return acc;
    },
    {} as Record<string, number>
  );

  const maxCount = Math.max(...Object.values(manaCurve), 1);
  const costLabels = ['0', '1', '2', '3', '4', '5', '6', '7+'];

  // Type Distribution
  const typeDistribution = items.reduce(
    (acc, item) => {
      const type = item.classification?.type || item.type || 'Unknown';
      acc[type] = (acc[type] || 0) + item.count;
      return acc;
    },
    {} as Record<string, number>
  );

  const totalCards = items.reduce((sum, item) => sum + item.count, 0);

  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3, height: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Mana Curve
          </Typography>
          <Box
            sx={{
              mt: 2,
              height: 200,
              display: 'flex',
              alignItems: 'flex-end',
              gap: 1,
            }}
          >
            {costLabels.map((cost) => {
              const count = manaCurve[cost] || 0;
              const heightPercent = (count / maxCount) * 100;

              return (
                <Tooltip key={cost} title={`${count} cards cost ${cost}`} arrow>
                  <Box
                    sx={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="caption" sx={{ mb: 0.5 }}>
                      {count > 0 ? count : ''}
                    </Typography>
                    <Box
                      sx={{
                        width: '100%',
                        height: `${Math.max(heightPercent, 1)}%`,
                        bgcolor: 'primary.main',
                        borderRadius: '4px 4px 0 0',
                        transition: 'height 0.5s ease',
                      }}
                    />
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {cost}
                    </Typography>
                  </Box>
                </Tooltip>
              );
            })}
          </Box>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3, height: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Card Types
          </Typography>
          <Stack spacing={2} sx={{ mt: 2 }}>
            {Object.entries(typeDistribution).map(([type, count]) => (
              <Box key={type}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 0.5,
                  }}
                >
                  <Typography variant="body2">{type}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {count} ({Math.round((count / totalCards) * 100)}%)
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(count / totalCards) * 100}
                  sx={{ height: 8, borderRadius: 4 }}
                  color={
                    type === 'Unit'
                      ? 'success'
                      : type === 'Action'
                        ? 'warning'
                        : 'info'
                  }
                />
              </Box>
            ))}
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}
