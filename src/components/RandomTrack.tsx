import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { Box, IconButton } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import { setRandomTrack } from '../redux/player';

const RandomTrack: FunctionComponent<Record<string, never>> = () => {
  const dispatch = useDispatch();
  const playClick = () => dispatch(setRandomTrack());

  return (
    <Box sx={{ textAlign: 'center' }}>
      <IconButton size="large" sx={{ height: 75, width: 75 }} onClick={playClick}>
        <CasinoIcon color="primary" />
      </IconButton>
    </Box>
  );
};

export default RandomTrack;
