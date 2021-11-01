import SpotifyPlayer from './components/SpotifyPlayer';
import { FunctionComponent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from '@mui/material/Container';
import Auth from './components/Auth';
import getUriParams from './common/get-uri-params';
import { setToken } from './redux/appSlice';
import { RootState } from './types/store';

const App: FunctionComponent<Record<string, never>> = () => {
  const token = useSelector((state: RootState) => state.app.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const params = getUriParams();
    const accessToken = params.access_token;
    if (accessToken) dispatch(setToken(accessToken));
  }, []);

  return (
    <Container className="root" sx={{ height: '100vh' }}>
      {token ? <SpotifyPlayer /> : <Auth />}
    </Container>
  );
};

export default App;
