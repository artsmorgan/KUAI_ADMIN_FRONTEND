import React from 'react';

import Navbar from "./Child/Fixed/Navbar";
import Sidebar from "./Child/Fixed/Sidebar";

class ModifyMenu extends React.Component {
    render() {
        return (
            <>
                <Navbar/>
                <Sidebar/>
                <div>Modify Menu content</div>
            </>

        );
    }
}

export default ModifyMenu