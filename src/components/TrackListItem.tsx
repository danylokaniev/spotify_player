import { ListItemAvatar, Avatar, ListItemText, ListItemButton } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setTrackById } from 'src/redux/appSlice';
import { TrackObject } from 'src/types/spotify';

interface TrackListItemProps {
  track: TrackObject;
  selected: boolean;
}

export default function TrackListItem({ track, selected }: TrackListItemProps) {
  const dispatch = useDispatch();
  const onTrackClick = id => dispatch(setTrackById(id));

  return (
    <ListItemButton selected={selected} onClick={() => onTrackClick(track.id)} key={track.id} sx={{ flexGrow: 0 }}>
      <ListItemAvatar>
        <Avatar variant="square" src={track.album.images[2].url}></Avatar>
      </ListItemAvatar>
      <ListItemText primary={track.name} secondary={track.artists.map(a => a.name).join(', ')} />
    </ListItemButton>
  );
}
