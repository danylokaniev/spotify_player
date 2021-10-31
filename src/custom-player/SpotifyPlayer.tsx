import { Container, Grid, Paper, styled } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CurrentTrack from 'src/components/CurrentTrack';
import PlayerActions from 'src/components/PlayerActions';
import RandomTrack from 'src/components/RandomTrack';
import TrackList from 'src/components/TrackList';
import { fetchSavedTracks } from 'src/redux/appSlice';
import { setupPlayer } from 'src/redux/player';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  flex: 1,
  color: theme.palette.text.secondary,
}));

const itemStyles = {
  height: 0.85,
  display: 'flex',
  flexFlow: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

export default function SpotifyPlayer({ token }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = setupPlayer;

    dispatch(fetchSavedTracks());
  }, []);

  return (
    <>
      <Container sx={{ flexGrow: 1, height: 1, paddingTop: '24px', display: 'flex', padding: '20px' }}>
        <Box sx={{ width: 0.6, padding: '20px' }}>
          <Box sx={{ height: 0.85 }}>
            <CurrentTrack />
          </Box>
          <Box sx={{ height: 0.15 }}>
            <PlayerActions />
          </Box>
        </Box>
        <Box sx={{ width: 0.4 }}>
          <Box sx={{ height: 0.1 }}>
            <RandomTrack />
          </Box>
          <Box sx={{ height: 0.9 }}>
            <TrackList />
          </Box>
        </Box>
      </Container>
    </>
  );
}
