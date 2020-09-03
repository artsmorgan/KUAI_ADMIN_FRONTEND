import React from 'react';
import Select from 'react-select';
import { Button, Nav } from 'react-bootstrap';
import Checkbox from '@opuscapita/react-checkbox';
import SimpleReactValidator from 'simple-react-validator';

import Navbar from "./Child/Fixed/Navbar/Navbar";
import Sidebar from "./Child/Fixed/Sidebar/Sidebar";
import * as APITools from '../../util/apiX';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getRestaurantFormData, updateRestaurantFormData } from '../../actions';

const endpointURL = process.env.REACT_APP_API_ENDPOINT + ":" + process.env.REACT_APP_API_PORT

class ModifyRestaurant extends React.Component {

    constructor(props) {
        super(props);
        this.fileUpload = React.createRef();
        this.showFileUpload = this.showFileUpload.bind(this);

        this.state = {
            width: 0,
            mobile: false,
            formTab: {
                generalTab: true,
                informationTab: true,
                scheduleTab: true,
            },
            form: {},
            checked: false,
            horario0: false,

            submitLoading: false,
            dataToPost: {
                name: null,
                administrator: null,
                fb: null,
                ig: null,
                province: null,
                canton: null,
                district: null,
                neighborhood: null,
                otherSigns: null,
                mondayEnable: null,
                mondayOpen: null,
                mondayClose: null,
                tuesdayEnable: null,
                tuesdayOpen: null,
                tuesdayClose: null,
                wednesdayEnable: null,
                wednesdayOpen: null,
                wednesdayClose: null,
                thursdayEnable: null,
                thursdayOpen: null,
                thursdayClose: null,
                fridayEnable: null,
                fridayOpen: null,
                fridayClose: null,
                saturdayEnable: null,
                saturdayOpen: null,
                saturdayClose: null,
                sundayEnable: null,
                sundayOpen: null,
                sundayClose: null,
                owner: null,
            },

        };

        if (props.restaurant.id) {
            const restaurant = props.restaurant;
            this.state.dataToPost =
            {
                name: restaurant.name,
                administrator: restaurant.administrator,
                fb: restaurant.facebook,
                ig: restaurant.instragram,
                province: restaurant.address.province,
                canton: restaurant.address.canton,
                district: restaurant.address.district,
                neighborhood: restaurant.address.neighborhood,
                otherSigns: restaurant.address.otherSigns,
                mondayEnable: restaurant.schedule.monday.enabled,
                mondayOpen: restaurant.schedule.monday.open,
                mondayClose: restaurant.schedule.monday.close,
                tuesdayEnable: restaurant.schedule.tuesday.enabled,
                tuesdayOpen: restaurant.schedule.tuesday.open,
                tuesdayClose: restaurant.schedule.tuesday.close,
                wednesdayEnable: restaurant.schedule.wednesday.enabled,
                wednesdayOpen: restaurant.schedule.wednesday.open,
                wednesdayClose: restaurant.schedule.wednesday.close,
                thursdayEnable: restaurant.schedule.thursday.enabled,
                thursdayOpen: restaurant.schedule.thursday.open,
                thursdayClose: restaurant.schedule.thursday.close,
                fridayEnable: restaurant.schedule.friday.enabled,
                fridayOpen: restaurant.schedule.friday.open,
                fridayClose: restaurant.schedule.friday.close,
                saturdayEnable: restaurant.schedule.saturday.enabled,
                saturdayOpen: restaurant.schedule.saturday.open,
                saturdayClose: restaurant.schedule.saturday.close,
                sundayEnable: restaurant.schedule.sunday.enabled,
                sundayOpen: restaurant.schedule.sunday.open,
                sundayClose: restaurant.schedule.sunday.close,
                owner: restaurant.owner,
                id: restaurant.id
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
    }

    checkboxChangeHandler = (e) => {
        let obj = this.state.dataToPost;
        obj[e.target.name] = !obj[e.target.name];
        this.setState({ dataToPost: obj });
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
        obj[e.target.name] = e.target.value;
        this.setState({ dataToPost: obj });
    };

    selectChangeHandler = (e, fieldName) => {
        console.log(fieldName)
        console.log(e.value)
        let obj = this.state.dataToPost;
        obj[fieldName] = e;
        this.setState({ dataToPost: obj });
        console.log(this.state.dataToPost)
    };

    harioCheckboxChangeHandler = (e) => {
        let obj = this.state.dataToPost;
        console.log(e.target)
        obj['horario'][e.target.name]['checkbox'] = !obj['horario'][e.target.name]['checkbox'];
        this.setState({ dataToPost: obj });
    }

    horarioSelectChangeHander = (e, fieldName) => {
        console.log(e)
        console.log(fieldName)
        // let obj = this.state.dataToPost;
        // console.log(!obj['horario'][e.target.name]['checkbox'])
        // console.log(e.target)
        // obj['horario'][e.target.name]['checkbox'] = !obj['horario'][e.target.name]['checkbox']; 
        // this.setState({dataToPost: obj});
    }

    formSubmitHandler = (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            console.log(this.state.dataToPost);
            // return false;
            this.processSubmit();
            // this.showAndHideSubmitLoader()
        } else {
            this.validator.showMessages();
        }
    };

    // showAndHideSubmitLoader() {
    //     this.setState({ submitLoading: true });
    //     setTimeout(() => {
    //         this.setState({ submitLoading: false });
    //         this.processSubmit();
    //     }, 1000);
    // }

    showFileUpload() {
        this.fileUpload.current.click();
    }

    fileUploadOnchange(e) {
        console.log(e.target.files[0])
    }

    processSubmit() {

        this.props.updateRestaurantFormData({ restaurantId: localStorage.getItem('restaurantId'), form: this.state.dataToPost })
    }

    activateTab(e, tabName) {
        let obj = this.state.formTab;
        let alltabs = this.state.formTab;
        if (this.state.mobile) {
            for (const [key, value] of Object.entries(obj)) {
                console.log(key)
                console.log(value)
                console.log(tabName)
                if (key == tabName) {
                    alltabs[key] = true
                } else {
                    alltabs[key] = false
                }
            }

            this.setState({ formTab: alltabs })
        }
    }

    componentDidMount() {
        this.setState({
            width: window.innerWidth
        }, () => {
            if (this.state.width < 1024) {
                let obj = this.state.formTab

                obj.informationTab = false;
                obj.scheduleTab = false

                this.setState({ formTab: obj, mobile: true });
            }
        });

    }

    componentWillMount() {
        this.props.getRestaurantFormData({ restaurantId: localStorage.getItem('restaurantId') })
    }

    componentDidUpdate(previousProps) {

        if (!previousProps.restaurant.id && this.props.restaurant.id) {
            const restaurant = this.props.restaurant;
            this.setState({
                dataToPost: {
                    name: restaurant.name,
                    administrator: restaurant.administrator,
                    fb: restaurant.facebook,
                    ig: restaurant.instragram,
                    province: restaurant.address.province,
                    canton: restaurant.address.canton,
                    district: restaurant.address.district,
                    neighborhood: restaurant.address.neighborhood,
                    otherSigns: restaurant.address.otherSigns,
                    mondayEnable: restaurant.schedule.monday.enabled,
                    mondayOpen: restaurant.schedule.monday.open,
                    mondayClose: restaurant.schedule.monday.close,
                    tuesdayEnable: restaurant.schedule.tuesday.enabled,
                    tuesdayOpen: restaurant.schedule.tuesday.open,
                    tuesdayClose: restaurant.schedule.tuesday.close,
                    wednesdayEnable: restaurant.schedule.wednesday.enabled,
                    wednesdayOpen: restaurant.schedule.wednesday.open,
                    wednesdayClose: restaurant.schedule.wednesday.close,
                    thursdayEnable: restaurant.schedule.thursday.enabled,
                    thursdayOpen: restaurant.schedule.thursday.open,
                    thursdayClose: restaurant.schedule.thursday.close,
                    fridayEnable: restaurant.schedule.friday.enabled,
                    fridayOpen: restaurant.schedule.friday.open,
                    fridayClose: restaurant.schedule.friday.close,
                    saturdayEnable: restaurant.schedule.saturday.enabled,
                    saturdayOpen: restaurant.schedule.saturday.open,
                    saturdayClose: restaurant.schedule.saturday.close,
                    sundayEnable: restaurant.schedule.sunday.enabled,
                    sundayOpen: restaurant.schedule.sunday.open,
                    sundayClose: restaurant.schedule.sunday.close,
                    owner: restaurant.owner,
                    id: restaurant.id
                }
            });
        }
    }



    render() {
        const { width } = this.state
        const optionProvince = [
            { value: "chocolate", label: "Chocolate", name: "province" },
            { value: "strawberry", label: "Strawberry", name: "province" },
            { value: "vanilla", label: "Vanilla", name: "province" },
        ];
        const optionCanton = [
            { value: "chocolate", label: "Chocolate", name: "canton" },
            { value: "strawberry", label: "Strawberry", name: "canton" },
            { value: "vanilla", label: "Vanilla", name: "canton" },
        ];
        const optionDistrito = [
            { value: "chocolate", label: "Chocolate", name: "distrito" },
            { value: "strawberry", label: "Strawberry", name: "distrito" },
            { value: "vanilla", label: "Vanilla", name: "distrito" },
        ];
        const optionBarrio = [
            { value: "chocolate", label: "Chocolate", name: "barrio" },
            { value: "strawberry", label: "Strawberry", name: "barrio" },
            { value: "vanilla", label: "Vanilla", name: "barrio" },
        ];

        const optionTime = [
            { value: "-", label: "select", name: 'time' },
            { value: "8", label: "08.00 am", name: 'time' },
            { value: "9", label: "09.00 am", name: 'time' },
            { value: "10", label: "10.00 am", name: 'time' },
            { value: "11", label: "11.00 am", name: 'time' },
            { value: "12", label: "12.00 am", name: 'time' },
            { value: "13", label: "01.00 pm", name: 'time' },
            { value: "14", label: "02.00 pm", name: 'time' },
            { value: "15", label: "03.00 pm", name: 'time' },
            { value: "16", label: "04.00 pm", name: 'time' },
            { value: "17", label: "05.00 pm", name: 'time' },
            { value: "18", label: "06.00 pm", name: 'time' },
            { value: "19", label: "07.00 pm", name: 'time' },
            { value: "20", label: "08.00 pm", name: 'time' },
            { value: "21", label: "09.00 pm", name: 'time' },
            { value: "22", label: "10.00 pm", name: 'time' },
            { value: "23", label: "11.00 pm", name: 'time' }
        ];

        return (
            <>
                <Sidebar />
                <div className="wrapper">
                    <Navbar />
                    <div className="flex-area conten container-fluid">
                        <div className="mod-rest-container">
                            <form onSubmit={this.formSubmitHandler}>
                                <div className="row clearfix">
                                    {/* <div className="">New</div> */}
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <Nav className="tab-cstm mb-visible" variant="pills" defaultActiveKey="link-1">
                                            <Nav.Item>
                                                <Nav.Link href="#" eventKey="link-1" onClick={(e) => this.activateTab(e, 'generalTab')}>General</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link href="#" eventKey="link-2" onClick={(e) => this.activateTab(e, 'informationTab')}>Información</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link href="#" eventKey="link-3" onClick={(e) => this.activateTab(e, 'scheduleTab')}>Horario</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </div>

                                    {/* This section will be go inside tab start */}
                                    <div className={"col col-md-4 col-lg-4 col-sm-12 col-xs-12 " + (this.state.formTab.generalTab ? '' : 'hidden')}>
                                        <h3 className="mb-hidden">
                                            General
                                        </h3>
                                        <input type="file" id="my_file" style={{ display: "none" }}
                                            onChange={this.fileUploadOnchange} ref={this.fileUpload} />
                                        <div className="cover-pic">
                                            <label htmlFor="">Editar foto de perfil y </label>
                                            <div className="cvr">
                                                <div className="cvr-main">
                                                    <div className="overlay">
                                                        <button type="button" className="btn-cvr-change"
                                                            onClick={this.showFileUpload}>
                                                            <svg width="13" height="13" viewBox="0 0 13 13"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                                    d="M9.9193 0.786243L12.1018 2.96874C12.3928 3.25974 12.3928 3.69624 12.1018 3.98724L10.7923 5.29674L7.5913 2.09574L8.9008 0.786243C9.1918 0.495243 9.6283 0.495243 9.9193 0.786243ZM0.898304 8.78874L6.5728 3.11424L9.7738 6.31524L4.0993 11.9897C3.9538 12.1352 3.8083 12.208 3.59005 12.208H1.40755C0.971054 12.208 0.680054 11.917 0.680054 11.4805V9.29799C0.680054 9.07974 0.752804 8.93424 0.898304 8.78874Z"
                                                                    fill="url(#paint0_linear)" />
                                                                <defs>
                                                                    <linearGradient id="paint0_linear" x1="6.50005"
                                                                        y1="0.567993" x2="6.50005"
                                                                        y2="12.208"
                                                                        gradientUnits="userSpaceOnUse">
                                                                        <stop stop-color="#B40DFF" />
                                                                        <stop offset="1" stop-color="#650ADD" />
                                                                    </linearGradient>
                                                                </defs>
                                                            </svg>

                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="cvr-photo">
                                                    <div className="overlay">
                                                        <button type="button" className="btn-photo-change"
                                                            onClick={this.showFileUpload}>
                                                            <svg width="13" height="13" viewBox="0 0 13 13"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                                    d="M9.9193 0.786243L12.1018 2.96874C12.3928 3.25974 12.3928 3.69624 12.1018 3.98724L10.7923 5.29674L7.5913 2.09574L8.9008 0.786243C9.1918 0.495243 9.6283 0.495243 9.9193 0.786243ZM0.898304 8.78874L6.5728 3.11424L9.7738 6.31524L4.0993 11.9897C3.9538 12.1352 3.8083 12.208 3.59005 12.208H1.40755C0.971054 12.208 0.680054 11.917 0.680054 11.4805V9.29799C0.680054 9.07974 0.752804 8.93424 0.898304 8.78874Z"
                                                                    fill="url(#paint0_linear)" />
                                                                <defs>
                                                                    <linearGradient id="paint0_linear" x1="6.50005"
                                                                        y1="0.567993" x2="6.50005"
                                                                        y2="12.208"
                                                                        gradientUnits="userSpaceOnUse">
                                                                        <stop stop-color="#B40DFF" />
                                                                        <stop offset="1" stop-color="#650ADD" />
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
                                            <input className="uni-input" type="text" name="name"
                                                placeholder="nombre"
                                                onChange={this.inputChangeHandler}
                                                value={this.state.dataToPost.name} />
                                            <p style={{ color: "red" }}>
                                                {this.validator.message('name', this.state.dataToPost.name, 'required')}
                                            </p>
                                            <label htmlFor="">ADMINISTRADOR:</label>
                                            <input className="uni-input" type="text" name="administrator"
                                                placeholder="administrador"
                                                onChange={this.inputChangeHandler}
                                                value={this.state.dataToPost.administrator} />
                                            <p style={{ color: "red" }}>
                                                {this.validator.message('administrator', this.state.dataToPost.administrator, 'required')}
                                            </p>
                                            <label htmlFor="">
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M16.5 0H1.5C0.67125 0 0 0.67125 0 1.5V16.5C0 17.3288 0.67125 18 1.5 18H9.75V11.25H7.5V8.25H9.75V6.30975C9.75 3.98475 11.1697 2.71875 13.2442 2.71875C14.238 2.71875 15.0915 2.793 15.3405 2.826V5.256L13.902 5.25675C12.774 5.25675 12.5557 5.793 12.5557 6.579V8.25H15.8857L15.1357 11.25H12.5557V18H16.5C17.3287 18 18 17.3288 18 16.5V1.5C18 0.67125 17.3287 0 16.5 0Z"
                                                        fill="#444460" />
                                                </svg>
                                                &nbsp;&nbsp;
                                                FACEBOOK:
                                            </label>
                                            <input className="uni-input md" type="text" name="fb"
                                                placeholder="facebook"
                                                onChange={this.inputChangeHandler}
                                                value={this.state.dataToPost.fb} />
                                            <p style={{ color: "red" }}>
                                                {this.validator.message('fb', this.state.dataToPost.fb, 'required')}
                                            </p>
                                            <label htmlFor="">
                                                <svg width="19" height="18" viewBox="0 0 19 18" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                                        d="M5.40619 0.054C6.36619 0.0105 6.67294 0 9.11719 0C11.5614 0 11.8682 0.0105 12.8282 0.054C14.2907 0.12075 15.5754 0.47925 16.6067 1.5105C17.6379 2.54175 17.9964 3.8265 18.0632 5.289C18.1067 6.249 18.1172 6.55575 18.1172 9C18.1172 11.4443 18.1067 11.751 18.0632 12.711C17.9964 14.1735 17.6379 15.4583 16.6067 16.4895C15.5754 17.5208 14.2907 17.8792 12.8282 17.946C11.8682 17.9895 11.5614 18 9.11719 18C6.67294 18 6.36619 17.9895 5.40619 17.946C3.94369 17.8792 2.65894 17.5208 1.62769 16.4895C0.596437 15.4583 0.237937 14.1735 0.171187 12.711C0.127688 11.751 0.117188 11.4443 0.117188 9C0.117188 6.55575 0.127688 6.249 0.171187 5.289C0.237937 3.8265 0.596437 2.54175 1.62769 1.5105C2.65894 0.47925 3.94369 0.12075 5.40619 0.054ZM12.7539 1.674C11.8052 1.6305 11.5202 1.6215 9.11719 1.6215C6.71419 1.6215 6.42919 1.6305 5.48044 1.674C4.45594 1.7205 3.50569 1.926 2.77444 2.65725C2.04319 3.3885 1.83769 4.33875 1.79119 5.36325C1.74769 6.312 1.73869 6.597 1.73869 9C1.73869 11.403 1.74769 11.688 1.79119 12.6368C1.83769 13.6613 2.04319 14.6115 2.77444 15.3427C3.50569 16.074 4.45594 16.2795 5.48044 16.326C6.42919 16.3695 6.71419 16.3785 9.11719 16.3785C11.5202 16.3785 11.8052 16.3695 12.7539 16.326C13.7784 16.2795 14.7287 16.074 15.4599 15.3427C16.1912 14.6115 16.3967 13.6613 16.4432 12.6368C16.4867 11.688 16.4957 11.403 16.4957 9C16.4957 6.597 16.4867 6.312 16.4432 5.36325C16.3967 4.33875 16.1912 3.3885 15.4599 2.65725C14.7287 1.926 13.7784 1.7205 12.7539 1.674ZM4.49566 9C4.49566 6.44775 6.56491 4.3785 9.11716 4.3785C11.6694 4.3785 13.7387 6.44775 13.7387 9C13.7387 11.5522 11.6694 13.6215 9.11716 13.6215C6.56491 13.6215 4.49566 11.5522 4.49566 9ZM6.11717 9C6.11717 10.6567 7.46042 12 9.11717 12C10.7739 12 12.1172 10.6567 12.1172 9C12.1172 7.34325 10.7739 6 9.11717 6C7.46042 6 6.11717 7.34325 6.11717 9ZM15.0017 4.1955C15.0017 4.79197 14.5182 5.2755 13.9217 5.2755C13.3252 5.2755 12.8417 4.79197 12.8417 4.1955C12.8417 3.59903 13.3252 3.1155 13.9217 3.1155C14.5182 3.1155 15.0017 3.59903 15.0017 4.1955Z"
                                                        fill="#444460" />
                                                </svg>
                                                &nbsp;&nbsp;
                                                INSTAGRAM:
                                            </label>
                                            <input className="uni-input md" type="text" name="ig"
                                                placeholder="instagram"
                                                onChange={this.inputChangeHandler}
                                                value={this.state.dataToPost.ig} />
                                            <p style={{ color: "red" }}>
                                                {this.validator.message('ig', this.state.dataToPost.ig, 'required')}
                                            </p>
                                        </div>
                                    </div>

                                    {/* This section will be go inside tab end */}


                                    {/* This section will be go inside tab start */}

                                    <div className={"col col-md-4 col-lg-4 col-sm-12 col-xs-12 " + (this.state.formTab.informationTab ? '' : 'hidden')}>
                                        <h3 className="mb-hidden">Información</h3>
                                        <div>
                                            <label htmlFor="">PROVINCIA:</label>
                                            <input className="uni-input md" type="text" name="province"
                                                placeholder="province"
                                                onChange={this.inputChangeHandler}
                                                value={this.state.dataToPost.province} />
                                            <p style={{ color: "red" }}>
                                                {this.validator.message('province', this.state.dataToPost.province, 'required')}
                                            </p>

                                            {/* <Select className="cstm-select" options={optionProvince}
                                                name="province" placeholder="Provincia"
                                                onChange={this.selectChangeHandler}
                                                value={this.state.dataToPost.province} />
                                            <p style={{ color: "red" }}>
                                                {this.validator.message('province', this.state.dataToPost.province, 'required')}
                                            </p> */}
                                            <label htmlFor="">CANTON:</label>
                                            <input className="uni-input md" type="text" name="canton"
                                                placeholder="canton"
                                                onChange={this.inputChangeHandler}
                                                value={this.state.dataToPost.canton} />
                                            <p style={{ color: "red" }}>
                                                {this.validator.message('canton', this.state.dataToPost.canton, 'required')}
                                            </p>


                                            {/* <Select className="cstm-select" options={optionCanton} name="canton"
                                                placeholder="Canton"
                                                onChange={this.selectChangeHandler}
                                                value={this.state.dataToPost.canton} />
                                            <p style={{ color: "red" }}>
                                                {this.validator.message('canton', this.state.dataToPost.canton, 'required')}
                                            </p> */}
                                            <label htmlFor="">DISTRITO:</label>

                                            <input className="uni-input md" type="text" name="district"
                                                placeholder="district"
                                                onChange={this.inputChangeHandler}
                                                value={this.state.dataToPost.district} />
                                            <p style={{ color: "red" }}>
                                                {this.validator.message('canton', this.state.dataToPost.district, 'required')}
                                            </p>
                                            {/* <Select className="cstm-select" options={optionDistrito} name="district"
                                                placeholder="Distrito"
                                                onChange={this.selectChangeHandler}
                                                value={this.state.dataToPost.district} />
                                            <p style={{ color: "red" }}>
                                                {this.validator.message('district', this.state.dataToPost.district, 'required')}
                                            </p> */}
                                            <label htmlFor="">BARRIO:</label>
                                            <input className="uni-input md" type="text" name="neighborhood"
                                                placeholder="neighborhood"
                                                onChange={this.inputChangeHandler}
                                                value={this.state.dataToPost.neighborhood} />
                                            {/* <Select className="cstm-select" options={optionBarrio} name="neighborhood"
                                                placeholder="Barrio"
                                                onChange={this.selectChangeHandler}
                                                value={this.state.dataToPost.neighborhood} /> */}
                                            <p style={{ color: "red" }}>
                                                {this.validator.message('neighborhood', this.state.dataToPost.neighborhood, 'required')}
                                            </p>
                                            <label htmlFor="">Direccion:</label>
                                            <textarea className="uni-input tarea" name="otherSigns"
                                                placeholder="Direccion"
                                                onChange={this.inputChangeHandler}
                                                value={this.state.dataToPost.otherSigns} id="" cols="30"
                                                rows="10"></textarea>
                                            <p style={{ color: "red" }}>
                                                {this.validator.message('otherSigns', this.state.dataToPost.otherSigns, 'required')}
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <button className="btn-theme" type="submit">GUARDAR</button>
                                        </div>
                                    </div>
                                    {/* This section will be go inside tab end */}

                                    {/* This section will be go inside tab start */}

                                    <div className={"col col-md-4 col-lg-4 col-sm-12 col-xs-12 " + (this.state.formTab.scheduleTab ? '' : 'hidden')}>
                                        <h3 style={{ marginBottom: '55px' }} className="mb-hidden">Horario</h3>
                                        <div className="hor-inline">
                                            <Checkbox
                                                onChange={this.checkboxChangeHandler} name="mondayEnable" value="Lunes"
                                                checked={this.state.dataToPost.mondayEnable} id="mondayEnable"
                                            /> <label htmlFor="mondayEnable" className="chk-label">Lunes</label>
                                            <div className="time-block">
                                                <Select className="cstm-select mini float-left"
                                                    options={optionTime} name="mondayOpen"
                                                    placeholder="Seleccionar"
                                                    onChange={(e) => this.selectChangeHandler(e, 'mondayOpen')}
                                                    value={this.state.dataToPost.mondayOpen}
                                                />
                                                <span className="dash">-</span>
                                                <Select className="cstm-select mini float-right"
                                                    options={optionTime} name="mondayClose"
                                                    placeholder="Seleccionar"
                                                    onChange={(e) => this.selectChangeHandler(e, 'mondayClose')}
                                                    value={this.state.dataToPost.mondayClose}
                                                />
                                            </div>
                                        </div>
                                        <div className="hor-inline">
                                            <Checkbox
                                                onChange={this.checkboxChangeHandler} name="tuesdayEnable"
                                                value="Martes"
                                                checked={this.state.dataToPost.tuesdayEnable} id="tuesdayEnable"
                                            /> <label htmlFor="horario1" className="chk-label">Martes</label>
                                            <div className="time-block">
                                                <Select className="cstm-select mini float-left"
                                                    options={optionTime} name="tuesdayOpen"
                                                    placeholder="Seleccionar"
                                                    onChange={this.selectChangeHandler}
                                                    value={this.state.dataToPost.tuesdayOpen}
                                                />
                                                <span className="dash">-</span>
                                                <Select className="cstm-select mini float-right"
                                                    options={optionTime} name="tuesdayClose"
                                                    placeholder="Seleccionar"
                                                    onChange={this.selectChangeHandler}
                                                    value={this.state.dataToPost.tuesdayClose}
                                                />
                                            </div>
                                        </div>
                                        <div className="hor-inline">
                                            <Checkbox
                                                onChange={this.checkboxChangeHandler} name="wednesdayEnable"
                                                value="Miercoles"
                                                checked={this.state.dataToPost.wednesdayEnable} id="wednesdayEnable"
                                            /> <label htmlFor="horario2" className="chk-label">Miercoles</label>
                                            <div className="time-block">
                                                <Select className="cstm-select mini float-left"
                                                    options={optionTime} name="wednesdayOpen"
                                                    placeholder="Seleccionar"
                                                    onChange={this.selectChangeHandler}
                                                    value={this.state.dataToPost.wednesdayOpen}
                                                />
                                                <span className="dash">-</span>
                                                <Select className="cstm-select mini float-right"
                                                    options={optionTime} name="wednesdayClose"
                                                    placeholder="Seleccionar"
                                                    onChange={this.selectChangeHandler}
                                                    value={this.state.dataToPost.wednesdayClose}
                                                />
                                            </div>
                                        </div>
                                        <div className="hor-inline">
                                            <Checkbox
                                                onChange={this.checkboxChangeHandler} name="thursdayEnable"
                                                value="Jueves"
                                                checked={this.state.dataToPost.thursdayEnable} id="thursdayEnable"
                                            /> <label htmlFor="" className="chk-label">Jueves</label>
                                            <div className="time-block">
                                                <Select className="cstm-select mini float-left"
                                                    options={optionTime} name="thursdayOpen"
                                                    placeholder="Seleccionar"
                                                    onChange={this.selectChangeHandler}
                                                    value={this.state.dataToPost.thursdayOpen}
                                                />
                                                <span className="dash">-</span>
                                                <Select className="cstm-select mini float-right"
                                                    options={optionTime} name="thursdayClose"
                                                    placeholder="Seleccionar"
                                                    onChange={this.selectChangeHandler}
                                                    value={this.state.dataToPost.thursdayClose}
                                                />
                                            </div>
                                        </div>
                                        <div className="hor-inline">
                                            <Checkbox
                                                onChange={this.checkboxChangeHandler} name="fridayEnable"
                                                value="Viernes"
                                                checked={this.state.dataToPost.fridayEnable} id="fridayEnable"
                                            /> <label htmlFor="" className="chk-label">Viernes</label>
                                            <div className="time-block">
                                                <Select className="cstm-select mini float-left"
                                                    options={optionTime} name="fridayOpen"
                                                    placeholder="Seleccionar"
                                                    onChange={this.selectChangeHandler}
                                                    value={this.state.dataToPost.fridayOpen}
                                                />
                                                <span className="dash">-</span>
                                                <Select className="cstm-select mini float-right"
                                                    options={optionTime} name="fridayClose"
                                                    placeholder="Seleccionar"
                                                    onChange={this.selectChangeHandler}
                                                    value={this.state.dataToPost.fridayClose}
                                                />
                                            </div>
                                        </div>
                                        <div className="hor-inline">
                                            <Checkbox
                                                onChange={this.checkboxChangeHandler} name="saturdayEnable"
                                                value="Sabado"
                                                checked={this.state.dataToPost.saturdayEnable} id="saturdayEnable"
                                            /> <label htmlFor="" className="chk-label">Sabado</label>
                                            <div className="time-block">
                                                <Select className="cstm-select mini float-left"
                                                    options={optionTime} name="saturdayOpen"
                                                    placeholder="Seleccionar"
                                                    onChange={this.selectChangeHandler}
                                                    value={this.state.dataToPost.saturdayOpen}
                                                />
                                                <span className="dash">-</span>
                                                <Select className="cstm-select mini float-right"
                                                    options={optionTime} name="saturdayClose"
                                                    placeholder="Seleccionar"
                                                    onChange={this.selectChangeHandler}
                                                    value={this.state.dataToPost.saturdayClose}
                                                />
                                            </div>
                                        </div>
                                        <div className="hor-inline">
                                            <Checkbox
                                                onChange={this.checkboxChangeHandler} name="sundayEnable"
                                                value="Domingo"
                                                checked={this.state.dataToPost.sundayEnable} id="sundayEnable"
                                            /> <label htmlFor="" className="chk-label">Domingo</label>
                                            <div className="time-block">
                                                <Select className="cstm-select mini float-left"
                                                    options={optionTime} name="sundayOpen"
                                                    placeholder="Seleccionar"
                                                    onChange={this.selectChangeHandler}
                                                    value={this.state.dataToPost.sundayOpen}
                                                />
                                                <span className="dash">-</span>
                                                <Select className="cstm-select mini float-right"
                                                    options={optionTime} name="sundayClose"
                                                    placeholder="Seleccionar"
                                                    onChange={this.selectChangeHandler}
                                                    value={this.state.dataToPost.sundayClose}
                                                />
                                            </div>
                                        </div>

                                    </div>

                                    {/* This section will be go inside tab end */}

                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </>
        );
    }
}


const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getRestaurantFormData, updateRestaurantFormData
        },
        dispatch
    )

const mapStateToProps = store =>
    (
        {
            restaurant: store.restaurant
        }
    )

export default connect(mapStateToProps, mapDispatchToProps)(ModifyRestaurant)
// export default ModifyRestaurant