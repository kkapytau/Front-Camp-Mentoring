import axios from 'axios';
import qs from 'qs';
import { isRedirected, isServerLoggedIn, loginErrorMessage, signUpErrorMessage } from '../../redux/actions/UserActions';

export const currentUser = {
    name: "Unknown",
    isExist() {
        return async (dispatch) => {
            await axios({
                method: 'GET',
                url: 'http://localhost:3000/api/user',
                withCredentials: true
            }).then((response) => {
                if ("" == response.data && (typeof localStorage !== 'undefined' && this.isLoggedIn())) {
                    this.signoutHelper(dispatch);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
    },
    authenticate(user) {
        return (dispatch) => {
            axios({
                method: 'POST',
                url: 'http://localhost:3000/api/signup',
                withCredentials: true,
                data: qs.stringify(user)
            }).then((response) => {
                const data = response.data;
                if(data.message){
                    dispatch(signUpErrorMessage(data.message))
                }else{
                    dispatch(signUpErrorMessage(`User ${data.email} was created. Please Lon In`));
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
    },
    logIn(user){
        return async (dispatch) => {
            await axios({
                method: 'POST',
                url: 'http://localhost:3000/api/login',
                withCredentials: true,
                data: qs.stringify(user)
            }).then((response) => {
                const data = response.data;
                if(data.message){
                    dispatch(loginErrorMessage(data.message))
                }else{
                    localStorage.token = Math.random().toString(36).substring(7);
                    this.name = response.data.email;
                    dispatch(isRedirected(true));
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
    },
    isLoggedIn() {
        return !!localStorage.token
    },
    signout() {
        return async (dispatch) => {
            await axios({
                method: 'GET',
                url: 'http://localhost:3000/api/logout',
                withCredentials: true
            }).then(() => {
                /*delete localStorage.token;
                dispatch(isRedirected(false));
                dispatch(isServerLoggedIn(false));*/
                this.signoutHelper(dispatch);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    },
    signoutHelper(dispatch) {
        delete localStorage.token;
        dispatch(isRedirected(false));
        dispatch(isServerLoggedIn(false));
    }
};

//export default currentUser.;