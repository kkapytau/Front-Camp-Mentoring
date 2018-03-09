import React from 'react';
import { currentUser } from '../current-user/currentUser';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        currentUser.isAuthenticated  == true
         ? <Component {...props} />
         : <Redirect to={{
         pathname: '/',
         state: { from: props.location }
         }} />
    )} />

);