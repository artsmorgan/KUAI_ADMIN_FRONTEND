import React from 'react';
import {Link} from "react-router-dom";

class Registry extends React.Component {
    render() {
        return (
            <>
                <h1>Registry Page</h1>
                <div>
                    <Link to={'/registry/success'}>REGISTRARSE</Link>
                </div>
                <div>
                    ¿Ya tienes cuenta? <Link to={'/login'}>Iniciar sesión</Link>
                </div>
            </>
        );
    }
}

export default Registry