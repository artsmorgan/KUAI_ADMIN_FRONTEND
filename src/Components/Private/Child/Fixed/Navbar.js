import React from 'react';
import {Button , Dropdown} from 'react-bootstrap';

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
                    <Dropdown className="float-right">
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Dropdown Button
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </>

        );
    }
}

export default Navbar