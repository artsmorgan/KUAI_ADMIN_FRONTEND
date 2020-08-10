import React from 'react';

import Navbar from "./Child/Fixed/Navbar";
import Sidebar from "./Child/Fixed/Sidebar";
import OrdersAside from "./Child/Dynamic/OrdersAside";

class Orders extends React.Component {
    render() {
        return (
            <>
                <Sidebar/>
                <div className="wrapper">
                    <Navbar/>
                    <div>Middle content</div>
                    <OrdersAside/>
                </div>
            </>
        );
    }
}

export default Orders