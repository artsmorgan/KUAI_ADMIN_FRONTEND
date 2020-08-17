import React from 'react';

import Navbar from "./Child/Fixed/Navbar";
import Sidebar from "./Child/Fixed/Sidebar";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const optionProvince = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

class ModifyRestaurant extends React.Component {
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
                                    General
                                </h3>
                                <div className="cover-pic">
                                    <label htmlFor="">Editar foto de perfil y </label>
                                    <div className="cvr">
                                        <div className="cvr-main">
                                            <div className="overlay">
                                                <button className="btn-cvr-change">
                                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.9193 0.786243L12.1018 2.96874C12.3928 3.25974 12.3928 3.69624 12.1018 3.98724L10.7923 5.29674L7.5913 2.09574L8.9008 0.786243C9.1918 0.495243 9.6283 0.495243 9.9193 0.786243ZM0.898304 8.78874L6.5728 3.11424L9.7738 6.31524L4.0993 11.9897C3.9538 12.1352 3.8083 12.208 3.59005 12.208H1.40755C0.971054 12.208 0.680054 11.917 0.680054 11.4805V9.29799C0.680054 9.07974 0.752804 8.93424 0.898304 8.78874Z" fill="url(#paint0_linear)"/>
                                                <defs>
                                                <linearGradient id="paint0_linear" x1="6.50005" y1="0.567993" x2="6.50005" y2="12.208" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#B40DFF"/>
                                                <stop offset="1" stop-color="#650ADD"/>
                                                </linearGradient>
                                                </defs>
                                                </svg>

                                                </button>
                                            </div>
                                        </div>
                                        <div className="cvr-photo">
                                            <div className="overlay">
                                                <button className="btn-photo-change">
                                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.9193 0.786243L12.1018 2.96874C12.3928 3.25974 12.3928 3.69624 12.1018 3.98724L10.7923 5.29674L7.5913 2.09574L8.9008 0.786243C9.1918 0.495243 9.6283 0.495243 9.9193 0.786243ZM0.898304 8.78874L6.5728 3.11424L9.7738 6.31524L4.0993 11.9897C3.9538 12.1352 3.8083 12.208 3.59005 12.208H1.40755C0.971054 12.208 0.680054 11.917 0.680054 11.4805V9.29799C0.680054 9.07974 0.752804 8.93424 0.898304 8.78874Z" fill="url(#paint0_linear)"/>
                                                <defs>
                                                <linearGradient id="paint0_linear" x1="6.50005" y1="0.567993" x2="6.50005" y2="12.208" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#B40DFF"/>
                                                <stop offset="1" stop-color="#650ADD"/>
                                                </linearGradient>
                                                </defs>
                                                </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="">NOMBRE:</label>
                                    <input className="uni-input" type="text"/>
                                    <label htmlFor="">ADMINISTRADOR:</label>
                                    <input className="uni-input" type="text"/>
                                    <label htmlFor="">FACEBOOK:</label>
                                    <input className="uni-input md" type="text"/>
                                    <label htmlFor="">INSTAGRAM:</label>
                                    <input className="uni-input md" type="text"/>
                                </div>
                            </div>
                            <div className="col col-md-4 col-lg-4 col-sm-12 col-xs-12">
                                <h3>Información</h3>
                                <div>
                                    <label htmlFor="">PROVINCIA:</label>
                                    <Select className="cstm-select" />
                                    <label htmlFor="">CANTON:</label>
                                    <Select className="cstm-select" />
                                    <label htmlFor="">DISTRITO:</label>
                                    <Select className="cstm-select" />
                                    <label htmlFor="">BARRIO:</label>
                                    <Select className="cstm-select" />
                                    <label htmlFor="">DIRECciÓn::</label>
                                    <input className="uni-input md" type="text"/>
                                </div>
                            </div>
                            <div className="col col-md-4 col-lg-4 col-sm-12 col-xs-12">
                                <h3>Horario</h3>
                                <div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </>

        );
    }
}

export default ModifyRestaurant