import React from 'react';
import { currentUser } from '../userApi/userApi';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        currentUser.isLoggedIn()  == true
         ? <Component {...props} />
         : <Redirect to={{
         pathname: '/',
         state: { from: props.location }
         }} />
    )} />

);