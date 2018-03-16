import { IS_REDIRECTED, LOG_ON, LOGIN_ERROR_MSG, SIGNUP_ERROR_MSG, IS_USER_EXIST } from '../constants/Constants';

export function isRedirected(indicator) {
    return {
        type: IS_REDIRECTED,
        payload: indicator
    };
}

export function isServerLoggedIn(indicator) {
    return {
        type: IS_USER_EXIST,
        payload: indicator
    };
}

export function logOn(user) {
    return {
        type: LOG_ON,
        payload: user
    };
}

export function loginErrorMessage(msg) {
    return {
        type: LOGIN_ERROR_MSG,
        payload: msg
    };
}

export function signUpErrorMessage(msg) {
    return {
        type: SIGNUP_ERROR_MSG,
        payload: msg
    };
}