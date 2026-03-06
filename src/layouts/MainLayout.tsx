import { Outlet, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
} from '@mui/material';

export default function MainLayout() {
  return (
    <>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ⚔️ Riftbound Decksmith
          </Typography>
          <Box>
            <Button component={Link} to="/" color="inherit">
              Home
            </Button>
            <Button component={Link} to="/builder" color="inherit">
              Builder
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </>
  );
}
