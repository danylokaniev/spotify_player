import store from 'src/redux/store';
import { SavedTrackObject } from './spotify';

export interface AppState {
  token: string;
  deviceId: string;
  currentTrack: SavedTrackObject;
  tracks: SavedTrackObject[];
  randomTrack: any;
  isLoading: boolean;
  error: '';
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
