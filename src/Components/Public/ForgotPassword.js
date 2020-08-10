import React from 'react';
import {Link} from "react-router-dom";
import Logo from "../../assets/images/logo-kuai-white.svg";
import { Button } from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        }
    }
    showForgetPasswordSuccessModal = () => {
        this.setState({show: true});
    }
    hideForgetPasswordSuccessModal = () => {
        this.setState({show: false});
    }
    
    render() {
        return (
            <>
                <div className="container-login">
                    <img src={Logo} alt="website logo"/>
                    <div className="ls-panel">
                        <p>Ingresa el email que quieras reestablecer su contraseña</p>
                        <input type="email" placeholder="john@arbuckle.com" />
                        <Button className="btn btn-theme" onClick={this.showForgetPasswordSuccessModal}>
                            CONFIRMAR
                        </Button>
                    </div>
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

export default ForgotPassword