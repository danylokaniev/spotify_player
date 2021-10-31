import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import { setRandomTrack } from 'src/redux/player';

export default function RandomTrack() {
  const dispatch = useDispatch();
  const playClick = () => dispatch(setRandomTrack());

  return (
    <IconButton size="large" sx={{ height: 75, width: 75 }} onClick={playClick}>
      <CasinoIcon />
    </IconButton>
  );
}
