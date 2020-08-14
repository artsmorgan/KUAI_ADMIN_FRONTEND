import React from 'react';
import {Link} from "react-router-dom";
import {Button} from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";
import {withSnackbar} from 'notistack';
import SimpleReactValidator from 'simple-react-validator';
import Loader from 'react-loader-spinner'

import Logo from "../../assets/images/logo-kuai-white.svg";
import * as APITools from '../../util/api'

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            submitLoading: false,
            dataToPost: {
                email: ''
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

    handleError(msg) {
        this.key = this.props.enqueueSnackbar(msg, {
            variant: 'error',
            autoHideDuration: 3000,
        });
    }

    showForgetPasswordSuccessModal = () => {
        this.setState({show: true});
    }

    hideForgetPasswordSuccessModal = () => {
        this.setState({show: false});
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
        const url = "https://jsonplaceholder.typicode.com/posts" // dummy
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
                this.showForgetPasswordSuccessModal()
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
                                <p>Ingresa el email que quieras reestablecer su contraseña</p>
                                <input type="text" name="email" placeholder="Correo electrónico"
                                       onChange={this.inputChangeHandler} value={this.state.dataToPost.email}/>
                                <p style={{color: "red"}}>
                                    {this.validator.message('email', this.state.dataToPost.email, 'required|email')}
                                </p>
                                <Button className="btn btn-theme" type="submit">
                                    CONFIRMAR
                                </Button>
                            </div>
                        </form>
                    </div>

                    <Modal
                        className="cstm-modal"
                        size="md"
                        show={this.state.show}
                        onHide={this.hideForgetPasswordSuccessModal}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-sm">

                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="container-login">
                                <img src={Logo} alt="website logo"/>
                                <div className="ls-panel">
                                    <p style={{fontSize: '18px'}}>Hemos enviado un e-mail
                                        con las instrucciones para resetear tu password</p>
                                    <div className="link-holder">
                                        <Link to={'/change-password'} style={{color: 'blue'}}>Change Password</Link>
                                    </div>

                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </>
            );
        }
    }
}

export default withSnackbar(ForgotPassword);