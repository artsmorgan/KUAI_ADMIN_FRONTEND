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
                <svg className="menu-btn" onClick={this.removeCollapsed} width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M26.25 16.25H3.75C3.41848 16.25 3.10054 16.1183 2.86612 15.8839C2.6317 15.6495 2.5 15.3315 2.5 15C2.5 14.6685 2.6317 14.3505 2.86612 14.1161C3.10054 13.8817 3.41848 13.75 3.75 13.75H26.25C26.5815 13.75 26.8995 13.8817 27.1339 14.1161C27.3683 14.3505 27.5 14.6685 27.5 15C27.5 15.3315 27.3683 15.6495 27.1339 15.8839C26.8995 16.1183 26.5815 16.25 26.25 16.25ZM26.25 22.5H3.75C3.41848 22.5 3.10054 22.3683 2.86612 22.1339C2.6317 21.8995 2.5 21.5815 2.5 21.25C2.5 20.9185 2.6317 20.6005 2.86612 20.3661C3.10054 20.1317 3.41848 20 3.75 20H26.25C26.5815 20 26.8995 20.1317 27.1339 20.3661C27.3683 20.6005 27.5 20.9185 27.5 21.25C27.5 21.5815 27.3683 21.8995 27.1339 22.1339C26.8995 22.3683 26.5815 22.5 26.25 22.5ZM26.25 10H3.75C3.41848 10 3.10054 9.8683 2.86612 9.63388C2.6317 9.39946 2.5 9.08152 2.5 8.75C2.5 8.41848 2.6317 8.10054 2.86612 7.86612C3.10054 7.6317 3.41848 7.5 3.75 7.5H26.25C26.5815 7.5 26.8995 7.6317 27.1339 7.86612C27.3683 8.10054 27.5 8.41848 27.5 8.75C27.5 9.08152 27.3683 9.39946 27.1339 9.63388C26.8995 9.8683 26.5815 10 26.25 10Z" fill="black"/>
                </svg>

                </div>
            </>

        );
    }
}

export default MobileNavbar