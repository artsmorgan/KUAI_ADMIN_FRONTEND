import React from 'react';

import Navbar from "./Child/Fixed/Navbar/Navbar";
import Sidebar from "./Child/Fixed/Sidebar/Sidebar";
import MobileSidebar from "./Child/Fixed/Sidebar/MobileSidebar";
import MobileNavbar from "./Child/Fixed/Navbar/MobileNavbar";

class ControlCenter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            width: 0
        }

        window.addEventListener("resize", this.updateDimension);
    }

    updateDimension = () => {
        this.setState({
            width: window.innerWidth
        });
    };

    componentDidMount() {
        this.updateDimension();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimension);
    }

    render() {
        const {width} = this.state

        if (width > 1024) {
            return (
                <>
                    <Navbar/>
                    <Sidebar/>
                    <div>Control Center content</div>
                </>
            );
        } else {
            return (
                <>
                    <MobileNavbar/>
                    <Sidebar/>
                    <div>Control Center content</div>
                </>
            );
        }
    }
}

export default ControlCenter