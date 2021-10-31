export const authEndpoint = 'https://accounts.spotify.com/authorize';
export const clientId = 'f51d0a9799ad443faf036371c60e1303';
export const redirectUri = 'http://localhost:3002';
export const scopes = [
  'user-top-read',
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-library-modify',
  'user-library-read',
  'streaming',
  'user-read-private',
  'user-read-email',
  'user-read-playback-state',
  'user-modify-playback-state',
];

const authUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  '%20'
)}&response_type=token&show_dialog=true`;

export default authUrl;
