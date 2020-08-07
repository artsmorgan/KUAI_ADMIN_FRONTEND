import React from 'react';

import Navbar from "./Child/Fixed/Navbar";
import Sidebar from "./Child/Fixed/Sidebar";

class ControlCenter extends React.Component {
    render() {
        return (
            <>
                <Navbar/>
                <Sidebar/>
                <div>Control Center content</div>
            </>

        );
    }
}

export default ControlCenter