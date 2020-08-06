import React from 'react';

import Navbar from "./Child/Fixed/Navbar";
import Sidebar from "./Child/Fixed/Sidebar";
import OrdersAside from "./Child/Dynamic/OrdersAside";

class Orders extends React.Component {
    render() {
        return (
            <>
                <Navbar/>
                <Sidebar/>
                <OrdersAside/>
                <div>Middle content</div>
            </>

        );
    }
}

export default Orders