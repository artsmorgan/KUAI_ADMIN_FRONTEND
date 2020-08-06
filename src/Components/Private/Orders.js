import React from 'react';

import Navbar from "./Layouts/Navbar";
import Sidebar from "./Layouts/Sidebar";
import OrdersAside from "./Layouts/OrdersAside";

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