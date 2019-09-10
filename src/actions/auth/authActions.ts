import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../store';
import { IApi } from '../../api';
import { IAuthenticatedDetails, IAuthenticatedUserDetails } from '../../model/auth/auth';
import axios from 'axios';
import _ from 'lodash';

export enum AuthActionType {
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    // LOGIN_ERROR = 'LOGIN_ERROR',
    LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
    REGISTER_SUCCESS = 'REGISTER_SUCCESS',
    // REGISTER_ERROR = 'REGISTER_ERROR'
}

export interface IAuthAction {
    type: AuthActionType,
    payload?: any;
}

export class LoginAction implements IAuthAction {
    public type: AuthActionType;
    public payload?: any;

    constructor(type: AuthActionType, payload: object) {
        this.type = type;
        this.payload = payload;
    }
}

// export const setLoginError = (loginError: any): IAuthAction => {
//     return {
//         type: AuthActionType.LOGIN_ERROR,
//         payload: loginError,
//     }
// }

export const setLoginSuccess = (loginResponse: IAuthenticatedDetails): IAuthAction => {
    return {
        type: AuthActionType.LOGIN_SUCCESS,
        payload: loginResponse,
    }
}

export const callLoginApi = (username: string, password: string): Function => async (
    dispatch: ThunkDispatch<AppState, void, IAuthAction>,
    state: AppState,
    api: IApi
) => {
    try {
        const loginResponse = await api.authApi.login(username, password);

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
        // return dispatch(setLoginError(e));
        return e
    }    
}

export const logoutUser = (logoutPayload: IAuthenticatedDetails) => {
    return {
        type: AuthActionType.LOGOUT_SUCCESS,
        payload: logoutPayload,
    }
}

// export const setRegisterError = (registerError: any): IAuthAction => {
//     return {
//         type: AuthActionType.REGISTER_ERROR,
//         payload: registerError,
//     }
// }

export const setRegisterSuccess = (registerResponse: IAuthenticatedDetails): IAuthAction => {
    return {
        type: AuthActionType.REGISTER_SUCCESS,
        payload: registerResponse,
    }
}

export const callRegisterApi = (username: string, password: string): Function => async (
    dispatch: ThunkDispatch<AppState, void, IAuthAction>,
    state: AppState,
    api: IApi
) => {
    try {
        const registerResponse = await api.authApi.register(username, password);
        console.log('registerresponse ', registerResponse);
        const userDetails: IAuthenticatedUserDetails = _.pick(registerResponse.user, 'verified', '_id', 'username', 'name');
        const payload: IAuthenticatedDetails = { user: userDetails, accesstoken: registerResponse.accesstoken, message: registerResponse.message };
        return dispatch(setRegisterSuccess(payload));
    } catch (e) {
        // return dispatch(setRegisterError(e));
        return e
    }    
}
