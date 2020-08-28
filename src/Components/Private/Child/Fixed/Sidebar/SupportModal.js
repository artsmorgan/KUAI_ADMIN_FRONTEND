import React from "react";

class SupportModal extends React.Component {
    render() {
        return (
            <>
                <div className="modal-contact">
                    <div className="row">
                        <div className="col-md-12">
                            <h3>Motivo del contacto</h3>
                            <label htmlFor="">Motivo del contacto</label>
                            <input type="text" className="uni-input"/>
                            <label htmlFor="">Detalles</label>
                            <textarea name="" className="uni-input tarea" id="" cols="30" rows="10"></textarea>
                            <br/>
                            <button className="btn-theme">Enviar</button>
                        </div>
                    </div>
                    <div className="row">
                        <p className="success-txt">
                        Gracias por contactar a soporte técnico, pronto te estaremos contactando utilizando la información de tu restaurante y los detalles que nos enviaste.
                        </p>
                    </div>
                </div>
            </>
        );
    }
}

export default SupportModal;