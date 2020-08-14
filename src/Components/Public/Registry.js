import React from 'react';
import {Link} from "react-router-dom";
import {Button} from 'react-bootstrap';
import {withSnackbar} from 'notistack';
import SimpleReactValidator from 'simple-react-validator';
import Loader from 'react-loader-spinner'

import Logo from "../../assets/images/logo-kuai-white.svg";

class Registry extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
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
        const headers = {
            'Content-Type': 'application/json',
        };
        const data = this.state.dataToPost;

        // API calling and response
        this.props.history.push('/login')
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
                                <input type="text" placeholder="Correo electrónico" name="email" onChange={this.inputChangeHandler}
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
                                <div className="link-holder">¿Ya tienes cuenta? <Link to={'/login'}>Iniciar sesión</Link>
                                </div>
                                <div className="link-holder" style={{marginTop: '10px'}}>
                                    Al registrarse usted acepta nuestros <Link className="default" href="#">Terminos y
                                    Condiciones</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </>
            );
        }
    }
}

export default withSnackbar(Registry);