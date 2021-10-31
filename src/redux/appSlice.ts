import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getSavedTracks } from 'src/api/api';
import { LocalStorageKeys } from 'src/common/local-storage-keys';
import { UsersSavedTracksResponse, ErrorResponse } from 'src/types/api';
import { SavedTrackObject, TrackObject } from 'src/types/spotify';
import { RootState, AppState } from 'src/types/store';

const initialState: AppState = {
  isLoading: false,
  error: '',
  token: localStorage.getItem(LocalStorageKeys.TOKEN),
  deviceId: '',
  currentTrack: null,
  tracks: [],
  randomTrack: null,
  tracksPagination: {
    total: 0,
    currentPage: 1,
    limit: 10,
  },
};

export const fetchSavedTracks = createAsyncThunk<UsersSavedTracksResponse | ErrorResponse, void, { state: RootState }>(
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

export const setTrackById = createAsyncThunk<SavedTrackObject, string, { state: RootState }>(
  'app/setTrack',
  async (trackId, { getState }) => {
    const { app } = getState();
    return app.tracks.find(savedTrack => savedTrack.track.id === trackId);
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
      state.currentTrack = items[0];
      state.tracksPagination.total = total;
      state.tracksPagination.limit = limit;
    },
    [fetchSavedTracks.rejected.type]: state => {
      state.isLoading = false;
      state.token = '';
      localStorage.removeItem(LocalStorageKeys.TOKEN);
    },
    [setTrackById.fulfilled.type]: (state, { payload }) => {
      state.currentTrack = payload;
    },
  },
});

export const { setToken, setDeviceId, setCurrentPage } = appSlice.actions;

export default appSlice.reducer;
