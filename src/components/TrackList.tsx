import { Box } from '@mui/system';
import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../types/store';
import TrackListItem from './TrackListItem';
import SavedTracksPagination from './TracksPagination';

const TrackList: FunctionComponent<Record<string, never>> = () => {
  const { tracks, currentTrack } = useSelector((state: RootState) => state.app);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      {tracks.map(({ track }) => (
        <TrackListItem track={track} selected={track.id === currentTrack.track.id} key={track.id} />
      ))}
      <SavedTracksPagination />
    </Box>
  );
};

export default TrackList;
