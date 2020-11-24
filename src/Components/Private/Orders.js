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
import _ from 'lodash';
import Request from 'axios-request-handler';
import { toastr } from 'react-redux-toastr'


const pageTabs = ['orderTab', 'orderDispatchedTab', 'orderConfirmedTab']
class Orders extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            seeMore: false,
            seeMoreThisOrder: {},
            myOrders: [],
            completedOrders: [],
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
        let previousOrders = 0;
        let counter = 0;
        const orders = new Request(`https://us-central1-kuai-test.cloudfunctions.net/api/order/${localStorage.getItem('restaurantId')}`, {
        // const orders = new Request(`https://us-central1-kuai-test.cloudfunctions.net/api/order/94b6f20a-4861-45ea-bea3-7c161fe9b0d4`, {
            cancelable:true, //default is true
        });

        console.log('order',localStorage.getItem('restaurantId'))

        orders.poll(10000).get((response) => {
            console.log(response.data);
            // if()
            
            if(response.data && response.data.length > 0 ){
                const grouped = _.mapValues(_.groupBy(response.data, 'status'),  clist => clist.map(order => _.omit(order, 'status')));
                // console.log('previousOrders', previousOrders);
                // console.log('grouped.pendiente.length', grouped.pendiente.length);

                // if(counter === 0)
                //     previousOrders = grouped.pendiente.length

                if(grouped && grouped.pendiente  && previousOrders < grouped.pendiente.length && counter > 0){

                    previousOrders = grouped.pendiente.length;
                    let pendingOrders = [];
                    let completedOrders = [];
                    let dispatchedOrders = [];
                    let THIS = this;
                    const orders = response.data
                    Object.keys(orders).forEach(function (key) {
                        /**Time */
                        let order = [];
                        order['status'] = orders[key]['status'];
                        order['id'] = orders[key]['id'];
                        order['orderBy'] = orders[key]['orderBy'];
                        order['montoTotal'] = orders[key]['montoTotal'];
                        order['restaurantId'] = orders[key]['restaurantId'];
                        order['createTime'] = THIS.formattingTime(orders[key]['createdAt']['_seconds']);
                        order['deliveryMethods'] = orders[key]['cart']['deliveryMethods'];
                        order['paymentMethods'] = orders[key]['cart']['paymentMethods'];
                        order['totalProducts'] = orders[key]['cart']['menu'].length;

                        const productSimpleArr = _.groupBy(orders[key]['cart']['menu'], function(product) {
                            return product.id;
                        });

                        let updatedMenu = []
                        Object.keys(productSimpleArr).forEach(function (key) {
                            let item = {
                                quantity:productSimpleArr[key].length,
                                description: productSimpleArr[key][0].description,
                                id: productSimpleArr[key][0].id,
                                lineId: productSimpleArr[key][0].lineId,
                                name: productSimpleArr[key][0].name,
                                price: productSimpleArr[key][0].price
                            }
                            updatedMenu.push(item)
                        });

                        order['menu'] = updatedMenu;
                        if(orders[key]['status']=="pendiente"){   
                            pendingOrders.push(order)  
                        }else if(orders[key]['status']=="confirmado"){
                            completedOrders.push(order)
                        }else if(orders[key]['status']=="despachado"){
                            dispatchedOrders.push(order)
                        }
                    });

                    this.setState({
                        myOrders:pendingOrders,
                        completedOrders:completedOrders,
                        dispatchedOrders: dispatchedOrders
                    })
                    toastr.success("", "Tienes una nueva orden")

                }
                    
                console.log(grouped);
            }
            
            
            counter++;
            // you can cancel polling by returning false
        });
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
            let pendingOrders = [];
            let completedOrders = [];
            let dispatchedOrders = [];
            let THIS = this;
            Object.keys(orders).forEach(function (key) {
                /**Time */
                let order = [];
                order['status'] = orders[key]['status'];
                order['id'] = orders[key]['id'];
                order['orderBy'] = orders[key]['orderBy'];
                order['montoTotal'] = orders[key]['montoTotal'];
                order['restaurantId'] = orders[key]['restaurantId'];
                order['createTime'] = THIS.formattingTime(orders[key]['createdAt']['_seconds']);
                order['deliveryMethods'] = orders[key]['cart']['deliveryMethods'];
                order['paymentMethods'] = orders[key]['cart']['paymentMethods'];
                order['totalProducts'] = orders[key]['cart']['menu'].length;

                const productSimpleArr = _.groupBy(orders[key]['cart']['menu'], function(product) {
                    return product.id;
                });

                let updatedMenu = []
                Object.keys(productSimpleArr).forEach(function (key) {
                    let item = {
                        quantity:productSimpleArr[key].length,
                        description: productSimpleArr[key][0].description,
                        id: productSimpleArr[key][0].id,
                        lineId: productSimpleArr[key][0].lineId,
                        name: productSimpleArr[key][0].name,
                        price: productSimpleArr[key][0].price
                    }
                    updatedMenu.push(item)
                });

                order['menu'] = updatedMenu;
                if(orders[key]['status']=="pendiente"){   
                    pendingOrders.push(order)  
                }else if(orders[key]['status']=="confirmado"){
                    completedOrders.push(order)
                }else if(orders[key]['status']=="despachado"){
                    dispatchedOrders.push(order)
                }
            });

            this.setState({
                myOrders:pendingOrders,
                completedOrders:completedOrders,
                dispatchedOrders: dispatchedOrders
            })

        }
    }

    formattingTime(value){
        var t = new Date(1970, 0, 1); // Epoch
        t.setSeconds(value);
        var d = new Date(t);
        var time = d.getHours()+":"+d.getMinutes();
        return time;
    }

    seeMore = (orderId) => {

        let order=[];
        if(this.state.selectedTab=='orderTab'){
            order = this.state.myOrders.filter(obj => {
                return obj.id === orderId
            })
        }else if(this.state.selectedTab=='orderDispatchedTab'){
            order = this.state.completedOrders.filter(obj => {
                return obj.id === orderId
            })
        }else if(this.state.selectedTab=='orderConfirmedTab'){
            order = this.state.dispatchedOrders.filter(obj => {
                return obj.id === orderId
            })
        }



        if (this.state.mobile) {
            this.setState({ orderDiv: false, selectedOrderDiv: true })
        } else {
            this.setState({ orderDiv: true, selectedOrderDiv: true })
        }
        // const order = this.state.myOrders.find(obj => obj.id === orderId);
        
        

        this.setState({ seeMore: true, seeMoreThisOrder: order[0] });

        // console.log(order)

    }

    backFromSeeMore = () => {
        this.setState({ orderDiv: true, selectedOrderDiv: false, seeMore: false })
    }

    selectTab = (e, tabArrayPosition) => {
        this.setState({ selectedTab: pageTabs[tabArrayPosition] })
        this.props.getOrderFormData({ restaurantId: localStorage.getItem('restaurantId') })
        switch (tabArrayPosition) {
            case 0:
                this.setState({ orderDiv: true, selectedOrderDiv: false })
                break;
            case 1:
                this.getOrdersDispatched();
                break;
            default:
                this.setState({ orderDiv: true, selectedOrderDiv: false })
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
                                            <Nav.Link eventKey="link-1" id="orders-all" onClick={(e) => this.selectTab(e, 0)}>ORDENES</Nav.Link>

                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="link-3" id="orders-confirmed" onClick={(e) => this.selectTab(e, 1)}>ORDENES CONFIRMADAS</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="link-2" id="orders-dispatched" onClick={(e) => this.selectTab(e, 2)}>ORDENES DESPACHADAS</Nav.Link>
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
                                                        this.state.myOrders.length !== 0 &&
                                                        <>
                                                            {
                                                                this.state.myOrders.map((item, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td className="ord-title">
                                                                                {item.id}
                                                                                <span>{item.createTime} | {item.totalProducts} items</span>
                                                                            </td>
                                                                            <td className="price">
                                                                                ₡{item.montoTotal}
                                                                            </td>
                                                                            <td style={{ textAlign: 'right' }}>
                                                                                <Button className="btn-detail" id={'seemore-'+item.id}
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
                                                        myOrders.length === 0 &&
                                                        <>
                                                            {
                                                                <tr>
                                                                    {/* <td colSpan={3}><h1 className="display-4">Actualmente no cuentas con ordenes activas</h1></td> */}
                                                                    <td colSpan={3}>
                                                                        <div align={"center"}>
                                                                            <img src={SafePana} />
                                                                            <h6>Actualmente no cuentas con ordenes activas</h6>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            }
                                                        </>
                                                    }

                                                    {


                                                    }
                                                </>
                                            }

{
                                                this.state.selectedTab === 'orderConfirmedTab' &&
                                                <>

                                                    {
                                                        this.state.dispatchedOrders.length !== 0 &&
                                                        <>
                                                            {
                                                                this.state.dispatchedOrders.map((item, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td className="ord-title">
                                                                                {item.id}
                                                                                <span>{item.createTime} | {item.totalProducts} items</span>
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
                                                        this.state.dispatchedOrders.length === 0 &&
                                                        <>
                                                            {
                                                                <tr>
                                                                    {/* <td colSpan={3}><h1 className="display-4">Actualmente no cuentas con ordenes activas</h1></td> */}
                                                                    <td colSpan={3}>
                                                                        <div align={"center"}>
                                                                            <img src={SafePana} />
                                                                            <h6>Actualmente no cuentas con ordenes Confirmadas</h6>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            }
                                                        </>
                                                    }

                                                    {


                                                    }
                                                </>
                                            }

                                            {
                                                this.state.selectedTab === 'orderDispatchedTab' &&
                                                <>

                                                    {
                                                        this.state.completedOrders.length !== 0 &&
                                                        <>
                                                            {
                                                                this.state.completedOrders.map((item, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td className="ord-title">
                                                                                {item.id}
                                                                                <span>{item.createTime} | {item.menu.length} items</span>
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
                                                        this.state.completedOrders.length === 0 &&
                                                        <>
                                                            {
                                                                <div align={"center"}>
                                                                    <img src={SafePana} />
                                                                    {/* <h6>Acá podrás seleccionar las ordenes para ver sus detalles</h6> */}
                                                                    <h6>Actualmente no cuentas con ordenes despachadas</h6>
                                                                </div>
                                                            }
                                                        </>
                                                    }

                                                </>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {this.state.seeMore && <OrdersAside selectedOrderDiv={this.state.selectedOrderDiv} seeMore={this.state.seeMore} seeMoreThisOrder={this.state.seeMoreThisOrder} />}
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