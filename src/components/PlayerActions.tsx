import React from 'react';
import { RootState } from 'src/types/store';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { togglePlay } from 'src/redux/player';

export default function PlayerActions() {
  const { isPlaying } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();
  const playClick = () => dispatch(togglePlay());

  return (
    <IconButton size="large" sx={{ height: 75, width: 75 }} onClick={playClick}>
      {!isPlaying ? <PlayArrowIcon sx={{ fontSize: '2.5rem' }} /> : <PauseIcon sx={{ fontSize: '3.5rem' }} />}
    </IconButton>
  );
}
