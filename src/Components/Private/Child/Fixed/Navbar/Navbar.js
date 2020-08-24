import React from 'react';
import {Link} from "react-router-dom";
import {Dropdown} from 'react-bootstrap';

import Avatar from "../../../../../assets/images/avatar.svg";
import $ from "jquery";
import * as APITools from "../../../../../util/api";
import myOrders from "../../../../../util/data/myOrders.json";

const endpointURL = process.env.REACT_APP_API_ENDPOINT + ":" + process.env.REACT_APP_API_PORT

class Navbar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            myOrders: [],
            totalOrders: 0,
            totalSales: 0
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

    getTotalSales = () => {
        const {myOrders} = this.state
        let totalSales = 0
        myOrders.forEach((element) => {
            totalSales += element.prices.total;
        })
        // console.log(myOrders)
        this.setState({totalSales: totalSales})
    }

    getTotalOrders = () => {
        this.setState({totalOrders: this.state.myOrders.length})
    }

    componentDidMount() {
        this.updateDimension();

        if (localStorage.getItem("kuaiUserAuthToken")) {
            const url = endpointURL + APITools.endPoints.MY_ORDERS

            // API calling and handling response
            /*const res = APITools.getEndPointsHandler(url)

            res.then(result => {
                console.log(result)
                if (result.status === 200) {
                    this.setState({myOrders: result.data})
                    this.getTotalSales()
                }
            }).catch(err => {
                console.log(err)
                this.handleError("Something went wrong. Please try again later.")
            })*/

            this.setState({myOrders: myOrders}, () => {
                this.getTotalOrders()
                this.getTotalSales()
            })
        } else {
            this.handleError("Unauthorized access.")
            this.props.history.push('/login')
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimension);
    }

    removeCollapsed = () => {
        $(".sidebar-wrapper").removeClass('collapsed')
    }

    render() {
        const {width, totalOrders, totalSales} = this.state
        if (width > 1024) {
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
        } else {
            return (
                <>
                    <div className="navbar-cstm clearfix">
                        <svg className="menu-btn" onClick={this.removeCollapsed} width="32" height="32"
                             viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.33398 24H14.6673M5.33398 8H26.6673H5.33398ZM5.33398 16H26.6673H5.33398Z"
                                  stroke="#3A3A3A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        <svg className="menu-dots" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M9.75 2.25C9.75 3.49264 10.7574 4.5 12 4.5C13.2426 4.5 14.25 3.49264 14.25 2.25C14.25 1.00736 13.2426 -4.40331e-08 12 -9.83506e-08C10.7574 -1.52668e-07 9.75 1.00736 9.75 2.25ZM9.75 12C9.75 13.2426 10.7574 14.25 12 14.25C13.2426 14.25 14.25 13.2426 14.25 12C14.25 10.7574 13.2426 9.75 12 9.75C10.7574 9.75 9.75 10.7574 9.75 12ZM12 24C10.7574 24 9.75 22.9926 9.75 21.75C9.75 20.5074 10.7574 19.5 12 19.5C13.2426 19.5 14.25 20.5074 14.25 21.75C14.25 22.9926 13.2426 24 12 24Z"
                                  fill="#444460"/>
                        </svg>
                    </div>
                </>
            );
        }
    }
}

export default Navbar