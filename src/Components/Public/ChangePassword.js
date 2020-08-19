import React from 'react';
import {Link} from "react-router-dom";
import {Button} from 'react-bootstrap';
import {withSnackbar} from 'notistack';
import SimpleReactValidator from 'simple-react-validator';
import Loader from 'react-loader-spinner'

import Logo from "../../assets/images/logo-kuai-white.svg";
import * as APITools from '../../util/api'

const endpointURL = process.env.REACT_APP_API_ENDPOINT + ":" + process.env.REACT_APP_API_PORT

class ChangePassword extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            submitLoading: false,
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

    handleError(msg) {
        this.key = this.props.enqueueSnackbar(msg, {
            variant: 'error',
            autoHideDuration: 3000,
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
            this.showAndHideSubmitLoader()
        } else {
            this.validator.showMessages();
        }
    };

    showAndHideSubmitLoader() {
        this.setState({submitLoading: true});
        setTimeout(() => {
            this.setState({submitLoading: false});
            this.processSubmit();
        }, 1000);
    }

    processSubmit() {
        const url = endpointURL // dummy
        const headers = {
            'Content-Type': 'application/json, charset=UTF-8', // dummy
        };
        // const data = this.state.dataToPost;
        // dummy
        const data = JSON.stringify({
            title: 'foo',
            body: 'bar',
            userId: 1
        })

        // API calling and handling response
        const res = APITools.postEndPointsHandler(url, data, headers)

        res.then(result => {
            console.log(result)
            if (result.status === 201) {
                this.props.history.push('/change-password/success')
            }
        }).catch(err => {
            this.handleError(err)
        })
    }

    render() {
        if (this.state.submitLoading) {
            return (
                <>
                    <div className="post-loader">
                        <Loader
                            type="TailSpin"
                            color="#B40DFF"
                            height={100}
                            width={100}
                        />
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className="container-login">
                        <img src={Logo} alt="website logo"/>
                        <form onSubmit={this.formSubmitHandler}>
                            <div className="ls-panel">
                                <p>Indica tu nuevo password</p>
                                <input type="password" placeholder="*********" name="password"
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
}

export default withSnackbar(ChangePassword);