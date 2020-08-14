import React from 'react';
import {Link} from "react-router-dom";
import Logo from "../../assets/images/logo-kuai-white.svg";
import { Button } from 'react-bootstrap';
import { withSnackbar } from 'notistack';

class ChangePassword extends React.Component {

    handleSuccess(msg) {
        this.key = this.props.enqueueSnackbar(msg, {
            variant: 'success',
            autoHideDuration: 3000,
        });
    }

    handleError(msg) {
        this.key = this.props.enqueueSnackbar(msg, {
            variant: 'error',
            autoHideDuration: 3000,
        });
    }

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

export default withSnackbar(ChangePassword);