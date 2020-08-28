import React from 'react';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { withSnackbar } from 'notistack';
import SimpleReactValidator from 'simple-react-validator';
import Loader from 'react-loader-spinner'

import Logo from "../../assets/images/logo-kuai-white.svg";
import * as APITools from '../../util/api'
import axios from "axios";

const endpointURL = process.env.REACT_APP_API_ENDPOINT + ":" + process.env.REACT_APP_API_PORT

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            submitLoading: false,
            dataToPost: {
                email: '',
                password: '',
            }
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
        this.setState({ dataToPost: obj });
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
        this.setState({ submitLoading: true });
        setTimeout(() => {
            this.setState({ submitLoading: false });
            this.processSubmit();
        }, 1000);
    }

    async processSubmit() {
        const url = APITools.endPoints.APIBASEURL + APITools.endPoints.AUTH.login
        const headers = {
            'Content-Type': 'application/json, charset=UTF-8', // dummy
        };

        // API calling and handling response
        const res = await APITools.postEndPointsHandler(url, this.state.dataToPost, headers)
        console.log("------------------")
        console.log(res)
        if(res!=undefined){
            console.log("I am logged in")
        }else{
            console.log("error")
        }
        // res.then(result => {
        //     console.log(result)
        //     // if (result.success) {
        //     //     localStorage.setItem("kuaiUserAuthToken", result.user.stsTokenManager.accessToken)
        //     //     this.handleSuccess("Login success.")
        //     //     this.props.history.push('/orders')
        //     // }else{
        //     //     console.log(result)
        //     // }
        // }).catch(err => {
        //     this.handleError(err)
        // })
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
                        <img src={Logo} alt="website logo" />
                        <form onSubmit={this.formSubmitHandler}>
                            <div className="ls-panel">
                                <h3>Iniciar sesión</h3>
                                <input type="text" className="user" name="email" placeholder="Correo electrónico"
                                    onChange={this.inputChangeHandler} value={this.state.dataToPost.email} />
                                <p style={{ color: "red" }}>
                                    {this.validator.message('email', this.state.dataToPost.email, 'required|email')}
                                </p>
                                <input type="password" className="pass" name="password" placeholder="Contraseña"
                                    onChange={this.inputChangeHandler} value={this.state.dataToPost.password} />
                                <p style={{ color: "red" }}>
                                    {this.validator.message('password', this.state.dataToPost.password, 'required')}
                                </p>
                                <Button className="btn btn-theme" type="submit">
                                    INGRESAR
                                </Button>
                                <div className="link-holder" style={{ marginTop: '20px' }}><Link className="float-left"
                                    to={'/forgot-password'}>Olvidaste
                                    tu contraseña?</Link>&emsp;<Link className="float-right"
                                        to={'/registry'}>Registrarse</Link></div>
                            </div>
                        </form>
                    </div>


                </>

            );
        }
    }
}

export default withSnackbar(Login);