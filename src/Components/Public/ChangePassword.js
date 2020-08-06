import React from 'react';
import {Link} from "react-router-dom";
import Logo from "../../assets/images/logo-kuai-white.svg";
import { Button } from 'react-bootstrap';

class ChangePassword extends React.Component {
    render() {
        return (
            <>
            <div className="container-login">
                    <img src={Logo} alt="website logo"/>
                    <div className="ls-panel">
                        <p>Indica tu nuevo password</p>
                        <input type="password" placeholder="*********" />
                        <Link to={'/change-password/success'}>
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

export default ChangePassword