import React from 'react';

import Navbar from "./Child/Fixed/Navbar/Navbar";
import Sidebar from "./Child/Fixed/Sidebar/Sidebar";
import MobileNavbar from "./Child/Fixed/Navbar/MobileNavbar";
import MobileSidebar from "./Child/Fixed/Sidebar/MobileSidebar";

class ModifyMenu extends React.Component {

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
                    <div>Modify Menu content</div>
                </>
            );
        } else {
            return (
                <>
                    <MobileNavbar/>
                    <MobileSidebar/>
                    <div>Modify Menu content</div>
                </>
            );
        }
    }
}

export default ModifyMenu