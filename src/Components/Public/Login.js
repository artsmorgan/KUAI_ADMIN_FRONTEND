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
      form: {email: '', password: ''}
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
    this.setState({...this.state.form[e.target.name] = e.target.value})
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
    this.props.postLoginForm(form)
  }

  showHidePassword = () => {
    const x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
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
                <div className="pass-icon">
                <input type="password" className="pass" name="password" placeholder="Contraseña"
                       onChange={this.inputChangeHandler} value={this.state.form.password} id="password"/>
                <svg class="color-switch active" width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={this.showHidePassword}>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0.363647C4.36364 0.363647 1.25818 2.62547 0 5.81819C1.25818 9.01092 4.36364 11.2727 8 11.2727C11.6364 11.2727 14.7418 9.01092 16 5.81819C14.7418 2.62547 11.6364 0.363647 8 0.363647ZM8 9.45456C5.99273 9.45456 4.36364 7.82547 4.36364 5.81819C4.36364 3.81092 5.99273 2.18183 8 2.18183C10.0073 2.18183 11.6364 3.81092 11.6364 5.81819C11.6364 7.82547 10.0073 9.45456 8 9.45456ZM5.81818 5.81819C5.81818 4.61092 6.79273 3.63637 8 3.63637C9.20727 3.63637 10.1818 4.61092 10.1818 5.81819C10.1818 7.02547 9.20727 8.00001 8 8.00001C6.79273 8.00001 5.81818 7.02547 5.81818 5.81819Z" fill="#660ADE"/>
                </svg>

                </div>
                <p style={{color: "red"}}>
                  {this.validator.message('password', this.state.form.password, 'required')}
                </p>
                <Button className="btn btn-theme" type="submit">
                  INGRESAR
                </Button>
                <div className="link-holder" style={{marginTop: '20px'}}>
                  <a className="float-left" onClick={e => this.gotoStep(e, ROUTES.FORGOT_PASSWORD)}>
                    Olvidaste tu contraseña?</a>
                  <a className="float-right" onClick={e => this.gotoStep(e, ROUTES.REGISTRY)}>Registrarse</a>
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