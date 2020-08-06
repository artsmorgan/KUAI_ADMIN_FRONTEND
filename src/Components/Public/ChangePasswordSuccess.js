import React from 'react';
import {Link} from "react-router-dom";

class ChangePasswordSuccess extends React.Component {
    render() {
        return (
            <>
                <h1>Change Password Success Page</h1>
                <div>
                    <Link to={'/login'}>Iniciar sesión</Link>
                </div>
            </>
        );
    }
}

export default ChangePasswordSuccess