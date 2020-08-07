import React from 'react';
import {Route, Redirect, withRouter} from 'react-router-dom';


const PublicRoutes = ({component: Component, path}) => {
    let isAuthenticated = false;
    if (localStorage.getItem("kuaiUserAuthToken")) {
        isAuthenticated = true;
    }
    return (
        <Route exact path={path}
               render={props => (isAuthenticated ? <Redirect to="/orders"/> : <Component {...props} />)}/>
    )
};

export default withRouter(PublicRoutes);