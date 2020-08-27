import React from 'react';
import Select from 'react-select';
import {Button, Nav} from 'react-bootstrap';
import Navbar from "./Child/Fixed/Navbar/Navbar";
import Checkbox from '@opuscapita/react-checkbox';
import Sidebar from "./Child/Fixed/Sidebar/Sidebar";
import menuImage from "../../assets/images/food.png";

class ModifyMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Sidebar/>
                <div className="wrapper">
                    <Navbar/>
                    <div className="flex-area conten container-fluid">
                        <div className="mod-rest-container">
                            <div className="row clearfix">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <Nav className="tab-cstm mb-visible" variant="pills" defaultActiveKey="/ORDENES">
                                        <Nav.Item>
                                            <Nav.Link href="#">Menú</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link href="#">Categorías</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                    </div>

                                    {/* This section will go for tab start */}
                                <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
                                    <h3 className="mb-hidden">
                                        Categorías
                                    </h3>
                                    <div className="rotator-container">
                                        <button className="btn-theme btn-cat"><span>+</span>NUEVA CATEGORÍA</button>
                                        <div className="rotator-scroll" style={{paddingTop: '25px'}}>
                                                                                    <div className="rotator active">
                                            <div className="directional">
                                                <svg className="top" width="9" height="7" viewBox="0 0 9 7" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M7.68156 7C8.50732 7 8.97723 6.05578 8.47932 5.39702L5.19777 1.05545C4.79765 0.526091 4.00237 0.52609 3.60225 1.05545L0.320704 5.39702C-0.177216 6.05578 0.292695 7 1.11846 7L7.68156 7Z"
                                                        fill="#41404D"/>
                                                </svg>
                                                <svg className="bottom" width="9" height="7" viewBox="0 0 9 7"
                                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M7.68156 7C8.50732 7 8.97723 6.05578 8.47932 5.39702L5.19777 1.05545C4.79765 0.526091 4.00237 0.52609 3.60225 1.05545L0.320704 5.39702C-0.177216 6.05578 0.292695 7 1.11846 7L7.68156 7Z"
                                                        fill="#41404D"/>
                                                </svg>
                                            </div>
                                            <input type="text" value="Pizza"/>
                                            <div className="action">
                                                {/* <svg className="trash" width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5393 2.66665H10.0121V0.666661C10.0121 0.298474 9.74885 0 9.42418 0H4.72118C4.39651 0 4.13331 0.298474 4.13331 0.666661V2.66665H0.606063C0.281389 2.66665 0.0181885 2.96512 0.0181885 3.33331C0.0181885 3.70149 0.281389 3.99997 0.606063 3.99997H13.5393C13.864 3.99997 14.1272 3.70149 14.1272 3.33331C14.1272 2.96512 13.864 2.66665 13.5393 2.66665ZM5.30905 1.33332H8.8363V2.66665H5.30905V1.33332ZM1.78181 5.33329V13.9999C1.78181 15.1045 2.57141 15.9999 3.54543 15.9999H10.5999C11.5739 15.9999 12.3635 15.1045 12.3635 13.9999V5.33329H1.78181ZM5.30904 12.6664H4.13329V7.99973H5.30904V12.6664ZM6.48479 12.6664H7.66054V7.99973H6.48479V12.6664ZM10.012 12.6664H8.83629V7.99973H10.012V12.6664Z" fill="#41404D"/>
                                                </svg> */}
                                                <svg width="14" height="12" viewBox="0 0 14 12" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M11.694 1.13765C12.1498 0.620782 12.8888 0.620782 13.3445 1.13765C13.8003 1.65452 13.8003 2.49254 13.3445 3.00941L6.34187 10.9506C5.88608 11.4675 5.14711 11.4675 4.69132 10.9506L0.800946 6.53882C0.34516 6.02195 0.34516 5.18394 0.800946 4.66706C1.25673 4.15019 1.99571 4.15019 2.45149 4.66706L5.51659 8.14295L11.694 1.13765Z"
                                                        fill="#37DBE4"/>
                                                </svg>

                                            </div>
                                        </div>
                                        <div className="rotator">
                                            <div className="directional">
                                                <svg className="top" width="9" height="7" viewBox="0 0 9 7" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M7.68156 7C8.50732 7 8.97723 6.05578 8.47932 5.39702L5.19777 1.05545C4.79765 0.526091 4.00237 0.52609 3.60225 1.05545L0.320704 5.39702C-0.177216 6.05578 0.292695 7 1.11846 7L7.68156 7Z"
                                                        fill="#41404D"/>
                                                </svg>
                                                <svg className="bottom" width="9" height="7" viewBox="0 0 9 7"
                                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M7.68156 7C8.50732 7 8.97723 6.05578 8.47932 5.39702L5.19777 1.05545C4.79765 0.526091 4.00237 0.52609 3.60225 1.05545L0.320704 5.39702C-0.177216 6.05578 0.292695 7 1.11846 7L7.68156 7Z"
                                                        fill="#41404D"/>
                                                </svg>
                                            </div>
                                            <input type="text" value="ENTRADAS"/>
                                            <div className="action">
                                                <svg className="trash" width="15" height="16" viewBox="0 0 15 16"
                                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                                          d="M13.5393 2.66665H10.0121V0.666661C10.0121 0.298474 9.74885 0 9.42418 0H4.72118C4.39651 0 4.13331 0.298474 4.13331 0.666661V2.66665H0.606063C0.281389 2.66665 0.0181885 2.96512 0.0181885 3.33331C0.0181885 3.70149 0.281389 3.99997 0.606063 3.99997H13.5393C13.864 3.99997 14.1272 3.70149 14.1272 3.33331C14.1272 2.96512 13.864 2.66665 13.5393 2.66665ZM5.30905 1.33332H8.8363V2.66665H5.30905V1.33332ZM1.78181 5.33329V13.9999C1.78181 15.1045 2.57141 15.9999 3.54543 15.9999H10.5999C11.5739 15.9999 12.3635 15.1045 12.3635 13.9999V5.33329H1.78181ZM5.30904 12.6664H4.13329V7.99973H5.30904V12.6664ZM6.48479 12.6664H7.66054V7.99973H6.48479V12.6664ZM10.012 12.6664H8.83629V7.99973H10.012V12.6664Z"
                                                          fill="#41404D"/>
                                                </svg>
                                                {/* <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11.694 1.13765C12.1498 0.620782 12.8888 0.620782 13.3445 1.13765C13.8003 1.65452 13.8003 2.49254 13.3445 3.00941L6.34187 10.9506C5.88608 11.4675 5.14711 11.4675 4.69132 10.9506L0.800946 6.53882C0.34516 6.02195 0.34516 5.18394 0.800946 4.66706C1.25673 4.15019 1.99571 4.15019 2.45149 4.66706L5.51659 8.14295L11.694 1.13765Z" fill="#37DBE4"/>
                                                </svg> */}

                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>

                                {/* This section will go for tab end */}

                                {/* This section will go for tab start */}

                                <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
                                    <h3 className="mb-hidden">Menú</h3>
                                    <div className="rotator-container lg">
                                        <div className="btn-theme add-menu">
                                            <div className="add-item">
                                                <span>+</span>
                                            </div>
                                            <div className="add-details">
                                                <p className="title">AÑADIR ÍTEM AL MENÚ</p>
                                                <p className="dummy"></p>
                                                <p className="dummy" style={{width: '80px'}}></p>
                                                <p className="dummy" style={{width: '80px'}}></p>
                                                <button className="btn-add-menu"><span>+</span>AÑADIR</button>
                                            </div>
                                        </div>
                                        <div className="rotator-scroll">
                                        <div className="rotator-stripe">
                                        <p className="rotator-title">PLATO FUERTE</p>
                                        <div className="rotator">
                                            <div className="directional">
                                                <svg className="top" width="9" height="7" viewBox="0 0 9 7" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M7.68156 7C8.50732 7 8.97723 6.05578 8.47932 5.39702L5.19777 1.05545C4.79765 0.526091 4.00237 0.52609 3.60225 1.05545L0.320704 5.39702C-0.177216 6.05578 0.292695 7 1.11846 7L7.68156 7Z"
                                                        fill="#41404D"/>
                                                </svg>
                                                <svg className="bottom" width="9" height="7" viewBox="0 0 9 7"
                                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M7.68156 7C8.50732 7 8.97723 6.05578 8.47932 5.39702L5.19777 1.05545C4.79765 0.526091 4.00237 0.52609 3.60225 1.05545L0.320704 5.39702C-0.177216 6.05578 0.292695 7 1.11846 7L7.68156 7Z"
                                                        fill="#41404D"/>
                                                </svg>
                                            </div>
                                            <div className="img" style={{background: "url(" + menuImage +")" }}></div>
                                            <div className="menu-ind">
                                                <p>TABLA MONCHIS</p>
                                                <span>₡16.500</span>
                                                <button>
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                                              d="M8.89 0.21L10.99 2.31C11.27 2.59 11.27 3.01 10.99 3.29L9.73 4.55L6.65 1.47L7.91 0.21C8.19 -0.07 8.61 -0.07 8.89 0.21ZM0.21 7.91L5.67 2.45L8.75 5.53L3.29 10.99C3.15 11.13 3.01 11.2 2.8 11.2H0.7C0.28 11.2 0 10.92 0 10.5V8.4C0 8.19 0.07 8.05 0.21 7.91Z"
                                                              fill="white"/>
                                                    </svg>
                                                    Editor
                                                </button>
                                            </div>
                                        </div>
                                        <div className="rotator">
                                            <div className="directional">
                                                <svg className="top" width="9" height="7" viewBox="0 0 9 7" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M7.68156 7C8.50732 7 8.97723 6.05578 8.47932 5.39702L5.19777 1.05545C4.79765 0.526091 4.00237 0.52609 3.60225 1.05545L0.320704 5.39702C-0.177216 6.05578 0.292695 7 1.11846 7L7.68156 7Z"
                                                        fill="#41404D"/>
                                                </svg>
                                                <svg className="bottom" width="9" height="7" viewBox="0 0 9 7"
                                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M7.68156 7C8.50732 7 8.97723 6.05578 8.47932 5.39702L5.19777 1.05545C4.79765 0.526091 4.00237 0.52609 3.60225 1.05545L0.320704 5.39702C-0.177216 6.05578 0.292695 7 1.11846 7L7.68156 7Z"
                                                        fill="#41404D"/>
                                                </svg>
                                            </div>
                                            <div className="img"></div>
                                            <div className="menu-ind">
                                                <p>CEVICHE TROPICAL</p>
                                                <span>₡16.500</span>
                                                <button>
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                                              d="M8.89 0.21L10.99 2.31C11.27 2.59 11.27 3.01 10.99 3.29L9.73 4.55L6.65 1.47L7.91 0.21C8.19 -0.07 8.61 -0.07 8.89 0.21ZM0.21 7.91L5.67 2.45L8.75 5.53L3.29 10.99C3.15 11.13 3.01 11.2 2.8 11.2H0.7C0.28 11.2 0 10.92 0 10.5V8.4C0 8.19 0.07 8.05 0.21 7.91Z"
                                                              fill="white"/>
                                                    </svg>
                                                    Editor
                                                </button>
                                            </div>
                                        </div>
                                        <div className="rotator inactive">
                                            <div className="directional">
                                                <svg className="top" width="9" height="7" viewBox="0 0 9 7" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M7.68156 7C8.50732 7 8.97723 6.05578 8.47932 5.39702L5.19777 1.05545C4.79765 0.526091 4.00237 0.52609 3.60225 1.05545L0.320704 5.39702C-0.177216 6.05578 0.292695 7 1.11846 7L7.68156 7Z"
                                                        fill="#41404D"/>
                                                </svg>
                                                <svg className="bottom" width="9" height="7" viewBox="0 0 9 7"
                                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M7.68156 7C8.50732 7 8.97723 6.05578 8.47932 5.39702L5.19777 1.05545C4.79765 0.526091 4.00237 0.52609 3.60225 1.05545L0.320704 5.39702C-0.177216 6.05578 0.292695 7 1.11846 7L7.68156 7Z"
                                                        fill="#41404D"/>
                                                </svg>
                                            </div>
                                            <div className="img"></div>
                                            <div className="menu-ind">
                                                <p>CEVICHE TROPICAL</p>
                                                <span>₡16.500</span>
                                                <button>
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                                              d="M8.89 0.21L10.99 2.31C11.27 2.59 11.27 3.01 10.99 3.29L9.73 4.55L6.65 1.47L7.91 0.21C8.19 -0.07 8.61 -0.07 8.89 0.21ZM0.21 7.91L5.67 2.45L8.75 5.53L3.29 10.99C3.15 11.13 3.01 11.2 2.8 11.2H0.7C0.28 11.2 0 10.92 0 10.5V8.4C0 8.19 0.07 8.05 0.21 7.91Z"
                                                              fill="white"/>
                                                    </svg>
                                                    Editor
                                                </button>
                                            </div>
                                        </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>

                                {/* This section will go for tab end */}

                                {/* This section will appear after the button click of ad menu New menu */}

                                <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
                                    <h3 style={{marginBottom: '21px'}}>Nuevo item de Menú</h3>
                                    <div className="menu-details">
                                    <label htmlFor="">VISTA PREVIA</label>
                                    <div className="add-menu-new">
                                            <div className="add-item">
                                            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.2499 3.12461H17.3498L15.9741 0.374512H6.02455L4.65015 3.12596L2.75275 3.12934C1.24009 3.13204 0.00869271 4.36474 0.00738656 5.87808L0 16.8744C0 18.3911 1.23337 19.6251 2.7501 19.6251H19.2499C20.7667 19.6251 22 18.3918 22 16.875V5.87466C22 4.35798 20.7666 3.12461 19.2499 3.12461ZM10.9997 16.1875C7.9669 16.1875 5.49947 13.7201 5.49947 10.6873C5.49947 7.65455 7.9669 5.18712 10.9997 5.18712C14.0324 5.18712 16.4999 7.65455 16.4999 10.6873C16.4999 13.7201 14.0324 16.1875 10.9997 16.1875Z" fill="#AEA7AF"/>
