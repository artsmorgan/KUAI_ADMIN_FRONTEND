import React from "react";
import {bindActionCreators} from "redux";
import {postTechSupportFormData} from "../../../../../actions";
import {connect} from "react-redux";
import SimpleReactValidator from "simple-react-validator";


class SupportModal extends React.Component {

    constructor(props){
        super(props)
        
        this.state = {
            form:true,
            dataToPost: {
                restaurantId: localStorage.getItem('restaurantId'),
                motivo: '',
                detalles: ''
            },
        }

        SimpleReactValidator.addLocale('es', {
            required: 'este campo es requerido'
        });

        this.validator = new SimpleReactValidator({
            locale: 'es',
            autoForceUpdate: this
        });
    }

    inputChangeHandler = (e) => {
        let obj = this.state.dataToPost;
        obj[e.target.name] = e.target.value;
        this.setState({dataToPost: obj});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            this.setState({form:false})
            this.processSubmit();
        } else {
            this.validator.showMessages();
        }
    }

    processSubmit() {
        this.props.postTechSupportFormData(this.state.dataToPost)
        // this.showForgetPasswordSuccessModal()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        try {
            const {techSupportReq} = this.props
            // this.setState({form: !techSupportReq.success})
            /*if(techSupportReq.success) {
                let obj = this.state.dataToPost;
                obj['motivo'] = '';
                obj['detalles'] = '';
                this.setState({dataToPost: obj});
            }*/
        } catch (e) {
        }
    }

    render() {
        return (
            <>
                <div className="modal-contact">
                    <div className={"row "+(this.state.form ? '' : 'hidden')}>
                        <div className="col-md-12">
                            <h3>Motivo del contacto</h3>
                            <label htmlFor="">Motivo del contacto</label>
                            <input type="text" placeholder="Ex: mi menú no se actualiza" className="uni-input" onChange={this.inputChangeHandler} value={this.state.dataToPost.email} name="motivo"/>
                            <p style={{color: "red"}}>
                                {this.validator.message('motivo', this.state.dataToPost.motivo, 'required')}
                            </p>
                            <label htmlFor="">Detalles</label>
                            <textarea name="detalles" className="uni-input tarea" id="" placeholder="Ex:I am trying to update my restaurant menu from modify-restaurant but it's..." cols="30" rows="10" onChange={this.inputChangeHandler}>{this.state.dataToPost.detalles}</textarea>
                            <p style={{color: "red"}}>
                                {this.validator.message('email', this.state.dataToPost.detalles, 'required')}
                            </p>
                            <br/>
                            <button className="btn-theme" onClick={this.handleSubmit}>Enviar</button>
                        </div>
                    </div>
                    <div className={"row "+ (this.state.form ? 'hidden' : '')}>
                        <p className="success-txt">
                        Gracias por contactar a soporte técnico, pronto te estaremos contactando utilizando la información de tu restaurante y los detalles que nos enviaste.
                        </p>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = ({techSupportReq}) => ({
    techSupportReq
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            postTechSupportFormData
        },
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(SupportModal)