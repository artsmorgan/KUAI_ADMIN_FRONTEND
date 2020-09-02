import React from "react";
import { Button, Nav } from 'react-bootstrap';
import Navbar from "./Child/Fixed/Navbar/Navbar";
import Sidebar from "./Child/Fixed/Sidebar/Sidebar";
import OrdersAside from "./Child/Dynamic/OrdersAside";
import myOrders from '../../util/data/myOrders.json'

class Orders extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            seeMore: false,
            seeMoreThisOrder: {},
            myOrders: [],
            mobile: false,
            selectedOrderDiv: true,
            orderDiv: true,

        }
    }

    componentDidMount() {
        this.setState({
            width: window.innerWidth
        }, () => {
            if (this.state.width < 1024) {
                this.setState({ mobile: true, selectedOrderDiv: false });
            }
        });
        console.log("componentDidMount")
    }

    seeMore = (orderId) => {

        if (this.state.mobile) {
            this.setState({ selectedOrderDiv: true })
        }
        const order = this.state.myOrders.filter(obj => {
            return obj.id === orderId
        })
        console.log("desktop")
        this.setState({ seeMore: true, seeMoreThisOrder: order[0] });

        // console.log(orderId)

    }

    backFromSeeMore = () => {
        this.setState({ selectedOrderDiv: false })
    }

    getOrdersDispatched = () => {
        console.log("ORDENES DESPACHADAS")
        this.setState({ myOrders: myOrders })
    }

    render() {
        const { myOrders } = this.state

        return (
            <>
                <Sidebar />
                <div className="wrapper">
                    <Navbar />
                    {/* Mobile backbutton */}
                    <div className={"mb-navigator "+(this.state.selectedOrderDiv ? '' : 'hidden')} onClick={this.backFromSeeMore}>
                        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.49746 6L6.73149 10.234C7.13548 10.638 7.13548 11.293 6.73149 11.697C6.3275 12.101 5.6725 12.101 5.26851 11.697L0.302993 6.73149C-0.100998 6.3275 -0.100998 5.6725 0.302993 5.26851L5.26851 0.302993C5.6725 -0.100998 6.3275 -0.100998 6.73149 0.302993C7.13548 0.706984 7.13548 1.36198 6.73149 1.76597L2.49746 6Z" fill="#444460" />
                        </svg>

                        <p>Ordenes</p>
                    </div>
                    {/* Mobile backbutton */}
                    <div className="flex-area content container-fluid">
                        <div className="row">

                            <div className={"col col-md-8 col-lg-8 col-sm-12 col-xs-12 mb-order-table " + (this.state.selectedOrderDiv ? 'hidden' : '')}>
                                <div>
                                    <Nav className="tab-cstm" variant="pills" defaultActiveKey="/ORDENES">
                                        <Nav.Item>
                                            <Nav.Link href="/ORDENES">ORDENES</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="link-1" onClick={this.getOrdersDispatched}>ORDENES DESPACHADAS</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </div>
                                <div className="ord-table shadow-1">
                                    <table>
                                        <tbody>
                                            {
                                                myOrders.length === 0 &&
                                                <>
                                                    <tr>
                                                        <td colSpan={3}><h1 className="display-4">No order
                                                        found.</h1></td>
                                                    </tr>
                                                </>
                                            }

                                            {
                                                myOrders.length !== 0 &&
                                                <>
                                                    {
                                                        myOrders.map((item, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td className="ord-title">
                                                                        {item.name}
                                                                        <span>{item.date} | {item.items.length} items</span>
                                                                    </td>
                                                                    <td className="price">
                                                                        ₡{item.prices.total}
                                                                    </td>
                                                                    <td style={{ textAlign: 'right' }}>
                                                                        <Button className="btn-detail"
                                                                            onClick={() => {
                                                                                this.seeMore(item.id)
                                                                            }}>
                                                                            ver más
                                                                    </Button>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })
                                                    }
                                                </>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <OrdersAside selectedOrderDiv={this.state.selectedOrderDiv} seeMore={this.state.seeMore} seeMoreThisOrder={this.state.seeMoreThisOrder} />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Orders;