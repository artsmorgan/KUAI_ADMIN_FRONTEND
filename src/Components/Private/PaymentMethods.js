import React from 'react';

import Navbar from "./Child/Fixed/Navbar";
import Sidebar from "./Child/Fixed/Sidebar";

class PaymentMethods extends React.Component {
    render() {
        return (
            <>
                <Navbar/>
                <Sidebar/>
                <div>Payment Methods content</div>
            </>

        );
    }
}

export default PaymentMethods