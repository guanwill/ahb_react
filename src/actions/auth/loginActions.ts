import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../store';
import { IApi } from '../../api';
import { IAuthenticatedDetails, IAuthenticatedUserDetails } from '../../model/auth/auth';
import axios from 'axios';
import _ from 'lodash';

export enum LoginActionType {
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_ERROR = 'LOGIN_ERROR',
}

export interface ILoginAction {
    type: LoginActionType,
    payload?: any;
}

export class LoginAction implements ILoginAction {
    public type: LoginActionType;
    public payload?: any;

    constructor(type: LoginActionType, payload: object) {
        this.type = type;
        this.payload = payload;
    }
}

export const setLoginError = (loginError: any): ILoginAction => {
    return {
        type: LoginActionType.LOGIN_ERROR,
        payload: loginError,
    }
}

export const setLoginSuccess = (loginResponse: IAuthenticatedDetails): ILoginAction => {
    return {
        type: LoginActionType.LOGIN_SUCCESS,
        payload: loginResponse,
    }
}

export const callLoginApi = (username: string, password: string): Function => async (
    dispatch: ThunkDispatch<AppState, void, ILoginAction>,
    state: AppState,
    api: IApi
) => {
    try {
        const loginResponse = await api.authApi.login(username, password);
        console.log('LOGIN RESPONSE ', loginResponse);

        if (loginResponse.user) {
            const userDetails: IAuthenticatedUserDetails = _.pick(loginResponse.user, 'verified', '_id', 'username', 'name');
            const payload: IAuthenticatedDetails = { user: userDetails, accesstoken: loginResponse.accesstoken, message: loginResponse.message };
            localStorage.setItem('accessToken', payload.accesstoken);
            axios.defaults.headers.common['Authorization'] = payload.accesstoken;
            return dispatch(setLoginSuccess(payload));
        }
        
        const pendingVerificationUser = { user: {verified: false, _id:'', username: '', name: ''}, accesstoken: '', message: loginResponse.message };
        return dispatch(setLoginSuccess(pendingVerificationUser));

    } catch (e) {
        delete axios.defaults.headers.common['Authorization'];
        return dispatch(setLoginError(e));
    }    
}
