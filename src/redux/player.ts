import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRandomTrack, isSavedTrackById, play, removeTrackById, saveTrackById } from '../api/api';
import { WebPlaybackState } from '../types/spotify';
import { RootState } from '../types/store';
import {
  getSavedTracks,
  setCurrentTrack,
  setDeviceId,
  setPaused,
  setPlayed,
  toggleCurrentStateSaved,
  togglePlaying,
} from './appSlice';
import store from './store';

let player;

export const setupPlayer = (): void => {
  const token = store.getState().app.token;

  player = new window.Spotify.Player({
    name: 'Web Playback SDK',
    getOAuthToken: cb => {
      cb(token);
    },
    volume: 0.5,
  });

  player.addListener('ready', ({ device_id }: { device_id: string }): void => {
    console.log('Ready with Device ID', device_id);
    store.dispatch(setDeviceId(device_id));
  });

  player.addListener('not_ready', ({ device_id }: { device_id: string }): void => {
    console.log('Device ID has gone offline', device_id);
    store.dispatch(setDeviceId(''));
  });

  player.addListener('player_state_changed', (state: WebPlaybackState): void => {
    if (state?.paused) store.dispatch(setPaused());
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
    const isSaved = await isSavedTrackById(token, trackToPlay.track.id);

    if (trackToPlay?.track?.id !== currentTrack?.track?.id) {
      const uris = [trackToPlay.track.uri];
      dispatch(setCurrentTrack({ track: trackToPlay, saved: isSaved[0] }));
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
    const randomTrack = { track: randomTrackResponse.tracks.items[0], added_at: '' };
    const uris = [randomTrack.track.uri];
    const isSaved = await isSavedTrackById(token, randomTrack.track.id);

    dispatch(setCurrentTrack({ track: randomTrack, saved: isSaved[0] }));
    dispatch(setPlayed());
    await play(token, { deviceId, uris: uris });
  }
);

export const toggleSaveStateForCurrentTrack = createAsyncThunk<void, void, { state: RootState }>(
  'app/toggleSaveStateForCurrentTrack',
  async (_, { getState, dispatch }) => {
    const { app } = getState();
    const { token, currentTrack, isCurrentTrackSaved } = app;

    if (isCurrentTrackSaved) {
      await removeTrackById(token, currentTrack.track.id);
    } else {
      await saveTrackById(token, currentTrack.track.id);
    }

    dispatch(toggleCurrentStateSaved());
    dispatch(getSavedTracks());
  }
);
