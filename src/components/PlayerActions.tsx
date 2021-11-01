import React, { FunctionComponent } from 'react';
import { RootState } from '../types/store';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useDispatch, useSelector } from 'react-redux';
import { Box, IconButton } from '@mui/material';
import { togglePlay, toggleSaveStateForCurrentTrack } from '../redux/player';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const PlayerActions: FunctionComponent<Record<string, never>> = () => {
  const { isPlaying, isCurrentTrackSaved } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();
  const playClick = () => dispatch(togglePlay());
  const savedClick = () => dispatch(toggleSaveStateForCurrentTrack());

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <IconButton size="large" sx={{ height: 75, width: 75 }} onClick={playClick}>
        {!isPlaying ? <PlayArrowIcon sx={{ fontSize: '2.5rem' }} /> : <PauseIcon sx={{ fontSize: '3.5rem' }} />}
      </IconButton>
      <IconButton onClick={savedClick}>{isCurrentTrackSaved ? <FavoriteIcon /> : <FavoriteBorderIcon />}</IconButton>
    </Box>
  );
};

export default PlayerActions;
