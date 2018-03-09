import { IS_REDIRECTED, LOG_ON, ERROR_MSG } from '../constants/Constants';

const initialState = {
    redirectToReferrer: false,
    serverErrorMsg: ""
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case IS_REDIRECTED:
            return { ...state, redirectToReferrer: action.payload };
        case LOG_ON:
            return { ...state, user: action.payload };
        case ERROR_MSG:
            return { ...state, serverErrorMsg: action.payload };
        default:
            return state;
    }
}
