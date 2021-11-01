import React, { FunctionComponent, useEffect } from 'react';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import CurrentTrack from '../components/CurrentTrack';
import PlayerActions from '../components/PlayerActions';
import RandomTrack from '../components/RandomTrack';
import TrackList from '../components/TrackList';
import { getSavedTracks } from '../redux/appSlice';
import { setupPlayer } from '../redux/player';
import { RootState } from '../types/store';

const SpotifyPlayer: FunctionComponent<Record<string, never>> = () => {
  const { token } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    // load Spotify WEB SDK
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = setupPlayer;
  }, []);

  useEffect(() => {
    dispatch(getSavedTracks());
  }, [token]);

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
};

export default SpotifyPlayer;
