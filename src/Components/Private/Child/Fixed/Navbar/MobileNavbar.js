import React from 'react';
import $ from 'jquery';

class MobileNavbar extends React.Component {

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
        if(this.state.width < 1024) {
            // console.log(this.state.width)
            if($(".sidebar-wrapper").hasClass( "collapsed" )){
                $(".sidebar-wrapper").removeClass('collapsed')
            }
        }
    };

    componentDidMount() {
        this.updateDimension();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimension);
    }

    removeCollapsed = () => {
        $(".sidebar-wrapper").removeClass('collapsed')
    }

    render() {
        return (
            <>
                <div className="navbar-cstm clearfix">
                <svg  className="menu-btn" onClick={this.removeCollapsed}  width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.33398 24H14.6673M5.33398 8H26.6673H5.33398ZM5.33398 16H26.6673H5.33398Z" stroke="#3A3A3A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <svg className="menu-dots" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.75 2.25C9.75 3.49264 10.7574 4.5 12 4.5C13.2426 4.5 14.25 3.49264 14.25 2.25C14.25 1.00736 13.2426 -4.40331e-08 12 -9.83506e-08C10.7574 -1.52668e-07 9.75 1.00736 9.75 2.25ZM9.75 12C9.75 13.2426 10.7574 14.25 12 14.25C13.2426 14.25 14.25 13.2426 14.25 12C14.25 10.7574 13.2426 9.75 12 9.75C10.7574 9.75 9.75 10.7574 9.75 12ZM12 24C10.7574 24 9.75 22.9926 9.75 21.75C9.75 20.5074 10.7574 19.5 12 19.5C13.2426 19.5 14.25 20.5074 14.25 21.75C14.25 22.9926 13.2426 24 12 24Z" fill="#444460"/>
                </svg>

                </div>
            </>

        );
    }
}

export default MobileNavbar