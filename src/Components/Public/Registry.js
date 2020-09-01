import React from 'react';
import {Link} from "react-router-dom";
import {Button} from 'react-bootstrap';

import SimpleReactValidator from 'simple-react-validator';
import Loader from 'react-loader-spinner'

import Logo from "../../assets/images/logo-kuai-white.svg";
import * as APITools from '../../util/apiX'
import Modal from "react-bootstrap/Modal";
import TermsAndCondition from "./TermsAndCondition";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { postFormData, isLoggedInAndRedirect, redirectToUrl } from '../../actions'
import ROUTES from '../../util/routes'

// const endpointURL = process.env.REACT_APP_API_ENDPOINT + ":" + process.env.REACT_APP_API_PORT

class Registry extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            form: {},
            step: 'REGISTER',
            show: false,
            registrySuccess: false,
            submitLoading: false,
/*            dataToPost: {
                name: '',
                restaurantName: '',
                email: '',
                password: ''
            }*/
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
        this.setState({ form: obj })
        // console.log(this.state.form);
    }

    formSubmitHandler = (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            this.showAndHideSubmitLoader()
        } else {
            this.validator.showMessages();
        }
    };

    showAndHideSubmitLoader() {
        this.setState({submitLoading: true});
        setTimeout(() => {
            this.setState({submitLoading: false});
            this.processSubmit();
        }, 1000);
    }

    processSubmit() {
        let data = this.state
        // console.log(data)
        this.props.postFormData(data)
    }

    render() {
        if (this.state.submitLoading) {
            return (
                <>
                    <div className="post-loader">
                        <Loader
                            type="TailSpin"
                            color="#B40DFF"
                            height={100}
                            width={100}
                        />
                    </div>
                </>
            )
        } else {
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
                                <input type="password" placeholder="Contraseña" name="password"
                                       onChange={this.inputChangeHandler} value={this.state.form.password}/>
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
                                    Al registrarse usted acepta nuestros <Link className="default"
                                                                               onClick={this.showTermsAndConditionsModal}>Terminos
                                    y
                                    Condiciones</Link>
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