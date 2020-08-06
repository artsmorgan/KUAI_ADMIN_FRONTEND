import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

import ROUTES from './util/routes'
import * as PublicComponents from './Components/Public/index'
import * as PrivateComponents from './Components/Private/index'
import  './assets/css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
    render() {
        return (
            <>
                <Router>
                    <Switch>
                        <Route path={ROUTES.LOGIN} exact component={PublicComponents.Login}/>
                        <Route path={ROUTES.REGISTRY} exact component={PublicComponents.Registry}/>
                        <Route path={ROUTES.REGISTRY_SUCCESS} component={PublicComponents.RegistrySuccess}/>
                        <Route path={ROUTES.FORGOT_PASSWORD} exact component={PublicComponents.ForgotPassword}/>
                        <Route path={ROUTES.FORGOT_PASSWORD_SUCCESS} component={PublicComponents.ForgotPasswordSuccess}/>
                        <Route path={ROUTES.CHANGE_PASSWORD} exact component={PublicComponents.ChangePassword}/>
                        <Route path={ROUTES.CHANGE_PASSWORD_SUCCESS} component={PublicComponents.ChangePasswordSuccess}/>

                        <Route path={ROUTES.ORDERS} component={PrivateComponents.Orders}/>

                        <Redirect to={ROUTES.LOGIN}/>
                    </Switch>
                </Router>
            </>
        );
    }
}

export default App

