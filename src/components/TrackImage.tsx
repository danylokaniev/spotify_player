import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { RootState } from 'src/types/store';
import { useSelector } from 'react-redux';
import { Box, CircularProgress, Paper } from '@mui/material';

export default function TrackImage() {
  const { currentTrack, isLoading } = useSelector((state: RootState) => state.app);

  return !currentTrack || isLoading ? (
    <CircularProgress />
  ) : (
    <Box
      sx={{
        backgroundImage: `url(${currentTrack.track.album.images[0].url})`,
        width: 1,
        height: 1,
        maxWidth: 635,
        maxHeight: 635,
        backgroundSize: 'cover',
      }}
    />
  );
}
