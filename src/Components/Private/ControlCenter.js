import React from 'react';

import Navbar from "./Child/Fixed/Navbar/Navbar";
import Sidebar from "./Child/Fixed/Sidebar/Sidebar";

class ControlCenter extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {width} = this.state

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