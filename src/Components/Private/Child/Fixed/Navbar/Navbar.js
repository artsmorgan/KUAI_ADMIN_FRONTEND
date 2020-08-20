import React from 'react';
import {Link} from "react-router-dom";
import {Dropdown} from 'react-bootstrap';

import Avatar from "../../../../../assets/images/avatar.svg";
import $ from "jquery";

class Navbar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            width: 0
        }

        window.addEventListener("resize", this.updateDimension);
    }

    updateDimension = () => {
        this.setState({
            width: window.innerWidth
        });
        if (this.state.width < 1024) {
            // console.log(this.state.width)
            if ($(".sidebar-wrapper").hasClass("collapsed")) {
                $(".sidebar-wrapper").removeClass('collapsed')
            }
        }
    };

    componentDidMount() {
        this.updateDimension();
    }

    render() {
        const {totalOrders, totalSales} = this.props
        return (
            <>
                <div className="navbar-cstm clearfix">
                    <div className="float-left order-short-info">
                        <span>Total de hoy</span>
                        <label>
                            {totalOrders}
                            <span>Ordenes</span>
                        </label>
                        <label htmlFor="" className="decorate">|</label>
                        <label className="balance">
                            ₡{totalSales}
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
                                <Dropdown.Item><Link to={'/orders'}>Action</Link></Dropdown.Item>
                                <Dropdown.Item><Link to={'/orders'}>Another Action</Link></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </>

        );
    }
}

export default Navbar