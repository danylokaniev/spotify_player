import store from 'src/redux/store';
import { SavedTrackObject } from './spotify';

export interface AppState {
  token: string;
  deviceId: string;
  currentTrack: SavedTrackObject;
  tracks: SavedTrackObject[];
  isPlaying: boolean;
  isCurrentTrackSaved: boolean;
  tracksPagination: TracksPagination;
}

interface TracksPagination {
  total: number;
  limit: number;
  currentPage: number;
}

export interface RootState {
  app: AppState;
}
export type AppDispatch = typeof store.dispatch;

export interface SetCurrentPagePayload {
  payload: number;
}

export interface SetTokenPayload {
  payload: string;
}
export interface SetCurrentTrackPayload {
  payload: {
    track: SavedTrackObject;
    saved: boolean;
  };
}

export interface GetSavedTracksFulfilledPayload {
  payload: {
    limit: number;
    total: number;
    items: SavedTrackObject[];
  };
}
