import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const SiteHeader = () => {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ display: 'flex', gap: 2 }}>
        <Typography component={RouterLink} to="/" variant="h6" sx={{ color: 'inherit', textDecoration: 'none', flexGrow: 1 }}>
          Open Library Books
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button component={RouterLink} to="/" color="inherit">
            Home
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default SiteHeader;
