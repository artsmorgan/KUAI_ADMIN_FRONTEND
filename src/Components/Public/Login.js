import React from 'react';
import {Button} from 'react-bootstrap';
import SimpleReactValidator from 'simple-react-validator';

import Logo from "../../assets/images/logo-kuai-white.svg";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {postLoginForm, isLoggedInAndRedirect, redirectToUrl} from '../../actions'
import ROUTES from '../../util/routes'

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            form: {}
        }

        SimpleReactValidator.addLocale('es', {
            required: 'este campo es requerido',
            email: 'Introduzca un correo electrónico válido'
        });

        this.validator = new SimpleReactValidator({
            locale: 'es',
            autoForceUpdate: this
        });
    }

    inputChangeHandler = (e) => {
        let obj = this.state.form
        obj[e.target.name] = e.target.value
        this.setState({form: obj})
        // console.log(this.state.form);
    }

    formSubmitHandler = (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            this.processSubmit();
        } else {
            this.validator.showMessages();
        }
    };

    gotoStep = (e, step) => {
        this.props.redirectToUrl(step)
    }

    componentWillMount() {
        this.props.isLoggedInAndRedirect()
    }

    processSubmit() {
        let {form} = this.state
        // console.log(form)
        this.props.postLoginForm(form)
    }


    render() {
        return (
            <>
                <div className="container-login">
                    <img src={Logo} alt="website logo"/>
                    <form onSubmit={this.formSubmitHandler}>
                        <div className="ls-panel">
                            <h3>Iniciar sesión</h3>
                            <input type="text" className="user" name="email" placeholder="Correo electrónico"
                                   onChange={this.inputChangeHandler} value={this.state.form.email}/>
                            <p style={{color: "red"}}>
                                {this.validator.message('email', this.state.form.email, 'required|email')}
                            </p>
                            <input type="password" className="pass" name="password" placeholder="Contraseña"
                                   onChange={this.inputChangeHandler} value={this.state.form.password}/>
                            <p style={{color: "red"}}>
                                {this.validator.message('password', this.state.form.password, 'required')}
                            </p>
                            <Button className="btn btn-theme" type="submit">
                                INGRESAR
                            </Button>
                            <div className="link-holder" style={{marginTop: '20px'}}><a className="float-left"
                                                                                        onClick={e => this.gotoStep(e, ROUTES.FORGOT_PASSWORD)}>Olvidaste
                                tu contraseña?</a>&emsp;<a className="float-right"
                                                           onClick={e => this.gotoStep(e, ROUTES.REGISTRY)}>Registrarse</a>
                            </div>
                        </div>
                    </form>
                </div>


            </>
        );
    }
}

const mapStateToProps = ({auth}) => ({
    auth
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            postLoginForm,
            isLoggedInAndRedirect,
            redirectToUrl
        },
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(Login)