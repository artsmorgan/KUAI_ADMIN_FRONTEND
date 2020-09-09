import React from 'react';
import {Link} from "react-router-dom";
import {Button} from 'react-bootstrap';
import SimpleReactValidator from 'simple-react-validator';
import Logo from "../../assets/images/logo-kuai-white.svg";
import Modal from "react-bootstrap/Modal";
import TermsAndCondition from "./TermsAndCondition";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {postFormData, isLoggedInAndRedirect, redirectToUrl} from '../../actions'
import ROUTES from '../../util/routes'

class Registry extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      form: {name: '', restaurantName: '', email: '', password: ''},
      step: 'REGISTER',
      show: false,
      registrySuccess: false,
    }

    SimpleReactValidator.addLocale('es', {
      required: 'este campo es requerido',
      email: 'Introduzca un correo electrónico válido'
    });

    this.validator = new SimpleReactValidator({
      locale: 'es',
      autoForceUpdate: this,
      validators: {
        mixPass: {
          message: 'Esta no es una contraseña válida',
          rule: (val, params, validator) => {
            // console.log(val, params, validator);
            return validator.helpers.testRegex(val, /^(?=.*\d)(?=.*[ A-Za-z]).{8,}$/)
          },
        }
      }
    });
  }

  gotoStep = (e, step) => {
    this.props.redirectToUrl(step)
  }

  componentWillMount() {
    this.props.isLoggedInAndRedirect()
  }

  showTermsAndConditionsModal = () => {
    this.setState({show: true});
  }

  hideTermsAndConditionsModal = () => {
    this.setState({show: false});
  }

  hideRegistrySuccessModal = () => {
    this.setState({registrySuccess: false});
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

  showHidePassword = () => {
    const x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  processSubmit() {
    let data = this.state
    // console.log(data)
    this.props.postFormData(data)
  }

  render() {
    return (
        <>
          <div className="container-login">
            <img src={Logo} alt="website logo"/>
            <form onSubmit={this.formSubmitHandler}>
              <div className="ls-panel">
                <h3>Registro</h3>
                <input type="text" placeholder="Nombre" name="name" onChange={this.inputChangeHandler}
                       value={this.state.form.name}/>
                <p style={{color: "red"}}>
                  {this.validator.message('name', this.state.form.name, 'required')}
                </p>
                <input type="text" placeholder="Restaurante" name="restaurantName"
                       onChange={this.inputChangeHandler} value={this.state.form.restaurantName}/>
                <p style={{color: "red"}}>
                  {this.validator.message('restaurantName', this.state.form.restaurantName, 'required')}
                </p>
                <input type="text" placeholder="Correo electrónico" name="email"
                       onChange={this.inputChangeHandler}
                       value={this.state.form.email}/>
                <p style={{color: "red"}}>
                  {this.validator.message('email', this.state.form.email, 'required|email')}
                </p>
                <div className="pass-icon">
                <input type="password" placeholder="Contraseña" name="password" id="password"
                       onChange={this.inputChangeHandler} value={this.state.form.password}/>
                <svg className="color-switch active" width="16" height="12" viewBox="0 0 16 12" fill="none"
                     xmlns="http://www.w3.org/2000/svg" onClick={this.showHidePassword}>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M8 0.363647C4.36364 0.363647 1.25818 2.62547 0 5.81819C1.25818 9.01092 4.36364 11.2727 8 11.2727C11.6364 11.2727 14.7418 9.01092 16 5.81819C14.7418 2.62547 11.6364 0.363647 8 0.363647ZM8 9.45456C5.99273 9.45456 4.36364 7.82547 4.36364 5.81819C4.36364 3.81092 5.99273 2.18183 8 2.18183C10.0073 2.18183 11.6364 3.81092 11.6364 5.81819C11.6364 7.82547 10.0073 9.45456 8 9.45456ZM5.81818 5.81819C5.81818 4.61092 6.79273 3.63637 8 3.63637C9.20727 3.63637 10.1818 4.61092 10.1818 5.81819C10.1818 7.02547 9.20727 8.00001 8 8.00001C6.79273 8.00001 5.81818 7.02547 5.81818 5.81819Z"
                        fill="#660ADE"/>
                </svg>
                </div>
                <p style={{color: "red"}}>
                  {this.validator.message('password', this.state.form.password, 'required|mixPass')}
                </p>
                <p className="help-txt">Minimo 8 caracteres, letras y números unicamente.</p>
                <Button className="btn btn-theme" type="submit">
                  REGISTRARSE
                </Button>
                <div className="link-holder">¿Ya tienes cuenta? <a onClick={e => this.gotoStep(e, ROUTES.LOGIN)}>Iniciar
                  sesión</a>
                </div>
                <div className="link-holder" style={{marginTop: '10px'}}>
                  Al registrarse usted acepta nuestros
                  <a className="default" onClick={this.showTermsAndConditionsModal}>
                    Terminos y Condiciones</a>
                </div>
              </div>
            </form>
          </div>

          <Modal
              className="cstm-modal"
              size="xl"
              show={this.state.show}
              onHide={this.hideTermsAndConditionsModal}
              aria-labelledby="contained-modal-title-vcenter"
              centered
              scrollable={true}
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">

              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <TermsAndCondition/>
            </Modal.Body>
          </Modal>

          <Modal
              className="cstm-modal"
              size="sm"
              show={this.state.registrySuccess}
              onHide={this.hideRegistrySuccessModal}
              aria-labelledby="contained-modal-title-vcenter"
              centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">

              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Gracias por registrarse con nosotros, hemos enviado un email de verificación a la direccion
              que ingresaste.

              Sigue la instrucciones que te enviamos para completar tu perfil y comenzar a utilizar la
              plataforma.
            </Modal.Body>
          </Modal>
        </>
    );
  }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
          postFormData,
          isLoggedInAndRedirect,
          redirectToUrl
        },
        dispatch
    )

export default connect(null, mapDispatchToProps)(Registry)