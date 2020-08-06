import React from 'react';
import {Link} from "react-router-dom";
import Logo from "../../assets/images/logo-kuai-white.svg";
import { Button } from 'react-bootstrap';

class Registry extends React.Component {
    render() {
        return (
            <>
            <div className="container-login">
                    <img src={Logo} alt="website logo"/>
                    <div className="ls-panel">
                        <h3>Registro</h3>
                        <input type="text" placeholder="Name" />
                        <input type="text" placeholder="Restaurante" />
                        <input type="email" placeholder="Email" />
                        <input type="text" placeholder="Password" />
                        <p className="help-txt">Minimo 8 caracteres, letras y números unicamente.</p>
                        <Button className="btn btn-theme">
                        REGISTRARSE
                        </Button>
                        <div className="link-holder">¿Ya tienes cuenta? <Link to={'/login'}>Iniciar sesión</Link></div>
                        <div className="link-holder" style={{marginTop: '10px'}}>
                            Al registrarse usted acepta nuestros <Link className="default" href="#">Terminos y Condiciones</Link>
                        </div>
                    </div>
                </div>
                {/* <h1>Registry Page</h1>
                <div>
                    <Link to={'/registry/success'}>REGISTRARSE</Link>
                </div>
                <div>
                    ¿Ya tienes cuenta? <Link to={'/login'}>Iniciar sesión</Link>
                </div> */}
            </>
        );
    }
}

export default Registry