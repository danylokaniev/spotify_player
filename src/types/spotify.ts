declare global {
  interface Window {
    Spotify: any;
    onSpotifyWebPlaybackSDKReady: any;
  }
}
export interface PagingObject<T> {
  href: string;
  items: T[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface SavedTrackObject {
  added_at: string;
  track: TrackObject;
}

export interface TrackObject {
  album: AlbumObjectSimplified;
  external_ids: ExternalIdObject;
  popularity: number;
  is_local?: boolean | undefined;
  artists: ArtistObjectSimplified[];
  available_markets?: string[] | undefined;
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  href: string;
  id: string;
  is_playable?: boolean | undefined;
  linked_from?: TrackLinkObject | undefined;
  name: string;
  preview_url: string | null;
  track_number: number;
  type: 'track';
  uri: string;
}

interface ExternalIdObject {
  isrc?: string | undefined;
  ean?: string | undefined;
  upc?: string | undefined;
}

interface ArtistObjectSimplified extends ContextObject {
  name: string;
  id: string;
  type: 'artist';
}

interface AlbumObjectSimplified extends ContextObject {
  album_group?: 'album' | 'single' | 'compilation' | 'appears_on' | undefined;
  album_type: 'album' | 'single' | 'compilation';
  artists: ArtistObjectSimplified[];
  available_markets?: string[] | undefined;
  id: string;
  images: ImageObject[];
  name: string;
  release_date: string;
  release_date_precision: 'year' | 'month' | 'day';
  type: 'album';
}

interface ImageObject {
  height?: number | undefined;
  url: string;
  width?: number | undefined;
}

interface ContextObject {
  type: 'artist' | 'playlist' | 'album' | 'show' | 'episode';
  href: string;
  external_urls: {
    spotify: string;
  };
  uri: string;
}

interface TrackLinkObject {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  type: 'track';
  uri: string;
}
