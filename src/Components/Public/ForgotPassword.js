import React from 'react';
import {Link} from "react-router-dom";

class ForgotPassword extends React.Component {
    render() {
        return (
            <>
                <h1>Forgot Password Page</h1>
                <div>
                    <Link to={'/forgot-password/success'}>Forgot Password Success Page</Link>
                </div>
            </>
        );
    }
}

export default ForgotPassword