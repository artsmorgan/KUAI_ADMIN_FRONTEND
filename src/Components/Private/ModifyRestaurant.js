import React from 'react';
import Select from 'react-select';
import Checkbox from '@opuscapita/react-checkbox';
import SimpleReactValidator from 'simple-react-validator';
import Loader from 'react-loader-spinner'

import Navbar from "./Child/Fixed/Navbar/Navbar";
import Sidebar from "./Child/Fixed/Sidebar/Sidebar";
import MobileSidebar from "./Child/Fixed/Sidebar/MobileSidebar";
import MobileNavbar from "./Child/Fixed/Navbar/MobileNavbar";
import * as APITools from '../../util/api'
/*const optionProvince = [
    {value: "chocolate", label: "Chocolate"},
    {value: "strawberry", label: "Strawberry"},
    {value: "vanilla", label: "Vanilla"},
];*/

const endpointURL = process.env.REACT_APP_API_ENDPOINT + ":" + process.env.REACT_APP_API_PORT

class ModifyRestaurant extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            checked: false,
            horario0: false,
            horario1: false,

            submitLoading: false,
            dataToPost: {
                nombre: '',
                administrador: '',
                provincia: '',
                canton: '',
                distrito: '',
                barrio: '',
                direccion: ''
            }

        }
        this.checkboxChangeHandler = this.checkboxChangeHandler.bind(this);

        SimpleReactValidator.addLocale('es', {
            required: 'este campo es requerido'
        });

        this.validator = new SimpleReactValidator({
            locale: 'es',
            autoForceUpdate: this
        });

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

    checkboxChangeHandler = (e) => {
        console.log(e.target.name)
        // this.setState({ checked: this.state.checked ? false : true });
        this.setState({[e.target.name]: !this.state[e.target.name]});
    };


    handleSuccess(msg) {
        this.key = this.props.enqueueSnackbar(msg, {
            variant: 'success',
            autoHideDuration: 3000,
        });
    }

    handleError(msg) {
        this.key = this.props.enqueueSnackbar(msg, {
            variant: 'error',
            autoHideDuration: 3000,
        });
    }

    inputChangeHandler = (e) => {
        let obj = this.state.dataToPost;
        console.log(obj)
        console.log(e)
        obj[e.target.name] = e.target.value;
        this.setState({dataToPost: obj});
    };

    selectChangeHandler = (e) => {
        let obj = this.state.dataToPost;
        console.log(obj)
        console.log(e)
        obj[e.name] = e.value;
        this.setState({dataToPost: obj});
    };

    formSubmitHandler = (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            this.showAndHideSubmitLoader()
        } else {
            this.validator.showMessages();
        }
    };

    showAndHideSubmitLoader() {
        this.setState({submitLoading: true});
        setTimeout(() => {
            this.setState({submitLoading: false});
            this.processSubmit();
        }, 1000);
    }

    processSubmit() {
        const url = endpointURL // dummy
        const headers = {
            'Content-Type': 'application/json, charset=UTF-8', // dummy
        };
        // const data = this.state.dataToPost;
        // dummy
        const data = JSON.stringify({
            title: 'foo',
            body: 'bar',
            userId: 1
        })

        // API calling and handling response
        const res = APITools.postEndPointsHandler(url, data, headers)

        res.then(result => {
            console.log(result)
            if (result.status === 201) {
                this.handleSuccess("Login success.")
                this.props.history.push('/orders')
            }
        }).catch(err => {
            this.handleError(err)
        })
    }

    render() {
        const {width} = this.state
        const optionProvince = [
            {value: "chocolate", label: "Chocolate", name: "province"},
            {value: "strawberry", label: "Strawberry", name: "province"},
            {value: "vanilla", label: "Vanilla", name: "province"},
        ];
        const optionCanton = [
            {value: "chocolate", label: "Chocolate", name: "canton"},
            {value: "strawberry", label: "Strawberry", name: "canton"},
            {value: "vanilla", label: "Vanilla", name: "canton"},
        ];
        const optionDistrito = [
            {value: "chocolate", label: "Chocolate", name: "distrito"},
            {value: "strawberry", label: "Strawberry", name: "distrito"},
            {value: "vanilla", label: "Vanilla", name: "distrito"},
        ];
        const optionBarrio = [
            {value: "chocolate", label: "Chocolate", name: "barrio"},
            {value: "strawberry", label: "Strawberry", name: "barrio"},
            {value: "vanilla", label: "Vanilla", name: "barrio"},
        ];

        if (width > 1024) {
            return (
                <>
                    <Navbar/>
                    <Sidebar/>
                    <div className="wrapper">
                        <div className="flex-area conten container-fluid">
                            <div className="mod-rest-container">
                                <form onSubmit={this.formSubmitHandler}>
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
                                                                <svg width="13" height="13" viewBox="0 0 13 13"
                                                                     fill="none"
                                                                     xmlns="http://www.w3.org/2000/svg">
                                                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                                                          d="M9.9193 0.786243L12.1018 2.96874C12.3928 3.25974 12.3928 3.69624 12.1018 3.98724L10.7923 5.29674L7.5913 2.09574L8.9008 0.786243C9.1918 0.495243 9.6283 0.495243 9.9193 0.786243ZM0.898304 8.78874L6.5728 3.11424L9.7738 6.31524L4.0993 11.9897C3.9538 12.1352 3.8083 12.208 3.59005 12.208H1.40755C0.971054 12.208 0.680054 11.917 0.680054 11.4805V9.29799C0.680054 9.07974 0.752804 8.93424 0.898304 8.78874Z"
                                                                          fill="url(#paint0_linear)"/>
                                                                    <defs>
                                                                        <linearGradient id="paint0_linear" x1="6.50005"
                                                                                        y1="0.567993" x2="6.50005"
                                                                                        y2="12.208"
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
                                                                <svg width="13" height="13" viewBox="0 0 13 13"
                                                                     fill="none"
                                                                     xmlns="http://www.w3.org/2000/svg">
                                                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                                                          d="M9.9193 0.786243L12.1018 2.96874C12.3928 3.25974 12.3928 3.69624 12.1018 3.98724L10.7923 5.29674L7.5913 2.09574L8.9008 0.786243C9.1918 0.495243 9.6283 0.495243 9.9193 0.786243ZM0.898304 8.78874L6.5728 3.11424L9.7738 6.31524L4.0993 11.9897C3.9538 12.1352 3.8083 12.208 3.59005 12.208H1.40755C0.971054 12.208 0.680054 11.917 0.680054 11.4805V9.29799C0.680054 9.07974 0.752804 8.93424 0.898304 8.78874Z"
                                                                          fill="url(#paint0_linear)"/>
                                                                    <defs>
                                                                        <linearGradient id="paint0_linear" x1="6.50005"
                                                                                        y1="0.567993" x2="6.50005"
                                                                                        y2="12.208"
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
                                                <input className="uni-input" type="text" name="nombre"
                                                       placeholder="nombre"
                                                       onChange={this.inputChangeHandler}
                                                       value={this.state.dataToPost.nombre}/>
                                                <p style={{color: "red"}}>
                                                    {this.validator.message('nombre', this.state.dataToPost.nombre, 'required')}
                                                </p>
                                                <label htmlFor="">ADMINISTRADOR:</label>
                                                <input className="uni-input" type="text" name="administrador"
                                                       placeholder="administrador"
                                                       onChange={this.inputChangeHandler}
                                                       value={this.state.dataToPost.administrador}/>
                                                <p style={{color: "red"}}>
                                                    {this.validator.message('administrador', this.state.dataToPost.administrador, 'required')}
                                                </p>
                                                <label htmlFor="">
                                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M16.5 0H1.5C0.67125 0 0 0.67125 0 1.5V16.5C0 17.3288 0.67125 18 1.5 18H9.75V11.25H7.5V8.25H9.75V6.30975C9.75 3.98475 11.1697 2.71875 13.2442 2.71875C14.238 2.71875 15.0915 2.793 15.3405 2.826V5.256L13.902 5.25675C12.774 5.25675 12.5557 5.793 12.5557 6.579V8.25H15.8857L15.1357 11.25H12.5557V18H16.5C17.3287 18 18 17.3288 18 16.5V1.5C18 0.67125 17.3287 0 16.5 0Z"
                                                            fill="#444460"/>
                                                    </svg>
                                                    &nbsp;&nbsp;
                                                    FACEBOOK:
                                                </label>
                                                <input className="uni-input md" type="text" name="facebook"
                                                       placeholder="facebook"
                                                       onChange={this.inputChangeHandler}
                                                       value={this.state.dataToPost.facebook}/>
                                                <p style={{color: "red"}}>
                                                    {this.validator.message('facebook', this.state.dataToPost.facebook, 'required')}
                                                </p>
                                                <label htmlFor="">
                                                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                                              d="M5.40619 0.054C6.36619 0.0105 6.67294 0 9.11719 0C11.5614 0 11.8682 0.0105 12.8282 0.054C14.2907 0.12075 15.5754 0.47925 16.6067 1.5105C17.6379 2.54175 17.9964 3.8265 18.0632 5.289C18.1067 6.249 18.1172 6.55575 18.1172 9C18.1172 11.4443 18.1067 11.751 18.0632 12.711C17.9964 14.1735 17.6379 15.4583 16.6067 16.4895C15.5754 17.5208 14.2907 17.8792 12.8282 17.946C11.8682 17.9895 11.5614 18 9.11719 18C6.67294 18 6.36619 17.9895 5.40619 17.946C3.94369 17.8792 2.65894 17.5208 1.62769 16.4895C0.596437 15.4583 0.237937 14.1735 0.171187 12.711C0.127688 11.751 0.117188 11.4443 0.117188 9C0.117188 6.55575 0.127688 6.249 0.171187 5.289C0.237937 3.8265 0.596437 2.54175 1.62769 1.5105C2.65894 0.47925 3.94369 0.12075 5.40619 0.054ZM12.7539 1.674C11.8052 1.6305 11.5202 1.6215 9.11719 1.6215C6.71419 1.6215 6.42919 1.6305 5.48044 1.674C4.45594 1.7205 3.50569 1.926 2.77444 2.65725C2.04319 3.3885 1.83769 4.33875 1.79119 5.36325C1.74769 6.312 1.73869 6.597 1.73869 9C1.73869 11.403 1.74769 11.688 1.79119 12.6368C1.83769 13.6613 2.04319 14.6115 2.77444 15.3427C3.50569 16.074 4.45594 16.2795 5.48044 16.326C6.42919 16.3695 6.71419 16.3785 9.11719 16.3785C11.5202 16.3785 11.8052 16.3695 12.7539 16.326C13.7784 16.2795 14.7287 16.074 15.4599 15.3427C16.1912 14.6115 16.3967 13.6613 16.4432 12.6368C16.4867 11.688 16.4957 11.403 16.4957 9C16.4957 6.597 16.4867 6.312 16.4432 5.36325C16.3967 4.33875 16.1912 3.3885 15.4599 2.65725C14.7287 1.926 13.7784 1.7205 12.7539 1.674ZM4.49566 9C4.49566 6.44775 6.56491 4.3785 9.11716 4.3785C11.6694 4.3785 13.7387 6.44775 13.7387 9C13.7387 11.5522 11.6694 13.6215 9.11716 13.6215C6.56491 13.6215 4.49566 11.5522 4.49566 9ZM6.11717 9C6.11717 10.6567 7.46042 12 9.11717 12C10.7739 12 12.1172 10.6567 12.1172 9C12.1172 7.34325 10.7739 6 9.11717 6C7.46042 6 6.11717 7.34325 6.11717 9ZM15.0017 4.1955C15.0017 4.79197 14.5182 5.2755 13.9217 5.2755C13.3252 5.2755 12.8417 4.79197 12.8417 4.1955C12.8417 3.59903 13.3252 3.1155 13.9217 3.1155C14.5182 3.1155 15.0017 3.59903 15.0017 4.1955Z"
                                                              fill="#444460"/>
                                                    </svg>
                                                    &nbsp;&nbsp;
                                                    INSTAGRAM:
                                                </label>
                                                <input className="uni-input md" type="text" name="instagram"
                                                       placeholder="instagram"
                                                       onChange={this.inputChangeHandler}
                                                       value={this.state.dataToPost.instagram}/>
                                                <p style={{color: "red"}}>
                                                    {this.validator.message('instagram', this.state.dataToPost.instagram, 'required')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col col-md-4 col-lg-4 col-sm-12 col-xs-12">
                                            <h3>Información</h3>
                                            <div>
                                                <label htmlFor="">PROVINCIA:</label>
                                                <Select className="cstm-select" options={optionProvince}
                                                        name="provincia" placeholder="Provincia"
                                                        onChange={this.selectChangeHandler}
                                                        value={this.state.dataToPost.provincia}/>
                                                <p style={{color: "red"}}>
                                                    {this.validator.message('provincia', this.state.dataToPost.provincia, 'required')}
                                                </p>
                                                <label htmlFor="">CANTON:</label>
                                                <Select className="cstm-select" options={optionCanton} name="canton"
                                                        placeholder="Canton"
                                                        onChange={this.selectChangeHandler}
                                                        value={this.state.dataToPost.canton}/>
                                                <p style={{color: "red"}}>
                                                    {this.validator.message('canton', this.state.dataToPost.canton, 'required')}
                                                </p>
                                                <label htmlFor="">DISTRITO:</label>
                                                <Select className="cstm-select" options={optionDistrito} name="distrito"
                                                        placeholder="Distrito"
                                                        onChange={this.selectChangeHandler}
                                                        value={this.state.dataToPost.distrito}/>
                                                <p style={{color: "red"}}>
                                                    {this.validator.message('distrito', this.state.dataToPost.distrito, 'required')}
                                                </p>
                                                <label htmlFor="">BARRIO:</label>
                                                <Select className="cstm-select" options={optionBarrio} name="barrio"
                                                        placeholder="Barrio"
                                                        onChange={this.selectChangeHandler}
                                                        value={this.state.dataToPost.barrio}/>
                                                <p style={{color: "red"}}>
                                                    {this.validator.message('barrio', this.state.dataToPost.barrio, 'required')}
                                                </p>
                                                <label htmlFor="">Direccion:</label>
                                                <textarea className="uni-input tarea" name="direccion"
                                                          placeholder="Direccion"
                                                          onChange={this.inputChangeHandler}
                                                          value={this.state.dataToPost.direccion} id="" cols="30"
                                                          rows="10"></textarea>
                                                <p style={{color: "red"}}>
                                                    {this.validator.message('direccion', this.state.dataToPost.direccion, 'required')}
                                                </p>
                                            </div>
                                            <div className="text-center">
                                                <button className="btn-theme">GUARDAR</button>
                                            </div>
                                        </div>
                                        <div className="col col-md-4 col-lg-4 col-sm-12 col-xs-12">
                                            <h3 style={{marginBottom: '55px'}}>Horario</h3>
                                            <div className="hor-inline">
                                                <Checkbox
                                                    onChange={this.checkboxChangeHandler} name="horario0" value="0"
                                                    checked={this.state.horario0} className={""}
                                                /> <label htmlFor="" className="chk-label">Lunes</label>
                                                <div className="time-block">
                                                    <Select className="cstm-select mini float-left"/>
                                                    <span className="dash">-</span>
                                                    <Select className="cstm-select mini float-right"/>
                                                </div>
                                            </div>
                                            <div className="hor-inline">
                                                <Checkbox
                                                    onChange={this.checkboxChangeHandler} name="horario1" value="1"
                                                    checked={this.state.horario1} className={"horario-1"}
                                                /> <label htmlFor="horario-1" className="chk-label">Lunes</label>
                                                <div className="time-block">
                                                    <Select className="cstm-select mini float-left"/>
                                                    <span className="dash">-</span>
                                                    <Select className="cstm-select mini float-right"/>
                                                </div>
                                            </div>
                                            <div className="hor-inline">
                                                <Checkbox
                                                    onChange={this.checkboxChangeHandler} name="horario-2"
                                                    checked={this.state.checked} className={""}
                                                /> <label htmlFor="horario-2" className="chk-label">Lunes</label>
                                                <div className="time-block">
                                                    <Select className="cstm-select mini float-left"/>
                                                    <span className="dash">-</span>
                                                    <Select className="cstm-select mini float-right"/>
                                                </div>
                                            </div>
                                            <div className="hor-inline">
                                                <Checkbox
                                                    onChange={this.checkboxChangeHandler} checked={this.state.checked}
                                                    className={""}
                                                /> <label htmlFor="" className="chk-label">Lunes</label>
                                                <div className="time-block">
                                                    <Select className="cstm-select mini float-left"/>
                                                    <span className="dash">-</span>
                                                    <Select className="cstm-select mini float-right"/>
                                                </div>
                                            </div>
                                            <div className="hor-inline">
                                                <Checkbox
                                                    onChange={this.checkboxChangeHandler} checked={this.state.checked}
                                                    className={""}
                                                /> <label htmlFor="" className="chk-label">Lunes</label>
                                                <div className="time-block">
                                                    <Select className="cstm-select mini float-left"/>
                                                    <span className="dash">-</span>
                                                    <Select className="cstm-select mini float-right"/>
                                                </div>
                                            </div>
                                            <div className="hor-inline">
                                                <Checkbox
                                                    onChange={this.checkboxChangeHandler} checked={this.state.checked}
                                                    className={""}
                                                /> <label htmlFor="" className="chk-label">Lunes</label>
                                                <div className="time-block">
                                                    <Select className="cstm-select mini float-left"/>
                                                    <span className="dash">-</span>
                                                    <Select className="cstm-select mini float-right"/>
                                                </div>
                                            </div>
                                            <div className="hor-inline">
                                                <Checkbox
                                                    onChange={this.checkboxChangeHandler} checked={this.state.checked}
                                                    className={""}
                                                /> <label htmlFor="" className="chk-label">Lunes</label>
                                                <div className="time-block">
                                                    <Select className="cstm-select mini float-left"/>
                                                    <span className="dash">-</span>
                                                    <Select className="cstm-select mini float-right"/>
                                                </div>
                                            </div>
                                            <div className="hor-inline">
                                                <Checkbox
                                                    onChange={this.checkboxChangeHandler} checked={this.state.checked}
                                                    className={""}
                                                /> <label htmlFor="" className="chk-label">Lunes</label>
                                                <div className="time-block">
                                                    <Select className="cstm-select mini float-left"/>
                                                    <span className="dash">-</span>
                                                    <Select className="cstm-select mini float-right"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <MobileNavbar/>
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
                                                                                    y1="0.567993" x2="6.50005"
                                                                                    y2="12.208"
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
                                                                                    y1="0.567993" x2="6.50005"
                                                                                    y2="12.208"
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
                                            <input className="uni-input" type="text" name="nombre" placeholder="nombre"
                                                   onChange={this.inputChangeHandler}
                                                   value={this.state.dataToPost.nombre}/>
                                            <p style={{color: "red"}}>
                                                {this.validator.message('nombre', this.state.dataToPost.nombre, 'required')}
                                            </p>
                                            <label htmlFor="">ADMINISTRADOR:</label>
                                            <input className="uni-input" type="text" name="administrador"
                                                   placeholder="administrador"
                                                   onChange={this.inputChangeHandler}
                                                   value={this.state.dataToPost.administrador}/>
                                            <p style={{color: "red"}}>
                                                {this.validator.message('administrador', this.state.dataToPost.administrador, 'required')}
                                            </p>
                                            <label htmlFor="">
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M16.5 0H1.5C0.67125 0 0 0.67125 0 1.5V16.5C0 17.3288 0.67125 18 1.5 18H9.75V11.25H7.5V8.25H9.75V6.30975C9.75 3.98475 11.1697 2.71875 13.2442 2.71875C14.238 2.71875 15.0915 2.793 15.3405 2.826V5.256L13.902 5.25675C12.774 5.25675 12.5557 5.793 12.5557 6.579V8.25H15.8857L15.1357 11.25H12.5557V18H16.5C17.3287 18 18 17.3288 18 16.5V1.5C18 0.67125 17.3287 0 16.5 0Z"
                                                        fill="#444460"/>
                                                </svg>
                                                &nbsp;&nbsp;
                                                FACEBOOK:
                                            </label>
                                            <input className="uni-input md" type="text" name="facebook"
                                                   placeholder="facebook"
                                                   onChange={this.inputChangeHandler}
                                                   value={this.state.dataToPost.facebook}/>
                                            <p style={{color: "red"}}>
                                                {this.validator.message('facebook', this.state.dataToPost.facebook, 'required')}
                                            </p>
                                            <label htmlFor="">
                                                <svg width="19" height="18" viewBox="0 0 19 18" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                                          d="M5.40619 0.054C6.36619 0.0105 6.67294 0 9.11719 0C11.5614 0 11.8682 0.0105 12.8282 0.054C14.2907 0.12075 15.5754 0.47925 16.6067 1.5105C17.6379 2.54175 17.9964 3.8265 18.0632 5.289C18.1067 6.249 18.1172 6.55575 18.1172 9C18.1172 11.4443 18.1067 11.751 18.0632 12.711C17.9964 14.1735 17.6379 15.4583 16.6067 16.4895C15.5754 17.5208 14.2907 17.8792 12.8282 17.946C11.8682 17.9895 11.5614 18 9.11719 18C6.67294 18 6.36619 17.9895 5.40619 17.946C3.94369 17.8792 2.65894 17.5208 1.62769 16.4895C0.596437 15.4583 0.237937 14.1735 0.171187 12.711C0.127688 11.751 0.117188 11.4443 0.117188 9C0.117188 6.55575 0.127688 6.249 0.171187 5.289C0.237937 3.8265 0.596437 2.54175 1.62769 1.5105C2.65894 0.47925 3.94369 0.12075 5.40619 0.054ZM12.7539 1.674C11.8052 1.6305 11.5202 1.6215 9.11719 1.6215C6.71419 1.6215 6.42919 1.6305 5.48044 1.674C4.45594 1.7205 3.50569 1.926 2.77444 2.65725C2.04319 3.3885 1.83769 4.33875 1.79119 5.36325C1.74769 6.312 1.73869 6.597 1.73869 9C1.73869 11.403 1.74769 11.688 1.79119 12.6368C1.83769 13.6613 2.04319 14.6115 2.77444 15.3427C3.50569 16.074 4.45594 16.2795 5.48044 16.326C6.42919 16.3695 6.71419 16.3785 9.11719 16.3785C11.5202 16.3785 11.8052 16.3695 12.7539 16.326C13.7784 16.2795 14.7287 16.074 15.4599 15.3427C16.1912 14.6115 16.3967 13.6613 16.4432 12.6368C16.4867 11.688 16.4957 11.403 16.4957 9C16.4957 6.597 16.4867 6.312 16.4432 5.36325C16.3967 4.33875 16.1912 3.3885 15.4599 2.65725C14.7287 1.926 13.7784 1.7205 12.7539 1.674ZM4.49566 9C4.49566 6.44775 6.56491 4.3785 9.11716 4.3785C11.6694 4.3785 13.7387 6.44775 13.7387 9C13.7387 11.5522 11.6694 13.6215 9.11716 13.6215C6.56491 13.6215 4.49566 11.5522 4.49566 9ZM6.11717 9C6.11717 10.6567 7.46042 12 9.11717 12C10.7739 12 12.1172 10.6567 12.1172 9C12.1172 7.34325 10.7739 6 9.11717 6C7.46042 6 6.11717 7.34325 6.11717 9ZM15.0017 4.1955C15.0017 4.79197 14.5182 5.2755 13.9217 5.2755C13.3252 5.2755 12.8417 4.79197 12.8417 4.1955C12.8417 3.59903 13.3252 3.1155 13.9217 3.1155C14.5182 3.1155 15.0017 3.59903 15.0017 4.1955Z"
                                                          fill="#444460"/>
                                                </svg>
                                                &nbsp;&nbsp;
                                                INSTAGRAM:
                                            </label>
                                            <input className="uni-input md" type="text" name="instagram"
                                                   placeholder="instagram"
                                                   onChange={this.inputChangeHandler}
                                                   value={this.state.dataToPost.instagram}/>
                                            <p style={{color: "red"}}>
                                                {this.validator.message('instagram', this.state.dataToPost.instagram, 'required')}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col col-md-4 col-lg-4 col-sm-12 col-xs-12">
                                        <h3>Información</h3>
                                        <div>
                                            <label htmlFor="">PROVINCIA:</label>
                                            <Select className="cstm-select" options={optionProvince} name="provincia"
                                                    placeholder="Provincia"
                                                    onChange={this.selectChangeHandler}
                                                    value={this.state.dataToPost.provincia}/>
                                            <p style={{color: "red"}}>
                                                {this.validator.message('provincia', this.state.dataToPost.provincia, 'required')}
                                            </p>
                                            <label htmlFor="">CANTON:</label>
                                            <Select className="cstm-select" name="canton" placeholder="Canton"
                                                    onChange={this.selectChangeHandler}
                                                    value={this.state.dataToPost.canton}/>
                                            <p style={{color: "red"}}>
                                                {this.validator.message('canton', this.state.dataToPost.canton, 'required')}
                                            </p>
                                            <label htmlFor="">DISTRITO:</label>
                                            <Select className="cstm-select" options={optionDistrito} name="distrito"
                                                    placeholder="Distrito"
                                                    onChange={this.selectChangeHandler}
                                                    value={this.state.dataToPost.distrito}/>
                                            <p style={{color: "red"}}>
                                                {this.validator.message('distrito', this.state.dataToPost.distrito, 'required')}
                                            </p>
                                            <label htmlFor="">BARRIO:</label>
                                            <Select className="cstm-select" name="barrio" placeholder="Barrio"
                                                    onChange={this.selectChangeHandler}
                                                    value={this.state.dataToPost.barrio}/>
                                            <p style={{color: "red"}}>
                                                {this.validator.message('barrio', this.state.dataToPost.barrio, 'required')}
                                            </p>
                                            <label htmlFor="">DIRECciÓn::</label>
                                            <textarea className="uni-input tarea" name="direccion"
                                                      placeholder="Direccion"
                                                      onChange={this.inputChangeHandler}
                                                      value={this.state.dataToPost.direccion} id="" cols="30"
                                                      rows="10"></textarea>
                                            <p style={{color: "red"}}>
                                                {this.validator.message('direccion', this.state.dataToPost.direccion, 'required')}
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <button className="btn-theme">GUARDAR</button>
                                        </div>
                                    </div>
                                    <div className="col col-md-4 col-lg-4 col-sm-12 col-xs-12">
                                        <h3 style={{marginBottom: '55px'}}>Horario</h3>
                                        <div className="hor-inline">
                                            <Checkbox
                                                onChange={this.checkboxChangeHandler} checked={this.state.checked}
                                                className={""}
                                            /> <label htmlFor="" className="chk-label">Lunes</label>
                                            <div className="time-block">
                                                <Select className="cstm-select mini float-left"/>
                                                <span className="dash">-</span>
                                                <Select className="cstm-select mini float-right"/>
                                            </div>
                                        </div>
                                        <div className="hor-inline">
                                            <Checkbox
                                                onChange={this.checkboxChangeHandler} checked={this.state.checked}
                                                className={""}
                                            /> <label htmlFor="" className="chk-label">Lunes</label>
                                            <div className="time-block">
                                                <Select className="cstm-select mini float-left"/>
                                                <span className="dash">-</span>
                                                <Select className="cstm-select mini float-right"/>
                                            </div>
                                        </div>
                                        <div className="hor-inline">
                                            <Checkbox
                                                onChange={this.checkboxChangeHandler} checked={this.state.checked}
                                                className={""}
                                            /> <label htmlFor="" className="chk-label">Lunes</label>
                                            <div className="time-block">
                                                <Select className="cstm-select mini float-left"/>
                                                <span className="dash">-</span>
                                                <Select className="cstm-select mini float-right"/>
                                            </div>
                                        </div>
                                        <div className="hor-inline">
                                            <Checkbox
                                                onChange={this.checkboxChangeHandler} checked={this.state.checked}
                                                className={""}
                                            /> <label htmlFor="" className="chk-label">Lunes</label>
                                            <div className="time-block">
                                                <Select className="cstm-select mini float-left"/>
                                                <span className="dash">-</span>
                                                <Select className="cstm-select mini float-right"/>
                                            </div>
                                        </div>
                                        <div className="hor-inline">
                                            <Checkbox
                                                onChange={this.checkboxChangeHandler} checked={this.state.checked}
                                                className={""}
                                            /> <label htmlFor="" className="chk-label">Lunes</label>
                                            <div className="time-block">
                                                <Select className="cstm-select mini float-left"/>
                                                <span className="dash">-</span>
                                                <Select className="cstm-select mini float-right"/>
                                            </div>
                                        </div>
                                        <div className="hor-inline">
                                            <Checkbox
                                                onChange={this.checkboxChangeHandler} checked={this.state.checked}
                                                className={""}
                                            /> <label htmlFor="" className="chk-label">Lunes</label>
                                            <div className="time-block">
                                                <Select className="cstm-select mini float-left"/>
                                                <span className="dash">-</span>
                                                <Select className="cstm-select mini float-right"/>
                                            </div>
                                        </div>
                                        <div className="hor-inline">
                                            <Checkbox
                                                onChange={this.checkboxChangeHandler} checked={this.state.checked}
                                                className={""}
                                            /> <label htmlFor="" className="chk-label">Lunes</label>
                                            <div className="time-block">
                                                <Select className="cstm-select mini float-left"/>
                                                <span className="dash">-</span>
                                                <Select className="cstm-select mini float-right"/>
                                            </div>
                                        </div>
                                        <div className="hor-inline">
                                            <Checkbox
                                                onChange={this.checkboxChangeHandler} checked={this.state.checked}
                                                className={""}
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