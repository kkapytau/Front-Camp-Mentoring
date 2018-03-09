import axios from 'axios';
import qs from 'qs';

import { isRedirected, logOn, errorMessage } from '../../redux/actions/UserActions';

export const currentUser = {
    isAuthenticated: true,
    name: "Unknown",
    authenticate(user) {
        return (dispatch) => {
            axios({
                method: 'POST',
                url: 'http://localhost:3000/api/signup',
                withCredentials: true,
                data: qs.stringify(user)
            }).then((response) => {
                //this.isAuthenticated = true;

                //return response;
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
                    dispatch(errorMessage(data.message))
                }else{
                    //console.log(window);
                    this.isAuthenticated = true;
                    dispatch(isRedirected(true));
                }
                //return response;
            })
            .catch((error) => {
                console.log(error);
            });
        }
    },
    signout(cb) {
        delete window.sessionStorage.isLogged;
        setTimeout(cb, 100)
    }
};