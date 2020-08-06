import React from 'react';
import {Link} from "react-router-dom";

class ChangePassword extends React.Component {
    render() {
        return (
            <>
                <h1>Change Password Page</h1>
                <div>
                    <Link to={'/change-password/success'}>Change Password Success Page</Link>
                </div>
            </>
        );
    }
}

export default ChangePassword