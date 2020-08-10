import React from 'react';
import {Link} from "react-router-dom";
import Logo from "../../assets/images/logo-kuai-white.svg";
import {Button} from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false
        }
    }

    handleLoginReq = () => {
        this.props.history.push('/orders');
    }

    // showForgotPasswordModal = () => {
    //     this.setState({show: true});
    // }

    // hideForgotPasswordModal = () => {
    //     this.setState({show: false});
    // }


    render() {
        return (
            <>
                <div className="container-login">
                    <img src={Logo} alt="website logo"/>
                    <div className="ls-panel">
                        <h3>Iniciar sesión</h3>
                        <input type="email" placeholder="john@arbuckle.com"/>
                        <input type="text" placeholder="Password"/>
                        <Button className="btn btn-theme" onClick={this.handleLoginReq}>
                            INGRESAR
                        </Button>
                        <div className="link-holder" style={{marginTop: '20px'}}><Link className="pull-left"
                                                                                       to={'/forgot-password'}>Olvidate
                            tu contraseña?</Link>&emsp;<Link className="pull-right" to={'/registry'}>Registrarse</Link></div>
                    </div>
                </div>

                
            </>

        );
    }
}

export default Login