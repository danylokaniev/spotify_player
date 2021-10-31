import { Container, Grid, Paper, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import TrackImage from 'src/components/TrackImage';
import TrackList from 'src/components/TrackList';
import { fetchSavedTracks } from 'src/redux/appSlice';
import { setupPlayer, toggleTrack } from 'src/redux/player';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  flex: 1,
  color: theme.palette.text.secondary,
}));

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
      <Container sx={{ flexGrow: 1, height: 1, paddingTop: '24px' }}>
        <Grid container spacing={2} sx={{ height: 1 }}>
          <Grid item xs={8} sx={{ height: 0.85, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TrackImage />
          </Grid>
          <Grid item xs={4} sx={{ height: 0.85, display: 'flex' }}>
            <TrackList />
          </Grid>
          <Grid item xs={8} sx={{ height: 0.15, display: 'flex' }}>
            <Item>xs=8</Item>
          </Grid>
          <Grid item xs={4} sx={{ height: 0.15, display: 'flex' }}>
            <Item>xs=8</Item>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
