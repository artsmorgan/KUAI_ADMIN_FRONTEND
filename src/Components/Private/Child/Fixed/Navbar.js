import React from 'react';

import Avatar from "../../../../assets/images/avatar.svg";
import {Dropdown} from 'react-bootstrap';

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
                    <div className="float-right" style={{height: '60px', position: 'relative'}}>
                        <div className="avatar">
                            <img src={Avatar} alt="User Avatar"/>
                        </div>
                        <Dropdown className="cstm-drop">
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Costa Rica
                                Beer factory
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </>

        );
    }
}

export default Navbar