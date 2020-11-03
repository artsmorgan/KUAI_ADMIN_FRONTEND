import React from 'react';
import {Link} from "react-router-dom";
import {Button} from 'react-bootstrap';
import SimpleReactValidator from 'simple-react-validator';
import Logo from "../../assets/images/kuai-logo-new.png";
import Modal from "react-bootstrap/Modal";
import TermsAndCondition from "./TermsAndCondition";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {postFormData, isLoggedInAndRedirect, redirectToUrl, cleanRegisterData} from '../../actions'
import ROUTES from '../../util/routes'
import $ from "jquery";

class Registry extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            form: {name: '', restaurantName: '', email: '', password: '', phonne: ''},
            step: 'REGISTER',
            show: false,
            registrySuccess: false,
        }

        SimpleReactValidator.addLocale('es', {
            required: 'este campo es requerido',
            email: 'Introduzca un correo electrónico válido',
            phone: 'El teléfono es requerido'
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
        this.props.cleanRegisterData();
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
            $('#hide-pass').removeClass('d-none')
            $('#show-pass').addClass('d-none')
        } else {
            x.type = "password";
            $('#hide-pass').addClass('d-none')
            $('#show-pass').removeClass('d-none')
        }
    }

    processSubmit() {
        let data = this.state
        // console.log(data)
        this.props.postFormData(data)
    }

    doTheTaskAfterRegSuccess = () => {
        // console.log("doTheTaskAfterRegSuccess")
        this.setState({registrySuccess: false}, () => {
            this.props.history.push('/login')
            this.props.cleanRegisterData()
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        try {
            const {form} = this.props
            // console.log(this.state.registrySuccess, form.REGISTER.success)
            if (!this.state.registrySuccess && form.REGISTER.success) {
                // console.log("Hi")
                this.setState({registrySuccess: form.REGISTER.success}, () => {
                    if (this.state.registrySuccess) {
                        window.setTimeout(this.doTheTaskAfterRegSuccess, 3333)
                    }
                })
            }
        } catch (e) {
        }
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
                                <svg className="color-switch active" width="16" height="12" viewBox="0 0 16 12"
                                     fill="none" xmlns="http://www.w3.org/2000/svg" onClick={this.showHidePassword}
                                     id="show-pass">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M8 0.363647C4.36364 0.363647 1.25818 2.62547 0 5.81819C1.25818 9.01092 4.36364 11.2727 8 11.2727C11.6364 11.2727 14.7418 9.01092 16 5.81819C14.7418 2.62547 11.6364 0.363647 8 0.363647ZM8 9.45456C5.99273 9.45456 4.36364 7.82547 4.36364 5.81819C4.36364 3.81092 5.99273 2.18183 8 2.18183C10.0073 2.18183 11.6364 3.81092 11.6364 5.81819C11.6364 7.82547 10.0073 9.45456 8 9.45456ZM5.81818 5.81819C5.81818 4.61092 6.79273 3.63637 8 3.63637C9.20727 3.63637 10.1818 4.61092 10.1818 5.81819C10.1818 7.02547 9.20727 8.00001 8 8.00001C6.79273 8.00001 5.81818 7.02547 5.81818 5.81819Z"
                                          fill="#660ADE"/>
                                </svg>

                                <svg width="16" height="12" viewBox="0 0 16 12" fill="none"
                                     xmlns="http://www.w3.org/2000/svg" id="hide-pass" onClick={this.showHidePassword}
                                     className="d-none">
                                    <path
                                        d="M9 10.125C9.62132 10.125 10.125 9.62132 10.125 9C10.125 8.37868 9.62132 7.875 9 7.875C8.37868 7.875 7.875 8.37868 7.875 9C7.875 9.62132 8.37868 10.125 9 10.125Z"
                                        fill="#D8D8D8"/>
                                    <path
                                        d="M11.4675 13.59L10.5 12.585L10.4475 12.5325L9.49499 11.58C9.34384 11.6065 9.1909 11.6215 9.03749 11.625C8.68963 11.63 8.34425 11.5658 8.02143 11.4361C7.69861 11.3064 7.40478 11.1138 7.15705 10.8696C6.90931 10.6253 6.71259 10.3342 6.57833 10.0133C6.44407 9.69235 6.37495 9.34791 6.37499 9.00002C6.37847 8.8466 6.39351 8.69367 6.41999 8.54252L4.91999 7.04252L3.74999 5.90252C2.90348 6.70012 2.1783 7.61734 1.59749 8.62502C1.53166 8.73903 1.49701 8.86836 1.49701 9.00002C1.49701 9.13167 1.53166 9.261 1.59749 9.37502C2.06999 10.1925 4.59749 14.25 9.01499 14.25H9.20249C10.0332 14.2254 10.8531 14.0553 11.625 13.7475L11.4675 13.59ZM6.44249 4.32002L8.54249 6.42002C8.69364 6.39354 8.84658 6.3785 8.99999 6.37502C9.69618 6.37502 10.3639 6.65158 10.8561 7.14386C11.3484 7.63614 11.625 8.30382 11.625 9.00002C11.6215 9.15343 11.6065 9.30637 11.58 9.45752L13.59 11.4675L14.22 12.0975C15.0771 11.302 15.8125 10.3847 16.4025 9.37502C16.4683 9.261 16.503 9.13167 16.503 9.00002C16.503 8.86836 16.4683 8.73903 16.4025 8.62502C15.9225 7.79252 13.2825 3.61502 8.79749 3.75002C7.96683 3.77466 7.14692 3.94473 6.37499 4.25252L6.44249 4.32002ZM15.5325 14.4675L14.5575 13.5L13.0575 12L5.91749 4.85252L4.81499 3.75002L3.53249 2.46752C3.46256 2.39759 3.37954 2.34212 3.28818 2.30427C3.19681 2.26643 3.09888 2.24695 2.99999 2.24695C2.9011 2.24695 2.80317 2.26643 2.7118 2.30427C2.62044 2.34212 2.53742 2.39759 2.46749 2.46752C2.32626 2.60874 2.24692 2.80029 2.24692 3.00002C2.24692 3.19974 2.32626 3.39129 2.46749 3.53252L4.14749 5.25002L5.45999 6.52502L10.9425 12L10.995 12.0525L12 13.0575L12.4425 13.5L14.4675 15.5325C14.5372 15.6028 14.6202 15.6586 14.7116 15.6967C14.803 15.7348 14.901 15.7544 15 15.7544C15.099 15.7544 15.197 15.7348 15.2884 15.6967C15.3798 15.6586 15.4628 15.6028 15.5325 15.5325C15.6028 15.4628 15.6586 15.3798 15.6967 15.2884C15.7347 15.1971 15.7543 15.099 15.7543 15C15.7543 14.901 15.7347 14.803 15.6967 14.7116C15.6586 14.6202 15.6028 14.5372 15.5325 14.4675V14.4675Z"
                                        fill="#D8D8D8"/>
                                </svg>
                            </div>
                            <p style={{color: "red"}}>
                                {this.validator.message('password', this.state.form.password, 'required|mixPass')}
                            </p>
                            <p className="help-txt">Minimo 8 caracteres, letras y números unicamente.</p>
                            <input type="text" placeholder="Teléfono" name="phone"
                                   onChange={this.inputChangeHandler}
                                   value={this.state.form.phone}/>
                            <p style={{color: "red"}}>
                                {this.validator.message('phone', this.state.form.phone, 'required')}
                            </p>
                            <Button className="btn btn-theme" type="submit">
                                REGISTRARSE
                            </Button>
                            <div className="link-holder">¿Ya tienes cuenta? <a
                                onClick={e => this.gotoStep(e, ROUTES.LOGIN)}>Iniciar
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

const mapStateToProps = ({form}) => ({
    form
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            postFormData,
            isLoggedInAndRedirect,
            redirectToUrl,
            cleanRegisterData
        },
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(Registry)