import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/types/store';
import TrackListItem from './TrackListItem';
import SavedTracksPagination from './TracksPagination';

export default function TrackList() {
  const { tracks, currentTrack } = useSelector((state: RootState) => state.app);
  console.log(tracks, currentTrack);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      {tracks.map(({ track }) => (
        <TrackListItem track={track} selected={track.id === currentTrack.track.id} key={track.id} />
      ))}
      <SavedTracksPagination />
    </Box>
  );
}
