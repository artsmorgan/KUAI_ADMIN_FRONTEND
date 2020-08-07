import React from 'react';

import Navbar from "./Child/Fixed/Navbar";
import Sidebar from "./Child/Fixed/Sidebar";

class DeliveryMethods extends React.Component {
    render() {
        return (
            <>
                <Navbar/>
                <Sidebar/>
                <div>Delivery Methods content</div>
            </>

        );
    }
}

export default DeliveryMethods