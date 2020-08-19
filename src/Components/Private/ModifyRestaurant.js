import React from 'react';
import Select from 'react-select';
import Checkbox from '@opuscapita/react-checkbox';

import Navbar from "./Child/Fixed/Navbar/Navbar";
import Sidebar from "./Child/Fixed/Sidebar/Sidebar";
import MobileSidebar from "./Child/Fixed/Sidebar/MobileSidebar";
import MobileNavbar from "./Child/Fixed/Navbar/MobileNavbar";

/*const optionProvince = [
    {value: "chocolate", label: "Chocolate"},
    {value: "strawberry", label: "Strawberry"},
    {value: "vanilla", label: "Vanilla"},
];*/

class ModifyRestaurant extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            checked: false
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

    checkboxChangeHandler = () => {
        this.setState({checked: this.state.checked ? false : true});
    };

    render() {
        const {width} = this.state

        if (width > 1024) {
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
                                                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                                      d="M9.9193 0.786243L12.1018 2.96874C12.3928 3.25974 12.3928 3.69624 12.1018 3.98724L10.7923 5.29674L7.5913 2.09574L8.9008 0.786243C9.1918 0.495243 9.6283 0.495243 9.9193 0.786243ZM0.898304 8.78874L6.5728 3.11424L9.7738 6.31524L4.0993 11.9897C3.9538 12.1352 3.8083 12.208 3.59005 12.208H1.40755C0.971054 12.208 0.680054 11.917 0.680054 11.4805V9.29799C0.680054 9.07974 0.752804 8.93424 0.898304 8.78874Z"
                                                                      fill="url(#paint0_linear)"/>
                                                                <defs>
                                                                    <linearGradient id="paint0_linear" x1="6.50005"
                                                                                    y1="0.567993" x2="6.50005" y2="12.208"
                                                                                    gradientUnits="userSpaceOnUse">
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
                                                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                                      d="M9.9193 0.786243L12.1018 2.96874C12.3928 3.25974 12.3928 3.69624 12.1018 3.98724L10.7923 5.29674L7.5913 2.09574L8.9008 0.786243C9.1918 0.495243 9.6283 0.495243 9.9193 0.786243ZM0.898304 8.78874L6.5728 3.11424L9.7738 6.31524L4.0993 11.9897C3.9538 12.1352 3.8083 12.208 3.59005 12.208H1.40755C0.971054 12.208 0.680054 11.917 0.680054 11.4805V9.29799C0.680054 9.07974 0.752804 8.93424 0.898304 8.78874Z"
                                                                      fill="url(#paint0_linear)"/>
                                                                <defs>
                                                                    <linearGradient id="paint0_linear" x1="6.50005"
                                                                                    y1="0.567993" x2="6.50005" y2="12.208"
                                                                                    gradientUnits="userSpaceOnUse">
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
                                            <label htmlFor="">
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M16.5 0H1.5C0.67125 0 0 0.67125 0 1.5V16.5C0 17.3288 0.67125 18 1.5 18H9.75V11.25H7.5V8.25H9.75V6.30975C9.75 3.98475 11.1697 2.71875 13.2442 2.71875C14.238 2.71875 15.0915 2.793 15.3405 2.826V5.256L13.902 5.25675C12.774 5.25675 12.5557 5.793 12.5557 6.579V8.25H15.8857L15.1357 11.25H12.5557V18H16.5C17.3287 18 18 17.3288 18 16.5V1.5C18 0.67125 17.3287 0 16.5 0Z" fill="#444460"/>
                                                </svg>&nbsp;&nbsp;
                                                FACEBOOK:
                                            </label>
                                            <input className="uni-input md" type="text"/>
                                            <label htmlFor="">
                                                <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.40619 0.054C6.36619 0.0105 6.67294 0 9.11719 0C11.5614 0 11.8682 0.0105 12.8282 0.054C14.2907 0.12075 15.5754 0.47925 16.6067 1.5105C17.6379 2.54175 17.9964 3.8265 18.0632 5.289C18.1067 6.249 18.1172 6.55575 18.1172 9C18.1172 11.4443 18.1067 11.751 18.0632 12.711C17.9964 14.1735 17.6379 15.4583 16.6067 16.4895C15.5754 17.5208 14.2907 17.8792 12.8282 17.946C11.8682 17.9895 11.5614 18 9.11719 18C6.67294 18 6.36619 17.9895 5.40619 17.946C3.94369 17.8792 2.65894 17.5208 1.62769 16.4895C0.596437 15.4583 0.237937 14.1735 0.171187 12.711C0.127688 11.751 0.117188 11.4443 0.117188 9C0.117188 6.55575 0.127688 6.249 0.171187 5.289C0.237937 3.8265 0.596437 2.54175 1.62769 1.5105C2.65894 0.47925 3.94369 0.12075 5.40619 0.054ZM12.7539 1.674C11.8052 1.6305 11.5202 1.6215 9.11719 1.6215C6.71419 1.6215 6.42919 1.6305 5.48044 1.674C4.45594 1.7205 3.50569 1.926 2.77444 2.65725C2.04319 3.3885 1.83769 4.33875 1.79119 5.36325C1.74769 6.312 1.73869 6.597 1.73869 9C1.73869 11.403 1.74769 11.688 1.79119 12.6368C1.83769 13.6613 2.04319 14.6115 2.77444 15.3427C3.50569 16.074 4.45594 16.2795 5.48044 16.326C6.42919 16.3695 6.71419 16.3785 9.11719 16.3785C11.5202 16.3785 11.8052 16.3695 12.7539 16.326C13.7784 16.2795 14.7287 16.074 15.4599 15.3427C16.1912 14.6115 16.3967 13.6613 16.4432 12.6368C16.4867 11.688 16.4957 11.403 16.4957 9C16.4957 6.597 16.4867 6.312 16.4432 5.36325C16.3967 4.33875 16.1912 3.3885 15.4599 2.65725C14.7287 1.926 13.7784 1.7205 12.7539 1.674ZM4.49566 9C4.49566 6.44775 6.56491 4.3785 9.11716 4.3785C11.6694 4.3785 13.7387 6.44775 13.7387 9C13.7387 11.5522 11.6694 13.6215 9.11716 13.6215C6.56491 13.6215 4.49566 11.5522 4.49566 9ZM6.11717 9C6.11717 10.6567 7.46042 12 9.11717 12C10.7739 12 12.1172 10.6567 12.1172 9C12.1172 7.34325 10.7739 6 9.11717 6C7.46042 6 6.11717 7.34325 6.11717 9ZM15.0017 4.1955C15.0017 4.79197 14.5182 5.2755 13.9217 5.2755C13.3252 5.2755 12.8417 4.79197 12.8417 4.1955C12.8417 3.59903 13.3252 3.1155 13.9217 3.1155C14.5182 3.1155 15.0017 3.59903 15.0017 4.1955Z" fill="#444460"/>
                                                </svg> &nbsp;&nbsp;
                                                INSTAGRAM:
                                            </label>
                                            <input className="uni-input md" type="text"/>
                                        </div>
                                    </div>
                                    <div className="col col-md-4 col-lg-4 col-sm-12 col-xs-12">
                                        <h3>Información</h3>
                                        <div>
                                            <label htmlFor="">PROVINCIA:</label>
                                            <Select className="cstm-select"/>
                                            <label htmlFor="">CANTON:</label>
                                            <Select className="cstm-select"/>
                                            <label htmlFor="">DISTRITO:</label>
                                            <Select className="cstm-select"/>
                                            <label htmlFor="">BARRIO:</label>
                                            <Select className="cstm-select"/>
                                            <label htmlFor="">DIRECciÓn::</label>
                                            <textarea className="uni-input tarea" name="" id="" cols="30" rows="10"></textarea>
                                        </div>
                                        <div className="text-center">
                                            <button className="btn-theme">GUARDAR</button>
                                        </div>
                                    </div>
                                    <div className="col col-md-4 col-lg-4 col-sm-12 col-xs-12">
                                        <h3 style={{marginBottom: '55px'}}>Horario</h3>
                                        <div className="hor-inline">
                                            <Checkbox
                                                onChange={this.checkboxChangeHandler} checked={this.state.checked} className={""}
                                            /> <label htmlFor="" className="chk-label">Lunes</label>
                                            <div className="time-block">
                                                <Select className="cstm-select mini float-left"/>
                                                <span className="dash">-</span>
                                                <Select className="cstm-select mini float-right"/>
                                            </div>
                                        </div>
                                        <div className="hor-inline">
                                            <Checkbox
                                                onChange={this.checkboxChangeHandler} checked={this.state.checked} className={""}
                                            /> <label htmlFor="" className="chk-label">Lunes</label>
                                            <div className="time-block">
                                                <Select className="cstm-select mini float-left"/>
                                                <span className="dash">-</span>
                                                <Select className="cstm-select mini float-right"/>
                                            </div>
                                        </div>
                                        <div className="hor-inline">
                                            <Checkbox
                                                onChange={this.checkboxChangeHandler} checked={this.state.checked} className={""}
                                            /> <label htmlFor="" className="chk-label">Lunes</label>
                                            <div className="time-block">
                                                <Select className="cstm-select mini float-left"/>
                                                <span className="dash">-</span>
                                                <Select className="cstm-select mini float-right"/>
                                            </div>
                                        </div>
                                        <div className="hor-inline">
                                            <Checkbox
                                                onChange={this.checkboxChangeHandler} checked={this.state.checked} className={""}
                                            /> <label htmlFor="" className="chk-label">Lunes</label>
                                            <div className="time-block">
                                                <Select className="cstm-select mini float-left"/>
                                                <span className="dash">-</span>
                                                <Select className="cstm-select mini float-right"/>
                                            </div>
                                        </div>
                                        <div className="hor-inline">
                                            <Checkbox
                                                onChange={this.checkboxChangeHandler} checked={this.state.checked} className={""}
                                            /> <label htmlFor="" className="chk-label">Lunes</label>
                                            <div className="time-block">
                                                <Select className="cstm-select mini float-left"/>
                                                <span className="dash">-</span>
                                                <Select className="cstm-select mini float-right"/>
                                            </div>
                                        </div>
                                        <div className="hor-inline">
                                            <Checkbox
                                                onChange={this.checkboxChangeHandler} checked={this.state.checked} className={""}
                                            /> <label htmlFor="" className="chk-label">Lunes</label>
                                            <div className="time-block">
                                                <Select className="cstm-select mini float-left"/>
                                                <span className="dash">-</span>
                                                <Select className="cstm-select mini float-right"/>
                                            </div>
                                        </div>
                                        <div className="hor-inline">
                                            <Checkbox
                                                onChange={this.checkboxChangeHandler} checked={this.state.checked} className={""}
                                            /> <label htmlFor="" className="chk-label">Lunes</label>
                                            <div className="time-block">
                                                <Select className="cstm-select mini float-left"/>
                                                <span className="dash">-</span>
                                                <Select className="cstm-select mini float-right"/>
                                            </div>
                                        </div>
                                        <div className="hor-inline">
                                            <Checkbox
                                                onChange={this.checkboxChangeHandler} checked={this.state.checked} className={""}
                                            /> <label htmlFor="" className="chk-label">Lunes</label>
                                            <div className="time-block">
                                                <Select className="cstm-select mini float-left"/>
                                                <span className="dash">-</span>
                                                <Select className="cstm-select mini float-right"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <MobileNavbar/>
                    <MobileSidebar/>
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
                                                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                                      d="M9.9193 0.786243L12.1018 2.96874C12.3928 3.25974 12.3928 3.69624 12.1018 3.98724L10.7923 5.29674L7.5913 2.09574L8.9008 0.786243C9.1918 0.495243 9.6283 0.495243 9.9193 0.786243ZM0.898304 8.78874L6.5728 3.11424L9.7738 6.31524L4.0993 11.9897C3.9538 12.1352 3.8083 12.208 3.59005 12.208H1.40755C0.971054 12.208 0.680054 11.917 0.680054 11.4805V9.29799C0.680054 9.07974 0.752804 8.93424 0.898304 8.78874Z"
                                                                      fill="url(#paint0_linear)"/>
                                                                <defs>
                                                                    <linearGradient id="paint0_linear" x1="6.50005"
                                                                                    y1="0.567993" x2="6.50005" y2="12.208"
                                                                                    gradientUnits="userSpaceOnUse">
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
                                                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                                      d="M9.9193 0.786243L12.1018 2.96874C12.3928 3.25974 12.3928 3.69624 12.1018 3.98724L10.7923 5.29674L7.5913 2.09574L8.9008 0.786243C9.1918 0.495243 9.6283 0.495243 9.9193 0.786243ZM0.898304 8.78874L6.5728 3.11424L9.7738 6.31524L4.0993 11.9897C3.9538 12.1352 3.8083 12.208 3.59005 12.208H1.40755C0.971054 12.208 0.680054 11.917 0.680054 11.4805V9.29799C0.680054 9.07974 0.752804 8.93424 0.898304 8.78874Z"
                                                                      fill="url(#paint0_linear)"/>
                                                                <defs>
                                                                    <linearGradient id="paint0_linear" x1="6.50005"
                                                                                    y1="0.567993" x2="6.50005" y2="12.208"
                                                                                    gradientUnits="userSpaceOnUse">
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
                                            <label htmlFor="">
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M16.5 0H1.5C0.67125 0 0 0.67125 0 1.5V16.5C0 17.3288 0.67125 18 1.5 18H9.75V11.25H7.5V8.25H9.75V6.30975C9.75 3.98475 11.1697 2.71875 13.2442 2.71875C14.238 2.71875 15.0915 2.793 15.3405 2.826V5.256L13.902 5.25675C12.774 5.25675 12.5557 5.793 12.5557 6.579V8.25H15.8857L15.1357 11.25H12.5557V18H16.5C17.3287 18 18 17.3288 18 16.5V1.5C18 0.67125 17.3287 0 16.5 0Z" fill="#444460"/>
                                                </svg>&nbsp;&nbsp;
                                                FACEBOOK:
                                            </label>
                                            <input className="uni-input md" type="text"/>
                                            <label htmlFor="">
                                                <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.40619 0.054C6.36619 0.0105 6.67294 0 9.11719 0C11.5614 0 11.8682 0.0105 12.8282 0.054C14.2907 0.12075 15.5754 0.47925 16.6067 1.5105C17.6379 2.54175 17.9964 3.8265 18.0632 5.289C18.1067 6.249 18.1172 6.55575 18.1172 9C18.1172 11.4443 18.1067 11.751 18.0632 12.711C17.9964 14.1735 17.6379 15.4583 16.6067 16.4895C15.5754 17.5208 14.2907 17.8792 12.8282 17.946C11.8682 17.9895 11.5614 18 9.11719 18C6.67294 18 6.36619 17.9895 5.40619 17.946C3.94369 17.8792 2.65894 17.5208 1.62769 16.4895C0.596437 15.4583 0.237937 14.1735 0.171187 12.711C0.127688 11.751 0.117188 11.4443 0.117188 9C0.117188 6.55575 0.127688 6.249 0.171187 5.289C0.237937 3.8265 0.596437 2.54175 1.62769 1.5105C2.65894 0.47925 3.94369 0.12075 5.40619 0.054ZM12.7539 1.674C11.8052 1.6305 11.5202 1.6215 9.11719 1.6215C6.71419 1.6215 6.42919 1.6305 5.48044 1.674C4.45594 1.7205 3.50569 1.926 2.77444 2.65725C2.04319 3.3885 1.83769 4.33875 1.79119 5.36325C1.74769 6.312 1.73869 6.597 1.73869 9C1.73869 11.403 1.74769 11.688 1.79119 12.6368C1.83769 13.6613 2.04319 14.6115 2.77444 15.3427C3.50569 16.074 4.45594 16.2795 5.48044 16.326C6.42919 16.3695 6.71419 16.3785 9.11719 16.3785C11.5202 16.3785 11.8052 16.3695 12.7539 16.326C13.7784 16.2795 14.7287 16.074 15.4599 15.3427C16.1912 14.6115 16.3967 13.6613 16.4432 12.6368C16.4867 11.688 16.4957 11.403 16.4957 9C16.4957 6.597 16.4867 6.312 16.4432 5.36325C16.3967 4.33875 16.1912 3.3885 15.4599 2.65725C14.7287 1.926 13.7784 1.7205 12.7539 1.674ZM4.49566 9C4.49566 6.44775 6.56491 4.3785 9.11716 4.3785C11.6694 4.3785 13.7387 6.44775 13.7387 9C13.7387 11.5522 11.6694 13.6215 9.11716 13.6215C6.56491 13.6215 4.49566 11.5522 4.49566 9ZM6.11717 9C6.11717 10.6567 7.46042 12 9.11717 12C10.7739 12 12.1172 10.6567 12.1172 9C12.1172 7.34325 10.7739 6 9.11717 6C7.46042 6 6.11717 7.34325 6.11717 9ZM15.0017 4.1955C15.0017 4.79197 14.5182 5.2755 13.9217 5.2755C13.3252 5.2755 12.8417 4.79197 12.8417 4.1955C12.8417 3.59903 13.3252 3.1155 13.9217 3.1155C14.5182 3.1155 15.0017 3.59903 15.0017 4.1955Z" fill="#444460"/>
                                                </svg> &nbsp;&nbsp;
                                                INSTAGRAM:
                                            </label>
                                            <input className="uni-input md" type="text"/>
                                        </div>
                                    </div>
                                    <div className="col col-md-4 col-lg-4 col-sm-12 col-xs-12">
                                        <h3>Información</h3>
                                        <div>
                                            <label htmlFor="">PROVINCIA:</label>
                                            <Select className="cstm-select"/>
                                            <label htmlFor="">CANTON:</label>
                                            <Select className="cstm-select"/>
                                            <label htmlFor="">DISTRITO:</label>
                                            <Select className="cstm-select"/>
                                            <label htmlFor="">BARRIO:</label>
                                            <Select className="cstm-select"/>
                                            <label htmlFor="">DIRECciÓn::</label>
                                            <textarea className="uni-input tarea" name="" id="" cols="30" rows="10"></textarea>
                                        </div>
                                        <div className="text-center">
                                            <button className="btn-theme">GUARDAR</button>
                                        </div>
                                    </div>
                                    <div className="col col-md-4 col-lg-4 col-sm-12 col-xs-12">
                                        <h3 style={{marginBottom: '55px'}}>Horario</h3>
                                        <div className="hor-inline">
                                            <Checkbox
                                                onChange={this.checkboxChangeHandler} checked={this.state.checked} className={""}
                                            /> <label htmlFor="" className="chk-label">Lunes</label>
                                            <div className="time-block">
                                                <Select className="cstm-select mini float-left"/>
                                                <span className="dash">-</span>
                                                <Select className="cstm-select mini float-right"/>
                                            </div>
                                        </div>
                                        <div className="hor-inline">
                                            <Checkbox
                                                onChange={this.checkboxChangeHandler} checked={this.state.checked} className={""}
                                            /> <label htmlFor="" className="chk-label">Lunes</label>
                                            <div className="time-block">
                                                <Select className="cstm-select mini float-left"/>
                                                <span className="dash">-</span>
                                                <Select className="cstm-select mini float-right"/>
                                            </div>
                                        </div>
                                        <div className="hor-inline">
                                            <Checkbox
                                                onChange={this.checkboxChangeHandler} checked={this.state.checked} className={""}
                                            /> <label htmlFor="" className="chk-label">Lunes</label>
                                            <div className="time-block">
                                                <Select className="cstm-select mini float-left"/>
                                                <span className="dash">-</span>
                                                <Select className="cstm-select mini float-right"/>
                                            </div>
                                        </div>
                                        <div className="hor-inline">
                                            <Checkbox
                                                onChange={this.checkboxChangeHandler} checked={this.state.checked} className={""}
                                            /> <label htmlFor="" className="chk-label">Lunes</label>
                                            <div className="time-block">
                                                <Select className="cstm-select mini float-left"/>
                                                <span className="dash">-</span>
                                                <Select className="cstm-select mini float-right"/>
                                            </div>
                                        </div>
                                        <div className="hor-inline">
                                            <Checkbox
                                                onChange={this.checkboxChangeHandler} checked={this.state.checked} className={""}
                                            /> <label htmlFor="" className="chk-label">Lunes</label>
                                            <div className="time-block">
                                                <Select className="cstm-select mini float-left"/>
                                                <span className="dash">-</span>
                                                <Select className="cstm-select mini float-right"/>
                                            </div>
                                        </div>
                                        <div className="hor-inline">
                                            <Checkbox
                                                onChange={this.checkboxChangeHandler} checked={this.state.checked} className={""}
                                            /> <label htmlFor="" className="chk-label">Lunes</label>
                                            <div className="time-block">
                                                <Select className="cstm-select mini float-left"/>
                                                <span className="dash">-</span>
                                                <Select className="cstm-select mini float-right"/>
                                            </div>
                                        </div>
                                        <div className="hor-inline">
                                            <Checkbox
                                                onChange={this.checkboxChangeHandler} checked={this.state.checked} className={""}
                                            /> <label htmlFor="" className="chk-label">Lunes</label>
                                            <div className="time-block">
                                                <Select className="cstm-select mini float-left"/>
                                                <span className="dash">-</span>
                                                <Select className="cstm-select mini float-right"/>
                                            </div>
                                        </div>
                                        <div className="hor-inline">
                                            <Checkbox
                                                onChange={this.checkboxChangeHandler} checked={this.state.checked} className={""}
                                            /> <label htmlFor="" className="chk-label">Lunes</label>
                                            <div className="time-block">
                                                <Select className="cstm-select mini float-left"/>
                                                <span className="dash">-</span>
                                                <Select className="cstm-select mini float-right"/>
                                            </div>
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
}

export default ModifyRestaurant