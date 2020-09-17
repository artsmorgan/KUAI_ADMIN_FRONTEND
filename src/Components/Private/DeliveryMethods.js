import React from 'react';
import Switch from "react-switch";
import Checkbox from '@opuscapita/react-checkbox';
import Navbar from "./Child/Fixed/Navbar/Navbar";
import Sidebar from "./Child/Fixed/Sidebar/Sidebar";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getDeliveryMethodFormData, updateDeliveryMethodFormData,} from '../../actions';
import LoaderInScreen from "../Public/LoaderInScreen";

class DeliveryMethods extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      form: {
        ...props.delivery
      },

      checked: false,
      errorMessage: "este campo es requerido",
      errors: {
        paraLlevarEnabled: {
          deliveryOptions: "",
        },
        entregaParqueoEnabled: {
          entregaParqueoOptions: "",
        },
        expressEnabled: {
          expressPrecioEnvio: "",
          expressCada: "",
        }
      },
      dataToPost: {
        restaurantId: localStorage.getItem('restaurantId'),
        comerRestauranteEnabled: false,
        acceptReservations: false,
        paraLlevarEnabled: false,
        deliveryOptions: "",
        servicioHabitacionEnabled: false,
        entregaParqueoEnabled: false,
        entregaParqueoOptions: "",
        expressEnabled: false,
        expressPrecioEnvio: "",
        expressCada: "",
        expressEnvioGratisEnabled: false,
        id: null
      }
    };


    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, switchName) {
    let obj = this.state.dataToPost;
    obj[switchName] = e;
    this.setState({dataToPost: obj});
    // console.log(this.state.dataToPost)
  }


  CheckboxChangeHandler = (e, switchName) => {
    let obj = this.state.dataToPost;
    let value = !obj[switchName];
    obj[switchName] = value;
    this.setState({dataToPost: obj});
    // console.log(this.state.dataToPost)
  }

  inputChangeHandler = (e, switchName) => {
    let obj = this.state.dataToPost;
    let value = e.target.value;
    obj[switchName] = value;
    this.setState({dataToPost: obj});
    // console.log(this.state.dataToPost)
    this.handleCustomValidation()
  }

  processDeliveryLogic() {
    let formData = this.state.dataToPost;
    if (!formData.comerRestauranteEnabled) {
      formData.acceptReservations = false;
    }
    if(!formData.paraLlevarEnabled){
      formData.deliveryOptions = '';
    }
    if (!formData.entregaParqueoEnabled) {
      formData.entregaParqueoOptions = '';
    }
    if (!formData.expressEnabled) {
      formData.expressPrecioEnvio = 0;
      formData.expressCada = 'km';
      formData.expressEnvioGratisEnabled = false;
    }
    this.setState({...this.state, dataToPost: formData})
  }

  formSubmitHandler = (e) => {
    this.processDeliveryLogic();
    this.processSubmit();
  };

  processSubmit() {
    if (this.handleCustomValidation()) {
      this.props.updateDeliveryMethodFormData({
        restaurantId: localStorage.getItem('restaurantId'),
        form: this.state.dataToPost
      })
    }

  }

  handleCustomValidation() {
    let errors = this.state.errors;
    let formIsValid = true;

    let obj = this.state.dataToPost;
    // console.log(obj)
    for (const [key, value] of Object.entries(obj)) {
      let field = key;
      if (field in errors && value) {
        // console.log(field)
        for (const [k, v] of Object.entries(errors[field])) {
          // console.log(obj[k]);
          if (!obj[k]) {
            errors[field][k] = this.state.errorMessage
            formIsValid = false
          } else {
            errors[field][k] = "";
          }
        }
      }
    }

    // console.log(errors)
    this.setState({errors: errors});

    // console.log(this.state.errors)
    return formIsValid;
    //console.log(`${key}: ${value}`);
  }

  componentWillMount() {
    this.props.getDeliveryMethodFormData({restaurantId: localStorage.getItem('restaurantId')})

  }

  getBool(string) {
    if(!string){
      return false
    }
    switch(string.toLowerCase().trim()){
      case "true": case "yes": case "1": return true;
      case "false": case "no": case "0": case null: return false;
      default: return Boolean(string);
    }
  }

  componentDidUpdate(previousProps) {
    if (previousProps.delivery.loading && !this.props.delivery.loading) {
      const delivery = this.props.delivery;
      this.setState({
        dataToPost: {
          comerRestauranteEnabled: (delivery.comerRestaurante) ? this.getBool(delivery.comerRestaurante.enabled) : false,
          acceptReservations: (delivery.comerRestaurante)  ? this.getBool(delivery.comerRestaurante.acceptReservations) :  false,
          paraLlevarEnabled: (delivery.paraLlevar) ? this.getBool(delivery.paraLlevar.enabled) : false,
          deliveryOptions: (delivery.paraLlevar) ?  delivery.paraLlevar.deliveryOptions : '',
          servicioHabitacionEnabled: (delivery.servicioHabitacion) ? this.getBool(delivery.servicioHabitacion) : false,
          entregaParqueoEnabled: (delivery.entregaParqueo) ?  this.getBool(delivery.entregaParqueo.enabled) : false,
          entregaParqueoOptions: (delivery.entregaParqueo) ? delivery.entregaParqueo.entregaParqueoOptions : '',
          expressEnabled: (delivery.express) ? this.getBool(delivery.express.enabled) : false,
          expressPrecioEnvio: (delivery.express)  ? delivery.express.precioEnvio : '',
          expressCada:(delivery.express) ? delivery.express.cada :  '',
          expressEnvioGratisEnabled: (delivery.express)  ? this.getBool(delivery.express.envioGratis) : false,
          id: delivery.id,
          restaurantId: localStorage.getItem('restaurantId')
        }
      });

    }
  }

  render() {
    return (
        <>
          <Sidebar/>
          <div className="wrapper">
            <Navbar/>
            <div className="flex-area content container-fluid">
              <h3 className="text-center" style={{marginBottom: '35px'}}>Métodos de entrega</h3>
              <div className="row">
                <div className="collapse-area col col-md-6 col-lg-6 col-sm-12 col-xs-12">
                  {this.props.delivery.loading ? <LoaderInScreen/> : this.renderMethods()}

                </div>
              </div>
            </div>
          </div>
        </>
    );
  }

  renderMethods() {
    return <>
      <div className="collapse-container ca-delivery">
        <div
            className={"collapse-header " + (this.state.dataToPost.comerRestauranteEnabled ? 'active' : '')}>
          <svg width="28" height="29" viewBox="0 0 28 29" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0)">
              <path
                  d="M1.31213 11.9594V23.4173C1.31213 24.0331 1.80257 24.5338 2.40588 24.5338C3.0092 24.5338 3.49963 24.0331 3.49963 23.4173V11.9594C4.25257 11.7597 4.81213 11.0661 4.81213 10.2363V4.87606C4.81213 4.62908 4.61657 4.42944 4.37463 4.42944C4.1327 4.42944 3.93713 4.62908 3.93713 4.87606V8.44897H3.49963V4.87606C3.49963 4.62908 3.30407 4.42944 3.06213 4.42944C2.8202 4.42944 2.62463 4.62908 2.62463 4.87606V8.44897H2.18713V4.87606C2.18713 4.62908 1.99157 4.42944 1.74963 4.42944C1.5077 4.42944 1.31213 4.62908 1.31213 4.87606V8.44897H0.874634V4.87606C0.874634 4.62908 0.679071 4.42944 0.437134 4.42944C0.195196 4.42944 -0.000366211 4.62908 -0.000366211 4.87606V10.2363C-0.000366211 11.0661 0.559196 11.7597 1.31213 11.9594ZM2.62463 23.4177C2.62463 23.5405 2.5262 23.641 2.40588 23.641C2.28557 23.641 2.18713 23.5405 2.18713 23.4177V12.0228H2.62463V23.4177ZM0.874634 9.3422H3.93713V10.2363C3.93713 10.7289 3.5447 11.1296 3.06213 11.1296H1.74963C1.26707 11.1296 0.874634 10.7289 0.874634 10.2363V9.3422Z"
                  fill="#3F3356"/>
              <path
                  d="M24.9366 4.42505C24.6947 4.42505 24.4991 4.62469 24.4991 4.87166C24.4991 4.87434 24.5005 4.87613 24.5005 4.87836V4.87881V23.4178C24.5005 24.0337 24.9909 24.5343 25.5942 24.5343C26.1975 24.5343 26.688 24.0337 26.688 23.4178V15.5993H27.563C27.8049 15.5993 28.0005 15.3997 28.0005 15.1527V7.55224C28.0005 5.82787 26.6258 4.42505 24.9366 4.42505ZM25.813 23.4178C25.813 23.5406 25.7145 23.6411 25.5942 23.6411C25.4739 23.6411 25.3755 23.5406 25.3755 23.4178V15.5993H25.813V23.4178ZM27.1255 14.7061H25.3755V5.36383C26.3725 5.57196 27.1255 6.47412 27.1255 7.55224V14.7061Z"
                  fill="#3F3356"/>
              <path
                  d="M14.2184 4.42407C8.79076 4.42407 4.37463 8.9322 4.37463 14.4729C4.37463 20.0136 8.79076 24.5217 14.2184 24.5217C19.646 24.5217 24.0621 20.0136 24.0621 14.4729C24.0621 8.9322 19.646 4.42407 14.2184 4.42407ZM14.2184 23.6285C9.27288 23.6285 5.24963 19.5214 5.24963 14.4729C5.24963 9.42437 9.27288 5.3173 14.2184 5.3173C19.1639 5.3173 23.1871 9.42437 23.1871 14.4729C23.1871 19.5214 19.1639 23.6285 14.2184 23.6285Z"
                  fill="#3F3356"/>
              <path
                  d="M14.2184 7.55054C10.4791 7.55054 7.43713 10.6558 7.43713 14.4731C7.43713 18.2903 10.4791 21.3956 14.2184 21.3956C17.9577 21.3956 20.9996 18.2903 20.9996 14.4731C20.9996 10.6558 17.9577 7.55054 14.2184 7.55054ZM14.2184 20.5024C10.9616 20.5024 8.31213 17.7977 8.31213 14.4731C8.31213 11.1485 10.9616 8.44377 14.2184 8.44377C17.4751 8.44377 20.1246 11.1485 20.1246 14.4731C20.1246 17.7977 17.4751 20.5024 14.2184 20.5024Z"
                  fill="#3F3356"/>
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="28" height="28.5833" fill="white"
                      transform="translate(0 0.1875)"/>
              </clipPath>
            </defs>
          </svg>

          <span>
                                            Comer en restaurante
                                </span>
          <svg className="arrow" width="7" height="10" viewBox="0 0 7 10" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
                d="M-9.50382e-08 8.82578C-5.76932e-08 9.68013 1.00212 10.141 1.65079 9.58504L6.1142 5.75926C6.57981 5.36016 6.57981 4.63984 6.1142 4.24074L1.65079 0.414964C1.00212 -0.141042 -4.66843e-07 0.319867 -4.29498e-07 1.17422L-9.50382e-08 8.82578Z"
                fill="#3F3356"/>
          </svg>
          <Switch
              checked={this.state.dataToPost.comerRestauranteEnabled}
              onChange={(e) => this.handleChange(e, 'comerRestauranteEnabled')}
              handleDiameter={28}
              offColor="#E0E0E0"
              onColor="#f5f5f5"
              offHandleColor="#ffffff"
              onHandleColor="#24DFF7"
              height={34}
              width={60}
              className="react-switch"
              id="small-radius-switch"
          />
        </div>
        <div className={"collapse-content " + (this.state.dataToPost.comerRestauranteEnabled ? '' : 'collapse')}>
          <div className="col">
            <Checkbox id="acceptReservations" name="acceptReservations"
                      onChange={(e) => this.CheckboxChangeHandler(e, 'acceptReservations')}
                      checked={this.state.dataToPost.acceptReservations}/>
            <label htmlFor="" className="chk-label">Se aceptan reservaciones</label>
          </div>
        </div>
      </div>
      <div className="collapse-container ca-delivery">
        <div
            className={"collapse-header " + (this.state.dataToPost.paraLlevarEnabled ? 'active' : '')}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
                d="M17.6876 13.3601L16.198 14.7405C16.162 14.7733 16.1148 14.7909 16.0662 14.7897C16.0176 14.7885 15.9713 14.7687 15.9369 14.7343C15.9025 14.6999 15.8827 14.6537 15.8815 14.605C15.8804 14.5564 15.898 14.5092 15.9307 14.4733L17.3112 12.9837C17.3438 12.9484 17.3616 12.9018 17.3606 12.8537C17.3597 12.8057 17.3402 12.7598 17.3062 12.7258L17.2751 12.6947C17.2411 12.6608 17.1953 12.6412 17.1472 12.6403C17.0991 12.6394 17.0526 12.6571 17.0173 12.6898L15.5276 14.0702C15.4916 14.1029 15.4444 14.1205 15.3958 14.1194C15.3472 14.1182 15.3009 14.0984 15.2665 14.064C15.2321 14.0296 15.2123 13.9833 15.2111 13.9347C15.21 13.8861 15.2276 13.8389 15.2603 13.8029L16.6408 12.3133C16.6741 12.278 16.6922 12.231 16.6912 12.1824C16.6903 12.1339 16.6704 12.0876 16.6359 12.0535C16.6013 12.0195 16.5547 12.0002 16.5062 12C16.4576 11.9998 16.4109 12.0185 16.376 12.0523L14.6727 13.6744C14.4959 13.8435 14.3768 14.064 14.3321 14.3046C14.2875 14.5452 14.3197 14.7937 14.4241 15.015L13.4752 15.9193L12.6795 15.1605C12.8555 14.8589 12.9267 14.5075 12.882 14.1612C12.8373 13.8149 12.6793 13.4931 12.4326 13.246C11.8145 12.6279 10.1433 11.959 9.52539 12.5769C8.90749 13.1948 9.57637 14.8661 10.1945 15.484C10.4416 15.7307 10.7635 15.8887 11.1098 15.9333C11.4561 15.978 11.8075 15.9068 12.1091 15.7309L12.8551 16.5123L9.18723 20.005C9.12995 20.057 9.08384 20.1202 9.05169 20.1906C9.01954 20.2609 9.00201 20.3371 9.00016 20.4145C8.99832 20.4919 9.0122 20.5688 9.04096 20.6407C9.06973 20.7125 9.11278 20.7778 9.16751 20.8325C9.22223 20.8872 9.2875 20.9303 9.35935 20.959C9.43121 20.9878 9.50815 21.0017 9.58552 20.9998C9.6629 20.998 9.73909 20.9805 9.80949 20.9483C9.87989 20.9162 9.94304 20.8701 9.99509 20.8128L13.4745 17.1628L16.9531 20.8128C17.0052 20.8701 17.0683 20.9162 17.1387 20.9483C17.2091 20.9805 17.2853 20.998 17.3627 20.9998C17.4401 21.0017 17.517 20.9878 17.5889 20.959C17.6607 20.9303 17.726 20.8872 17.7807 20.8325C17.8354 20.7778 17.8785 20.7125 17.9073 20.6407C17.936 20.5688 17.9499 20.4919 17.9481 20.4145C17.9462 20.3371 17.9287 20.2609 17.8965 20.1906C17.8644 20.1202 17.8183 20.057 17.761 20.005L14.0956 16.5111L14.9858 15.5772C15.2071 15.6816 15.4557 15.7138 15.6963 15.6691C15.9369 15.6245 16.1574 15.5054 16.3265 15.3286L17.9477 13.6249C17.9815 13.59 18.0002 13.5433 18 13.4947C17.9998 13.4462 17.9805 13.3996 17.9465 13.3651C17.9124 13.3305 17.8661 13.3106 17.8176 13.3097C17.769 13.3088 17.722 13.3269 17.6866 13.3601H17.6876Z"
                fill="#3F3356"/>
            <path
                d="M22.9972 27.4968L20.5092 4.94009C20.5092 4.93725 20.507 4.93493 20.5065 4.93209C20.4934 4.8236 20.4429 4.72384 20.3644 4.65163C20.2858 4.57942 20.1847 4.53974 20.0802 4.54009H19.5672C19.5072 3.83636 19.3048 3.15402 18.9733 2.53834C18.6418 1.92267 18.1888 1.38774 17.6445 0.969059C17.1001 0.550379 16.4768 0.257524 15.8159 0.109929C15.155 -0.0376657 14.4717 -0.0366245 13.8112 0.112984C13.1507 -0.0366245 12.4674 -0.0376657 11.8065 0.109929C11.1456 0.257524 10.5223 0.550379 9.97791 0.969059C9.43355 1.38774 8.98059 1.92267 8.6491 2.53834C8.31761 3.15402 8.11516 3.83636 8.05519 4.54009H7.15987C7.0513 4.54011 6.94672 4.58288 6.86694 4.65987C6.78717 4.73686 6.73805 4.84243 6.72937 4.95557L5.00143 27.5123C4.99658 27.5744 5.00412 27.6369 5.02356 27.6959C5.043 27.7549 5.07392 27.809 5.11438 27.8548C5.15483 27.9006 5.20394 27.9372 5.2586 27.9622C5.31326 27.9872 5.37227 28.0001 5.43193 28H22.5681C22.629 28 22.6892 27.9865 22.7448 27.9605C22.8003 27.9344 22.85 27.8964 22.8905 27.8489C22.931 27.8014 22.9615 27.7454 22.9798 27.6847C22.9982 27.6241 23.0041 27.56 22.9972 27.4968ZM18.6998 4.54009H17.5606C17.4995 3.84512 17.2995 3.17132 16.9735 2.56228C16.6475 1.95325 16.2028 1.42257 15.6682 1.0046C16.4622 1.19165 17.1808 1.63261 17.7241 2.2662C18.2674 2.8998 18.6084 3.69457 18.6998 4.54009ZM13.811 1.04511C14.5718 1.25727 15.2537 1.70423 15.7679 2.32769C16.282 2.95115 16.6045 3.72215 16.6932 4.54009H10.929C11.0176 3.72217 11.34 2.95118 11.8541 2.32772C12.3683 1.70425 13.0502 1.25728 13.811 1.04511ZM11.9539 1.00486C11.4193 1.42284 10.9747 1.95353 10.6487 2.56255C10.3227 3.17158 10.1227 3.84538 10.0616 4.54035H8.92237C9.01363 3.69468 9.35464 2.89975 9.89798 2.26605C10.4413 1.63234 11.16 1.19134 11.9542 1.00434L11.9539 1.00486ZM7.55853 5.44357H19.646L19.5472 27.097H5.89995L7.55853 5.44357ZM20.4102 27.0968L20.4773 12.5357L22.0833 27.0968H20.4102Z"
                fill="#3F3356"/>
          </svg>
          <span>
                                            Para llevar
                                </span>
          <svg className="arrow" width="7" height="10" viewBox="0 0 7 10" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
                d="M-9.50382e-08 8.82578C-5.76932e-08 9.68013 1.00212 10.141 1.65079 9.58504L6.1142 5.75926C6.57981 5.36016 6.57981 4.63984 6.1142 4.24074L1.65079 0.414964C1.00212 -0.141042 -4.66843e-07 0.319867 -4.29498e-07 1.17422L-9.50382e-08 8.82578Z"
                fill="#3F3356"/>
          </svg>
          <Switch
              checked={this.state.dataToPost.paraLlevarEnabled}
              onChange={(e) => this.handleChange(e, 'paraLlevarEnabled')}
              handleDiameter={28}
              offColor="#E0E0E0"
              onColor="#f5f5f5"
              offHandleColor="#ffffff"
              onHandleColor="#24DFF7"
              height={34}
              width={60}
              className="react-switch"
              id="small-radius-switch"
          />
        </div>
        <div className={"collapse-content " + (this.state.dataToPost.paraLlevarEnabled ? '' : 'collapse')}>
          <div className="col">
            <label htmlFor="">Zona de Entrega</label>
            <textarea name="" id="" cols="30" rows="10" className="uni-input tarea" name="entrega"
                      onChange={(e) => this.inputChangeHandler(e, 'deliveryOptions')}
                      value={this.state.dataToPost.deliveryOptions}></textarea>
            <p style={{color: "red"}}>
              {this.state.errors.paraLlevarEnabled.deliveryOptions}
            </p>
          </div>
        </div>
      </div>
      <div className="collapse-container ca-delivery">
        <div
            className={"collapse-header " + (this.state.dataToPost.servicioHabitacionEnabled ? 'active' : '')}>
          <svg width="27" height="27" viewBox="0 0 27 27" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0)">
              <path
                  d="M25.4758 23.9515H17.8548V23.803L20.6393 22.6098C20.6903 22.588 20.7364 22.5566 20.7756 22.5174L21.4275 21.8655L23.3463 22.9734C23.4129 23.0117 23.4883 23.0318 23.564 23.0318C23.6019 23.0318 23.6398 23.027 23.6768 23.0169C23.7883 22.9873 23.8837 22.9142 23.9412 22.814L24.8121 21.3055C28.1684 15.4922 26.5327 8.14648 21.2473 4.25718C21.5412 4.10999 21.7981 3.88092 21.9745 3.57565C22.2071 3.17282 22.2689 2.70337 22.1483 2.25395C22.0281 1.80453 21.7398 1.42871 21.3365 1.19616C20.5039 0.71626 19.437 1.00237 18.957 1.83371C18.785 2.13202 18.708 2.4669 18.7271 2.80266C12.7166 0.171905 5.53935 2.42858 2.18352 8.24055L1.31255 9.74906C1.19235 9.95766 1.26377 10.2237 1.47194 10.3439L11.1162 15.9125C10.9855 15.9721 10.8597 16.0401 10.7412 16.1193C8.81289 16.1829 7.23774 17.4876 7.00127 19.1612H3.91935C3.74995 19.1612 3.59579 19.2596 3.52437 19.4129C3.45295 19.5666 3.4769 19.7478 3.58621 19.8771L5.76363 22.4617C5.8111 22.5179 5.87206 22.561 5.94087 22.5876L9.14516 23.8152V23.9515H1.52419C0.68371 23.9515 0 24.6352 0 25.4757C0 26.3162 0.68371 26.9999 1.52419 26.9999H25.4758C26.3163 26.9999 27 26.3162 27 25.4757C27 24.6352 26.3163 23.9515 25.4758 23.9515ZM19.7109 2.26876C19.8724 1.98961 20.1655 1.83328 20.4669 1.83328C20.6145 1.83328 20.7639 1.87116 20.9006 1.94999C21.1022 2.06626 21.2464 2.25395 21.3065 2.47866C21.3666 2.70337 21.3357 2.9381 21.2194 3.13929C21.1031 3.34092 20.9154 3.48507 20.6907 3.54516C20.4651 3.60526 20.2313 3.57434 20.0296 3.45807C19.8285 3.34266 19.6847 3.15453 19.6242 2.92982C19.5637 2.70511 19.595 2.47039 19.7109 2.26876ZM2.28498 9.80742L2.93821 8.67603C4.56648 5.8554 7.19594 3.83781 10.3419 2.99471C13.4887 2.15161 16.774 2.58405 19.5946 4.21276C25.4175 7.57469 27.4194 15.0467 24.0579 20.8696L23.4046 22.001L2.28498 9.80742ZM9.84977 17.1431C9.67906 17.4898 9.58065 17.8782 9.58065 18.2902H10.4516C10.4516 17.3295 11.2329 16.5483 12.1935 16.5483V16.5343L16.7435 19.1612H7.88444C8.06865 18.2258 8.83292 17.4597 9.84977 17.1431ZM6.35763 21.8146L4.85565 20.0321H18.252L20.6467 21.4148L20.2191 21.8424L17.2478 23.1158C17.0875 23.1842 16.9839 23.3418 16.9839 23.516V23.9515H10.0161V23.516C10.0161 23.3357 9.90508 23.1737 9.73655 23.1093L6.35763 21.8146ZM25.4758 26.1289H1.52419C1.16405 26.1289 0.870968 25.8358 0.870968 25.4757C0.870968 25.1155 1.16405 24.8225 1.52419 24.8225H9.58065H17.4194H25.4758C25.836 24.8225 26.129 25.1155 26.129 25.4757C26.129 25.8358 25.836 26.1289 25.4758 26.1289Z"
                  fill="#3F3356"/>
              <path d="M18.7257 16.9839H17.8547V17.8549H18.7257V16.9839Z"
                    fill="#3F3356"/>
              <path d="M20.9032 18.2903H20.0322V19.1613H20.9032V18.2903Z"
                    fill="#3F3356"/>
              <path d="M23.0806 19.5969H22.2096V20.4679H23.0806V19.5969Z"
                    fill="#3F3356"/>
              <path
                  d="M4.79032 2.17742C3.82964 2.17742 3.04839 1.39616 3.04839 0.435484C3.04839 0.195097 2.85329 0 2.6129 0C2.37252 0 2.17742 0.195097 2.17742 0.435484C2.17742 1.39616 1.39616 2.17742 0.435484 2.17742C0.195097 2.17742 0 2.37252 0 2.6129C0 2.85329 0.195097 3.04839 0.435484 3.04839C1.39616 3.04839 2.17742 3.82964 2.17742 4.79032C2.17742 5.03071 2.37252 5.22581 2.6129 5.22581C2.85329 5.22581 3.04839 5.03071 3.04839 4.79032C3.04839 3.82964 3.82964 3.04839 4.79032 3.04839C5.03071 3.04839 5.22581 2.85329 5.22581 2.6129C5.22581 2.37252 5.03071 2.17742 4.79032 2.17742ZM2.6129 3.34713C2.41955 3.05666 2.16915 2.80626 1.87824 2.6129C2.16915 2.41955 2.41955 2.16915 2.6129 1.87824C2.80626 2.16915 3.05666 2.41955 3.34713 2.6129C3.05666 2.80626 2.80626 3.05666 2.6129 3.34713Z"
                  fill="#3F3356"/>
              <path
                  d="M5.66129 15.2419C4.70062 15.2419 3.91936 14.4606 3.91936 13.4999C3.91936 13.2596 3.72426 13.0645 3.48387 13.0645C3.24349 13.0645 3.04839 13.2596 3.04839 13.4999C3.04839 14.4606 2.26713 15.2419 1.30646 15.2419C1.06607 15.2419 0.870972 15.437 0.870972 15.6774C0.870972 15.9177 1.06607 16.1128 1.30646 16.1128C2.26713 16.1128 3.04839 16.8941 3.04839 17.8548C3.04839 18.0952 3.24349 18.2903 3.48387 18.2903C3.72426 18.2903 3.91936 18.0952 3.91936 17.8548C3.91936 16.8941 4.70062 16.1128 5.66129 16.1128C5.90168 16.1128 6.09678 15.9177 6.09678 15.6774C6.09678 15.437 5.90168 15.2419 5.66129 15.2419ZM3.48387 16.412C3.29052 16.1211 3.04012 15.8707 2.74921 15.6774C3.04012 15.484 3.29052 15.2336 3.48387 14.9427C3.67723 15.2336 3.92763 15.4836 4.2181 15.6774C3.9272 15.8707 3.67723 16.1211 3.48387 16.412Z"
                  fill="#3F3356"/>
              <path
                  d="M11.7581 8.27434C10.7974 8.27434 10.0162 7.49309 10.0162 6.53241C10.0162 6.29202 9.82106 6.09692 9.58068 6.09692C9.34029 6.09692 9.14519 6.29202 9.14519 6.53241C9.14519 7.49309 8.36393 8.27434 7.40326 8.27434C7.16287 8.27434 6.96777 8.46944 6.96777 8.70983C6.96777 8.95021 7.16287 9.14531 7.40326 9.14531C8.36393 9.14531 9.14519 9.92657 9.14519 10.8872C9.14519 11.1276 9.34029 11.3227 9.58068 11.3227C9.82106 11.3227 10.0162 11.1276 10.0162 10.8872C10.0162 9.92657 10.7974 9.14531 11.7581 9.14531C11.9985 9.14531 12.1936 8.95021 12.1936 8.70983C12.1936 8.46944 11.9985 8.27434 11.7581 8.27434ZM9.58068 9.44449C9.38732 9.15359 9.13692 8.90362 8.84601 8.70983C9.13692 8.51647 9.38689 8.26607 9.58068 7.97517C9.77403 8.26607 10.0244 8.51604 10.3149 8.70983C10.0244 8.90318 9.77403 9.15359 9.58068 9.44449Z"
                  fill="#3F3356"/>
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="27" height="27" fill="white"/>
              </clipPath>
            </defs>
          </svg>


          <span>
                                            Servicio a la habitación
                                </span>
          <svg className="arrow" width="7" height="10" viewBox="0 0 7 10" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
                d="M-9.50382e-08 8.82578C-5.76932e-08 9.68013 1.00212 10.141 1.65079 9.58504L6.1142 5.75926C6.57981 5.36016 6.57981 4.63984 6.1142 4.24074L1.65079 0.414964C1.00212 -0.141042 -4.66843e-07 0.319867 -4.29498e-07 1.17422L-9.50382e-08 8.82578Z"
                fill="#3F3356"/>
          </svg>
          <Switch
              checked={this.state.dataToPost.servicioHabitacionEnabled}
              onChange={(e) => this.handleChange(e, 'servicioHabitacionEnabled')}
              handleDiameter={28}
              offColor="#E0E0E0"
              onColor="#f5f5f5"
              offHandleColor="#ffffff"
              onHandleColor="#24DFF7"
              height={34}
              width={60}
              className="react-switch"
              id="small-radius-switch"
          />
        </div>
        <div className="collapse-content">

        </div>
      </div>
      <div className="collapse-container ca-delivery">
        <div
            className={"collapse-header " + (this.state.dataToPost.entregaParqueoEnabled ? 'active' : '')}>
          <svg width="29" height="28" viewBox="0 0 29 28" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0)">
              <path d="M16.97 12.6091H15.1032V13.5427H16.97V12.6091Z" fill="#3F3356"/>
              <path
                  d="M1.03602 11.2138L4.20621 10.761C4.78427 10.4059 5.38416 10.088 6.00267 9.80908C8.04524 8.88389 10.2621 8.40648 12.5047 8.40895H13.0554C15.7018 8.41084 18.3059 9.07493 20.6303 10.3406L22.2302 11.2134C24.103 11.2345 25.9397 11.7326 27.5668 12.6601C28.228 13.0393 28.6363 13.7429 28.6375 14.5049V17.2761C28.6375 17.534 28.4286 17.7429 28.1707 17.7429H26.6036C26.0939 19.197 24.502 19.9627 23.0479 19.453C22.2475 19.1725 21.6184 18.5432 21.3379 17.7429H8.86902C8.35933 19.197 6.7674 19.9627 5.31333 19.453C4.51309 19.1725 3.88376 18.5432 3.60328 17.7429H3.43579C3.37635 17.7429 3.31748 17.7317 3.26222 17.7097L1.75061 17.1031C1.07533 16.8358 0.633049 16.1821 0.635517 15.4561V11.6758C0.635517 11.4437 0.806238 11.2468 1.03602 11.2138ZM22.1415 17.1829C22.348 18.193 23.3341 18.8445 24.3442 18.6381C25.3545 18.4317 26.006 17.4455 25.7996 16.4353C25.593 15.4252 24.6068 14.7736 23.5967 14.9801C22.7276 15.1576 22.1036 15.9223 22.1037 16.8096C22.1037 16.9349 22.1165 17.06 22.1415 17.1829ZM13.7031 16.8096H21.1704C21.1704 15.263 22.4239 14.0093 23.9705 14.0093C25.517 14.0093 26.7707 15.263 26.7707 16.8096H27.7041V14.5049C27.7035 14.0775 27.4745 13.6827 27.1034 13.4704C25.5804 12.6008 23.8573 12.1431 22.1037 12.1426H13.7031V16.8096ZM13.7031 11.2092H20.2733L20.1833 11.16C18.188 10.0757 15.9717 9.46099 13.7031 9.36281V11.2092ZM12.7698 9.3423H12.5056C10.6248 9.34022 8.76116 9.69723 7.01427 10.3944L7.82913 11.2092H12.7698V9.3423ZM4.40694 17.1829C4.61336 18.193 5.59951 18.8445 6.60978 18.6381C7.61986 18.4317 8.27141 17.4455 8.06499 16.4353C7.85856 15.4252 6.87222 14.7736 5.86214 14.9801C4.99297 15.1576 4.36896 15.9223 4.36915 16.8096C4.36915 16.9349 4.38187 17.06 4.40694 17.1829ZM1.56888 12.6092H2.96901V13.5427H1.56888V15.4561C1.56774 15.8001 1.77739 16.1096 2.09718 16.2359L3.43579 16.7735C3.43579 16.7306 3.44129 16.688 3.44414 16.6451C3.44699 16.6022 3.44794 16.5519 3.4525 16.5052C3.45724 16.4584 3.46655 16.4117 3.47396 16.3652C3.48155 16.3185 3.48706 16.2718 3.49636 16.2294C3.50567 16.1869 3.51934 16.1398 3.5315 16.0953C3.54365 16.0511 3.55296 16.0063 3.56701 15.9628C3.58087 15.9195 3.59777 15.8779 3.61353 15.8354C3.62948 15.793 3.64392 15.7492 3.66025 15.707C3.67658 15.665 3.69861 15.6269 3.71817 15.5872C3.73773 15.5475 3.75691 15.504 3.77875 15.4639C3.80078 15.4239 3.82546 15.3897 3.84654 15.3525C3.86743 15.315 3.89307 15.2725 3.91965 15.2343C3.94643 15.196 3.97112 15.1658 3.99675 15.1312C4.02239 15.0967 4.05144 15.056 4.08126 15.0201C4.11107 14.9842 4.13899 14.9561 4.16804 14.9267C4.19691 14.8975 4.22919 14.8578 4.26128 14.8251C4.29357 14.7924 4.32528 14.7666 4.35737 14.7378C4.38966 14.7089 4.42422 14.6747 4.45973 14.6443C4.49505 14.6141 4.53113 14.5908 4.56645 14.5642C4.60196 14.5376 4.63748 14.5091 4.6747 14.4842C4.71211 14.4595 4.75407 14.4377 4.79414 14.4115C4.8344 14.3853 4.86707 14.3648 4.90486 14.3448C4.94265 14.3247 4.98974 14.3036 5.03266 14.2831C5.07557 14.2626 5.10919 14.2444 5.14888 14.2277C5.18857 14.2108 5.24231 14.1931 5.28883 14.1764C5.33555 14.1595 5.36593 14.1464 5.40562 14.1339C5.45879 14.1175 5.5133 14.1058 5.56761 14.0923C5.60312 14.0839 5.63711 14.0727 5.673 14.0653C5.73035 14.0535 5.78922 14.0471 5.84752 14.0385C5.88208 14.034 5.91512 14.0264 5.94969 14.0232C6.04312 14.0139 6.13636 14.0087 6.23435 14.0087C7.78032 14.0102 9.0331 15.263 9.03462 16.809H12.7696V12.1424H7.636C7.51219 12.1424 7.3935 12.0932 7.30614 12.0057L6.09591 10.7954C5.58793 11.0372 5.094 11.3074 4.6164 11.6048C4.56133 11.6391 4.4998 11.6617 4.43542 11.6711L1.56888 12.0803V12.6092Z"
                  fill="#3F3356"/>
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="28" height="28" fill="white"
                      transform="translate(0.684082)"/>
              </clipPath>
            </defs>
          </svg>


          <span>
                                            Entrega en parqueo
                                </span>
          <svg className="arrow" width="7" height="10" viewBox="0 0 7 10" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
                d="M-9.50382e-08 8.82578C-5.76932e-08 9.68013 1.00212 10.141 1.65079 9.58504L6.1142 5.75926C6.57981 5.36016 6.57981 4.63984 6.1142 4.24074L1.65079 0.414964C1.00212 -0.141042 -4.66843e-07 0.319867 -4.29498e-07 1.17422L-9.50382e-08 8.82578Z"
                fill="#3F3356"/>
          </svg>
          <Switch
              checked={this.state.dataToPost.entregaParqueoEnabled}
              onChange={(e) => this.handleChange(e, 'entregaParqueoEnabled')}
              handleDiameter={28}
              offColor="#E0E0E0"
              onColor="#f5f5f5"
              offHandleColor="#ffffff"
              onHandleColor="#24DFF7"
              height={34}
              width={60}
              className="react-switch"
              id="small-radius-switch"
          />
        </div>
        <div className={"collapse-content " + (this.state.dataToPost.entregaParqueoEnabled ? '' : 'collapse')}>
          <div className="col">
            <label htmlFor="">Zona de Entrega</label>
            <textarea name="" id="" cols="30" rows="10" className="uni-input tarea" name="entrega"
                      onChange={(e) => this.inputChangeHandler(e, 'entregaParqueoOptions')}
                      value={this.state.dataToPost.entregaParqueoOptions}></textarea>
            <p style={{color: "red"}}>
              {this.state.errors.entregaParqueoEnabled.entregaParqueoOptions}
            </p>
          </div>
        </div>
      </div>
      <div className="collapse-container ca-delivery">
        <div
            className={"collapse-header " + (this.state.dataToPost.expressEnabled ? 'active' : '')}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
                d="M24.6436 16.9333C24.2654 16.9333 23.9019 16.9971 23.5624 17.1131L23.1001 16.1883C23.5834 16.0055 24.1042 15.9052 24.6436 15.9052C25.253 15.9052 25.8426 16.0277 26.3961 16.2694C26.6255 16.3694 26.893 16.2647 26.9932 16.0351C27.0934 15.8055 26.9886 15.5382 26.759 15.438C26.0903 15.1461 25.3786 14.9981 24.6436 14.9981C23.9598 14.9981 23.3007 15.1315 22.6929 15.374L21.0126 12.0134C21.092 12.0272 21.1736 12.0348 21.257 12.0348H22.2246C22.4751 12.0348 22.6782 11.8318 22.6782 11.5813V9.64607C22.6782 9.39552 22.4751 9.1925 22.2246 9.1925H21.257C20.7051 9.1925 20.226 9.50891 19.9907 9.96973L19.5111 9.01048C19.2688 8.52589 18.7817 8.2249 18.24 8.2249H17.3866C17.1361 8.2249 16.933 8.42792 16.933 8.67847C16.933 8.92901 17.1361 9.13203 17.3866 9.13203H18.24C18.4359 9.13203 18.6121 9.24095 18.6998 9.4162L19.8744 11.7655L19.6539 11.8758C19.1693 12.1181 18.8683 12.6051 18.8683 13.1469V17.9009H14.9676C14.1506 17.9009 13.486 17.2363 13.486 16.4193V14.4538H13.5162C14.2998 14.4538 14.9374 13.8163 14.9374 13.0327C14.9374 12.249 14.2998 11.6115 13.5162 11.6115H9.64579C9.25724 11.6115 8.90479 11.7684 8.64795 12.022V5.29186C8.64795 4.77498 8.22746 4.35449 7.71058 4.35449H0.937365C0.420484 4.35449 0 4.77498 0 5.29186V12.0651C0 12.582 0.420484 13.0024 0.937365 13.0024H1.9554C1.934 13.0954 1.92232 13.1912 1.9239 13.2891C1.93406 13.9313 2.46485 14.4538 3.10715 14.4538H5.54563C5.23896 14.6497 4.97626 14.8569 4.75764 15.0534C3.75273 15.9565 3.21571 17.0326 3.04825 17.7385C2.95796 18.1192 3.04462 18.5123 3.2861 18.8171C3.52425 19.1179 3.88099 19.2901 4.26513 19.2901C4.26598 19.2901 4.26676 19.2901 4.26761 19.2901L4.50661 19.2897C4.40628 19.6118 4.35421 19.9491 4.35421 20.2897C4.35421 22.1404 5.85986 23.6461 7.71058 23.6461C9.4074 23.6461 10.8133 22.3801 11.0354 20.7433H19.8056C20.0561 20.7433 20.2592 20.5402 20.2592 20.2897C20.2592 19.9942 20.2887 19.6989 20.3469 19.4123C20.5892 18.2188 21.3128 17.2182 22.2892 16.595L22.7514 17.5194C21.8681 18.1246 21.2873 19.1405 21.2873 20.2897C21.2873 22.1404 22.7929 23.6461 24.6436 23.6461C26.4944 23.6461 28 22.1404 28 20.2897C28 18.439 26.4944 16.9333 24.6436 16.9333ZM9.64579 12.5186H13.5162C13.7996 12.5186 14.0302 12.7492 14.0302 13.0327C14.0302 13.3161 13.7996 13.5467 13.5162 13.5467H9.64579C9.36234 13.5467 9.13175 13.3161 9.13175 13.0327C9.13175 12.7492 9.36234 12.5186 9.64579 12.5186ZM0.907127 5.29186C0.907127 5.27523 0.920674 5.26162 0.937365 5.26162H7.71058C7.72727 5.26162 7.74082 5.27523 7.74082 5.29186V6.2897H0.907127V5.29186ZM0.937365 12.0953C0.920674 12.0953 0.907127 12.0817 0.907127 12.0651V7.19682H7.74082V12.0651C7.74082 12.0817 7.72727 12.0953 7.71058 12.0953H0.937365ZM3.10715 13.5467C2.95724 13.5467 2.83332 13.4247 2.83096 13.2748C2.82975 13.2001 2.85806 13.1297 2.91049 13.0765C2.94738 13.0391 2.99322 13.0143 3.04299 13.0024L8.22541 13.0039C8.22523 13.0135 8.22468 13.023 8.22468 13.0327C8.22468 13.2139 8.25915 13.3872 8.32126 13.5467H3.10715ZM4.26592 18.383C4.26568 18.383 4.26543 18.383 4.26519 18.383C4.12108 18.383 4.03545 18.3022 3.99723 18.2539C3.92931 18.1682 3.90518 18.0567 3.93095 17.9479C4.26519 16.5388 6.00512 14.4538 8.67819 14.4538C10.7533 14.4538 11.5266 16.437 11.5266 17.6871C11.5266 18.0261 11.3394 18.3697 10.9816 18.3704L4.26592 18.383ZM8.22462 20.2897C8.22462 20.5731 7.99403 20.8037 7.71058 20.8037C7.42714 20.8037 7.19654 20.5731 7.19654 20.2897C7.19654 20.0062 7.42714 19.7757 7.71058 19.7757C7.99403 19.7757 8.22462 20.0062 8.22462 20.2897ZM7.71058 22.7389C6.36005 22.7389 5.26134 21.6402 5.26134 20.2897C5.26134 19.9429 5.33597 19.6013 5.47639 19.2879L6.70585 19.2856C6.44871 19.5429 6.28942 19.898 6.28942 20.2897C6.28942 21.0733 6.92695 21.7109 7.71058 21.7109C8.49422 21.7109 9.13175 21.0733 9.13175 20.2897C9.13175 19.8961 8.97083 19.5394 8.71139 19.2818L9.94097 19.2794C10.0839 19.5951 10.1598 19.9397 10.1598 20.2896C10.1598 21.6402 9.06111 22.7389 7.71058 22.7389ZM19.4579 19.2318C19.4175 19.4306 19.3886 19.6326 19.3713 19.8361H11.036C11.0102 19.6465 10.9681 19.4596 10.9106 19.2776L10.9832 19.2775C11.8101 19.276 12.4336 18.5923 12.4336 17.6871C12.4336 16.7056 12.107 15.7111 11.5375 14.9585C11.4125 14.7934 11.2608 14.6202 11.0795 14.4538H12.5788V16.4193C12.5788 17.7364 13.6505 18.8081 14.9676 18.8081H19.3218C19.4223 18.8081 19.5149 18.775 19.5901 18.7196C19.5381 18.8869 19.4933 19.0574 19.4579 19.2318ZM21.257 10.0996H21.7711V11.1277H21.257C20.9736 11.1277 20.743 10.8971 20.743 10.6137C20.743 10.3302 20.9736 10.0996 21.257 10.0996ZM19.7754 18.2162V13.1469C19.7754 12.9509 19.8842 12.7748 20.0596 12.6871L20.2801 12.5768L21.8821 15.7807C20.956 16.3492 20.2112 17.196 19.7754 18.2162ZM24.6436 22.7389C23.2931 22.7389 22.1944 21.6402 22.1944 20.2897C22.1944 18.9392 23.2931 17.8405 24.6436 17.8405C25.9942 17.8405 27.0929 18.9392 27.0929 20.2897C27.0929 21.6402 25.9942 22.7389 24.6436 22.7389Z"
                fill="#3F3356"/>
            <path
                d="M24.6435 18.8687C23.8598 18.8687 23.2223 19.5062 23.2223 20.2898C23.2223 21.0735 23.8598 21.711 24.6435 21.711C25.4271 21.711 26.0646 21.0735 26.0646 20.2898C26.0646 19.5062 25.4271 18.8687 24.6435 18.8687ZM24.6435 20.8039C24.36 20.8039 24.1294 20.5733 24.1294 20.2898C24.1294 20.0064 24.36 19.7758 24.6435 19.7758C24.9269 19.7758 25.1575 20.0064 25.1575 20.2898C25.1575 20.5733 24.9269 20.8039 24.6435 20.8039Z"
                fill="#3F3356"/>
          </svg>

          <span>
                                            Envío express
                                </span>
          <svg className="arrow" width="7" height="10" viewBox="0 0 7 10" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
                d="M-9.50382e-08 8.82578C-5.76932e-08 9.68013 1.00212 10.141 1.65079 9.58504L6.1142 5.75926C6.57981 5.36016 6.57981 4.63984 6.1142 4.24074L1.65079 0.414964C1.00212 -0.141042 -4.66843e-07 0.319867 -4.29498e-07 1.17422L-9.50382e-08 8.82578Z"
                fill="#3F3356"/>
          </svg>
          <Switch
              checked={this.state.dataToPost.expressEnabled}
              onChange={(e) => this.handleChange(e, 'expressEnabled')}
              handleDiameter={28}
              offColor="#E0E0E0"
              onColor="#f5f5f5"
              offHandleColor="#ffffff"
              onHandleColor="#24DFF7"
              height={34}
              width={60}
              className="react-switch"
              id="small-radius-switch"
          />
        </div>
        <div className={"collapse-content " + (this.state.dataToPost.expressEnabled ? '' : 'collapse')}>
          <div className="col">
            <div className="row">
              <div className="col">
                <label htmlFor="">Precio por kilometro</label>
                <input type="text" className="uni-input"
                       onChange={(e) => this.inputChangeHandler(e, 'expressPrecioEnvio')}
                       value={this.state.dataToPost.expressPrecioEnvio} name="expressPrecioEnvio"/>
                <p style={{color: "red"}}>
                  {this.state.errors.expressEnabled.expressPrecioEnvio}
                </p>
              </div>
              {/* <div className="col"> */}
                {/*<label htmlFor="">CADA</label>
                <input type="text" className="uni-input" onChange={(e) => this.inputChangeHandler(e, 'expressCada')}
                       value={this.state.dataToPost.expressCada} name="expressCada"/>
                <p style={{color: "red"}}>
                  {this.state.errors.expressEnabled.expressCada}
                </p>*/}
              {/* </div> */}
            </div>
            {/* <div className="row index-sample">
              <div className="col">
                HASTA 3 KM
              </div>
              <div className="col"></div>
              <div className="col">₡ 1.500</div>
            </div> */}
            {/* <div className="row index-sample">
              <div className="col">
                HASTA 5 KM
              </div>
              <div className="col"></div>
              <div className="col">₡ 3.500</div>
            </div> */}
            {/* <div className="row index-sample">
              <div className="col">
                HASTA 7 KM
              </div>
              <div className="col"></div>
              <div className="col">₡ 4.500</div>
            </div> */}
          </div>
        </div>
      </div>
      <div className={"collapse-end " + (this.state.dataToPost.expressEnabled ? '' : 'collapse')}>
        <div className="col">
          <Checkbox id="expressEnvioGratisEnabled" name="expressEnvioGratisEnabled"
                    onChange={(e) => this.CheckboxChangeHandler(e, 'expressEnvioGratisEnabled')}
                    checked={this.state.dataToPost.expressEnvioGratisEnabled}/>
          <label htmlFor="" className="chk-label" style={{fontSize: '13px', fontWeight: '500'}}>Envío gratis</label>

          <div className="row">
            <div className="col" style={{marginLeft: '45px', marginTop: '15px'}}>
              <label htmlFor="" style={{fontSize: '14px', fontWeight: '500'}}>COMPRA MIÍNIMA</label>
              <input type="text" className="uni-input" style={{width: '50%', display: 'block'}}
                     onChange={(e) => this.inputChangeHandler(e, 'tarjetaEnEntrega')}
                     value="" name="compraMiinima"/>
              {/* <p style={{ color: "red" }}>
                                                    {this.state.errors.tarjetaEnEntrega.compraMiinima}
                                                </p> */}
            </div>
          </div>
        </div>
      </div>
      <div className="text-center" style={{marginTop: '70px'}}>
        <button className="btn-theme" onClick={this.formSubmitHandler}>GUARDAR</button>
      </div>
    </>
  }
}


const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
          getDeliveryMethodFormData, updateDeliveryMethodFormData,
        },
        dispatch
    );

const mapStateToProps = store =>
    (
        {
          delivery: store.delivery
        }
    )

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryMethods)
// export default DeliveryMethods