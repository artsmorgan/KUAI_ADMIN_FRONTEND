import React from 'react';

class MobileNavbar extends React.Component {
    render() {
        const {totalOrders, totalSales} = this.props
        return (
            <>
                <div className="navbar-cstm clearfix">
                    <h1>Mobile Navbar</h1>
                </div>
            </>

        );
    }
}

export default MobileNavbar