import React from 'react';
import {Button} from 'react-bootstrap';

import SimpleReactValidator from 'simple-react-validator';

import Logo from "../../assets/images/kuai-logo-new.png";
import * as APITools from '../../util/apiX'

const endpointURL = process.env.REACT_APP_API_ENDPOINT + ":" + process.env.REACT_APP_API_PORT

class ChangePassword extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dataToPost: {
                password: '',
            }
        }

        SimpleReactValidator.addLocale('es', {
            required: 'este campo es requerido'
        });

        this.validator = new SimpleReactValidator({
            locale: 'es',
            autoForceUpdate: this,
            validators: {
                mixPass: {
                    message: 'Esta no es una contraseña válida',
                    rule: (val, params, validator) => {
                        // console.log(val, params, validator);
                        return validator.helpers.testRegex(val, /^(?=.*\d)(?=.*[ A-Za-z]).{8,}$/)
                    },
                }
            }
        });
    }

    inputChangeHandler = (e) => {
        let obj = this.state.dataToPost;
        obj[e.target.name] = e.target.value;
        this.setState({dataToPost: obj});
    };

    formSubmitHandler = (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            this.processSubmit();
        } else {
            this.validator.showMessages();
        }
    };

    processSubmit() {
        this.props.history.push('/change-password/success')
    }

    render() {
        return (
            <>
                <div className="container-login">
                    <img src={Logo} alt="website logo"/>
                    <form onSubmit={this.formSubmitHandler}>
                        <div className="ls-panel">
                            <p>Indica tu nuevo password</p>
                            <input className="pass" type="password" placeholder="*********" name="password"
                                   onChange={this.inputChangeHandler} value={this.state.dataToPost.password}/>
                            <p style={{color: "red"}}>
                                {this.validator.message('password', this.state.dataToPost.password, 'required|mixPass')}
                            </p>
                            <Button className="btn btn-theme" type="submit">
                                CONFIRMAR
                            </Button>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}

export default ChangePassword;