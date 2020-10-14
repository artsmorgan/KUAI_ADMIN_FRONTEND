import React from "react";
import { Button, Nav } from 'react-bootstrap';
import Navbar from "./Child/Fixed/Navbar/Navbar";
import Sidebar from "./Child/Fixed/Sidebar/Sidebar";
import OrdersAside from "./Child/Dynamic/OrdersAside";
import myOrders from '../../util/data/myOrders.json'
import SafePana from "../../assets/images/Safe-pana.svg";
import {
    getOrderFormData,
    updateOrderFormData,
    getDefaultConfigData
} from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const pageTabs = ['orderTab', 'orderDispatchedTab']
class Orders extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            seeMore: false,
            seeMoreThisOrder: {},
            myOrders: [],
            previouseOrder:[],
            mobile: false,
            selectedOrderDiv: true,
            orderDiv: true,
            selectedTab: 'orderTab'

        }

        window.addEventListener("resize", this.updateDimension);
    }

    updateDimension = () => {
        this.setState({
            width: window.innerWidth
        }, () => {
            if (this.state.width < 1024) {
                this.setState({ mobile: true, selectedOrderDiv: false });
            } else {
                this.setState({ mobile: false, selectedOrderDiv: false });
            }
        });
    };

    componentDidMount() {
        this.updateDimension();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimension);
    }

    componentWillMount() {
        this.props.getOrderFormData({ restaurantId: localStorage.getItem('restaurantId') })
    }

    componentDidUpdate(previousProps) {
        if (previousProps.order.loading && !this.props.order.loading) {
            const orders = this.props.order.data;
            let orderList = [];
            Object.keys(orders).forEach(function(key) {
                console.log(orders[key].createdAt)
                orderList.push(orders[key])
                // console.log();
              
            });
            this.setState({ myOrders: orderList })
            // console.log(orders)
        }
    }


    seeMore = (orderId) => {

        if (this.state.mobile) {
            this.setState({ orderDiv: false, selectedOrderDiv: true })
        }else{
            this.setState({ orderDiv: true, selectedOrderDiv: true })
        }
        const order = this.state.myOrders.filter(obj => {
            return obj.id === orderId
        })
        // console.log(order[0])
        this.setState({ seeMore: true, seeMoreThisOrder: order[0] });

        // console.log(orderId)

    }

    backFromSeeMore = () => {
        this.setState({ orderDiv: true, selectedOrderDiv: false, seeMore: false })
    }

    selectTab = (e, tabArrayPosition) => {
        this.setState({ selectedTab: pageTabs[tabArrayPosition] })
        switch(tabArrayPosition){
            case 0:
                this.props.getOrderFormData({ restaurantId: localStorage.getItem('restaurantId') })
                this.setState({ orderDiv: true,selectedOrderDiv:false })
                break;
            case 1:
                this.getOrdersDispatched();
                break;
            default:
                this.setState({ orderDiv: true,selectedOrderDiv:false })
        }
        
    }
    


    getOrdersDispatched = () => {
        let orders = [];
        // console.log("ORDENES DESPACHADAS")
        this.setState({ myOrders: orders })
        
    }

    render() {
        const { myOrders } = this.state

        return (
            <>
                <Sidebar />
                <div className="wrapper">
                    <Navbar />
                    {/* Mobile backbutton */}
                    <div className={"mb-navigator " + (this.state.selectedOrderDiv ? '' : 'hidden')} onClick={this.backFromSeeMore} style={this.state.seeMore && this.state.mobile ? { display: "inline" } : { display: "none" }}>
                        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.49746 6L6.73149 10.234C7.13548 10.638 7.13548 11.293 6.73149 11.697C6.3275 12.101 5.6725 12.101 5.26851 11.697L0.302993 6.73149C-0.100998 6.3275 -0.100998 5.6725 0.302993 5.26851L5.26851 0.302993C5.6725 -0.100998 6.3275 -0.100998 6.73149 0.302993C7.13548 0.706984 7.13548 1.36198 6.73149 1.76597L2.49746 6Z" fill="#444460" />
                        </svg>

                        <p>Ordenes</p>
                    </div>
                    {/* Mobile backbutton */}
                    <div className="flex-area content container-fluid">
                        <div className="row">

                            <div className={"col col-md-8 col-lg-8 col-sm-12 col-xs-12 mb-order-table " + (this.state.orderDiv ? '' : 'hidden')}>
                                <div>
                                    <Nav className="tab-cstm" variant="pills" defaultActiveKey="link-1">
                                        <Nav.Item>
                                            <Nav.Link eventKey="link-1"  onClick={(e) => this.selectTab(e, 0)}>ORDENES</Nav.Link>
                                         
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="link-2"  onClick={(e) => this.selectTab(e, 1)}>ORDENES DESPACHADAS</Nav.Link>
                                     
                                        </Nav.Item>
                                    </Nav>
                                </div>
                                <div className="ord-table shadow-1">
                                    <table>
                                        <tbody>
                                            {
                                                this.state.selectedTab === 'orderTab' &&
                                                <>
                                                    {

                                                                this.state.myOrders.map((item, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td className="ord-title">
                                                                                {item.id}
                                                                                <span>{(new Date()).toLocaleDateString('en-US', item.createdAt)} | {item.cart.menu.length} items</span>
                                                                            </td>
                                                                            <td className="price">
                                                                                ₡{item.montoTotal}
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

                                            {
                                                this.state.selectedTab === 'orderDispatchedTab' &&
                                                <>
                                                        {
                                                            this.state.previouseOrder.map((item, index) => {
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


const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getOrderFormData, updateOrderFormData, getDefaultConfigData
        },
        dispatch
    )

const mapStateToProps = store =>
    (
        {
            order: store.order
        }
    )

export default connect(mapStateToProps, mapDispatchToProps)(Orders)