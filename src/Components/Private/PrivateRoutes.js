import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';


const PrivateRoutes = ({ component: Component, path }) => {
    let isAuthenticated = true;
    if (localStorage.getItem("kuaiUserAuthToken")) {
        isAuthenticated = true;
    }
    return (
        <Route exact path={path} render={props => (isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />)} />
    )
};

export default withRouter(PrivateRoutes);