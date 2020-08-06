import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

import ROUTES from './util/routes'
import * as PublicComponents from './Components/Public/index'

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

                        <Redirect to={ROUTES.LOGIN}/>
                    </Switch>
                </Router>
            </>
        );
    }
}

export default App

