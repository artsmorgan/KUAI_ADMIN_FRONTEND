import React from 'react';
import {Link} from "react-router-dom";

class Login extends React.Component {
    render() {
        return (
            <>
                <h1>Login Page</h1>
                <div>
                    <Link to={'/forgot-password'}>Olvidate tu contraseña?</Link>&emsp;<Link to={'/registry'}>Registrarse</Link>
                </div>
            </>
        );
    }
}

export default Login