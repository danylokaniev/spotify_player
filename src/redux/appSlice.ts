import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getSavedTracks } from 'src/api/api';
import { LocalStorageKeys } from 'src/common/local-storage-keys';
import { TracksResponse, ErrorResponse } from 'src/types/api';
import { RootState, AppState } from 'src/types/store';

const initialState: AppState = {
  isLoading: false,
  isPlaying: false,
  error: '',
  deviceId: '',
  currentTrack: null,
  tracks: [],
  tracksPagination: {
    total: 0,
    currentPage: 1,
    limit: 10,
  },
  token: localStorage.getItem(LocalStorageKeys.TOKEN),
};

export const fetchSavedTracks = createAsyncThunk<TracksResponse | ErrorResponse, void, { state: RootState }>(
  'app/fetchTracks',
  async (_, { getState, rejectWithValue }) => {
    const { app } = getState();
    const { tracksPagination, token } = app;
    const { limit, currentPage } = tracksPagination;
    const offset = (currentPage - 1) * limit;
    try {
      const response = await getSavedTracks(token, limit, offset);
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
    setToken: (state, { payload }) => {
      state.token = payload;
      localStorage.setItem(LocalStorageKeys.TOKEN, payload);
    },
    setDeviceId: (state, { payload }) => {
      state.deviceId = payload;
    },
    setCurrentPage: (state, { payload }) => {
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
    setCurrentTrack: (state, { payload }) => {
      state.currentTrack = payload;
    },
  },
  extraReducers: {
    [fetchSavedTracks.pending.type]: state => {
      state.isLoading = true;
      state.error = '';
    },
    [fetchSavedTracks.fulfilled.type]: (state, { payload }) => {
      const { total, items, limit } = payload;
      state.isLoading = false;
      state.tracks = items;
      state.tracksPagination.total = total;
      state.tracksPagination.limit = limit;
      if (!state.currentTrack) state.currentTrack = items[0];
    },
    [fetchSavedTracks.rejected.type]: state => {
      state.isLoading = false;
      state.token = '';
      localStorage.removeItem(LocalStorageKeys.TOKEN);
    },
  },
});

export const { setToken, setDeviceId, setCurrentPage, setPaused, setPlayed, togglePlaying, setCurrentTrack } =
  appSlice.actions;

export default appSlice.reducer;
