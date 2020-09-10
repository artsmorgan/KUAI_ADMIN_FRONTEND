import React from 'react';
import {Link} from "react-router-dom";
import Logo from "../../assets/images/kuai-logo-new.png";
import { Button } from 'react-bootstrap';
import Success from "../../assets/images/check-circle-1.svg";

class ChangePasswordSuccess extends React.Component {
    render() {
        return (
            <>
            <div className="container-login">
                    <img src={Logo} alt="website logo"/>
                    <div className="ls-panel">
                        <img style={{marginTop: '0px', marginBottom: '25px'}} src={Success} alt="Success" />
                        <p style={{fontSize: '18px', fontWeight: '600',marginBottom: '25px'}}>Hemos cambiado satisfactoriamente tu password, por favor vuelve a iniciar sesion</p>
                        <Link to={'/login'}>
                            <Button className="btn btn-theme" to={'/forgot-password/success'}>
                            Iniciar sesión
                            </Button>
                        </Link>
                        
                    </div>
                </div>
            </>
        );
    }
}

export default ChangePasswordSuccess