</svg>

                                            </div>
                                            <div className="add-details">
                                                <p className="title">AÑADIR ÍTEM AL MENÚ</p>
                                                <p className="dummy">
                                                Deliciosos trozos de cerdo cocidos con nuestra receta...
                                                </p>
                                                <p className="price">₡6.950</p>
                                            </div>
                                            <button className="btn-add-menu">Agregar</button>
                                        </div>
                                        <div className="menu-elements">
                                            <ul className="menu-tabs">
                                                <li className="active">
                                                    <a href="">Disponible</a>
                                                </li>
                                                <li>
                                                    <a href="">Agotado</a>
                                                </li>
                                            </ul>

                                            <label htmlFor="">NOMBRE DEL iteM:</label>
                                            <input type="text" className="uni-input"/>
                                            <label htmlFor="">DescripciÓn:</label>
                                            <textarea name="" className="uni-input" id="" cols="30" rows="10"></textarea>
                                            <label htmlFor="">CATEGORIA:</label>
                                            <Select className="cstm-select"  name="distrito"
                                                    placeholder="Distrito"
                                                    />
                                            <label htmlFor="">PRECIO:</label>
                                            <input type="text" className="uni-input"/>

                                            <div className="photo-area">
                                                <div className="upload">
                                                    <div className="center">
                                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0)">
                                                    <path d="M18.8282 14.1716C20.3903 15.7338 20.3903 18.2665 18.8282 19.8287C17.266 21.3908 14.7333 21.3908 13.1711 19.8287C11.609 18.2665 11.609 15.7338 13.1711 14.1716C14.7333 12.6095 17.266 12.6095 18.8282 14.1716Z" fill="white"/>
                                                    <path d="M27.9999 5.99941H25.2361L23.2351 1.99927H8.76298L6.76386 6.00137L4.004 6.00629C1.80376 6.01022 0.0126439 7.80323 0.0107441 10.0045L0 25.9991C0 28.2052 1.794 30.0002 4.00014 30.0002H27.9999C30.2061 30.0002 32.0001 28.2062 32.0001 26V9.99948C32 7.79341 30.206 5.99941 27.9999 5.99941ZM15.9995 25C11.5882 25 7.99923 21.411 7.99923 16.9997C7.99923 12.5884 11.5882 8.99943 15.9995 8.99943C20.4108 8.99943 23.9998 12.5884 23.9998 16.9997C23.9998 21.411 20.4108 25 15.9995 25Z" fill="white"/>
                                                    </g>
                                                    <defs>
                                                    <clipPath id="clip0">
                                                    <rect width="32" height="32" fill="white"/>
                                                    </clipPath>
                                                    </defs>
                                                    </svg>
                                                    </div>
                                                    <label htmlFor="">Agregar Fotografia</label>
                                                </div>
                                                <div className="chk-area">
                                                 <p>
                                                 <Checkbox name="aceptarReservaciones"/>
                                                    <label htmlFor="" className="chk-label">Upsell</label>
                                                 </p>
                                                 <p>
                                                 <Checkbox name="aceptarReservaciones"/>
                                                    <label htmlFor="" className="chk-label">Recomendación</label>
                                                 </p>
                                                 <p>
                                                 <Checkbox name="aceptarReservaciones"/>
                                                    <label htmlFor="" className="chk-label">Promoción</label>
                                                 </p>
                                                 </div>

                                                 <div className="promo-area">
                                                     <label htmlFor="">PROMOCIONES</label>
                                                     <p>
                                                     <Checkbox name="aceptarReservaciones"/>
                                                        <label htmlFor="" className="chk-label">Precio especial</label>
                                                    </p>
                                                    <div className="promo-code">
                                                        <label htmlFor="">PRECIO PROMOCIÓN</label>
                                                        <input type="text" className="uni-input"/>
                                                    </div>
                                                 </div>
                                                 <div className="promo-area">
                                                     <p>
                                                     <Checkbox name="aceptarReservaciones"/>
                                                        <label htmlFor="" className="chk-label">% de descuento</label>
                                                    </p>
                                                    <div className="promo-code">
                                                        <label htmlFor="">PORCENTAJE</label>
                                                        <input type="text" className="uni-input" style={{width: "100px"}}/>
                                                        <p className="discounted">
                                                            <span className="cross">₡6.950</span> | <span>₡5.560</span>
                                                        </p>
                                                    </div>
                                                 </div>
                                                 <div className="promo-area">
                                                     <p>
                                                     <Checkbox name="aceptarReservaciones"/>
                                                        <label htmlFor="" className="chk-label">Llleva “x”, paga “y”</label>
                                                    </p>
                                                    <div className="promo-code">
                                                        <div className="row">
                                                            <div className="col">
                                                                <label htmlFor="">LLEVA</label>
                                                                <input type="text" className="uni-input"/>
                                                            </div>
                                                            <div className="col">
                                                                <label htmlFor="">PAGA</label>
                                                                <input type="text" className="uni-input"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                 </div>
                                                 <div className="promo-area">
                                                     <p>
                                                     <Checkbox name="aceptarReservaciones"/>
                                                        <label htmlFor="" className="chk-label">Envío gratis</label>
                                                    </p>
                                                 </div>
                                                 <div className="promo-area">
                                                     <p>
                                                     <Checkbox name="aceptarReservaciones"/>
                                                        <label htmlFor="" className="chk-label">Añadir un producto gratuito</label>
                                                    </p>
                                                    <div className="promo-code">
                                                        <label htmlFor="">
                                                            Seleccionar producto
                                                            <button className="select-card">SELECCIONAR</button>
                                                            </label>
                                                        <div className="dummy">
                                                            <div className="left"></div>
                                                            <div className="right">
                                                                <p></p>
                                                                <p style={{width: '80%'}}></p>
                                                                <p style={{width: '60%'}}></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                 </div>

                                                 <div className="row" style={{marginTop: '40px'}}>
                                                     <button className="btn-theme">GUARDAR</button>
                                                 </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* New menu */}

                            </div>
                        </div>
                    </div>
                </div>
            </>

        );
    }
}

export default ModifyMenu