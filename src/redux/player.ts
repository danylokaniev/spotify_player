import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRandomTrack, play } from 'src/api/api';
import { RootState } from 'src/types/store';
import { setCurrentTrack, setDeviceId, setPlayed, togglePlaying } from './appSlice';
import store from './store';

let player;

export const setupPlayer = () => {
  const token = store.getState().app.token;

  player = new window.Spotify.Player({
    name: 'Web Playback SDK',
    getOAuthToken: cb => {
      cb(token);
    },
    volume: 0.5,
  });

  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
    store.dispatch(setDeviceId(device_id));
  });

  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
    store.dispatch(setDeviceId(''));
  });

  player.connect();
};

export const togglePlay = createAsyncThunk<void, void, { state: RootState }>(
  'app/togglePlayer',
  async (_, { getState, dispatch }) => {
    const { app } = getState();
    const { token, deviceId, currentTrack } = app;
    const playerState = await player.getCurrentState();

    if (!playerState) {
      const uris = [currentTrack.track.uri];
      await play(token, { deviceId, uris: uris });
    } else {
      await player.togglePlay();
    }

    dispatch(togglePlaying());
  }
);

export const setCurrentTrackById = createAsyncThunk<void, string, { state: RootState }>(
  'app/setTrack',
  async (trackId, { getState, dispatch }) => {
    const { app } = getState();
    const { token, deviceId, tracks, currentTrack } = app;
    const trackToPlay = tracks.find(tr => tr.track.id === trackId);

    if (trackToPlay?.track?.id !== currentTrack?.track?.id) {
      const uris = [trackToPlay.track.uri];
      dispatch(setCurrentTrack(trackToPlay));
      dispatch(setPlayed());
      await play(token, { deviceId, uris: uris });
    }
  }
);

export const setRandomTrack = createAsyncThunk<void, void, { state: RootState }>(
  'app/setRandomTrack',
  async (_, { getState, dispatch }) => {
    const { app } = getState();
    const { token, deviceId } = app;
    const randomTrackResponse = await getRandomTrack(token);
    console.log(randomTrackResponse);
    const randomTrack = { track: randomTrackResponse.tracks.items[0] };

    console.log(randomTrack);
    const uris = [randomTrack.track.uri];
    console.log(uris);

    dispatch(setCurrentTrack(randomTrack));
    dispatch(setPlayed());
    await play(token, { deviceId, uris: uris });
  }
);
