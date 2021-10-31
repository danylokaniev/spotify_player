import { ErrorResponse, SpotifyPlayOptions, UsersSavedTracksResponse } from 'src/types/api';

export async function play(token: string, { deviceId, uris }: SpotifyPlayOptions): Promise<Response> {
  const body = JSON.stringify({ uris });

  return fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
    body,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  });
}

export async function getSavedTracks(token: string, limit: number, offset: number): Promise<UsersSavedTracksResponse> {
  const response = await fetch(`https://api.spotify.com/v1/me/tracks?limit=${limit}&offset=${offset}`, {
    headers: { Authorization: `Bearer ${token}` },
    method: 'Get',
  });

  if (!response.ok) {
    throw new Error(`Error response, status: ${response.status}`);
  }

  return response.json();
}
