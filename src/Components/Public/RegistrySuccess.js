import React from 'react';
import {Link} from "react-router-dom";

class RegistrySuccess extends React.Component {
    render() {
        return (
            <>
                <h1>Registry Success Page</h1>
                <div>
                    <Link to={'/login'}>Iniciar sesión</Link>
                </div>
            </>
        );
    }
}

export default RegistrySuccess