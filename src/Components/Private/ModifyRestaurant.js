import React from 'react';

import Navbar from "./Child/Fixed/Navbar";
import Sidebar from "./Child/Fixed/Sidebar";

class ModifyRestaurant extends React.Component {
    render() {
        return (
            <>
                <Navbar/>
                <Sidebar/>
                <div>Modify Restaurant content</div>
            </>

        );
    }
}

export default ModifyRestaurant