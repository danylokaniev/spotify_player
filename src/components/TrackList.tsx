import { Box } from '@mui/system';
import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../types/store';
import TrackListItem from './TrackListItem';
import SavedTracksPagination from './TracksPagination';
import { Typography } from '@mui/material';

const TrackList: FunctionComponent<Record<string, never>> = () => {
  const { tracks, currentTrack } = useSelector((state: RootState) => state.app);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <Typography sx={{ padding: '12px' }}>Saved tracks: </Typography>
      {tracks.map(({ track }) => (
        <TrackListItem track={track} selected={track.id === currentTrack.track.id} key={track.id} />
      ))}
      <SavedTracksPagination />
    </Box>
  );
};

export default TrackList;
