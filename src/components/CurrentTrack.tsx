import React, { FunctionComponent } from 'react';
import { RootState } from '../types/store';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';

const CurrentTrack: FunctionComponent<Record<string, never>> = () => {
  const { currentTrack } = useSelector((state: RootState) => state.app);

  return (
    currentTrack && (
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
    )
  );
};

export default CurrentTrack;
