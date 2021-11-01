import { PagingObject, SavedTrackObject, TrackObject } from './spotify';

export interface SpotifyPlayOptions {
  context_uri?: string;
  deviceId: string;
  offset?: number;
  uris: string[];
}

export type TracksResponse = PagingObject<SavedTrackObject>;
export type RandomTrackResponse = { tracks: PagingObject<TrackObject> };

export interface ErrorResponse {
  error: {
    status: number;
    message: string;
  };
}
