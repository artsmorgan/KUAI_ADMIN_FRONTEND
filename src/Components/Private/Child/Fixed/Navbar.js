import React from 'react';
import {Button} from 'react-bootstrap';

class Navbar extends React.Component {
    render() {
        return (
            <>
                <div className="navbar-cstm clearfix">
                    <div className="pull-left order-short-info">
                        <span>Total de hoy</span>
                        <label>
                            20
                            <span>Ordenes</span>
                        </label>
                        <label>
                            ₡300.000
                            <span>Ventas</span>
                        </label>
                    </div>
                </div>
            </>

        );
    }
}

export default Navbar