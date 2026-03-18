import { Paper, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import type { DeckItem } from '../../../shared/pokemon/types';

interface DeckChartsProps {
  items: DeckItem[];
}

export default function DeckCharts({ items }: DeckChartsProps) {
  const theme = useTheme();

  // Category Distribution (Pokemon, Trainer, Energy)
  const categoryData = items.reduce(
    (acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.count;
      return acc;
    },
    {} as Record<string, number>
  );

  const pieData = Object.entries(categoryData).map(([label, value], index) => ({
    id: index,
    value,
    label,
    color:
      label === 'Pokemon'
        ? theme.palette.primary.main
        : label === 'Trainer'
          ? theme.palette.secondary.main
          : theme.palette.warning.main,
  }));

  // Type Distribution
  const typeData = items.reduce(
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

  const typeChartData = Object.entries(typeData).map(
    ([label, value], index) => ({
      id: index,
      value,
      label,
    })
  );

  // HP Distribution (Bar Chart)
  const hpbuckets = items
    .filter((i) => i.category === 'Pokemon' && i.hp)
    .reduce(
      (acc, item) => {
        const hp = item.hp || 0;
        let bucket = '';
        if (hp < 60) bucket = '< 60';
        else if (hp < 90) bucket = '60-80';
        else if (hp < 120) bucket = '90-110';
        else bucket = '120+';

        acc[bucket] = (acc[bucket] || 0) + item.count;
        return acc;
      },
      {
        '< 60': 0,
        '60-80': 0,
        '90-110': 0,
        '120+': 0,
      } as Record<string, number>
    );

  const barData = Object.keys(hpbuckets).map((key) => hpbuckets[key]);
  const xLabels = Object.keys(hpbuckets);

  return (
    <Grid container spacing={4} sx={{ mt: 4 }}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3, height: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Card Composition
          </Typography>
          <PieChart
            series={[
              {
                data: pieData,
                highlightScope: { fade: 'global', highlight: 'item' },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: 'gray',
                },
              },
            ]}
            height={250}
            slotProps={{
              legend: {
                direction: 'horizontal',
                position: { vertical: 'bottom', horizontal: 'center' },
              },
            }}
            margin={{ bottom: 50 }}
          />
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3, height: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Pokemon Types
          </Typography>
          {typeChartData.length > 0 ? (
            <PieChart
              series={[
                {
                  data: typeChartData,
                  innerRadius: 30,
                  outerRadius: 100,
                  paddingAngle: 5,
                  cornerRadius: 5,
                  startAngle: -90,
                  endAngle: 180,
                  cx: 150,
                  cy: 150,
                },
              ]}
              height={250}
              hideLegend
            />
          ) : (
            <Typography color="text.secondary">
              No Pokemon types found in deck.
            </Typography>
          )}
        </Paper>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            HP Distribution
          </Typography>
          <BarChart
            height={300}
            series={[{ data: barData, label: 'Count', id: 'hpId' }]}
            xAxis={[{ data: xLabels, scaleType: 'band' }]}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
