import { PagingObject, SavedTrackObject } from './spotify';

export interface SpotifyDevice {
  id: string;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: string;
  volume_percent: number;
}

export interface SpotifyArtist {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface SpotifyImage {
  height: number;
  url: string;
  width: number;
}

export interface SpotifyPlayOptions {
  context_uri?: string;
  deviceId: string;
  offset?: number;
  uris: string[];
}

export type UsersSavedTracksResponse = PagingObject<SavedTrackObject>;

export interface ErrorResponse {
  error: {
    status: number;
    message: string;
  };
}
