import React from 'react';
import {Link} from "react-router-dom";
import Logo from "../../assets/images/logo-kuai-white.svg";
import { Button } from 'react-bootstrap';

class ForgotPassword extends React.Component {
    render() {
        return (
            <>
                <div className="container-login">
                    <img src={Logo} alt="website logo"/>
                    <div className="ls-panel">
                        <p>Ingresa el email que quieras reestablecer su contraseña</p>
                        <input type="email" placeholder="john@arbuckle.com" />
                        <Link to={'/forgot-password/success'}>
                            <Button className="btn btn-theme" to={'/forgot-password/success'}>
                                CONFIRMAR
                            </Button>
                        </Link>
                        
                    </div>
                </div>
            </>
        );
    }
}

export default ForgotPassword