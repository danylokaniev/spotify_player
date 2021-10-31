import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { RootState } from 'src/types/store';
import { useSelector } from 'react-redux';
import { Box, CardContent, CircularProgress, Paper, Typography } from '@mui/material';

export default function CurrentTrack() {
  const { currentTrack, isLoading } = useSelector((state: RootState) => state.app);

  return !currentTrack || isLoading ? (
    <CircularProgress />
  ) : (
    <>
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
      <Box sx={{ width: 1, maxWidth: 635, marginTop: '10px' }}>
        <Typography gutterBottom variant="h5" component="div" align="left">
          {currentTrack.track.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {currentTrack.track.artists.map(artist => artist.name).join(', ')}
        </Typography>
      </Box>
    </>
  );
}
