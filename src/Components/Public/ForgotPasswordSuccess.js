import React from 'react';
import {Link} from "react-router-dom";
import Logo from "../../assets/images/kuai-logo-new.png";

class ForgotPasswordSuccess extends React.Component {
    render() {
        return (
            <>
                <div className="container-login">
                    <img src={Logo} alt="website logo"/>
                    <div className="ls-panel">
                        <p style={{fontSize: '18px'}}>Hemos enviado un e-mail
                            con las instrucciones para resetear tu password</p>
                        <div className="link-holder">
                            <Link to={'/change-password'} style={{color: 'blue'}}>Change Password</Link>
                        </div>

                    </div>
                </div>
            </>
        );
    }
}

export default ForgotPasswordSuccess