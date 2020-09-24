import React from 'react';
import {Route, Redirect, withRouter} from 'react-router-dom';
import ROUTES from '../../util/routes';


const PrivateRoutes = ({component: Component, auth, path}) => {
    let isAuthenticated = false;
    if (auth.accessToken && auth.tokenExpiredAt && auth.tokenExpiredAt > new Date()) {
        isAuthenticated = true;
    }
    return (
        <Route exact path={path}
               render={props => (isAuthenticated ? <Component {...props} /> : <Redirect to={ROUTES.LOGIN}/>)}/>
    )
};

export default withRouter(PrivateRoutes);