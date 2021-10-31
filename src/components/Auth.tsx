import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import authUrl from 'src/common/config';

export default function Auth() {
  return (
    <Box sx={{ width: 1, height: 1, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
      <Button variant="contained" color="success">
        <a href={authUrl}>Login to Spotify</a>
      </Button>
    </Box>
  );
}
