import { ListItemAvatar, Avatar, ListItemText, ListItemButton } from '@mui/material';
import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentTrackById } from '../redux/player';
import { TrackObject } from '../types/spotify';

interface TrackListItemProps {
  track: TrackObject;
  selected: boolean;
}

const TrackListItem: FunctionComponent<TrackListItemProps> = ({ track, selected }) => {
  const dispatch = useDispatch();
  const onTrackClick = id => dispatch(setCurrentTrackById(id));

  return (
    <ListItemButton selected={selected} onClick={() => onTrackClick(track.id)} key={track.id} sx={{ flexGrow: 0 }}>
      <ListItemAvatar>
        <Avatar variant="square" src={track.album.images[2].url}></Avatar>
      </ListItemAvatar>
      <ListItemText primary={track.name} secondary={track.artists.map(a => a.name).join(', ')} />
    </ListItemButton>
  );
};

export default TrackListItem;
