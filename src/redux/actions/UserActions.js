import { IS_REDIRECTED, LOG_ON, ERROR_MSG } from '../constants/Constants';

export function isRedirected(indicator) {
    return {
        type: IS_REDIRECTED,
        payload: indicator
    };
}

export function logOn(user) {
    return {
        type: LOG_ON,
        payload: user
    };
}

export function errorMessage(msg) {
    return {
        type: ERROR_MSG,
        payload: msg
    };
}
