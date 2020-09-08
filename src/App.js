import React from 'react';
import {Switch, Redirect} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import ROUTES from './util/routes'
import PublicRoutes from "./Components/Public/PublicRoutes";
import PrivateRoutes from "./Components/Private/PrivateRoutes";
import * as PublicComponents from './Components/Public/index'
import * as PrivateComponents from './Components/Private/index'
import './assets/css/style.css'

import {Toaster, Loader} from './Components/Public'
import {checkStorageLoginCred} from './actions'

class App extends React.Component {

    state = {}

    componentWillMount() {
        this.props.checkStorageLoginCred()
    }

    render() {
        const {auth, form, menuReducer} = this.props
        const loading = auth.loading || form.loading || menuReducer.loading
        return (
            <React.Fragment>
                <Switch>
                    <PublicRoutes path={ROUTES.LOGIN} exact component={PublicComponents.Login}/>
                    <PublicRoutes path={ROUTES.REGISTRY} exact component={PublicComponents.Registry}/>
                    <PublicRoutes path={ROUTES.REGISTRY_SUCCESS} component={PublicComponents.RegistrySuccess}/>
                    <PublicRoutes path={ROUTES.FORGOT_PASSWORD} exact component={PublicComponents.ForgotPassword}/>
                    <PublicRoutes path={ROUTES.FORGOT_PASSWORD_SUCCESS}
                                  component={PublicComponents.ForgotPasswordSuccess}/>
                    <PublicRoutes path={ROUTES.CHANGE_PASSWORD} exact component={PublicComponents.ChangePassword}/>
                    <PublicRoutes path={ROUTES.CHANGE_PASSWORD_SUCCESS}
                                  component={PublicComponents.ChangePasswordSuccess}/>

                    <PrivateRoutes path={ROUTES.ORDERS} auth={this.props.auth} component={PrivateComponents.Orders}/>
                    <PrivateRoutes path={ROUTES.MODIFY_RESTAURANT} auth={this.props.auth}
                                   component={PrivateComponents.ModifyRestaurant}/>
                    <PrivateRoutes path={ROUTES.MODIFY_MENU} auth={this.props.auth}
                                   component={PrivateComponents.ModifyMenu}/>
                    <PrivateRoutes path={ROUTES.PAYMENT_METHODS} auth={this.props.auth}
                                   component={PrivateComponents.PaymentMethods}/>
                    <PrivateRoutes path={ROUTES.DELIVERY_METHODS} auth={this.props.auth}
                                   component={PrivateComponents.DeliveryMethods}/>
                    <PrivateRoutes path={ROUTES.CONTROL_CENTER} auth={this.props.auth}
                                   component={PrivateComponents.ControlCenter}/>

                    <Redirect to={ROUTES.LOGIN}/>
                </Switch>
                <Toaster/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({auth, form, menuReducer}) => ({
    auth, form, menuReducer
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {checkStorageLoginCred},
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(App)

