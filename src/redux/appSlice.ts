import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserSavedTracks } from 'src/api/api';
import { LocalStorageKeys } from 'src/common/local-storage-keys';
import { TracksResponse, ErrorResponse } from 'src/types/api';
import {
  RootState,
  AppState,
  SetCurrentPagePayload,
  SetCurrentTrackPayload,
  SetTokenPayload,
  GetSavedTracksFulfilledPayload,
} from 'src/types/store';

const initialState: AppState = {
  token: localStorage.getItem(LocalStorageKeys.TOKEN),
  isPlaying: false,
  deviceId: '',
  currentTrack: null,
  isCurrentTrackSaved: true,
  tracks: [],
  tracksPagination: {
    total: 0,
    currentPage: 1,
    limit: 10,
  },
};

export const getSavedTracks = createAsyncThunk<TracksResponse | ErrorResponse, void, { state: RootState }>(
  'app/fetchTracks',
  async (_, { getState, rejectWithValue }) => {
    const { app } = getState();
    const { tracksPagination, token } = app;
    const { limit, currentPage } = tracksPagination;
    const offset = (currentPage - 1) * limit;
    try {
      const response = await getUserSavedTracks(token, limit, offset);
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setToken: (state, { payload }: SetTokenPayload) => {
      state.token = payload;
      localStorage.setItem(LocalStorageKeys.TOKEN, payload);
    },
    setDeviceId: (state, { payload }) => {
      state.deviceId = payload;
    },
    setCurrentPage: (state, { payload }: SetCurrentPagePayload) => {
      state.tracksPagination.currentPage = payload;
    },
    setPaused: state => {
      state.isPlaying = false;
    },
    setPlayed: state => {
      state.isPlaying = true;
    },
    togglePlaying: state => {
      state.isPlaying = !state.isPlaying;
    },
    setCurrentTrack: (state, { payload }: SetCurrentTrackPayload) => {
      state.currentTrack = payload.track;
      state.isCurrentTrackSaved = payload.saved;
    },
    toggleCurrentStateSaved: state => {
      state.isCurrentTrackSaved = !state.isCurrentTrackSaved;
    },
  },
  extraReducers: {
    [getSavedTracks.fulfilled.type]: (state, { payload }: GetSavedTracksFulfilledPayload) => {
      const { total, items, limit } = payload;
      state.tracks = items;
      state.tracksPagination.total = total;
      state.tracksPagination.limit = limit;
      if (!state.currentTrack) state.currentTrack = items[0];
    },
    [getSavedTracks.rejected.type]: state => {
      state.token = '';
      localStorage.removeItem(LocalStorageKeys.TOKEN);
    },
  },
});

export const {
  setToken,
  setDeviceId,
  setCurrentPage,
  setPaused,
  setPlayed,
  togglePlaying,
  setCurrentTrack,
  toggleCurrentStateSaved,
} = appSlice.actions;

export default appSlice.reducer;
