let player;
import { play } from 'src/api/api';
import { setDeviceId } from './appSlice';
import store from './store';

export const setupPlayer = () => {
  const token = store.getState().app.token;

  player = new window.Spotify.Player({
    name: 'Web Playback SDK',
    getOAuthToken: cb => {
      cb(token);
    },
    volume: 0.5,
  });

  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
    store.dispatch(setDeviceId(device_id));
  });

  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
    store.dispatch(setDeviceId(''));
  });

  player.addListener('player_state_changed', state => {
    if (!state) {
      return;
    }
    console.log(state);

    //  player.getCurrentState().then(state => {
    //    !state ? setActive(false) : setActive(true);
    //  });
  });

  player.connect();
};

export async function toggleTrack() {
  const token = store.getState().app.token;
  const deviceId = store.getState().app.deviceId;
  const playerState = await player.getCurrentState();
  const uris = ['spotify:track:21jGcNKet2qwijlDFuPiPb'];

  if (!playerState) {
    await play(token, { deviceId, uris: uris });
  } else {
    await this.player.togglePlay();
  }
}
