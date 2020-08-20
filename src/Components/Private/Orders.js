import React from "react";
import {Button, Nav} from 'react-bootstrap';
import {withSnackbar} from 'notistack';

import Navbar from "./Child/Fixed/Navbar/Navbar";
import MobileNavbar from "./Child/Fixed/Navbar/MobileNavbar";
import Sidebar from "./Child/Fixed/Sidebar/Sidebar";
import MobileSidebar from "./Child/Fixed/Sidebar/MobileSidebar";
import OrdersAside from "./Child/Dynamic/OrdersAside";
import * as APITools from "../../util/api";


const endpointURL = process.env.REACT_APP_API_ENDPOINT + ":" + process.env.REACT_APP_API_PORT

class Orders extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            seeMore: false,
            myOrders: [],
            totalSales: 0
        }

        window.addEventListener("resize", this.updateDimension);
    }

    updateDimension = () => {
        this.setState({
            width: window.innerWidth
        });
    };

    componentDidMount() {
        this.updateDimension();

        const url = endpointURL + APITools.endPoints.MY_ORDERS

        // API calling and handling response
        const res = APITools.getEndPointsHandler(url)

        res.then(result => {
            console.log(result)
            if (result.status === 200) {
                this.setState({myOrders: result.data})
                this.getTotalSales()
            }
        }).catch(err => {
            console.log(err)
            this.handleError("Something went wrong! Please try again later.")
        })
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimension);
    }

    handleError(msg) {
        this.key = this.props.enqueueSnackbar(msg, {
            variant: 'error',
            autoHideDuration: 3000,
        });
    }

    getTotalSales = () => {
        const {myOrders} = this.state
        let totalSales = 0
        myOrders.forEach((element) => {
            totalSales += element.prices.total;
        })
        // console.log(myOrders)
        this.setState({totalSales: totalSales})
    }

    seeMore = () => {
        this.setState({seeMore: true});
    }

    render() {
        const {width, myOrders, totalSales} = this.state

        if (width > 1024) {
            return (
                <>
                    <Sidebar/>
                    <div className="wrapper">
                        <Navbar totalOrders={myOrders.length} totalSales={totalSales}/>
                        <div className="flex-area content container-fluid">
                            <div className="row">
                                
                                <div className="col col-md-8 col-lg-8 col-sm-12 col-xs-12">
                                    <div>
                                        <Nav className="tab-cstm" variant="pills" defaultActiveKey="/home">
                                            <Nav.Item>
                                                <Nav.Link href="#">ORDENES</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="link-1">ORDENES DESPACHADAS</Nav.Link>
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
                                                                    <td style={{textAlign: 'right'}}>
                                                                        <Button className="btn-detail"
                                                                                onClick={this.seeMore}>
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
                                <OrdersAside seeMore={this.state.seeMore}/>
                            </div>
                        </div>
                    </div>
                </>
            );
        } else {
            return (
              <>
                <MobileNavbar />
                <Sidebar />
                <div className="wrapper">
                  <div className="flex-area content container-fluid">
                    <div className="mb-total-view">
                        <div className="row">
                            <div className="col">
                                <label>
                                    20 <span>Ordenes</span>
                                </label>
                            </div>
                            <div className="col">
                                <label>
                                ₡300.000 <span>Ventas</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                      <div className="col col-md-8 col-lg-8 col-sm-12 col-xs-12">
                        <div>
                          <Nav
                            className="tab-cstm"
                            variant="pills"
                            defaultActiveKey="/home"
                          >
                            <Nav.Item>
                              <Nav.Link href="#">ORDENES</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="link-1">
                                ORDENES DESPACHADAS
                              </Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </div>
                        <div className="ord-table shadow-1">
                          <table>
                            <tbody>
                              {myOrders.length === 0 && (
                                <>
                                  <tr>
                                    <td colSpan={3}>
                                      <h1 className="display-4">
                                        No order found.
                                      </h1>
                                    </td>
                                  </tr>
                                </>
                              )}

                              {myOrders.length !== 0 && (
                                <>
                                  {myOrders.map((item, index) => {
                                    return (
                                      <tr key={index}>
                                        <td className="ord-title">
                                          {item.name}
                                          <span>
                                            {item.date} | {item.items.length}{" "}
                                            items
                                          </span>
                                        </td>
                                        <td className="price">
                                          ₡{item.prices.total}
                                        </td>
                                        <td style={{ textAlign: "right" }}>
                                          <Button
                                            className="btn-detail"
                                            onClick={this.seeMore}
                                          >
                                            ver más
                                          </Button>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <OrdersAside seeMore={this.state.seeMore} />
                    </div>
                  </div>
                </div>
              </>
            );
        }
    }
}

export default withSnackbar(Orders);
