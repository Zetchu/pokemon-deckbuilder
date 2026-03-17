import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h2" gutterBottom>
        Welcome to Pokémon TCG Builder!
      </Typography>
      <Typography variant="h5" sx={{ mb: 4 }}>
        Build your ultimate deck and become a master.
      </Typography>
      <Button variant="contained" component={Link} to="/builder" startIcon="🔥">
        Start Building!
      </Button>
    </Box>
  );
}
