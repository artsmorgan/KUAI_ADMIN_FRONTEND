import React from 'react';
import {Link} from "react-router-dom";
import {Button} from 'react-bootstrap';
import {withSnackbar} from 'notistack';
import SimpleReactValidator from 'simple-react-validator';
import Loader from 'react-loader-spinner'

import Logo from "../../assets/images/logo-kuai-white.svg";
import * as APITools from '../../util/api'
import Modal from "react-bootstrap/Modal";
import TermsAndCondition from "./TermsAndCondition";

const endpointURL = process.env.REACT_APP_API_ENDPOINT + ":" + process.env.REACT_APP_API_PORT

class Registry extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false,
            registrySuccess: false,
            submitLoading: false,
            dataToPost: {
                name: '',
                restaurant: '',
                email: '',
                password: ''
            }
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

    showTermsAndConditionsModal = () => {
        this.setState({show: true});
    }

    hideTermsAndConditionsModal = () => {
        this.setState({show: false});
    }

    hideRegistrySuccessModal = () => {
        this.setState({registrySuccess: false});
    }

    handleSuccess(msg) {
        this.key = this.props.enqueueSnackbar(msg, {
            variant: 'success',
            autoHideDuration: 3000,
        });
    }

    handleError(msg) {
        this.key = this.props.enqueueSnackbar(msg, {
            variant: 'error',
            autoHideDuration: 3000,
        });
    }

    inputChangeHandler = (e) => {
        let obj = this.state.dataToPost;
        obj[e.target.name] = e.target.value;
        this.setState({dataToPost: obj});
    };

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
        const url = endpointURL // dummy
        const headers = {
            'Content-Type': 'application/json, charset=UTF-8', // dummy
        };
        // const data = this.state.dataToPost;
        // dummy
        const data = JSON.stringify({
            title: 'foo',
            body: 'bar',
            userId: 1
        })

        // API calling and handling response
        const res = APITools.postEndPointsHandler(url, data, headers)

        res.then(result => {
            console.log(result)
            if (result.status === 201) {
                this.setState({registrySuccess: true});
                this.handleSuccess("Registration success.")
                window.setTimeout(() => {
                    this.setState({registrySuccess: false});
                    this.props.history.push('/login')
                }, 3000)
            }
        }).catch(err => {
            this.handleError(err)
        })
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
                                       value={this.state.dataToPost.name}/>
                                <p style={{color: "red"}}>
                                    {this.validator.message('name', this.state.dataToPost.name, 'required')}
                                </p>
                                <input type="text" placeholder="Restaurante" name="restaurant"
                                       onChange={this.inputChangeHandler} value={this.state.dataToPost.restaurant}/>
                                <p style={{color: "red"}}>
                                    {this.validator.message('restaurant', this.state.dataToPost.restaurant, 'required')}
                                </p>
                                <input type="text" placeholder="Correo electrónico" name="email"
                                       onChange={this.inputChangeHandler}
                                       value={this.state.dataToPost.email}/>
                                <p style={{color: "red"}}>
                                    {this.validator.message('email', this.state.dataToPost.email, 'required|email')}
                                </p>
                                <input type="password" placeholder="Contraseña" name="password"
                                       onChange={this.inputChangeHandler} value={this.state.dataToPost.password}/>
                                <p style={{color: "red"}}>
                                    {this.validator.message('password', this.state.dataToPost.password, 'required|mixPass')}
                                </p>
                                <p className="help-txt">Minimo 8 caracteres, letras y números unicamente.</p>
                                <Button className="btn btn-theme" type="submit">
                                    REGISTRARSE
                                </Button>
                                <div className="link-holder">¿Ya tienes cuenta? <Link to={'/login'}>Iniciar
                                    sesión</Link>
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

export default withSnackbar(Registry);