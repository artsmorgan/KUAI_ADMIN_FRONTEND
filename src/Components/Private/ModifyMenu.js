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
        return (
            <>
                <Navbar/>
                <Sidebar/>
                <div className="wrapper">
                    <div className="flex-area conten container-fluid">
                        <div className="mod-rest-container">
                            <div className="row clearfix">
                                <div className="col col-md-4 col-lg-4 col-sm-12 col-xs-12">
                                    <h3>
                                    Categorías
                                    </h3>
                                    <div className="rotator-container">
                                        <div className="rotator active">
                                            <div className="directional">
                                                <svg className="top" width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.68156 7C8.50732 7 8.97723 6.05578 8.47932 5.39702L5.19777 1.05545C4.79765 0.526091 4.00237 0.52609 3.60225 1.05545L0.320704 5.39702C-0.177216 6.05578 0.292695 7 1.11846 7L7.68156 7Z" fill="#41404D"/>
                                                </svg>
                                                <svg className="bottom" width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.68156 7C8.50732 7 8.97723 6.05578 8.47932 5.39702L5.19777 1.05545C4.79765 0.526091 4.00237 0.52609 3.60225 1.05545L0.320704 5.39702C-0.177216 6.05578 0.292695 7 1.11846 7L7.68156 7Z" fill="#41404D"/>
                                                </svg>
                                            </div>
                                            <input type="text" value="Pizza"/>
                                            <div className="action">
                                                {/* <svg className="trash" width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5393 2.66665H10.0121V0.666661C10.0121 0.298474 9.74885 0 9.42418 0H4.72118C4.39651 0 4.13331 0.298474 4.13331 0.666661V2.66665H0.606063C0.281389 2.66665 0.0181885 2.96512 0.0181885 3.33331C0.0181885 3.70149 0.281389 3.99997 0.606063 3.99997H13.5393C13.864 3.99997 14.1272 3.70149 14.1272 3.33331C14.1272 2.96512 13.864 2.66665 13.5393 2.66665ZM5.30905 1.33332H8.8363V2.66665H5.30905V1.33332ZM1.78181 5.33329V13.9999C1.78181 15.1045 2.57141 15.9999 3.54543 15.9999H10.5999C11.5739 15.9999 12.3635 15.1045 12.3635 13.9999V5.33329H1.78181ZM5.30904 12.6664H4.13329V7.99973H5.30904V12.6664ZM6.48479 12.6664H7.66054V7.99973H6.48479V12.6664ZM10.012 12.6664H8.83629V7.99973H10.012V12.6664Z" fill="#41404D"/>
                                                </svg> */}
                                                <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11.694 1.13765C12.1498 0.620782 12.8888 0.620782 13.3445 1.13765C13.8003 1.65452 13.8003 2.49254 13.3445 3.00941L6.34187 10.9506C5.88608 11.4675 5.14711 11.4675 4.69132 10.9506L0.800946 6.53882C0.34516 6.02195 0.34516 5.18394 0.800946 4.66706C1.25673 4.15019 1.99571 4.15019 2.45149 4.66706L5.51659 8.14295L11.694 1.13765Z" fill="#37DBE4"/>
                                                </svg>

                                            </div>
                                        </div>
                                        <div className="rotator">
                                            <div className="directional">
                                                <svg className="top" width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.68156 7C8.50732 7 8.97723 6.05578 8.47932 5.39702L5.19777 1.05545C4.79765 0.526091 4.00237 0.52609 3.60225 1.05545L0.320704 5.39702C-0.177216 6.05578 0.292695 7 1.11846 7L7.68156 7Z" fill="#41404D"/>
                                                </svg>
                                                <svg className="bottom" width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.68156 7C8.50732 7 8.97723 6.05578 8.47932 5.39702L5.19777 1.05545C4.79765 0.526091 4.00237 0.52609 3.60225 1.05545L0.320704 5.39702C-0.177216 6.05578 0.292695 7 1.11846 7L7.68156 7Z" fill="#41404D"/>
                                                </svg>
                                            </div>
                                            <input type="text" value="ENTRADAS"/>
                                            <div className="action">
                                                <svg className="trash" width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5393 2.66665H10.0121V0.666661C10.0121 0.298474 9.74885 0 9.42418 0H4.72118C4.39651 0 4.13331 0.298474 4.13331 0.666661V2.66665H0.606063C0.281389 2.66665 0.0181885 2.96512 0.0181885 3.33331C0.0181885 3.70149 0.281389 3.99997 0.606063 3.99997H13.5393C13.864 3.99997 14.1272 3.70149 14.1272 3.33331C14.1272 2.96512 13.864 2.66665 13.5393 2.66665ZM5.30905 1.33332H8.8363V2.66665H5.30905V1.33332ZM1.78181 5.33329V13.9999C1.78181 15.1045 2.57141 15.9999 3.54543 15.9999H10.5999C11.5739 15.9999 12.3635 15.1045 12.3635 13.9999V5.33329H1.78181ZM5.30904 12.6664H4.13329V7.99973H5.30904V12.6664ZM6.48479 12.6664H7.66054V7.99973H6.48479V12.6664ZM10.012 12.6664H8.83629V7.99973H10.012V12.6664Z" fill="#41404D"/>
                                                </svg>
                                                {/* <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11.694 1.13765C12.1498 0.620782 12.8888 0.620782 13.3445 1.13765C13.8003 1.65452 13.8003 2.49254 13.3445 3.00941L6.34187 10.9506C5.88608 11.4675 5.14711 11.4675 4.69132 10.9506L0.800946 6.53882C0.34516 6.02195 0.34516 5.18394 0.800946 4.66706C1.25673 4.15019 1.99571 4.15019 2.45149 4.66706L5.51659 8.14295L11.694 1.13765Z" fill="#37DBE4"/>
                                                </svg> */}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col col-md-4 col-lg-4 col-sm-12 col-xs-12">
                                    <h3>Menú</h3>
                                    <div className="rotator-container lg">
                                        <div className="rotator">
                                            <div className="directional">
                                                    <svg className="top" width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.68156 7C8.50732 7 8.97723 6.05578 8.47932 5.39702L5.19777 1.05545C4.79765 0.526091 4.00237 0.52609 3.60225 1.05545L0.320704 5.39702C-0.177216 6.05578 0.292695 7 1.11846 7L7.68156 7Z" fill="#41404D"/>
                                                    </svg>
                                                    <svg className="bottom" width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.68156 7C8.50732 7 8.97723 6.05578 8.47932 5.39702L5.19777 1.05545C4.79765 0.526091 4.00237 0.52609 3.60225 1.05545L0.320704 5.39702C-0.177216 6.05578 0.292695 7 1.11846 7L7.68156 7Z" fill="#41404D"/>
                                                    </svg>
                                            </div>
                                            <div className="img"></div>
                                            <div className="menu-ind">
                                                <p>TABLA MONCHIS</p>
                                                <span>₡16.500</span>
                                                <button>
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.89 0.21L10.99 2.31C11.27 2.59 11.27 3.01 10.99 3.29L9.73 4.55L6.65 1.47L7.91 0.21C8.19 -0.07 8.61 -0.07 8.89 0.21ZM0.21 7.91L5.67 2.45L8.75 5.53L3.29 10.99C3.15 11.13 3.01 11.2 2.8 11.2H0.7C0.28 11.2 0 10.92 0 10.5V8.4C0 8.19 0.07 8.05 0.21 7.91Z" fill="white"/>
                                                </svg>
                                                Editor
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col col-md-4 col-lg-4 col-sm-12 col-xs-12">
                                    <h3 style={{marginBottom: '55px'}}>Nuevo item de Menú</h3>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        );
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