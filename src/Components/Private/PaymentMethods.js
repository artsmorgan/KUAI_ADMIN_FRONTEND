import React from 'react';
import Switch from "react-switch";
import Navbar from "./Child/Fixed/Navbar/Navbar";
import Sidebar from "./Child/Fixed/Sidebar/Sidebar";
import SimpleReactValidator from 'simple-react-validator';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getPaymentMethodFormData, updatePaymentMethodFormData,} from '../../actions';
import LoaderInScreen from "../Public/LoaderInScreen";

class PaymentMethods extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      step: 'PAYMENT_METHODS',
      checked: false,
      errorMessage: "este campo es requerido",
      errors: {
        transferenceEnabled: {
          transferenceNoCuenta: "",
          transferenceTipoCambio: "",
          transferenceCuentaBancaria: "",
          transferenceIban: "",
          transferenceNombrar: ""
        },
        sinpeMovilEnabled: {
          sinpeMovilNumero: "",
          sinpeMovilName: ""
        },
      },
      dataToPost: {
        restaurantId: null,
        transferenceEnabled: false,
        transferenceNoCuenta: '',
        transferenceTipoCambio: '',
        transferenceCuentaBancaria: '',
        transferenceIban: '',
        transferenceNombrar: '',
        efectivoEnabled: false,
        tarjetaViaAppEnabled: false,
        tarjetaEnEntregaEnabled: false,
        sinpeMovilEnabled: false,
        sinpeMovilNumero: '',
        sinpeMovilName: '',
      }
    };
    this.handleChange = this.handleChange.bind(this);

    window.addEventListener("resize", this.updateDimension);

    SimpleReactValidator.addLocale('es', {
      required: 'este campo es requerido'
    });

    this.validator = new SimpleReactValidator({
      locale: 'es',
      autoForceUpdate: this
    });
  }

  handleChange(e, switchName) {
    this.cleanErrors();
    let obj = this.state.dataToPost;
    obj[switchName] = e;
    this.setState({dataToPost: obj});
    // this.handleValidation()
  }

  paymentInputChangeHandler(e, switchName) {
    let obj = this.state.dataToPost;
    obj[e.target.name] = e.target.value;

    this.setState({dataToPost: obj});
    //this.handleCustomValidation()
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

  componentWillMount() {
    this.props.getPaymentMethodFormData({restaurantId: localStorage.getItem('restaurantId')})
  }

  getBool(string) {
    switch(string.toLowerCase().trim()){
      case "true": case "yes": case "1": return true;
      case "false": case "no": case "0": case null: return false;
      default: return Boolean(string);
    }
    // return !!JSON.parse(String(val).toLowerCase());
  }

  componentDidUpdate(previousProps) {
    if (previousProps.payment.loading && !this.props.payment.loading) {
      const payment = this.props.payment;
      this.setState({
        dataToPost: {
          restaurantId: payment.restaurantId,
          transferenceEnabled: (payment.transferencia) ? this.getBool(payment.transferencia.enabled) : false,
          transferenceNoCuenta: (payment.transferencia) ? payment.transferencia.numeroDeCuenta : '',
          transferenceTipoCambio: (payment.transferencia)  ?  payment.transferencia.tipoCambio : '',
          transferenceCuentaBancaria: (payment.transferencia) ? payment.transferencia.cuentaBancaria : '',
          transferenceIban: (payment.transferencia) ?  payment.transferencia.iban : '',
          transferenceNombrar: (payment.transferencia) ? payment.transferencia.nombrar : '',
          efectivoEnabled: (payment.transferencia) ? this.getBool(payment.efectivoContraEntrega.enabled) : false,
          tarjetaViaAppEnabled: (payment.transferencia) ? this.getBool(payment.tarjetaViaApp.enabled) : false,
          tarjetaEnEntregaEnabled: (payment.transferencia) ? this.getBool(payment.tarjetaEnEntrega.enabled) : false,
          sinpeMovilEnabled: (payment.transferencia) ? this.getBool(payment.sinpeMovil.enabled) :  false,
          sinpeMovilNumero: (payment.transferencia) ?  payment.sinpeMovil.numero : '',
          sinpeMovilName: (payment.transferencia)  ? payment.sinpeMovil.name : '',
        }
      });

    }
  }

  processPaymentLogic() {
    let formData = this.state.dataToPost;
    if (!formData.transferenceEnabled) {
      formData.transferenceNoCuenta = '';
      formData.transferenceTipoCambio = '';
      formData.transferenceCuentaBancaria = '';
      formData.transferenceIban = '';
      formData.transferenceNombrar = '';
    }
    if (!formData.sinpeMovilEnabled) {
      formData.sinpeMovilNumero = '';
      formData.sinpeMovilName = '';
    }
    this.setState({...this.state, dataToPost: formData})
  }

  formSubmitHandler = (e) => {
    e.preventDefault();
    this.processPaymentLogic();
    this.processSubmit();
  };


  handleCustomValidation() {
    let errors = this.state.errors;
    let formIsValid = true;

    let obj = this.state.dataToPost;
    let length = obj.length;
    // console.log(obj)
    for (const [key, value] of Object.entries(obj)) {
      let field = key;
      if (field in errors && value) {
        for (const [k, v] of Object.entries(errors[field])) {
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

  cleanErrors() {
    let errors = this.state.errors;
    Object.keys(errors).forEach(group => {
      Object.keys(errors[group]).forEach(field => {
        errors[group][field] = '';
      })
    })
    this.setState({errors})
  }


  processSubmit() {
    if (this.handleCustomValidation()) {
      this.props.updatePaymentMethodFormData({
        restaurantId: localStorage.getItem('restaurantId'),
        form: this.state.dataToPost
      })
    }

  }

  render() {
    const {width} = this.state

    let paymentMethods = {}
    let transferencia = {}
    let efectivoContraEntrega = {}
    let sinpeMovil = {}
    let tarjetaEnEntrega = {}
    let tarjetaViaApp = {}

    try {
      const {form} = this.props
      paymentMethods = form['PAYMENT_METHODS']

      transferencia = paymentMethods.transferencia
      efectivoContraEntrega = paymentMethods.efectivoContraEntrega
      sinpeMovil = paymentMethods.sinpeMovil
      tarjetaEnEntrega = paymentMethods.tarjetaEnEntrega
      tarjetaViaApp = paymentMethods.tarjetaViaApp
      // console.log(transferencia);
    } catch (e) {
      paymentMethods = {}
    }

    return (
        <>
          <Navbar/>
          <Sidebar/>
          <div className="wrapper">
            <div className="flex-area content container-fluid">
              <h3 className="text-center" style={{marginBottom: '35px'}}>Métodos de pago</h3>
              <div className="row">
                {/* <form onSubmit={this.formSubmitHandler}> */}
                <div className="collapse-area col col-md-6 col-lg-6 col-sm-12 col-xs-12">
                  {this.props.payment.loading ? <LoaderInScreen/> : this.renderPaymentMethods()}
                </div>
                {/* </form> */}
              </div>
            </div>
          </div>

        </>
    );
  }

  renderPaymentMethods() {
    return <>
      <div className="collapse-container">
        <div className={"collapse-header " + (this.state.dataToPost.transferenceEnabled ? 'active' : '')}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M21.9333 7.93339C20.9039 7.93339 20.0667 7.0962 20.0667 6.06676C20.0667 5.80869 19.8581 5.6001 19.6001 5.6001H4.66701C4.40895 5.6001 4.20035 5.80869 4.20035 6.06676C4.20035 7.0962 3.36317 7.93339 2.33372 7.93339C2.07566 7.93339 1.86707 8.14198 1.86707 8.40004V12.1333C1.86707 12.3914 2.07566 12.6 2.33372 12.6C3.36317 12.6 4.20035 13.4371 4.20035 14.4666C4.20035 14.7247 4.40895 14.9332 4.66701 14.9332H19.6001C19.8581 14.9332 20.0667 14.7247 20.0667 14.4666C20.0667 13.4371 20.9039 12.6 21.9333 12.6C22.1914 12.6 22.4 12.3914 22.4 12.1333V8.40004C22.4 8.14198 22.1914 7.93339 21.9333 7.93339ZM21.4667 11.7054C20.2958 11.9028 19.3695 12.8291 19.1721 13.9999H5.09494C4.89754 12.8291 3.97122 11.9028 2.80038 11.7054V8.82797C3.97122 8.63057 4.89754 7.70426 5.09494 6.53341H19.1721C19.3695 7.70426 20.2958 8.63057 21.4667 8.82797V11.7054Z"
                fill="#3F3356"/>
            <path
                d="M12.1333 7.93286C10.8468 7.93286 9.80005 8.97957 9.80005 10.2661C9.80005 11.5527 10.8468 12.5994 12.1333 12.5994C13.4199 12.5994 14.4666 11.5527 14.4666 10.2661C14.4666 8.97957 13.4199 7.93286 12.1333 7.93286ZM12.1333 11.6661C11.3615 11.6661 10.7334 11.038 10.7334 10.2661C10.7334 9.4943 11.3615 8.86618 12.1333 8.86618C12.9052 8.86618 13.5333 9.4943 13.5333 10.2661C13.5333 11.038 12.9052 11.6661 12.1333 11.6661Z"
                fill="#3F3356"/>
            <path
                d="M27.5328 0H4.19992C3.94186 0 3.73326 0.208596 3.73326 0.466657V1.86663H2.33329C2.07523 1.86663 1.86663 2.07523 1.86663 2.33329V3.73326H0.466658C0.208596 3.73326 0 3.94186 0 4.19992V16.333C0 16.5911 0.208596 16.7997 0.466658 16.7997H23.7995C24.0576 16.7997 24.2662 16.5911 24.2662 16.333V14.933H25.6662C25.9242 14.933 26.1328 14.7244 26.1328 14.4664V13.0664H27.5328C27.7909 13.0664 27.9995 12.8578 27.9995 12.5998V0.466657C27.9995 0.208596 27.7909 0 27.5328 0ZM23.3329 14.4664V15.8664H0.933315V4.66657H2.33329H23.3329V14.4664ZM25.1995 13.9997H24.2662V4.19992C24.2662 3.94186 24.0576 3.73326 23.7995 3.73326H2.79995V2.79994H25.1995V13.9997ZM27.0661 12.1331H26.1328V2.33329C26.1328 2.07523 25.9242 1.86663 25.6662 1.86663H4.66658V0.933315H27.0661V12.1331Z"
                fill="#3F3356"/>
            <path
                d="M27.8133 22.4935L22.2134 18.2931C22.0725 18.1863 21.8825 18.1699 21.7248 18.2488C21.5666 18.3281 21.4667 18.4896 21.4667 18.6665V20.5331H14.0002C13.7422 20.5331 13.5336 20.7417 13.5336 20.9997V24.733C13.5336 24.9911 13.7422 25.1997 14.0002 25.1997H21.4667V27.533C21.4667 27.714 21.5717 27.8787 21.7355 27.9553C21.7985 27.9851 21.8657 27.9996 21.9334 27.9996C22.0403 27.9996 22.1467 27.9627 22.2325 27.8918L27.8324 23.2252C27.9416 23.1338 28.0037 22.9975 27.9999 22.8547C27.9962 22.7119 27.9276 22.5789 27.8133 22.4935ZM22.4001 26.5366V24.733C22.4001 24.4749 22.1915 24.2664 21.9334 24.2664H14.4669V21.4664H21.9334C22.1915 21.4664 22.4001 21.2578 22.4001 20.9997V19.5998L26.7815 22.8855L22.4001 26.5366Z"
                fill="#3F3356"/>
            <path
                d="M12.1333 20.5327H10.2667C10.0086 20.5327 9.80005 20.7413 9.80005 20.9994V24.7326C9.80005 24.9907 10.0086 25.1993 10.2667 25.1993H12.1333C12.3914 25.1993 12.6 24.9907 12.6 24.7326V20.9994C12.6 20.7413 12.3914 20.5327 12.1333 20.5327ZM11.6667 24.266H10.7334V21.466H11.6667V24.266Z"
                fill="#3F3356"/>
            <path
                d="M7.46695 20.5327H5.60032C5.34226 20.5327 5.13367 20.7413 5.13367 20.9994V24.7326C5.13367 24.9907 5.34226 25.1993 5.60032 25.1993H7.46695C7.72502 25.1993 7.93361 24.9907 7.93361 24.7326V20.9994C7.93361 20.7413 7.72502 20.5327 7.46695 20.5327ZM7.0003 24.266H6.06698V21.466H7.0003V24.266Z"
                fill="#3F3356"/>
            <path
                d="M2.33365 20.5327H0.467024C0.208962 20.5327 0.000366211 20.7413 0.000366211 20.9994V24.7326C0.000366211 24.9907 0.208962 25.1993 0.467024 25.1993H2.33365C2.59172 25.1993 2.80031 24.9907 2.80031 24.7326V20.9994C2.80031 20.7413 2.59172 20.5327 2.33365 20.5327ZM1.867 24.266H0.933681V21.466H1.867V24.266Z"
                fill="#3F3356"/>
          </svg>
          <span>
                                            Transferencia
                                </span>
          <svg className="arrow" width="7" height="10" viewBox="0 0 7 10" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
                d="M-9.50382e-08 8.82578C-5.76932e-08 9.68013 1.00212 10.141 1.65079 9.58504L6.1142 5.75926C6.57981 5.36016 6.57981 4.63984 6.1142 4.24074L1.65079 0.414964C1.00212 -0.141042 -4.66843e-07 0.319867 -4.29498e-07 1.17422L-9.50382e-08 8.82578Z"
                fill="#3F3356"/>
          </svg>
          <Switch
              checked={this.state.dataToPost.transferenceEnabled}
              onChange={(e) => this.handleChange(e, 'transferenceEnabled')}
              handleDiameter={28}
              offColor="#E0E0E0"
              onColor="#f5f5f5"
              offHandleColor="#ffffff"
              onHandleColor="#B40DFF"
              height={34}
              width={60}
              className="react-switch"
              id="small-radius-switch"
          />
        </div>
        <div
            className={"collapse-content " + (this.state.dataToPost.transferenceEnabled ? '' : 'collapse')}>
          <div className="col">
            <label htmlFor="">DEPOSITAR A:</label><br/>
            <label htmlFor="">Numero De Cuenta:</label>
            <input type="text" className="uni-input" name="transferenceNoCuenta"
                   onChange={(e) => this.paymentInputChangeHandler(e, 'transferenceNoCuenta')}
                   value={this.state.dataToPost.transferenceNoCuenta}/>
            <p style={{color: "red"}}>
              {this.state.errors.transferenceEnabled.transferenceNoCuenta}
            </p>
            <label htmlFor="">Moneda:</label>
            <input type="text" className="uni-input" name="transferenceTipoCambio"
                   onChange={(e) => this.paymentInputChangeHandler(e, 'transferenceTipoCambio')}
                   value={this.state.dataToPost.transferenceTipoCambio}/>
            <p style={{color: "red"}}>
              {this.state.errors.transferenceEnabled.transferenceTipoCambio}
            </p>
            <label htmlFor="">Banco Emisor:</label>
            <input type="text" className="uni-input" name="transferenceCuentaBancaria"
                   onChange={(e) => this.paymentInputChangeHandler(e, 'transferenceCuentaBancaria')}
                   value={this.state.dataToPost.transferenceCuentaBancaria}/>
            <p style={{color: "red"}}>
              {this.state.errors.transferenceEnabled.transferenceCuentaBancaria}
            </p>
            <label htmlFor="">Número De Cuenta IBAN:</label>
            <input type="text" className="uni-input" name="transferenceIban"
                   onChange={(e) => this.paymentInputChangeHandler(e, 'transferenceIban')}
                   value={this.state.dataToPost.transferenceIban}/>
            <p style={{color: "red"}}>
              {this.state.errors.transferenceEnabled.transferenceCuentaBancaria}
            </p>
            <label htmlFor="">A nombre de:</label>
            <input type="text" className="uni-input" name="transferenceNombrar"
                   onChange={(e) => this.paymentInputChangeHandler(e, 'transferenceNombrar')}
                   value={this.state.dataToPost.transferenceNombrar}/>
            <p style={{color: "red"}}>
              {this.state.errors.transferenceEnabled.transferenceNombrar}
            </p>
          </div>
        </div>
      </div>
      <div className="collapse-container">
        <div className={"collapse-header " + (this.state.dataToPost.efectivoEnabled ? 'active' : '')}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M27.8294 9.50413L18.4959 0.170629C18.2684 -0.0568763 17.8985 -0.0568763 17.671 0.170629L0.170629 17.671C-0.0568762 17.8985 -0.0568762 18.2684 0.170629 18.4959L9.50418 27.8294C9.61853 27.9426 9.76783 27.9998 9.91719 27.9998C10.0665 27.9998 10.2158 27.9427 10.329 27.8294L27.8294 10.3291C28.0569 10.1015 28.0569 9.73164 27.8294 9.50413ZM9.91719 26.5915L1.40851 18.0828L18.084 1.4073L26.5927 9.91599L9.91719 26.5915Z"
                fill="white"/>
            <path
                d="M9.20909 25.958C9.09708 25.6558 8.76223 25.4983 8.46007 25.6126L5.59936 26.6661L3.13295 19.883C3.0233 19.5797 2.68844 19.4234 2.38508 19.5342C2.08293 19.6438 1.92542 19.9787 2.03622 20.282L4.70334 27.6159C4.75584 27.7617 4.86434 27.8795 5.00549 27.9449C5.0825 27.981 5.1665 27.9997 5.2505 27.9997C5.31935 27.9997 5.387 27.9881 5.4535 27.9636L8.86373 26.707C9.16594 26.5962 9.31994 26.2602 9.20909 25.958Z"
                fill="white"/>
            <path
                d="M6.67254 12.3394C6.56054 12.036 6.22453 11.8797 5.92352 11.994L0.381698 14.0358C0.0806916 14.1466 -0.0744603 14.4803 0.0351906 14.7824L0.968563 17.3491C1.05492 17.586 1.27892 17.733 1.51693 17.733C1.58228 17.733 1.64993 17.7213 1.71528 17.698C2.01744 17.5883 2.17494 17.2535 2.06414 16.9501L1.33027 14.9294L6.32724 13.0884C6.62934 12.9776 6.78334 12.6416 6.67254 12.3394Z"
                fill="white"/>
            <path
                d="M27.9645 19.0501L25.4759 12.2063C25.3651 11.9029 25.0326 11.7466 24.7281 11.8574C24.4259 11.9671 24.2684 12.3019 24.3792 12.6053L26.6694 18.9031L12.4369 24.1473C12.1348 24.2582 11.9808 24.5942 12.0916 24.8963C12.1779 25.132 12.4007 25.2778 12.6387 25.2778C12.7064 25.2778 12.7741 25.2662 12.8394 25.2417L27.6179 19.7967C27.919 19.6859 28.0741 19.3523 27.9645 19.0501Z"
                fill="white"/>
            <path
                d="M24.4648 17.8814C24.3528 17.578 24.0179 17.4229 23.7158 17.536L20.8107 18.6071C20.5086 18.7179 20.3546 19.0539 20.4654 19.3561C20.5517 19.5917 20.7745 19.7376 21.0125 19.7376C21.079 19.7376 21.1467 19.7259 21.2144 19.7014L24.1194 18.6304C24.4216 18.5196 24.5757 18.1835 24.4648 17.8814Z"
                fill="white"/>
            <path
                d="M15.9665 12.0619C14.3459 10.4413 12.2179 10.0295 11.1235 11.125C10.5646 11.6827 10.3803 12.5215 10.6044 13.4841C10.8062 14.3474 11.3242 15.2295 12.0615 15.9668C13.0696 16.9759 14.2759 17.5162 15.3061 17.5162C15.9303 17.5162 16.4903 17.3178 16.9033 16.9048C17.9989 15.8105 17.587 13.6824 15.9665 12.0619ZM16.0796 16.08C15.5453 16.6131 14.1021 16.3588 12.8864 15.142C12.31 14.5644 11.8924 13.8644 11.7419 13.2193C11.666 12.8984 11.5937 12.3057 11.9495 11.9499C12.1245 11.7749 12.3964 11.6839 12.7254 11.6839C13.4021 11.6839 14.3238 12.0665 15.1428 12.8868C16.3596 14.1036 16.614 15.5456 16.0796 16.08Z"
                fill="white"/>
            <path
                d="M24.3293 9.50413C24.1018 9.27662 23.7319 9.27662 23.5044 9.50413L21.171 11.8375C20.9435 12.065 20.9435 12.4349 21.171 12.6624C21.2853 12.7756 21.4347 12.8328 21.584 12.8328C21.7334 12.8328 21.8827 12.7756 21.9959 12.6624L24.3293 10.329C24.5568 10.1015 24.5568 9.73163 24.3293 9.50413Z"
                fill="white"/>
            <path
                d="M6.82885 15.3379C6.60135 15.1104 6.23148 15.1104 6.00398 15.3379L3.67063 17.6713C3.44312 17.8988 3.44312 18.2686 3.67063 18.4961C3.78498 18.6093 3.93428 18.6665 4.08364 18.6665C4.23299 18.6665 4.38229 18.6093 4.4955 18.4961L6.8289 16.1627C7.05636 15.9352 7.05636 15.5654 6.82885 15.3379Z"
                fill="white"/>
          </svg>

          <span>
                                            Efectivo contra entrega
                                </span>
          <svg className="arrow" width="7" height="10" viewBox="0 0 7 10" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
                d="M-9.50382e-08 8.82578C-5.76932e-08 9.68013 1.00212 10.141 1.65079 9.58504L6.1142 5.75926C6.57981 5.36016 6.57981 4.63984 6.1142 4.24074L1.65079 0.414964C1.00212 -0.141042 -4.66843e-07 0.319867 -4.29498e-07 1.17422L-9.50382e-08 8.82578Z"
                fill="#3F3356"/>
          </svg>
          <Switch
              checked={this.state.dataToPost.efectivoEnabled}
              onChange={(e) => this.handleChange(e, 'efectivoEnabled')}
              handleDiameter={28}
              offColor="#E0E0E0"
              onColor="#f5f5f5"
              offHandleColor="#ffffff"
              onHandleColor="#B40DFF"
              height={34}
              width={60}
              className="react-switch"
              id="small-radius-switch"
          />
        </div>
      </div>
      <div className="collapse-container">
        <div className={"collapse-header " + (this.state.dataToPost.tarjetaViaAppEnabled ? 'active' : '')}>
          <svg width="23" height="28" viewBox="0 0 23 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M3 1H13.2105C14.3151 1 15.2105 1.89543 15.2105 3V5.15789H16.2105V3C16.2105 1.34315 14.8674 0 13.2105 0H3C1.34315 0 0 1.34315 0 3V25C0 26.6569 1.34315 28 3 28H13.2105C14.8674 28 16.2105 26.6569 16.2105 25V17.6842H15.2105V25C15.2105 26.1046 14.3151 27 13.2105 27H3C1.89543 27 1 26.1046 1 25V3C1 1.89543 1.89543 1 3 1Z"
                  fill="white"/>
            <rect x="9.57922" y="19.1582" width="0.736842" height="0.736842" fill="white"/>
            <rect x="6.63159" y="19.158" width="0.736842" height="0.736842" fill="white"/>
            <rect x="8.10547" y="19.1582" width="0.736842" height="0.736842" fill="white"/>
            <line y1="3.18433" x2="16.2105" y2="3.18433" stroke="white"/>
            <line y1="23.8157" x2="16.2105" y2="23.8157" stroke="white"/>
            <line x1="6.63159" y1="25.2896" x2="9.57896" y2="25.2896" stroke="white"/>
            <path
                d="M21.0768 5.77197H7.66012C6.68706 5.77197 5.89478 6.56426 5.89478 7.53734V15.3049C5.89478 16.2779 6.68706 17.0702 7.66012 17.0702H21.0768C22.0498 17.0702 22.8421 16.2779 22.8421 15.3049V7.53734C22.8421 6.56426 22.0499 5.77197 21.0768 5.77197ZM22.136 15.3049C22.136 15.8888 21.6608 16.3641 21.0768 16.3641H7.66012C7.07613 16.3641 6.6009 15.8888 6.6009 15.3049V7.53734C6.6009 6.95336 7.07613 6.47813 7.66012 6.47813H21.0768C21.6608 6.47813 22.136 6.95336 22.136 7.53734V15.3049H22.136Z"
                fill="white"/>
            <path
                d="M22.4893 7.89038H6.2481C6.05321 7.89038 5.89502 8.04857 5.89502 8.24346V10.3619C5.89502 10.5568 6.05321 10.715 6.2481 10.715H22.4893C22.6842 10.715 22.8424 10.5568 22.8424 10.3619V8.24346C22.8424 8.04857 22.6842 7.89038 22.4893 7.89038Z"
                fill="white"/>
            <path
                d="M12.6034 12.8333H8.36651C8.17161 12.8333 8.01343 12.9914 8.01343 13.1863C8.01343 13.3812 8.17161 13.5394 8.36651 13.5394H12.6034C12.7982 13.5394 12.9564 13.3812 12.9564 13.1863C12.9564 12.9914 12.7982 12.8333 12.6034 12.8333Z"
                fill="white"/>
            <path
                d="M12.6034 14.2458H8.36651C8.17161 14.2458 8.01343 14.404 8.01343 14.5989C8.01343 14.7938 8.17161 14.952 8.36651 14.952H12.6034C12.7982 14.952 12.9564 14.7938 12.9564 14.5989C12.9564 14.404 12.7982 14.2458 12.6034 14.2458Z"
                fill="white"/>
            <path
                d="M19.6646 12.1272H18.9585C18.3745 12.1272 17.8993 12.6024 17.8993 13.1864V13.8925C17.8993 14.4765 18.3745 14.9517 18.9585 14.9517H19.6646C20.2486 14.9517 20.7238 14.4765 20.7238 13.8925V13.1864C20.7238 12.6025 20.2486 12.1272 19.6646 12.1272ZM20.0177 13.8926C20.0177 14.0875 19.8595 14.2457 19.6646 14.2457H18.9585C18.7636 14.2457 18.6054 14.0875 18.6054 13.8926V13.1864C18.6054 12.9915 18.7636 12.8334 18.9585 12.8334H19.6646C19.8595 12.8334 20.0177 12.9915 20.0177 13.1864V13.8926Z"
                fill="white"/>
          </svg>

          <span>
                                            Tarjeta vía app +16%
                                </span>
          <svg className="arrow" width="7" height="10" viewBox="0 0 7 10" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
                d="M-9.50382e-08 8.82578C-5.76932e-08 9.68013 1.00212 10.141 1.65079 9.58504L6.1142 5.75926C6.57981 5.36016 6.57981 4.63984 6.1142 4.24074L1.65079 0.414964C1.00212 -0.141042 -4.66843e-07 0.319867 -4.29498e-07 1.17422L-9.50382e-08 8.82578Z"
                fill="#3F3356"/>
          </svg>
          <Switch
              checked={this.state.dataToPost.tarjetaViaAppEnabled}
              onChange={(e) => this.handleChange(e, 'tarjetaViaAppEnabled')}
              handleDiameter={28}
              offColor="#E0E0E0"
              onColor="#f5f5f5"
              offHandleColor="#ffffff"
              onHandleColor="#B40DFF"
              height={34}
              width={60}
              className="react-switch"
              id="small-radius-switch"
          />
        </div>

      </div>
      {/* <div className="collapse-container">
                                    <div className={"collapse-header " + (this.state.dataToPost.tarjetaViaTelefono ? 'active' : '')}>
                                        <svg width="23" height="28" viewBox="0 0 23 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M3 1H13.2105C14.3151 1 15.2105 1.89543 15.2105 3V5.15789H16.2105V3C16.2105 1.34315 14.8674 0 13.2105 0H3C1.34315 0 0 1.34315 0 3V25C0 26.6569 1.34315 28 3 28H13.2105C14.8674 28 16.2105 26.6569 16.2105 25V17.6842H15.2105V25C15.2105 26.1046 14.3151 27 13.2105 27H3C1.89543 27 1 26.1046 1 25V3C1 1.89543 1.89543 1 3 1Z" fill="white" />
                                            <rect x="9.57922" y="19.1582" width="0.736842" height="0.736842" fill="white" />
                                            <rect x="6.63159" y="19.158" width="0.736842" height="0.736842" fill="white" />
                                            <rect x="8.10547" y="19.1582" width="0.736842" height="0.736842" fill="white" />
                                            <line y1="3.18433" x2="16.2105" y2="3.18433" stroke="white" />
                                            <line y1="23.8157" x2="16.2105" y2="23.8157" stroke="white" />
                                            <line x1="6.63159" y1="25.2896" x2="9.57896" y2="25.2896" stroke="white" />
                                            <path d="M21.0768 5.77197H7.66012C6.68706 5.77197 5.89478 6.56426 5.89478 7.53734V15.3049C5.89478 16.2779 6.68706 17.0702 7.66012 17.0702H21.0768C22.0498 17.0702 22.8421 16.2779 22.8421 15.3049V7.53734C22.8421 6.56426 22.0499 5.77197 21.0768 5.77197ZM22.136 15.3049C22.136 15.8888 21.6608 16.3641 21.0768 16.3641H7.66012C7.07613 16.3641 6.6009 15.8888 6.6009 15.3049V7.53734C6.6009 6.95336 7.07613 6.47813 7.66012 6.47813H21.0768C21.6608 6.47813 22.136 6.95336 22.136 7.53734V15.3049H22.136Z" fill="white" />
                                            <path d="M22.4893 7.89038H6.2481C6.05321 7.89038 5.89502 8.04857 5.89502 8.24346V10.3619C5.89502 10.5568 6.05321 10.715 6.2481 10.715H22.4893C22.6842 10.715 22.8424 10.5568 22.8424 10.3619V8.24346C22.8424 8.04857 22.6842 7.89038 22.4893 7.89038Z" fill="white" />
                                            <path d="M12.6034 12.8333H8.36651C8.17161 12.8333 8.01343 12.9914 8.01343 13.1863C8.01343 13.3812 8.17161 13.5394 8.36651 13.5394H12.6034C12.7982 13.5394 12.9564 13.3812 12.9564 13.1863C12.9564 12.9914 12.7982 12.8333 12.6034 12.8333Z" fill="white" />
                                            <path d="M12.6034 14.2458H8.36651C8.17161 14.2458 8.01343 14.404 8.01343 14.5989C8.01343 14.7938 8.17161 14.952 8.36651 14.952H12.6034C12.7982 14.952 12.9564 14.7938 12.9564 14.5989C12.9564 14.404 12.7982 14.2458 12.6034 14.2458Z" fill="white" />
                                            <path d="M19.6646 12.1272H18.9585C18.3745 12.1272 17.8993 12.6024 17.8993 13.1864V13.8925C17.8993 14.4765 18.3745 14.9517 18.9585 14.9517H19.6646C20.2486 14.9517 20.7238 14.4765 20.7238 13.8925V13.1864C20.7238 12.6025 20.2486 12.1272 19.6646 12.1272ZM20.0177 13.8926C20.0177 14.0875 19.8595 14.2457 19.6646 14.2457H18.9585C18.7636 14.2457 18.6054 14.0875 18.6054 13.8926V13.1864C18.6054 12.9915 18.7636 12.8334 18.9585 12.8334H19.6646C19.8595 12.8334 20.0177 12.9915 20.0177 13.1864V13.8926Z" fill="white" />
                                        </svg>

                                        <span>
                                            Tarjeta vía telefono +5%
                                </span>
                                        <svg className="arrow" width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M-9.50382e-08 8.82578C-5.76932e-08 9.68013 1.00212 10.141 1.65079 9.58504L6.1142 5.75926C6.57981 5.36016 6.57981 4.63984 6.1142 4.24074L1.65079 0.414964C1.00212 -0.141042 -4.66843e-07 0.319867 -4.29498e-07 1.17422L-9.50382e-08 8.82578Z" fill="#3F3356" />
                                        </svg>
                                        <Switch
                                            checked={this.state.dataToPost.tarjetaViaTelefono}
                                            onChange={(e) => this.handleChange(e, 'tarjetaViaTelefono')}
                                            handleDiameter={28}
                                            offColor="#E0E0E0"
                                            onColor="#f5f5f5"
                                            offHandleColor="#ffffff"
                                            onHandleColor="#B40DFF"
                                            height={34}
                                            width={60}
                                            className="react-switch"
                                            id="small-radius-switch"
                                        />
                                    </div>
                                    <div className={"collapse-content " + (this.state.dataToPost.tarjetaEnEntregaEnabled ? '' : 'collapse')}>
                                        <div className="col">
                                            <label htmlFor="">Número de teléfono desde el que llama:</label>
                                            <input type="text" className="uni-input" name="numeroDeTelefonoDesdeElqueLlama" onChange={(e) => this.paymentInputChangeHandler(e, 'tarjetaViaTelefono')} value="" />
                                            <p style={{ color: "red" }}>
                                                {this.state.errors.tarjetaViaTelefono.numeroDeTelefonoDesdeElqueLlama}
                                            </p>
                                        </div>
                                    </div>
                                </div> */}
      <div className="collapse-container">
        <div
            className={"collapse-header " + (this.state.dataToPost.tarjetaEnEntregaEnabled ? 'active' : '')}>
          <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M25.0833 0.666504H2.91665C1.309 0.666504 0 1.9755 0 3.5832V16.4165C0 18.0242 1.309 19.3332 2.91665 19.3332H25.0833C26.6909 19.3332 27.9999 18.0242 27.9999 16.4165V3.5832C28 1.9755 26.691 0.666504 25.0833 0.666504ZM26.8333 16.4165C26.8333 17.3813 26.0482 18.1665 25.0833 18.1665H2.91665C1.9518 18.1665 1.16665 17.3813 1.16665 16.4165V3.5832C1.16665 2.61835 1.9518 1.83321 2.91665 1.83321H25.0833C26.0481 1.83321 26.8333 2.61835 26.8333 3.5832V16.4165H26.8333Z"
                fill="white"/>
            <path
                d="M27.4166 4.1665H0.583352C0.261352 4.1665 0 4.42786 0 4.74986V8.24985C0 8.57185 0.261352 8.83321 0.583352 8.83321H27.4167C27.7387 8.83321 28.0001 8.57185 28.0001 8.24985V4.74986C28 4.42786 27.7386 4.1665 27.4166 4.1665Z"
                fill="white"/>
            <path
                d="M11.0834 12.3335H4.08335C3.76135 12.3335 3.5 12.5948 3.5 12.9168C3.5 13.2388 3.76135 13.5001 4.08335 13.5001H11.0834C11.4054 13.5001 11.6667 13.2388 11.6667 12.9168C11.6667 12.5948 11.4054 12.3335 11.0834 12.3335Z"
                fill="white"/>
            <path
                d="M11.0834 14.6665H4.08335C3.76135 14.6665 3.5 14.9279 3.5 15.2499C3.5 15.5719 3.76135 15.8332 4.08335 15.8332H11.0834C11.4054 15.8332 11.6667 15.5719 11.6667 15.2499C11.6666 14.9279 11.4054 14.6665 11.0834 14.6665Z"
                fill="white"/>
            <path
                d="M22.7501 11.1665H21.5835C20.6186 11.1665 19.8335 11.9517 19.8335 12.9165V14.0832C19.8335 15.048 20.6186 15.8332 21.5835 15.8332H22.7501C23.715 15.8332 24.5001 15.048 24.5001 14.0832V12.9165C24.5001 11.9517 23.715 11.1665 22.7501 11.1665ZM23.3335 14.0832C23.3335 14.4052 23.0721 14.6666 22.7501 14.6666H21.5835C21.2615 14.6666 21.0001 14.4052 21.0001 14.0832V12.9166C21.0001 12.5946 21.2615 12.3332 21.5835 12.3332H22.7501C23.0721 12.3332 23.3335 12.5946 23.3335 12.9166V14.0832Z"
                fill="white"/>
          </svg>
          <span>
                                            Tarjeta en entrega +5%
                                </span>
          <svg className="arrow" width="7" height="10" viewBox="0 0 7 10" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
                d="M-9.50382e-08 8.82578C-5.76932e-08 9.68013 1.00212 10.141 1.65079 9.58504L6.1142 5.75926C6.57981 5.36016 6.57981 4.63984 6.1142 4.24074L1.65079 0.414964C1.00212 -0.141042 -4.66843e-07 0.319867 -4.29498e-07 1.17422L-9.50382e-08 8.82578Z"
                fill="#3F3356"/>
          </svg>
          <Switch
              checked={this.state.dataToPost.tarjetaEnEntregaEnabled}
              onChange={(e) => this.handleChange(e, 'tarjetaEnEntregaEnabled')}
              handleDiameter={28}
              offColor="#E0E0E0"
              onColor="#f5f5f5"
              offHandleColor="#ffffff"
              onHandleColor="#B40DFF"
              height={34}
              width={60}
              className="react-switch"
              id="small-radius-switch"
          />
        </div>

      </div>
      <div className="collapse-container">
        <div className={"collapse-header " + (this.state.dataToPost.sinpeMovilEnabled ? 'active' : '')}>
          <svg width="22" height="29" viewBox="0 0 22 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M21.0625 22.4292V18.9292C21.0616 18.1173 20.7386 17.3388 20.1645 16.7647C19.5904 16.1906 18.812 15.8676 18 15.8667H14.9375V12.3667C14.9375 11.9026 14.7531 11.4575 14.425 11.1293C14.0968 10.8011 13.6517 10.6167 13.1875 10.6167C12.7234 10.6167 12.2783 10.8011 11.9501 11.1293C11.6219 11.4575 11.4375 11.9026 11.4375 12.3667V17.4959L10.9296 16.8909C10.7863 16.7022 10.6063 16.5446 10.4003 16.4276C10.1944 16.3106 9.96679 16.2367 9.7314 16.2102C9.496 16.1837 9.25769 16.2053 9.03089 16.2737C8.8041 16.342 8.59354 16.4557 8.41197 16.6078C8.23041 16.76 8.08162 16.9474 7.97461 17.1587C7.86761 17.37 7.80463 17.6009 7.78947 17.8373C7.77432 18.0737 7.80731 18.3107 7.88646 18.5339C7.9656 18.7572 8.08925 18.9621 8.2499 19.1361L11.4375 22.938V23.3042C11.4386 23.5747 11.5233 23.8382 11.6799 24.0588C11.8366 24.2793 12.0575 24.446 12.3125 24.5362V25.4917C12.1965 25.4917 12.0852 25.5378 12.0032 25.6198C11.9211 25.7019 11.875 25.8132 11.875 25.9292V27.6792C11.875 27.7952 11.9211 27.9065 12.0032 27.9886C12.0852 28.0706 12.1965 28.1167 12.3125 28.1167H20.1875C20.3036 28.1167 20.4148 28.0706 20.4969 27.9886C20.5789 27.9065 20.625 27.7952 20.625 27.6792V25.9292C20.625 25.8132 20.5789 25.7019 20.4969 25.6198C20.4148 25.5378 20.3036 25.4917 20.1875 25.4917V24.1678C20.4582 23.9658 20.6782 23.7035 20.8301 23.4017C20.982 23.1 21.0615 22.767 21.0625 22.4292ZM12.3125 12.3667C12.3125 12.1346 12.4047 11.9121 12.5688 11.748C12.7329 11.5839 12.9555 11.4917 13.1875 11.4917C13.4196 11.4917 13.6421 11.5839 13.8062 11.748C13.9703 11.9121 14.0625 12.1346 14.0625 12.3667V18.0542H14.9375V16.7417H16.25V18.0542H17.125V16.7417H18C18.147 16.7416 18.2935 16.7562 18.4375 16.7854V18.4917H19.3125V17.1906C19.5832 17.3926 19.8032 17.6549 19.9551 17.9567C20.107 18.2584 20.1865 18.5914 20.1875 18.9292V22.4292C20.1875 22.7773 20.0492 23.1111 19.8031 23.3573C19.557 23.6034 19.2231 23.7417 18.875 23.7417H12.75C12.634 23.7417 12.5227 23.6956 12.4407 23.6136C12.3586 23.5315 12.3125 23.4202 12.3125 23.3042V12.3667ZM8.91971 18.5731C8.84575 18.4854 8.78986 18.3839 8.75527 18.2746C8.72067 18.1652 8.70805 18.0501 8.71814 17.9358C8.72822 17.8215 8.76081 17.7104 8.81403 17.6088C8.86724 17.5072 8.94004 17.4171 9.02821 17.3437C9.20805 17.2008 9.43586 17.1324 9.66467 17.1525C9.89349 17.1726 10.1059 17.2797 10.258 17.4518L11.4375 18.857V21.5765L8.91971 18.5731ZM19.75 27.2417H12.75V26.3667H19.75V27.2417ZM19.3125 25.4917H13.1875V24.6167H18.875C19.022 24.6168 19.1685 24.6022 19.3125 24.5729V25.4917Z"
                fill="white"/>
            <path
                d="M12.7286 9.78998L13.5983 9.69373C13.4969 8.7924 13.1177 7.94492 12.5132 7.26872C11.9087 6.59251 11.1088 6.12105 10.2245 5.91967C9.34009 5.71829 8.41498 5.79695 7.5773 6.14475C6.73962 6.49256 6.03086 7.09229 5.54921 7.86085C5.06755 8.62941 4.83686 9.52874 4.88909 10.4343C4.94133 11.3398 5.27389 12.2066 5.84072 12.9147C6.40755 13.6228 7.18058 14.137 8.05269 14.3862C8.9248 14.6354 9.85283 14.6071 10.7082 14.3054L10.4168 13.4803C9.73207 13.7223 8.989 13.7453 8.29059 13.5462C7.59219 13.347 6.97303 12.9355 6.51893 12.3688C6.06484 11.802 5.7983 11.108 5.75626 10.383C5.71423 9.65792 5.89877 8.93777 6.28432 8.32231C6.66987 7.70684 7.23732 7.22656 7.90804 6.94802C8.57875 6.66948 9.3195 6.60648 10.0276 6.76775C10.7357 6.92903 11.3761 7.30659 11.8601 7.8481C12.344 8.38961 12.6475 9.06826 12.7286 9.78998Z"
                fill="white"/>
            <path
                d="M9.25 8.8667C9.36603 8.8667 9.47731 8.91279 9.55936 8.99484C9.64141 9.07689 9.6875 9.18817 9.6875 9.3042H10.5625C10.5614 9.03371 10.4767 8.77017 10.3201 8.54964C10.1635 8.32911 9.94252 8.16236 9.6875 8.0722V7.5542H8.8125V8.0722C8.52083 8.17493 8.27492 8.37758 8.11835 8.64425C7.96177 8.91091 7.90462 9.22439 7.95702 9.52915C8.00942 9.83392 8.16799 10.1103 8.40464 10.3094C8.6413 10.5084 8.94076 10.6173 9.25 10.6167C9.33653 10.6167 9.42112 10.6424 9.49306 10.6904C9.56501 10.7385 9.62108 10.8068 9.6542 10.8868C9.68731 10.9667 9.69597 11.0547 9.67909 11.1396C9.66221 11.2244 9.62055 11.3024 9.55936 11.3636C9.49817 11.4247 9.42022 11.4664 9.33535 11.4833C9.25049 11.5002 9.16252 11.4915 9.08258 11.4584C9.00263 11.4253 8.9343 11.3692 8.88623 11.2973C8.83816 11.2253 8.8125 11.1407 8.8125 11.0542H7.9375C7.93862 11.3247 8.02329 11.5882 8.17991 11.8088C8.33654 12.0293 8.55748 12.196 8.8125 12.2862V12.8042H9.6875V12.2862C9.97917 12.1835 10.2251 11.9808 10.3817 11.7142C10.5382 11.4475 10.5954 11.134 10.543 10.8292C10.4906 10.5245 10.332 10.2481 10.0954 10.049C9.8587 9.84999 9.55924 9.74111 9.25 9.7417C9.13397 9.7417 9.02269 9.69561 8.94064 9.61356C8.85859 9.53151 8.8125 9.42023 8.8125 9.3042C8.8125 9.18817 8.85859 9.07689 8.94064 8.99484C9.02269 8.91279 9.13397 8.8667 9.25 8.8667Z"
                fill="white"/>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M3.68408 1H13.8946C14.9992 1 15.8946 1.89543 15.8946 3V14.6667H16.8946V3C16.8946 1.34315 15.5515 0 13.8946 0H3.68408C2.02723 0 0.684082 1.34315 0.684082 3V25C0.684082 26.6569 2.02723 28 3.68408 28H11.1331V27H3.68408C2.57951 27 1.68408 26.1046 1.68408 25V3C1.68408 1.89543 2.57951 1 3.68408 1Z"
                  fill="white"/>
            <rect x="7.31567" y="19.158" width="0.736841" height="0.736839" fill="white"/>
            <rect x="8.78931" y="19.158" width="0.736842" height="0.736839" fill="white"/>
            <line x1="0.684082" y1="3.18433" x2="16.8946" y2="3.18433" stroke="white"/>
            <line x1="0.684082" y1="23.8157" x2="10.263" y2="23.8157" stroke="white"/>
            <line x1="7.31567" y1="25.2896" x2="10.263" y2="25.2896" stroke="white"/>
          </svg>

          <span>
                                            SINPE Móvil
                                </span>
          <svg className="arrow" width="7" height="10" viewBox="0 0 7 10" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
                d="M-9.50382e-08 8.82578C-5.76932e-08 9.68013 1.00212 10.141 1.65079 9.58504L6.1142 5.75926C6.57981 5.36016 6.57981 4.63984 6.1142 4.24074L1.65079 0.414964C1.00212 -0.141042 -4.66843e-07 0.319867 -4.29498e-07 1.17422L-9.50382e-08 8.82578Z"
                fill="#3F3356"/>
          </svg>
          <Switch
              checked={this.state.dataToPost.sinpeMovilEnabled}
              onChange={(e) => this.handleChange(e, 'sinpeMovilEnabled')}
              handleDiameter={28}
              offColor="#E0E0E0"
              onColor="#f5f5f5"
              offHandleColor="#ffffff"
              onHandleColor="#B40DFF"
              height={34}
              width={60}
              className="react-switch"
              id="small-radius-switch"
          />
        </div>
        <div className={"collapse-content " + (this.state.dataToPost.sinpeMovilEnabled ? '' : 'collapse')}>
          <div className="col">
            <label htmlFor="">DEPOSITAR A:</label><br/>
            <label htmlFor="">NUMERO DE TELEFONO:</label>
            <input type="text" className="uni-input" name="sinpeMovilNumero"
                   onChange={(e) => this.paymentInputChangeHandler(e, 'sinpeMovilNumero')}
                   value={this.state.dataToPost.sinpeMovilNumero}/>
            <p style={{color: "red"}}>
              {this.state.errors.sinpeMovilEnabled.sinpeMovilNumero}
            </p>
            <label htmlFor="">A NOMBRE DE:</label>
            <input type="text" className="uni-input" name="sinpeMovilName"
                   onChange={(e) => this.paymentInputChangeHandler(e, 'sinpeMovilName')}
                   value={this.state.dataToPost.sinpeMovilName}/>
            <p style={{color: "red"}}>
              {this.state.errors.sinpeMovilEnabled.sinpeMovilName}
            </p>
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
          getPaymentMethodFormData, updatePaymentMethodFormData,
        },
        dispatch
    );

const mapStateToProps = store =>
    (
        {
          payment: store.payment
        }
    )

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethods)