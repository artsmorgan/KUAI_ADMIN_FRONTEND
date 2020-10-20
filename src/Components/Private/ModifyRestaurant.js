import React, { useState } from 'react';
import Select from 'react-select';
import { Button, Nav } from 'react-bootstrap';
import Checkbox from '@opuscapita/react-checkbox';
import SimpleReactValidator from 'simple-react-validator';
import bannerImage from "../../assets/images/banner-bg.png";
import avatarImage from "../../assets/images/oval-avatar.png";
import Navbar from "./Child/Fixed/Navbar/Navbar";
import Sidebar from "./Child/Fixed/Sidebar/Sidebar";
import * as APITools from '../../util/apiX';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoaderInScreen from "../Public/LoaderInScreen";
import * as TinyURL from 'tinyurl';

import {
    getRestaurantFormData,
    updateRestaurantFormData,
    getCantonesFromAPI,
    getDistritosFromAPI,
    getDefaultConfigData
} from '../../actions';
import { storage, db } from "../firebase";
import { toastr } from 'react-redux-toastr'


const endpointURL = process.env.REACT_APP_API_ENDPOINT + ":" + process.env.REACT_APP_API_PORT
const weekDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const optionprovince = [
    { value: "1", label: "San Jose", name: "province" },
    { value: "2", label: "Alajuela", name: "province" },
    { value: "3", label: "Cartago", name: "province" },
    { value: "4", label: "Heredia", name: "province" },
    { value: "5", label: "Guanacaste", name: "province" },
    { value: "6", label: "Puntarenas", name: "province" },
    { value: "7", label: "Limon", name: "province" }
];
let optioncanton = [];
let optiondistrict = [];
class ModifyRestaurant extends React.Component {

    constructor(props) {
        super(props);

        this.fileUpload = React.createRef();

        this.profilePictRefUpload = React.createRef();
        this.showProfileUpload = this.showProfileUpload.bind(this);

        this.coverPictRefUpload = React.createRef();
        // this.showCoverUpload = this.showCoverUpload.bind(this);

        this.showFileUpload = this.showFileUpload.bind(this);

        this.state = {
            width: 0,
            mobile: false,
            selectedTab: '',
            formTab: {
                generalTab: true,
                informationTab: false,
                scheduleTab: false,
            },

            profileImage: '',
            profileImageUrl: '',
            coverImage: '',
            coverImageUrl: '',
            profileImageProgress: '',

            form: {},
            checked: false,
            horario0: false,

            submitLoading: false,

            cantonIsDisabled: true,
            distritoIsDisabled: true,

            optioncanton: [],
            cantonSelected: 1,
            provinciaSelected: 0,

            optiondistrict: [],
            distritoSelected: 0,

            customErrorMessage: "este campo es requerido",
            customErrorMessageOpen: "Horario de apertura requerido",
            customErrorMessageClose: "Horario de cierre requerido",
            
            customErrors: {
                mondayEnable: false,
                mondayOpen: "",
                mondayClose: "",
                tuesdayEnable: false,
                tuesdayOpen: "",
                tuesdayClose: "",
                wednesdayEnable: false,
                wednesdayOpen: "",
                wednesdayClose: "",
                thursdayEnable: false,
                thursdayOpen: "",
                thursdayClose: "",
                fridayEnable: false,
                fridayOpen: "",
                fridayClose: "",
                saturdayEnable: false,
                saturdayOpen: "",
                saturdayClose: "",
                sundayEnable: false,
                sundayOpen: "",
                sundayClose: "",
            },

            dataToPost: {
                name: null,
                description: null,
                menuLink: null,
                tinyUrl: null,
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
                phone: null
            }
        };

        window.addEventListener("resize", this.updateDimension);

        this.checkboxChangeHandler = this.checkboxChangeHandler.bind(this);

        SimpleReactValidator.addLocale('es', {
            required: 'este campo es requerido',
        });

        this.validator = new SimpleReactValidator({
            locale: 'es',
            autoForceUpdate: this
        });

        this.validator = new SimpleReactValidator({
            locale: 'es',
            autoForceUpdate: this,
            validators: {
                url: {
                    message: 'Este enlace no tiene un formato valido, copie y pegue el enlace asegurandose que empieza con HTTP',
                    rule: (val, params, validator) => {
                        // console.log(val, params, validator);
                        return validator.helpers.testRegex(val, /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)
                    },
                }
            }
        });

    }

    updateDimension = (e) => {
        this.setState({
            width: window.innerWidth
        }, () => {
            console.log(this.state.width)
            if (this.state.width < 1024) {
                
                this.setState({ mobile: true });
                let obj = this.state.selectedTab;

                if (obj === '') {
                    this.setState({ selectedTab: 'generalTab' });
                    this.activateTab(e, 'generalTab')
                } else {
                    this.activateTab(e, obj)
                }
                let tabObj = this.state.formTab

                tabObj.generalTab = true;
                tabObj.informationTab = false;
                tabObj.scheduleTab = false;
                this.setState({ formTab: tabObj})
            } else {
                let obj = this.state.formTab

                obj.informationTab = true;
                obj.scheduleTab = true;
                obj.generalTab = true;
                this.setState({ formTab: obj, mobile: false });
            }
        });
    };


    checkboxChangeHandler = (e) => {
        let obj = this.state.dataToPost;
        obj[e.target.name] = !obj[e.target.name];
        this.setState({ dataToPost: obj });

        this.handleCustomValidation()
    };

    handleProfileImageChange = e => {
        if (e.target.files[0]) {
            this.setState({ profileImage: e.target.files[0] });
        }
    };


    getFileExtension = filename => filename.split('.').pop();

    handleProfileImageUpload = (e) => {
        // console.log('handleProfileImageUpload',e.target.files[0]);
        if (e && e.target.files[0]) {
            const _files = e.target.files[0];
            // this.setState({ profileImage: e.target.files[0] });
            const fileExtension = this.getFileExtension(e.target.files[0].name)
            const filename = `${Date.now()}.${fileExtension}`;
            const uploadTask = storage.ref(`restaurants/${localStorage.getItem('restaurantId')}/images/profile/${filename}`).put(e.target.files[0]);

            uploadTask.on(
                "state_changed",
                snapshot => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    this.setState({ progress: progress });
                },
                error => {
                    console.log(error);
                },
                () => {
                    storage
                        .ref(`restaurants/${localStorage.getItem('restaurantId')}/images/profile/`)
                        .child(filename)
                        .getDownloadURL()
                        .then(url => {
                            this.setState({ profileImageUrl: url });
                            const docRef = db.collection('restaurants').doc(localStorage.getItem('restaurantId'));
                            docRef.update({
                                profilePicture: url
                            }).then(() => {
                                toastr.success("Éxito", 'La imágen de perfil fue subida con éxito')
                                this.props.getDefaultConfigData({ restaurantId: localStorage.getItem('restaurantId') })
                            }).catch((error) => {
                                console.log('Error updating the document:', error);
                            })
                        });
                }
            );
        }

    };

    handleCoverImageUpload = (e) => {
        // console.log('handleProfileImageUpload',e.target.files[0]);
        if (e && e.target.files[0]) {
            const _files = e.target.files[0];
            // this.setState({ profileImage: e.target.files[0] });
            const fileExtension = this.getFileExtension(e.target.files[0].name)
            const filename = `${Date.now()}.${fileExtension}`;
            const uploadTask = storage.ref(`restaurants/${localStorage.getItem('restaurantId')}/images/cover/${filename}`).put(e.target.files[0]);

            uploadTask.on(
                "state_changed",
                snapshot => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    this.setState({ progress: progress });
                },
                error => {
                    console.log(error);
                },
                () => {
                    storage
                        .ref(`restaurants/${localStorage.getItem('restaurantId')}/images/cover/`)
                        .child(filename)
                        .getDownloadURL()
                        .then(url => {
                            this.setState({ coverImageUrl: url });
                            const docRef = db.collection('restaurants').doc(localStorage.getItem('restaurantId'));
                            docRef.update({
                                coverPicture: url
                            }).then(() => {
                                toastr.success("Éxito", 'La imágen de portada fue subida con éxito')
                                this.props.getDefaultConfigData({ restaurantId: localStorage.getItem('restaurantId') })
                            }).catch((error) => {
                                console.log('Error updating the document:', error);
                            })
                        });
                }
            );
        }

    };

    // checkInvalid = (e) => {
    //     e.target.setCustomValidity("Please select a date in the past.");
    // };

    inputChangeHandler = (e) => {
        let obj = this.state.dataToPost;
        obj[e.target.name] = e.target.value;
        this.setState({ dataToPost: obj });
    };

    selectChangeHandler = (e, fieldName) => {
        // console.log(fieldName)
        // console.log(e.value)
        let obj = this.state.dataToPost;
        obj[fieldName] = e;
        this.setState({ dataToPost: obj });
        // console.log(this.state.dataToPost)
    };

    timeSelectChangeHandler = (e, fieldName) => {
        let obj = this.state.dataToPost;
        obj[fieldName] = e;
        this.setState({ dataToPost: obj });
        this.handleCustomValidation()
    };


    provinceChangeHandler = async (e, fieldName) => {
        let obj = this.state.dataToPost;
        obj[fieldName] = e;
        optioncanton = [];
        optiondistrict=[];
        obj['canton'] ='';
        obj['district'] ='';
        this.setState({ dataToPost: obj,cantonIsDisabled: true,distritoIsDisabled: true });
       
        await this.setCantonOptionData(this.state.dataToPost.province.value);
        
        this.handleCustomValidation()

    };

    cantonChangeHandler = async (e, fieldName) => {
        let obj = this.state.dataToPost;
        obj[fieldName] = e;
        optiondistrict=[];
        obj['district'] ='';
        this.setState({ dataToPost: obj,distritoIsDisabled: true });

        await this.setDistrictOptionData(this.state.dataToPost.province.value, this.state.dataToPost.canton.value)

        this.handleCustomValidation()
    };

    async setCantonOptionData(provinceValue){
        const cantonesData = await getCantonesFromAPI(provinceValue);
        
        const cantonesObj = [];
        for (const canton in cantonesData.cantones) {
    
            cantonesObj.push({ value: canton, label: cantonesData.cantones[canton], name: "canton" })

        }

        optioncanton = cantonesObj;
        
        this.setState({ cantonIsDisabled: false})
        
        
    }


    async setDistrictOptionData(provinceValue,cantonValue){
        const distritosData = await getDistritosFromAPI(provinceValue,cantonValue);

        const distritosObj = [];
        for (const distrito in distritosData.distritos) {

            distritosObj.push({ value: distrito, label: distritosData.distritos[distrito], name: "district" })
        }

        optiondistrict = distritosObj;
        this.setState({ distritoIsDisabled: false})

      
    }


    phoneNumberInputChangeHandler(e) {
        let obj = this.state.dataToPost;
        
        if(e.target.value==='' || e.target.value.replace("-","").match(/^[0-9]+$/) != null){
            if(e.target.value===''){
                obj[e.target.name] = e.target.value;
            }else{
                obj[e.target.name] = e.target.value.replace(/(\d{4})(\d{3})/, "$1-$2");
            }   
            this.setState({dataToPost: obj});
        }
    
        this.handleCustomValidation()
    }


    distritoChangeHandler = async (e, fieldName) => {
        let obj = this.state.dataToPost;
        obj[fieldName] = e;
        this.setState({ dataToPost: obj });
    };

    handleCustomValidation() {

        let days = weekDays;
        let errors = this.state.customErrors;
        let formIsValid = true;
        let obj = this.state.dataToPost;

        for (const [key, value] of Object.entries(days)) {

            let field = value + "Enable";
            // console.log(value)
            if (field in errors) {
                let openValue = value + "Open";
                let closeValue = value + "Close";

                if (obj[field]) {
                    // console.log(obj[openValue])
                    // console.log(obj[closeValue])
                    if (obj[openValue] === "-" || obj[openValue]['value'] === "-" || obj[openValue] === "" || obj[openValue]['value'] === "") {
                        // console.log(obj[openValue]);
                        errors[openValue] = this.state.customErrorMessageOpen;
                        formIsValid = false;
                    } else {
                        errors[openValue] = '';
                    }

                    if (obj[closeValue] === "-" || obj[closeValue]['value'] === "-" || obj[closeValue] === "" || obj[closeValue]['value'] === "") {
                        // console.log(obj[closeValue]);
                        errors[closeValue] = this.state.customErrorMessageClose;
                        formIsValid = false;
                    } else {
                        errors[closeValue] = '';
                    }
                } else {
                    errors[openValue] = '';
                    errors[closeValue] = '';
                }
            }
        }

        // console.log(errors)
        this.setState({ customErrors: errors });

        // console.log(this.state.errors)
        return formIsValid;
        //console.log(`${key}: ${value}`);
    }


    formSubmitHandler = (e) => {
        e.preventDefault();
        if (this.validator.allValid() && this.handleCustomValidation()) {
            // console.log(this.state.dataToPost);
            // return false;
            this.processSubmit();
            // this.showAndHideSubmitLoader()
        } else {
            this.validator.showMessages();
        }
    };

    showFileUpload() {
        this.coverPictRefUpload.current.click();
    }

    showProfileUpload() {
        this.profilePictRefUpload.current.click();
    }

    fileUploadOnchange(e) {
        // console.log(e.target.files[0])
    }

    processSubmit() {
        if (this.processScheduleValue("post") && this.processAddressValue('post')) {
            let formData = this.state.dataToPost
            formData['menuLink'] = process.env.REACT_APP_MENU_PANEL_ENDPOINT + localStorage.getItem('restaurantId')
            this.props.updateRestaurantFormData({
                restaurantId: localStorage.getItem('restaurantId'),
                form: formData
            })
        }
        this.props.getDefaultConfigData({ restaurantId: localStorage.getItem('restaurantId') })
    }

    async processAddressValue(type){        
        if(type=='get'){
          try {
            await this.setDistrictOptionData(this.state.dataToPost.province,this.state.dataToPost.canton);
            await this.setCantonOptionData(this.state.dataToPost.province);            
          } catch (error) {
              
          }
            
        }
        let returnType = false;
        let addressValue = ['province','canton','district'];
        let i = 0;

        addressValue.forEach(element => {  
            let obj = this.state.dataToPost;
            let option= [];
            switch(element) {
                case 'province':
                  option= optionprovince;
                  break;
                case 'canton':
                  option = optioncanton;
                  break;
                case 'district':
                  option = optiondistrict;
                  break;
                default:
                    option=[];
              }
            
            if(type=='post'){
                obj[element] = obj[element]['value'];
            }else{
                option.forEach(pv => {
                    if(pv.value === obj[element]){
                        obj[element] = pv
                    }
                });
            }

            i++
            if (i === addressValue.length) {
                this.setState({
                    dataToPost: obj
                })
                returnType = true;
            }
        });

        return returnType;
    }

    // async setCantonValue(){
    //     let obj = this.state.dataToPost;
    //     obj[fieldName] = e;
    //     optiondistrict=[];
    //     this.setState({ dataToPost: obj,distritoIsDisabled: true });

    //     const distritosData = await getDistritosFromAPI(this.state.dataToPost.province, this.state.dataToPost.canton);

    //     const distritosObj = [];
    //     for (const distrito in distritosData.distritos) {

    //         distritosObj.push({ value: distrito, label: distritosData.distritos[distrito], name: "district" })
    //     }

    //     optiondistrict = distritosObj;
    //     this.setState({ distritoIsDisabled: false })
    // }

    // setDistrictValue(){

    // }

    processScheduleValue(type) {
        let returnType = false;
        // const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
        const days = weekDays;
        let i = 0;

        days.forEach(element => {
            let obj = this.state.dataToPost;
            let openValue = element + "Open";
            let closeValue = element + "Close";

            if (type == "post") {
                if (obj[openValue] != '-' && obj[openValue] != '') {
                    obj[openValue] = obj[openValue]['value']
                }

                if (obj[closeValue] != '-' && obj[closeValue] != '') {
                    obj[closeValue] = obj[closeValue]['value']
                }
            } else {
                if (obj[openValue] != '-' && obj[openValue] != '') {
                    obj[openValue] = { value: obj[openValue], label: obj[openValue], name: 'time' }
                }

                if (obj[closeValue] != '-' && obj[closeValue] != '') {
                    obj[closeValue] = { value: obj[closeValue], label: obj[closeValue], name: 'time' }
                }
            }

            i++
            if (i === days.length) {
                this.setState({
                    dataToPost: obj
                })
                returnType = true;
            }
        });
        // this.processCustomError();
        return returnType;
    }

    getDefaultActiveKey(e) {
        console.log(this.state.formTab)
        let tab = this.state.selectedTab ? this.state.selectedTab:'generalTab';
        switch (tab) {
            case "informationTab":
                return "link-2";
            case "scheduleTab":
                return "link-3";
            default:
                return "link-1";
        }
       
    }

    activateTab(e, tabName) {
        let obj = this.state.formTab;
        let alltabs = this.state.formTab;
        if (this.state.mobile) {
            // console.log(alltabs);
            for (const [key, value] of Object.entries(obj)) {
                if (key == tabName) {
                    alltabs[key] = true
                } else {
                    alltabs[key] = false
                }
            }

            this.setState({ formTab: alltabs, selectedTab: tabName })
        }
    }

    shortendURL = () => {
        let THIS = this
        // console.log("calling")
        let shortURL = 'http://client.kuai.menu/restaurant/' + localStorage.getItem('restaurantId') + '/menu';
        let shortURLres = ''
        TinyURL.shorten(shortURL, function(res, err) {
            if (err)
                console.log(err)
            // console.log(res);
            shortURLres = res;
            // return res;
            let obj = THIS.state.dataToPost;
            obj['tinyUrl'] = shortURLres;
            
            THIS.setState({dataToPost: obj}, () => {
                // console.log("ending")
                // console.log(THIS.state.dataToPost)
            });
        });
    }

    componentDidMount() {
        this.updateDimension();
        // this.checkUrlValidation();
        // this.shortendURL()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimension);
    }

    componentWillMount() {
        this.props.getRestaurantFormData({ restaurantId: localStorage.getItem('restaurantId') })
    }

    checkUrlValidation() {
        const fbUrl = document.querySelector("[name=fb]");
        if (fbUrl) {
            if (fbUrl.validity.patternMismatch) {
                fbUrl.setCustomValidity("Copia y pega el URL de tu perfil social");
            } else {
                fbUrl.setCustomValidity("");
            }
        }
        const igUrl = document.querySelector("[name=fb]");
        if (igUrl) {
            if (igUrl.validity.patternMismatch) {
                igUrl.setCustomValidity("Copia y pega el URL de tu perfil social");
            } else {
                igUrl.setCustomValidity("");
            }
        }
    }


    getBool(string) {
        if (!string)
            return false;

        switch (string.toLowerCase().trim()) {
            case "true":
            case "yes":
            case "1":
                return true;
            case "false":
            case "no":
            case "0":
            case null:
                return false;
            default:
                return Boolean(string);
        }
        // return !!JSON.parse(String(val).toLowerCase());
    }

    componentDidUpdate(previousProps) {
        if (previousProps.restaurant.loading && !this.props.restaurant.loading) {
            const restaurant = this.props.restaurant;
            this.setState({
                profileImageUrl: restaurant.profilePicture,
                coverImageUrl: restaurant.coverPicture,
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
                    mondayEnable: this.getBool(restaurant.schedule.monday.enabled),
                    mondayOpen: restaurant.schedule.monday.open,
                    mondayClose: restaurant.schedule.monday.close,
                    tuesdayEnable: this.getBool(restaurant.schedule.tuesday.enabled),
                    tuesdayOpen: restaurant.schedule.tuesday.open,
                    tuesdayClose: restaurant.schedule.tuesday.close,
                    wednesdayEnable: this.getBool(restaurant.schedule.wednesday.enabled),
                    wednesdayOpen: restaurant.schedule.wednesday.open,
                    wednesdayClose: restaurant.schedule.wednesday.close,
                    thursdayEnable: this.getBool(restaurant.schedule.thursday.enabled),
                    thursdayOpen: restaurant.schedule.thursday.open,
                    thursdayClose: restaurant.schedule.thursday.close,
                    fridayEnable: this.getBool(restaurant.schedule.friday.enabled),
                    fridayOpen: restaurant.schedule.friday.open,
                    fridayClose: restaurant.schedule.friday.close,
                    saturdayEnable: this.getBool(restaurant.schedule.saturday.enabled),
                    saturdayOpen: restaurant.schedule.saturday.open,
                    saturdayClose: restaurant.schedule.saturday.close,
                    sundayEnable: this.getBool(restaurant.schedule.sunday.enabled),
                    sundayOpen: restaurant.schedule.sunday.open,
                    sundayClose: restaurant.schedule.sunday.close,
                    owner: restaurant.owner,
                    id: restaurant.id,
                    phone: restaurant.phone,
                    description: restaurant.description ? restaurant.description:'',
                    tinyUrl: !restaurant.tinyUrl ? this.shortendURL() : restaurant.tinyUrl
                }
            }, (e) => {
                this.processScheduleValue("get");
                this.shortendURL()
                this.processAddressValue("get");
            });

        }
        // this.checkUrlValidation();
    }

    copyFunction = () => {
        // console.log("copy")
        var copyText = document.getElementById("menuLink");
        // console.log(copyText)
        copyText.select();
        // console.log(copyText.select())
        copyText.setSelectionRange(0, 99999);
        // console.log(copyText.setSelectionRange(0, 99999))
        document.execCommand("copy");
    }


   


    render() {
        const { width } = this.state
        
        // const optioncanton = [
        //     { value: "chocolate", label: "Chocolate", name: "canton" },
        //     { value: "strawberry", label: "Strawberry", name: "canton" },
        //     { value: "vanilla", label: "Vanilla", name: "canton" },
        // ];
        // const optiondistrict = [
        //     { value: "chocolate", label: "Chocolate", name: "distrito" },
        //     { value: "strawberry", label: "Strawberry", name: "distrito" },
        //     { value: "vanilla", label: "Vanilla", name: "distrito" },
        // ];
        const optionBarrio = [
            { value: "chocolate", label: "Chocolate", name: "barrio" },
            { value: "strawberry", label: "Strawberry", name: "barrio" },
            { value: "vanilla", label: "Vanilla", name: "barrio" },
        ];

        const optionTime = [
            { value: "12:00 am", label: "12:00 am", name: 'time' },
            { value: "01:00 am", label: "01:00 am", name: 'time' },
            { value: "02:00 am", label: "02:00 am", name: 'time' },
            { value: "03:00 am", label: "03:00 am", name: 'time' },
            { value: "04:00 am", label: "04:00 am", name: 'time' },
            { value: "05:00 am", label: "05:00 am", name: 'time' },
            { value: "06:00 am", label: "06:00 am", name: 'time' },
            { value: "07:00 am", label: "07:00 am", name: 'time' },
            { value: "08:00 am", label: "08:00 am", name: 'time' },
            { value: "09:00 am", label: "09:00 am", name: 'time' },
            { value: "10:00 am", label: "10:00 am", name: 'time' },
            { value: "11:00 am", label: "11:00 am", name: 'time' },
            { value: "12:00 pm", label: "12:00 pm", name: 'time' },
            { value: "01:00 pm", label: "01:00 pm", name: 'time' },
            { value: "02:00 pm", label: "02:00 pm", name: 'time' },
            { value: "03:00 pm", label: "03:00 pm", name: 'time' },
            { value: "04:00 pm", label: "04:00 pm", name: 'time' },
            { value: "05:00 pm", label: "05:00 pm", name: 'time' },
            { value: "06:00 pm", label: "06:00 pm", name: 'time' },
            { value: "07:00 pm", label: "07:00 pm", name: 'time' },
            { value: "08:00 pm", label: "08:00 pm", name: 'time' },
            { value: "09:00 pm", label: "09:00 pm", name: 'time' },
            { value: "10:00 pm", label: "10:00 pm", name: 'time' },
            { value: "11:00 pm", label: "11:00 pm", name: 'time' }
        ];


        return (
            <>
                <Sidebar />
                <div className="wrapper">
                    <Navbar />

                    <div className="flex-area conten container-fluid">
                        <div className="mod-rest-container">
                            {this.props.restaurant.loading ? <LoaderInScreen /> :
                                <form onSubmit={this.formSubmitHandler}>
                                    <div className="row clearfix">
                                        {/* <div className="">New</div> */}
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <Nav className="tab-cstm mb-visible" variant="pills"
                                                defaultActiveKey={(e)=>this.getDefaultActiveKey(e)}>
                                                <Nav.Item>
                                                    <Nav.Link href="javascript:void(0)" eventKey="link-1"
                                                        onClick={(e) => this.activateTab(e, 'generalTab')}>General</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link href="javascript:void(0)" eventKey="link-2"
                                                        onClick={(e) => this.activateTab(e, 'informationTab')}>Información</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link href="javascript:void(0)" eventKey="link-3"
                                                        onClick={(e) => this.activateTab(e, 'scheduleTab')}>Horario</Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </div>

                                        {/* This section will be go inside tab start */}
                                        <div
                                            className={"col col-md-4 col-lg-4 col-sm-12 col-xs-12 " + (this.state.formTab.generalTab ? '' : 'hidden')}>
                                            <h3 className="mb-hidden">
                                                General
                                            </h3>

                                            <input type="file" id="my_file" style={{ display: "none" }} accept="image/*"
                                                onChange={this.handleCoverImageUpload}
                                                ref={this.coverPictRefUpload} />

                                            <div className="cover-pic">
                                                <label htmlFor="">Editar foto de perfil y foto de portada</label>
                                                <div className="cvr">
                                                    <div className="cvr-main"
                                                        style={{ background: "url(" + this.state.coverImageUrl + ")" }}>
                                                        <div className="overlay">
                                                            <button type="button" className="btn-cvr-change"
                                                                onClick={this.showFileUpload}>

                                                                <svg width="13" height="13" viewBox="0 0 13 13"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                                        d="M9.9193 0.786243L12.1018 2.96874C12.3928 3.25974 12.3928 3.69624 12.1018 3.98724L10.7923 5.29674L7.5913 2.09574L8.9008 0.786243C9.1918 0.495243 9.6283 0.495243 9.9193 0.786243ZM0.898304 8.78874L6.5728 3.11424L9.7738 6.31524L4.0993 11.9897C3.9538 12.1352 3.8083 12.208 3.59005 12.208H1.40755C0.971054 12.208 0.680054 11.917 0.680054 11.4805V9.29799C0.680054 9.07974 0.752804 8.93424 0.898304 8.78874Z"
                                                                        fill="url(#paint0_linear)" />
                                                                    <defs>
                                                                        <linearGradient id="paint0_linear" x1="6.50005"
                                                                            y1="0.567993" x2="6.50005"
                                                                            y2="12.208"
                                                                            gradientUnits="userSpaceOnUse">
                                                                            <stop stopColor="#B40DFF" />
                                                                            <stop offset="1" stopColor="#650ADD" />
                                                                        </linearGradient>
                                                                    </defs>
                                                                </svg>

                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="cvr-photo"
                                                        style={{ background: "url(" + this.state.profileImageUrl + ")" }}>
                                                        <div className="overlay">
                                                            <input type="file" id="profile-picture" accept="image/*"
                                                                style={{ display: "none" }}
                                                                onChange={this.handleProfileImageUpload}
                                                                ref={this.profilePictRefUpload} />
                                                            <button type="button" className="btn-photo-change"
                                                                onClick={this.showProfileUpload}>

                                                                <svg width="13" height="13" viewBox="0 0 13 13"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                                        d="M9.9193 0.786243L12.1018 2.96874C12.3928 3.25974 12.3928 3.69624 12.1018 3.98724L10.7923 5.29674L7.5913 2.09574L8.9008 0.786243C9.1918 0.495243 9.6283 0.495243 9.9193 0.786243ZM0.898304 8.78874L6.5728 3.11424L9.7738 6.31524L4.0993 11.9897C3.9538 12.1352 3.8083 12.208 3.59005 12.208H1.40755C0.971054 12.208 0.680054 11.917 0.680054 11.4805V9.29799C0.680054 9.07974 0.752804 8.93424 0.898304 8.78874Z"
                                                                        fill="url(#paint0_linear)" />
                                                                    <defs>
                                                                        <linearGradient id="paint0_linear" x1="6.50005"
                                                                            y1="0.567993" x2="6.50005"
                                                                            y2="12.208"
                                                                            gradientUnits="userSpaceOnUse">
                                                                            <stop stopColor="#B40DFF" />
                                                                            <stop offset="1" stopColor="#650ADD" />
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
                                                    placeholder=" Los Amigos Restaurante"
                                                    onChange={this.inputChangeHandler}
                                                    value={this.state.dataToPost.name} />
                                                <p className-="error-txt" style={{ color: "red" }}>
                                                    {this.validator.message('name', this.state.dataToPost.name, 'required')}
                                                </p>

                                                <label htmlFor="">Descripción:</label>
                                                <textarea className="uni-input tarea" name="description"
                                                    placeholder=" Burger King es una cadena multinacional estadounidense de restaurantes de comida ..."
                                                    onChange={this.inputChangeHandler}
                                                    value={this.state.dataToPost.description} cols="30"
                                                    rows="10"></textarea>
                                                {/* <p className-="error-txt" style={{color: "red"}}>
                                                    {this.validator.message('description', this.state.dataToPost.description, 'required')}
                                                </p> */}

                                                
                                                <label htmlFor="">ADMINISTRADOR:</label>
                                                <input className="uni-input" type="text" name="administrator"
                                                    placeholder=" John Doe"
                                                    onChange={this.inputChangeHandler}
                                                    value={this.state.dataToPost.administrator} />
                                                <p className-="error-txt" style={{ color: "red" }}>
                                                    {this.validator.message('administrator', this.state.dataToPost.administrator, 'required')}
                                                </p>
                                                <label htmlFor="">
                                                    {/* <svg width="19" height="18" viewBox="0 0 19 18" fill="none"
                                                        xmlns="http://www.w3.org/y2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd"
                                                            d="M5.40619 0.054C6.36619 0.0105 6.67294 0 9.11719 0C11.5614 0 11.8682 0.0105 12.8282 0.054C14.2907 0.12075 15.5754 0.47925 16.6067 1.5105C17.6379 2.54175 17.9964 3.8265 18.0632 5.289C18.1067 6.249 18.1172 6.55575 18.1172 9C18.1172 11.4443 18.1067 11.751 18.0632 12.711C17.9964 14.1735 17.6379 15.4583 16.6067 16.4895C15.5754 17.5208 14.2907 17.8792 12.8282 17.946C11.8682 17.9895 11.5614 18 9.11719 18C6.67294 18 6.36619 17.9895 5.40619 17.946C3.94369 17.8792 2.65894 17.5208 1.62769 16.4895C0.596437 15.4583 0.237937 14.1735 0.171187 12.711C0.127688 11.751 0.117188 11.4443 0.117188 9C0.117188 6.55575 0.127688 6.249 0.171187 5.289C0.237937 3.8265 0.596437 2.54175 1.62769 1.5105C2.65894 0.47925 3.94369 0.12075 5.40619 0.054ZM12.7539 1.674C11.8052 1.6305 11.5202 1.6215 9.11719 1.6215C6.71419 1.6215 6.42919 1.6305 5.48044 1.674C4.45594 1.7205 3.50569 1.926 2.77444 2.65725C2.04319 3.3885 1.83769 4.33875 1.79119 5.36325C1.74769 6.312 1.73869 6.597 1.73869 9C1.73869 11.403 1.74769 11.688 1.79119 12.6368C1.83769 13.6613 2.04319 14.6115 2.77444 15.3427C3.50569 16.074 4.45594 16.2795 5.48044 16.326C6.42919 16.3695 6.71419 16.3785 9.11719 16.3785C11.5202 16.3785 11.8052 16.3695 12.7539 16.326C13.7784 16.2795 14.7287 16.074 15.4599 15.3427C16.1912 14.6115 16.3967 13.6613 16.4432 12.6368C16.4867 11.688 16.4957 11.403 16.4957 9C16.4957 6.597 16.4867 6.312 16.4432 5.36325C16.3967 4.33875 16.1912 3.3885 15.4599 2.65725C14.7287 1.926 13.7784 1.7205 12.7539 1.674ZM4.49566 9C4.49566 6.44775 6.56491 4.3785 9.11716 4.3785C11.6694 4.3785 13.7387 6.44775 13.7387 9C13.7387 11.5522 11.6694 13.6215 9.11716 13.6215C6.56491 13.6215 4.49566 11.5522 4.49566 9ZM6.11717 9C6.11717 10.6567 7.46042 12 9.11717 12C10.7739 12 12.1172 10.6567 12.1172 9C12.1172 7.34325 10.7739 6 9.11717 6C7.46042 6 6.11717 7.34325 6.11717 9ZM15.0017 4.1955C15.0017 4.79197 14.5182 5.2755 13.9217 5.2755C13.3252 5.2755 12.8417 4.79197 12.8417 4.1955C12.8417 3.59903 13.3252 3.1155 13.9217 3.1155C14.5182 3.1155 15.0017 3.59903 15.0017 4.1955Z"
                                                            fill="#444460" />
                                                    </svg> */}
                                                &nbsp;&nbsp;
                                                Teléfono:
                                                </label>
                                                <input className="uni-input " type="text" name="phone"
                                                    placeholder=" 0124-4556"
                                                    onChange={(e) => this.phoneNumberInputChangeHandler(e)}
                                                    value={this.state.dataToPost.phone} />
                                                <p className-="error-txt" style={{ color: "red" }}>
                                                    {this.validator.message('phone', this.state.dataToPost.phone, 'required')}
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
                                                <input className="uni-input " type="text" name="fb"
                                                    placeholder="https://www.facebook.com/yammy_food"
                                                    onChange={this.inputChangeHandler}
                                                    value={this.state.dataToPost.fb}
                                                />
                                                <p style={{ color: "red" }}>
                                                    {this.state.dataToPost.fb ? this.validator.message('fb', this.state.dataToPost.fb, 'url') : ''}
                                                </p>
                                                <label htmlFor="">
                                                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd"
                                                            d="M5.40619 0.054C6.36619 0.0105 6.67294 0 9.11719 0C11.5614 0 11.8682 0.0105 12.8282 0.054C14.2907 0.12075 15.5754 0.47925 16.6067 1.5105C17.6379 2.54175 17.9964 3.8265 18.0632 5.289C18.1067 6.249 18.1172 6.55575 18.1172 9C18.1172 11.4443 18.1067 11.751 18.0632 12.711C17.9964 14.1735 17.6379 15.4583 16.6067 16.4895C15.5754 17.5208 14.2907 17.8792 12.8282 17.946C11.8682 17.9895 11.5614 18 9.11719 18C6.67294 18 6.36619 17.9895 5.40619 17.946C3.94369 17.8792 2.65894 17.5208 1.62769 16.4895C0.596437 15.4583 0.237937 14.1735 0.171187 12.711C0.127688 11.751 0.117188 11.4443 0.117188 9C0.117188 6.55575 0.127688 6.249 0.171187 5.289C0.237937 3.8265 0.596437 2.54175 1.62769 1.5105C2.65894 0.47925 3.94369 0.12075 5.40619 0.054ZM12.7539 1.674C11.8052 1.6305 11.5202 1.6215 9.11719 1.6215C6.71419 1.6215 6.42919 1.6305 5.48044 1.674C4.45594 1.7205 3.50569 1.926 2.77444 2.65725C2.04319 3.3885 1.83769 4.33875 1.79119 5.36325C1.74769 6.312 1.73869 6.597 1.73869 9C1.73869 11.403 1.74769 11.688 1.79119 12.6368C1.83769 13.6613 2.04319 14.6115 2.77444 15.3427C3.50569 16.074 4.45594 16.2795 5.48044 16.326C6.42919 16.3695 6.71419 16.3785 9.11719 16.3785C11.5202 16.3785 11.8052 16.3695 12.7539 16.326C13.7784 16.2795 14.7287 16.074 15.4599 15.3427C16.1912 14.6115 16.3967 13.6613 16.4432 12.6368C16.4867 11.688 16.4957 11.403 16.4957 9C16.4957 6.597 16.4867 6.312 16.4432 5.36325C16.3967 4.33875 16.1912 3.3885 15.4599 2.65725C14.7287 1.926 13.7784 1.7205 12.7539 1.674ZM4.49566 9C4.49566 6.44775 6.56491 4.3785 9.11716 4.3785C11.6694 4.3785 13.7387 6.44775 13.7387 9C13.7387 11.5522 11.6694 13.6215 9.11716 13.6215C6.56491 13.6215 4.49566 11.5522 4.49566 9ZM6.11717 9C6.11717 10.6567 7.46042 12 9.11717 12C10.7739 12 12.1172 10.6567 12.1172 9C12.1172 7.34325 10.7739 6 9.11717 6C7.46042 6 6.11717 7.34325 6.11717 9ZM15.0017 4.1955C15.0017 4.79197 14.5182 5.2755 13.9217 5.2755C13.3252 5.2755 12.8417 4.79197 12.8417 4.1955C12.8417 3.59903 13.3252 3.1155 13.9217 3.1155C14.5182 3.1155 15.0017 3.59903 15.0017 4.1955Z"
                                                            fill="#444460" />
                                                    </svg>
                                                    &nbsp;&nbsp;
                                                    INSTAGRAM:
                                                </label>
                                                <input className="uni-input " name="ig"
                                                    placeholder="https://www.instagram.com/yammy_food"
                                                    onChange={this.inputChangeHandler}
                                                    value={this.state.dataToPost.ig}
                                                />
                                                <p style={{ color: "red" }}>
                                                    {this.state.dataToPost.ig ? this.validator.message('ig', this.state.dataToPost.ig, 'url') : ''}
                                                </p>
                                                
                                                <label htmlFor="">LINK AL MENU:</label>
                                                {/*<div style={{position: "absolute", top: "0", left: "-500px"}}>
                                                    <textarea id="menuLink" type="text" rows="1"
                                                              cols="2">{this.state.dataToPost.tinyURL}</textarea>
                                                </div>*/}
                                                <div className="url_input">
                                                    <input className="uni-input" type="text" name="tinyUrl" value={this.state.dataToPost.tinyUrl}
                                                           readOnly id="menuLink"/>
                                                    <span title="Copy to clipboard"><svg className="svg-icon btn-copy"
                                                                                         viewBox="0 0 20 20" style={{
                                                        width: "30px",
                                                        cursor: "pointer"
                                                    }} onClick={this.copyFunction}
                                                    >
                                                    <path
                                                        d="M17.391,2.406H7.266c-0.232,0-0.422,0.19-0.422,0.422v3.797H3.047c-0.232,0-0.422,0.19-0.422,0.422v10.125c0,0.232,0.19,0.422,0.422,0.422h10.125c0.231,0,0.422-0.189,0.422-0.422v-3.797h3.797c0.232,0,0.422-0.19,0.422-0.422V2.828C17.812,2.596,17.623,2.406,17.391,2.406 M12.749,16.75h-9.28V7.469h3.375v5.484c0,0.231,0.19,0.422,0.422,0.422h5.483V16.75zM16.969,12.531H7.688V3.25h9.281V12.531z"></path>
                                                    </svg></span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* This section will be go inside tab end */}


                                        {/* This section will be go inside tab start */}

                                        <div
                                            className={"col col-md-4 col-lg-4 col-sm-12 col-xs-12 " + (this.state.formTab.informationTab ? '' : 'hidden')}>
                                            <h3 className="mb-hidden">Información</h3>
                                            <div>
                                                <label htmlFor="">PROVINCIA:</label> <br />
                                                {/* <input className="uni-input md" type="text" name="province"
                                                placeholder="province"
                                                onChange={this.inputChangeHandler}
                                                value={this.state.dataToPost.province} /> */}
                                                {/*<div className="row" >*/}
                                                {/*<div className="col-md-6 col-sm-6 col-lg-6 col-xs-6">*/}
                                                <Select className="cstm-select f-w"
                                                    options={optionprovince} name="province"
                                                    style={{ "width": "100" }}
                                                    placeholder="Select Province"
                                                    onChange={(e) => this.provinceChangeHandler(e, 'province')}
                                                    value={this.state.dataToPost.province}
                                                />
                                                <p className="error-txt" style={{ color: "red" }}>
                                                    {this.validator.message('province', this.state.dataToPost.province, 'required')}
                                                </p>
                                                <br />
                                                {/* <Select className="cstm-select" options={optionprovince}
                                                name="province" placeholder="Provincia"
                                                onChange={this.selectChangeHandler}
                                                value={this.state.dataToPost.province} />
                                            <p style={{ color: "red" }}>
                                                {this.validator.message('province', this.state.dataToPost.province, 'required')}
                                            </p> */}
                                                <label htmlFor="">CANTON:</label><br />
                                                {/* {/* <input className="uni-input md" type="text" name="canton"
                                                placeholder="canton"
                                                onChange={this.inputChangeHandler}
                                                value={this.state.dataToPost.canton} /> */}
                                                <Select className="cstm-select f-w"
                                                    options={optioncanton} name="canton"
                                                    style={{ "width": "100" }}
                                                    placeholder="Select Canton"
                                                    onChange={(e) => this.cantonChangeHandler(e, 'canton')}
                                                    value={this.state.dataToPost.canton}
                                                    isDisabled={this.state.cantonIsDisabled}
                                                />
                                                <p className="error-txt" style={{ color: "red" }}>
                                                    {this.validator.message('canton', this.state.dataToPost.canton, 'required')}
                                                </p>
                                                <br />

                                                {/* <Select className="cstm-select" options={optioncanton} name="canton"
                                                placeholder="Canton"
                                                onChange={this.selectChangeHandler}
                                                value={this.state.dataToPost.canton} />
                                            <p style={{ color: "red" }}>
                                                {this.validator.message('canton', this.state.dataToPost.canton, 'required')}
                                            </p> */}
                                                <label htmlFor="">DISTRITO:</label><br />

                                                {/* <input className="uni-input md" type="text" name="district"
                                                placeholder="district"
                                                onChange={this.inputChangeHandler}
                                                value={this.state.dataToPost.district} /> */}
                                                <Select className="cstm-select f-w"
                                                    options={optiondistrict} name="district"
                                                    style={{ "width": "100" }}
                                                    placeholder="Select District"
                                                    onChange={(e) => this.distritoChangeHandler(e, 'district')}
                                                    value={this.state.dataToPost.district}
                                                    isDisabled={this.state.distritoIsDisabled}
                                                />
                                                <p className-="error-txt" style={{ color: "red" }}>
                                                    {this.validator.message('district', this.state.dataToPost.district, 'required')}
                                                </p>
                                                <br />
                                                {/* <Select className="cstm-select" options={optiondistrict} name="district"
                                                placeholder="Distrito"
                                                onChange={this.selectChangeHandler}
                                                value={this.state.dataToPost.district} />
                                            <p style={{ color: "red" }}>
                                                {this.validator.message('district', this.state.dataToPost.district, 'required')}
                                            </p> */}
                                                <label htmlFor="">BARRIO:</label><br />
                                                <input className="uni-input" type="text" name="neighborhood"
                                                    placeholder="neighborhood"
                                                    onChange={this.inputChangeHandler}
                                                    value={this.state.dataToPost.neighborhood} />
                                                {/* <Select className="cstm-select full-width mini float-left"
                                                options={optionprovince} name="neighborhood"
                                                style={{"width": "100"}}
                                                placeholder="---"
                                                onChange={(e) => this.timeSelectChangeHandler(e, 'neighborhood')}
                                                value={this.state.dataToPost.neighborhood} isDisabled={false}
                                            /> */}
                                                <p className-="error-txt" style={{ color: "red" }}>
                                                    {this.validator.message('neighborhood', this.state.dataToPost.neighborhood, 'required')}
                                                </p>
                                                <br />
                                                <label htmlFor="">Direccion:</label>
                                                <textarea className="uni-input tarea" name="otherSigns"
                                                    placeholder="Direccion"
                                                    onChange={this.inputChangeHandler}
                                                    value={this.state.dataToPost.otherSigns} id="" cols="30"
                                                    rows="10"></textarea>
                                                <p className-="error-txt" style={{ color: "red" }}>
                                                    {this.validator.message('otherSigns', this.state.dataToPost.otherSigns, 'required')}
                                                </p>
                                            </div>
                                        </div>
                                        {/* This section will be go inside tab end */}

                                        {/* This section will be go inside tab start */}

                                        <div
                                            className={"col col-md-4 col-lg-4 col-sm-12 col-xs-12 " + (this.state.formTab.scheduleTab ? '' : 'hidden')}>
                                            <h3 style={{ marginBottom: '55px' }} className="mb-hidden">Horario</h3>
                                            <div className="hor-inline">
                                                <Checkbox
                                                    onChange={this.checkboxChangeHandler} name="mondayEnable"
                                                    value="Lunes"
                                                    checked={this.state.dataToPost.mondayEnable} id="mondayEnable"
                                                /> <label htmlFor="mondayEnable" className="chk-label">Lunes</label>
                                                <div className="time-block">
                                                    <Select className="cstm-select mini float-left"
                                                        options={optionTime} name="mondayOpen"
                                                        placeholder="Seleccionar"
                                                        onChange={(e) => this.timeSelectChangeHandler(e, 'mondayOpen')}
                                                        value={this.state.dataToPost.mondayOpen}
                                                        isDisabled={!this.state.dataToPost.mondayEnable}
                                                    />

                                                    <span className="dash">-</span>
                                                    <Select className="cstm-select mini float-right"
                                                        options={optionTime} name="mondayClose"
                                                        placeholder="Seleccionar"
                                                        onChange={(e) => this.timeSelectChangeHandler(e, 'mondayClose')}
                                                        value={this.state.dataToPost.mondayClose}
                                                        isDisabled={!this.state.dataToPost.mondayEnable}
                                                    />
                                                    <div className="error-show">
                                                        <p style={{ color: "red" }}>
                                                            {this.state.customErrors.mondayOpen}
                                                        </p>
                                                        <p style={{ color: "red" }}>
                                                            {this.state.customErrors.mondayClose}
                                                        </p>
                                                    </div>
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
                                                        onChange={(e) => this.timeSelectChangeHandler(e, 'tuesdayOpen')}
                                                        value={this.state.dataToPost.tuesdayOpen}
                                                        isDisabled={!this.state.dataToPost.tuesdayEnable}
                                                    />

                                                    <span className="dash">-</span>
                                                    <Select className="cstm-select mini float-right"
                                                        options={optionTime} name="tuesdayClose"
                                                        placeholder="Seleccionar"
                                                        onChange={(e) => this.timeSelectChangeHandler(e, 'tuesdayClose')}
                                                        value={this.state.dataToPost.tuesdayClose}
                                                        isDisabled={!this.state.dataToPost.tuesdayEnable}
                                                    />
                                                    <div className="error-show">
                                                        <p style={{ color: "red" }}>
                                                            {this.state.customErrors.tuesdayOpen}
                                                        </p>
                                                        <p style={{ color: "red" }}>
                                                            {this.state.customErrors.tuesdayClose}
                                                        </p>
                                                    </div>
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
                                                        onChange={(e) => this.timeSelectChangeHandler(e, 'wednesdayOpen')}
                                                        value={this.state.dataToPost.wednesdayOpen}
                                                        isDisabled={!this.state.dataToPost.wednesdayEnable}
                                                    />

                                                    <span className="dash">-</span>
                                                    <Select className="cstm-select mini float-right"
                                                        options={optionTime} name="wednesdayClose"
                                                        placeholder="Seleccionar"
                                                        onChange={(e) => this.timeSelectChangeHandler(e, 'wednesdayClose')}
                                                        value={this.state.dataToPost.wednesdayClose}
                                                        isDisabled={!this.state.dataToPost.wednesdayEnable}
                                                    />
                                                    <div className="error-show">
                                                        <p style={{ color: "red" }}>
                                                            {this.state.customErrors.wednesdayOpen}
                                                        </p>
                                                        <p style={{ color: "red" }}>
                                                            {this.state.customErrors.wednesdayClose}
                                                        </p>
                                                    </div>

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
                                                        onChange={(e) => this.timeSelectChangeHandler(e, 'thursdayOpen')}
                                                        value={this.state.dataToPost.thursdayOpen}
                                                        isDisabled={!this.state.dataToPost.thursdayEnable}
                                                    />

                                                    <span className="dash">-</span>
                                                    <Select className="cstm-select mini float-right"
                                                        options={optionTime} name="thursdayClose"
                                                        placeholder="Seleccionar"
                                                        onChange={(e) => this.timeSelectChangeHandler(e, 'thursdayClose')}
                                                        value={this.state.dataToPost.thursdayClose}
                                                        isDisabled={!this.state.dataToPost.thursdayEnable}
                                                    />
                                                    <div className="error-show">
                                                        <p style={{ color: "red" }}>
                                                            {this.state.customErrors.thursdayOpen}
                                                        </p>
                                                        <p style={{ color: "red" }}>
                                                            {this.state.customErrors.thursdayClose}
                                                        </p>
                                                    </div>
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
                                                        onChange={(e) => this.timeSelectChangeHandler(e, 'fridayOpen')}
                                                        value={this.state.dataToPost.fridayOpen}
                                                        isDisabled={!this.state.dataToPost.fridayEnable}
                                                    />

                                                    <span className="dash">-</span>
                                                    <Select className="cstm-select mini float-right"
                                                        options={optionTime} name="fridayClose"
                                                        placeholder="Seleccionar"
                                                        onChange={(e) => this.timeSelectChangeHandler(e, 'fridayClose')}
                                                        value={this.state.dataToPost.fridayClose}
                                                        isDisabled={!this.state.dataToPost.fridayEnable}
                                                    />
                                                    <div className="error-show">
                                                    <p style={{ color: "red" }}>
                                                        {this.state.customErrors.fridayOpen}
                                                    </p>
                                                    <p style={{ color: "red" }}>
                                                        {this.state.customErrors.fridayClose}
                                                    </p>
                                                </div>
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
                                                        onChange={(e) => this.timeSelectChangeHandler(e, 'saturdayOpen')}
                                                        value={this.state.dataToPost.saturdayOpen}
                                                        isDisabled={!this.state.dataToPost.saturdayEnable}
                                                    />

                                                    <span className="dash">-</span>
                                                    <Select className="cstm-select mini float-right"
                                                        options={optionTime} name="saturdayClose"
                                                        placeholder="Seleccionar"
                                                        onChange={(e) => this.timeSelectChangeHandler(e, 'saturdayClose')}
                                                        value={this.state.dataToPost.saturdayClose}
                                                        isDisabled={!this.state.dataToPost.saturdayEnable}
                                                    />
                                                    <div className="error-show">
                                                        <p style={{ color: "red" }}>
                                                            {this.state.customErrors.saturdayOpen}
                                                        </p>
                                                        <p style={{ color: "red" }}>
                                                            {this.state.customErrors.saturdayClose}
                                                        </p>
                                                    </div>
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
                                                        onChange={(e) => this.timeSelectChangeHandler(e, 'sundayOpen')}
                                                        value={this.state.dataToPost.sundayOpen}
                                                        isDisabled={!this.state.dataToPost.sundayEnable}
                                                    />

                                                    <span className="dash">-</span>
                                                    <Select className="cstm-select mini float-right"
                                                        options={optionTime} name="sundayClose"
                                                        placeholder="Seleccionar"
                                                        onChange={(e) => this.timeSelectChangeHandler(e, 'sundayClose')}
                                                        value={this.state.dataToPost.sundayClose}
                                                        isDisabled={!this.state.dataToPost.sundayEnable}
                                                    />
                                                    <div className="error-show">
                                                        <p style={{ color: "red" }}>
                                                            {this.state.customErrors.sundayOpen}
                                                        </p>
                                                        <p style={{ color: "red" }}>
                                                            {this.state.customErrors.sundayClose}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="text-center" style={{ width: '100%' }}>
                                            <button className="btn-theme" type="submit">GUARDAR</button>
                                        </div>

                                        {/* This section will be go inside tab end */}

                                    </div>
                                </form>
                            } {/* This bracket is loader end */}
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
            getRestaurantFormData, updateRestaurantFormData, getDefaultConfigData
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