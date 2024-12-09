import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="sticky" sx={styles.appBar}>
      <Toolbar sx={styles.toolbar}>
        <Typography variant="h5" sx={styles.title}>
          SmartSpend Tracker
        </Typography>
        <Box sx={styles.buttonGroup}>
          <Button color="inherit" sx={styles.button} component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" sx={styles.button} component={Link} to="/add">
            Add Transaction
          </Button>

        </Box>
      </Toolbar>
    </AppBar>
  );
};

const styles = {
  appBar: {
    backgroundColor: '#2C3E50', // Darker color for a more modern look
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
    transition: 'background-color 0.3s ease-in-out', // Smooth background transition
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
  },
  title: {
    color: '#ECF0F1',
    fontWeight: 'bold',
    fontSize: '24px',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
  },
  buttonGroup: {
    display: 'flex',
    gap: '15px',
  },
  button: {
    color: '#ECF0F1',
    fontWeight: 'bold',
    fontSize: '16px',
    letterSpacing: '0.5px',
    '&:hover': {
      backgroundColor: '#34495E', // Subtle hover effect
      color: '#ffffff',
    },
  },
};

export default Navbar;
