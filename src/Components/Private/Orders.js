import React from "react";

import Navbar from "./Child/Fixed/Navbar";
import Sidebar from "./Child/Fixed/Sidebar";
import OrdersAside from "./Child/Dynamic/OrdersAside";
import { Button ,Nav } from 'react-bootstrap';

class Orders extends React.Component {
  render() {
    return (
      <>
        <Sidebar />
        <div className="wrapper">
          <Navbar />
          <div className="flex-area content container-fluid">
            <div className="row">
              <div class="col col-md-8 col-lg-8 col-sm-12 col-xs-12">
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
                        <tr>
                            <td className="ord-title">
                                Orden Ap20-00002 <span>11:40 | 16 items</span>
                            </td>
                            <td className="price">
                            ₡103.000
                            </td>
                            <td style={{textAlign: 'right'}}>
                                <Button className="btn-detail">
                                    ver más
                                </Button>
                            </td>
                        </tr>
                        <tr>
                            <td className="ord-title">
                                Orden Ap20-00002 <span>11:40 | 16 items</span>
                            </td>
                            <td className="price">
                            ₡103.000
                            </td>
                            <td style={{textAlign: 'right'}}>
                                <Button className="btn-detail">
                                    ver más
                                </Button>
                            </td>
                        </tr>
                        <tr>
                            <td className="ord-title">
                                Orden Ap20-00002 <span>11:40 | 16 items</span>
                            </td>
                            <td className="price">
                            ₡103.000
                            </td>
                            <td style={{textAlign: 'right'}}>
                                <Button className="btn-detail">
                                    ver más
                                </Button>
                            </td>
                        </tr>
                    </table>
                </div>
              </div>
              <OrdersAside />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Orders;
