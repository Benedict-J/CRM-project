import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import StandardDrawer from './StandardDrawer';

function Navbar({ active, buttons }) {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <AppBar
        position="static"
        sx={{
          width: `100vw`,
          display: { sm: 'none' },
          background: 'white',
          boxShadow: 'none',
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' } }}
            size="large"
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            {buttons}
          </Box>
        </Toolbar>
      </AppBar>

      <StandardDrawer
        active={active}
        open={open}
        handleDrawerToggle={handleDrawerToggle}
      />
    </div>
  );
}

export default Navbar;
