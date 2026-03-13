import { Outlet, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  IconButton,
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useColorMode } from '../contexts/ColorModeContext';

export default function MainLayout() {
  const { mode, toggleColorMode } = useColorMode();

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          mb: 4,
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(19, 20, 31, 0.8)',
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <span style={{ fontSize: '1.5rem' }}>⚔️</span> Riftbound
          </Typography>
          <Box>
            <Button component={Link} to="/" color="inherit">
              Home
            </Button>
            <Button component={Link} to="/builder" color="inherit">
              Builder
            </Button>
            <Button component={Link} to="/library" color="inherit">
              Library
            </Button>
            <IconButton
              sx={{ ml: 1 }}
              onClick={toggleColorMode}
              color="inherit"
              aria-label="toggle theme"
            >
              {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ minHeight: '80vh', pb: 4 }}>
        <Outlet />
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          textAlign: 'center',
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(0, 0, 0, 0.05)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Riftbound Decksmith. Not affiliated with
          any real game company.
        </Typography>
      </Box>
    </>
  );
}
