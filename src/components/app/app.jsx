import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AddBlogForm from '../blogForm/addBlog';
import LoginForm from '../loginForm/loginForm';
import RegisterForm from '../registerForm/registerForm';
import Wrapper from './wrapper';
import { PrivateRoute } from '../../helper/privateRoute/privateRoute';

import { renderRoutes } from 'react-router-config';
import routes from '../../routes/routes';
import './styles.scss';

export default function App() {
    /*return (
        <Switch>
            <Route exact path='/' component={LoginForm}/>
            <Route path='/signup' component={RegisterForm}/>
            <PrivateRoute path='/add-blog' component={AddBlogForm}/>
            <PrivateRoute path='/blogs' component={Wrapper}/>
        </Switch>
    );*/
    return (
        <Switch>
            { renderRoutes(routes) }
        </Switch>
    );
}