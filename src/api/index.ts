import AuthApi from './auth/authApi';
import GameApi from './games/gameApi'
import GiantBombApi from './games/giantBombApi';
import httpClient from './httpClient';

export interface IApi {
    authApi: AuthApi
    gameApi: GameApi
    giantBombApi: GiantBombApi
}

export default {
    // use localhost:8000 for local
    authApi: new AuthApi(httpClient, 'https://abh-backend.herokuapp.com'),
    gameApi: new GameApi(httpClient, 'https://abh-backend.herokuapp.com'),
    giantBombApi: new GiantBombApi(httpClient, 'https://abh-backend.herokuapp.com')
    // authApi: new AuthApi(httpClient, 'http://localhost:8000'),
    // gameApi: new GameApi(httpClient, 'http://localhost:8000'),
    // giantBombApi: new GiantBombApi(httpClient, 'http://localhost:8000')
} as IApi;