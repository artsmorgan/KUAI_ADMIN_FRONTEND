import React from 'react';
import {Link} from "react-router-dom";

class ForgotPasswordSuccess extends React.Component {
    render() {
        return (
            <>
                <h1>Forgot Password Success Page</h1>
                <div>
                    <Link to={'/change-password'}>Change Password</Link>
                </div>
            </>
        );
    }
}

export default ForgotPasswordSuccess