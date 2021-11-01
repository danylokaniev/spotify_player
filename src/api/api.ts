import { getRandomOffset, getRandomQuery } from 'src/common/random-params-generator';
import { RandomTrackResponse, SpotifyPlayOptions, TracksResponse } from 'src/types/api';

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

export async function getUserSavedTracks(token: string, limit: number, offset: number): Promise<TracksResponse> {
  const response = await fetch(`https://api.spotify.com/v1/me/tracks?limit=${limit}&offset=${offset}`, {
    headers: { Authorization: `Bearer ${token}` },
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(`Error response, status: ${response.status}`);
  }

  return response.json();
}

export async function getRandomTrack(token: string): Promise<RandomTrackResponse> {
  const offset = getRandomOffset();
  const query = getRandomQuery();
  const response = await fetch(`https://api.spotify.com/v1/search?query=${query}&offset=${offset}&limit=1&type=track`, {
    headers: { Authorization: `Bearer ${token}` },
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(`Error response, status: ${response.status}`);
  }

  return response.json();
}

export async function isSavedTrackById(token: string, id: string): Promise<boolean[]> {
  const response = await fetch(`https://api.spotify.com/v1/me/tracks/contains?ids=${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(`Error response, status: ${response.status}`);
  }

  return response.json();
}

export async function saveTrackById(token: string, id: string): Promise<string> {
  const response = await fetch(`https://api.spotify.com/v1/me/tracks?ids=${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    method: 'PUT',
  });

  if (!response.ok) {
    throw new Error(`Error response, status: ${response.status}`);
  }

  return response.text();
}

export async function removeTrackById(token: string, id: string): Promise<string> {
  const response = await fetch(`https://api.spotify.com/v1/me/tracks?ids=${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Error response, status: ${response.status}`);
  }

  return response.text();
}
