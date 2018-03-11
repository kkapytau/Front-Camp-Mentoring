import { IS_REDIRECTED, LOG_ON, LOGIN_ERROR_MSG, SIGNUP_ERROR_MSG, IS_USER_EXIST } from '../constants/Constants';

const initialState = {
    redirectToReferrer: false,
    serverErrorMsg: "",
    isServerLoggedIn: true
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case IS_REDIRECTED:
            return { ...state, redirectToReferrer: action.payload };
        case IS_USER_EXIST:
            return { ...state, isServerLoggedIn: action.payload };
        case LOG_ON:
            return { ...state, user: action.payload };
        case LOGIN_ERROR_MSG:
            return { ...state, serverLoginErrorMsg: action.payload };
        case SIGNUP_ERROR_MSG:
            return { ...state, serverSignUpErrorMsg: action.payload };
        default:
            return state;
    }
}
