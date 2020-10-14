import React from 'react';
import $ from 'jquery';
import SafePana from "../../../../assets/images/Safe-pana.svg";

class OrdersAside extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            width:0,
            seeMore: false,
            seeMoreThisOrder: {},
            seeSinpeMobile: false,
            seeExpress: false,
            mobile:false,
            selectedOrderDiv:true
        }
    }

    componentWillReceiveProps(props) {
        
        this.setState({
            seeMore: props.seeMore,
            seeMoreThisOrder: props.seeMoreThisOrder,
            seeSinpeMobile: props.seeMore ? false : null,
            seeExpress: props.seeMore ? false : null,
            selectedOrderDiv: props.selectedOrderDiv ? true : null,
        });

        console.log(this.state.seeMoreThisOrder)
        
    }

    seeMore = (orderId) => {
        this.setState({
            width: window.innerWidth
        }, () => {
            if (this.state.width < 1024) {
                $(".order-aside").addClass('order-aside-mb');
            } else {
                
            }
        });
        // console.log(orderId)
        const order = this.state.myOrders.filter(obj => {
            return obj.id === orderId
        })
        // console.log(order)
        this.setState({seeMore: true, seeMoreThisOrder: order[0]});
    }

    

    seeSinpeMobile = () => {
        this.setState({seeMore: false, seeExpress: false, seeSinpeMobile: true});
    }

    hideSinpeMobile = () => {
        this.setState({seeMore: true, seeSinpeMobile: false});
    }

    seeExpress = () => {
        this.setState({seeMore: false, seeSinpeMobile: false, seeExpress: true});
    }

    hideExpress = () => {
        this.setState({seeMore: true, seeExpress: false});
    }

    confirmOrder = (orderId) => {
        // console.log(orderId)
    }

    packOffOrder = (orderId) => {
        // console.log(orderId)
    }

    componentDidMount() {
        this.setState({
            width: window.innerWidth
        }, () => {
            if (this.state.width < 1024) {
                this.setState({mobile:true,selectedOrderDiv:false});
                
            } 
        });

    }


    render() {
        
        // const seeMore = this.state.seeMore
        let {seeMoreThisOrder,seeMore} = this.props
        console.log(seeMoreThisOrder)
        let style = {}
        if (seeMore) {
            if (this.state.seeSinpeMobile || this.state.seeExpress) {
                style.display = "none"
            } else {
                style.display = "none"
            }
        } else {
            if (this.state.seeSinpeMobile || this.state.seeExpress) {
                style.display = "none"
            } else {
                style.display = "block"
            }
        }
        const xStyle = {cursor: "pointer"}

        return (
            <> 
                <div className={"col col-md-4 col-lg-4 col-sm-12 col-xs-12 " +' '+(this.state.selectedOrderDiv ? '' : 'hidden')}>
                {/* (this.state.mobile ? 'order-aside-mb' : '')+ */}
                    <h4 className="text-center mb-hidden" style={{marginBottom: '20px'}}>Orden seleccionada</h4>
                    <div className="order-detail shadow-1" style={style}>
                        <p className="text-center select-ins">
                            Selecciona una
                            orden para ver
                            sus detalles
                        </p>
                    </div>

                    {/* Order Details start */}
                    <div className="order-detail shadow-1" style={!seeMore ? {display: 'none'} : {}}>
                        <h3 className="order-title">{Object.keys(seeMoreThisOrder).length !== 0 && seeMoreThisOrder.constructor === Object ? seeMoreThisOrder.name : "N/A"}</h3>
                        <div className="action-container">
                            <div className="btn-snipe" onClick={this.seeSinpeMobile}>
                                <button className="inner">
                                    <svg width="38" height="38" viewBox="0 0 38 38" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0)">
                                            <path
                                                d="M32.6562 30.4396V25.6896C32.655 24.5877 32.2167 23.5312 31.4375 22.752C30.6583 21.9729 29.6019 21.5346 28.5 21.5333H24.3437V16.7833C24.3437 16.1534 24.0935 15.5493 23.6481 15.1039C23.2027 14.6585 22.5986 14.4083 21.9687 14.4083C21.3388 14.4083 20.7348 14.6585 20.2894 15.1039C19.844 15.5493 19.5937 16.1534 19.5937 16.7833V23.7444L18.9044 22.9233C18.71 22.6673 18.4656 22.4534 18.1861 22.2946C17.9066 22.1358 17.5977 22.0354 17.2783 21.9995C16.9588 21.9636 16.6354 21.9929 16.3276 22.0857C16.0198 22.1784 15.734 22.3327 15.4876 22.5392C15.2412 22.7456 15.0393 23 14.8941 23.2868C14.7489 23.5736 14.6634 23.8869 14.6428 24.2077C14.6222 24.5285 14.667 24.8502 14.7744 25.1531C14.8818 25.4561 15.0496 25.7342 15.2677 25.9704L19.5937 31.1301V31.6271C19.5953 31.9942 19.7102 32.3518 19.9227 32.6511C20.1353 32.9504 20.4351 33.1767 20.7812 33.2991V34.5958C20.6238 34.5958 20.4727 34.6584 20.3614 34.7697C20.25 34.8811 20.1875 35.0321 20.1875 35.1896V37.5646C20.1875 37.722 20.25 37.8731 20.3614 37.9844C20.4727 38.0958 20.6238 38.1583 20.7812 38.1583H31.4687C31.6262 38.1583 31.7772 38.0958 31.8886 37.9844C31.9999 37.8731 32.0625 37.722 32.0625 37.5646V35.1896C32.0625 35.0321 31.9999 34.8811 31.8886 34.7697C31.7772 34.6584 31.6262 34.5958 31.4687 34.5958V32.7991C31.8361 32.5249 32.1347 32.1689 32.3408 31.7594C32.5469 31.3499 32.6549 30.898 32.6562 30.4396ZM20.7812 16.7833C20.7812 16.4684 20.9063 16.1663 21.129 15.9436C21.3517 15.7209 21.6538 15.5958 21.9687 15.5958C22.2837 15.5958 22.5857 15.7209 22.8084 15.9436C23.0311 16.1663 23.1562 16.4684 23.1562 16.7833V24.5021H24.3437V22.7208H26.125V24.5021H27.3125V22.7208H28.5C28.6994 22.7206 28.8983 22.7405 29.0937 22.7802V25.0958H30.2812V23.33C30.6486 23.6042 30.9472 23.9602 31.1533 24.3697C31.3594 24.7792 31.4674 25.2311 31.4687 25.6896V30.4396C31.4687 30.912 31.2811 31.3651 30.947 31.6991C30.613 32.0332 30.1599 32.2208 29.6875 32.2208H21.375C21.2175 32.2208 21.0665 32.1583 20.9551 32.0469C20.8438 31.9356 20.7812 31.7845 20.7812 31.6271V16.7833ZM16.1767 25.2063C16.0763 25.0873 16.0005 24.9496 15.9535 24.8012C15.9066 24.6527 15.8894 24.4965 15.9031 24.3414C15.9168 24.1863 15.961 24.0355 16.0333 23.8976C16.1055 23.7597 16.2043 23.6374 16.324 23.5378C16.568 23.3439 16.8772 23.251 17.1877 23.2783C17.4982 23.3056 17.7865 23.451 17.993 23.6845L19.5937 25.5916V29.2824L16.1767 25.2063ZM30.875 36.9708H21.375V35.7833H30.875V36.9708ZM30.2812 34.5958H21.9687V33.4083H29.6875C29.8869 33.4085 30.0858 33.3886 30.2812 33.3489V34.5958Z"
                                                fill="white"/>
                                            <path
                                                d="M21.3459 13.2863L22.5263 13.1556C22.3887 11.9324 21.874 10.7823 21.0536 9.86456C20.2332 8.94686 19.1477 8.30702 17.9475 8.03372C16.7473 7.76041 15.4918 7.86717 14.3549 8.33919C13.2181 8.81121 12.2562 9.62513 11.6025 10.6682C10.9488 11.7112 10.6357 12.9317 10.7066 14.1606C10.7775 15.3895 11.2289 16.566 11.9981 17.5269C12.7674 18.4879 13.8165 19.1858 15.0001 19.524C16.1837 19.8622 17.4431 19.8239 18.604 19.4144L18.2085 18.2946C17.2792 18.623 16.2708 18.6543 15.3229 18.384C14.3751 18.1137 13.5348 17.5553 12.9185 16.7861C12.3023 16.0169 11.9406 15.075 11.8835 14.091C11.8265 13.1071 12.0769 12.1297 12.6001 11.2944C13.1234 10.4592 13.8935 9.80735 14.8038 9.42933C15.714 9.05131 16.7193 8.96582 17.6803 9.18469C18.6414 9.40356 19.5105 9.91596 20.1673 10.6509C20.8241 11.3858 21.236 12.3068 21.3459 13.2863Z"
                                                fill="white"/>
                                            <path
                                                d="M16.625 12.0333C16.7825 12.0333 16.9335 12.0959 17.0448 12.2072C17.1562 12.3186 17.2188 12.4696 17.2188 12.6271H18.4062C18.4047 12.26 18.2898 11.9023 18.0773 11.603C17.8647 11.3037 17.5649 11.0774 17.2188 10.9551V10.2521H16.0312V10.9551C15.6354 11.0945 15.3017 11.3695 15.0892 11.7314C14.8767 12.0933 14.7991 12.5188 14.8702 12.9324C14.9414 13.346 15.1566 13.7211 15.4777 13.9912C15.7989 14.2614 16.2053 14.4091 16.625 14.4083C16.7424 14.4083 16.8572 14.4431 16.9549 14.5084C17.0525 14.5736 17.1286 14.6664 17.1736 14.7749C17.2185 14.8834 17.2303 15.0027 17.2073 15.1179C17.1844 15.2331 17.1279 15.3389 17.0448 15.4219C16.9618 15.505 16.856 15.5615 16.7408 15.5844C16.6257 15.6073 16.5063 15.5956 16.3978 15.5506C16.2893 15.5057 16.1966 15.4296 16.1313 15.3319C16.0661 15.2343 16.0312 15.1195 16.0312 15.0021H14.8438C14.8453 15.3692 14.9602 15.7268 15.1727 16.0261C15.3853 16.3254 15.6851 16.5517 16.0312 16.6741V17.3771H17.2188V16.6741C17.6146 16.5347 17.9483 16.2596 18.1608 15.8977C18.3733 15.5358 18.4509 15.1104 18.3798 14.6968C18.3086 14.2832 18.0934 13.9081 17.7723 13.6379C17.4511 13.3678 17.0447 13.22 16.625 13.2208C16.4675 13.2208 16.3165 13.1583 16.2052 13.0469C16.0938 12.9356 16.0312 12.7845 16.0312 12.6271C16.0312 12.4696 16.0938 12.3186 16.2052 12.2072C16.3165 12.0959 16.4675 12.0333 16.625 12.0333Z"
                                                fill="white"/>
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                  d="M8 1H24C25.1046 1 26 1.89543 26 3V19.9048H27V3C27 1.34315 25.6569 0 24 0H8C6.34315 0 5 1.34315 5 3V35C5 36.6569 6.34315 38 8 38H19.1809V37H8C6.89543 37 6 36.1046 6 35V3C6 1.89543 6.89543 1 8 1Z"
                                                  fill="white"/>
                                            <rect x="14" y="26" width="1" height="0.999996" fill="white"/>
                                            <rect x="16" y="26" width="1" height="0.999996" fill="white"/>
                                            <line x1="5" y1="4.50006" x2="27" y2="4.50006" stroke="white"/>
                                            <line x1="5" y1="32.4999" x2="18" y2="32.4999" stroke="white"/>
                                            <line x1="14" y1="34.5001" x2="18" y2="34.5001" stroke="#AEA7AF"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0">
                                                <rect width="38" height="38" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>


                                </button>
                                <span>{seeMoreThisOrder.cart?seeMoreThisOrder.cart.paymentMethods.selected:"N/A"}</span>
                            </div>
                            <div className="btn-express" onClick={this.seeExpress}>
                                <button className="inner">
                                    <svg width="38" height="28" viewBox="0 0 38 28" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M33.4449 18.1612C32.9316 18.1612 32.4383 18.2523 31.9775 18.4177L31.3501 17.0982C32.006 16.8374 32.7128 16.6943 33.4449 16.6943C34.2719 16.6943 35.0721 16.869 35.8232 17.2139C36.1346 17.3566 36.4976 17.2071 36.6336 16.8797C36.7696 16.552 36.6273 16.1705 36.3158 16.0276C35.4083 15.6111 34.4424 15.4 33.4449 15.4C32.5169 15.4 31.6223 15.5902 30.7975 15.9363L28.5171 11.1412C28.6249 11.1609 28.7356 11.1718 28.8488 11.1718H30.162C30.5019 11.1718 30.7775 10.8821 30.7775 10.5246V7.76335C30.7775 7.40585 30.5019 7.11618 30.162 7.11618H28.8488C28.0998 7.11618 27.4496 7.56764 27.1303 8.22517L26.4794 6.85644C26.1506 6.16501 25.4895 5.73554 24.7542 5.73554H23.5961C23.2562 5.73554 22.9806 6.02522 22.9806 6.38271C22.9806 6.74021 23.2562 7.02989 23.5961 7.02989H24.7542C25.0202 7.02989 25.2593 7.18529 25.3783 7.43536L26.9725 10.7874L26.6731 10.9448C26.0155 11.2905 25.6069 11.9855 25.6069 12.7586V19.5419H20.3132C19.2044 19.5419 18.3024 18.5935 18.3024 17.4278V14.6234H18.3434C19.4069 14.6234 20.2721 13.7137 20.2721 12.5956C20.2721 11.4774 19.4069 10.5678 18.3434 10.5678H13.0907C12.5634 10.5678 12.0851 10.7916 11.7365 11.1534V1.5505C11.7365 0.812984 11.1658 0.213013 10.4644 0.213013H1.27214C0.570657 0.213013 0 0.812984 0 1.5505V11.2149C0 11.9524 0.570657 12.5524 1.27214 12.5524H2.65376C2.62471 12.685 2.60887 12.8217 2.611 12.9614C2.62479 13.8778 3.34515 14.6234 4.21685 14.6234H7.52622C7.11002 14.9028 6.75349 15.1985 6.4568 15.4788C5.09298 16.7674 4.36417 18.3028 4.13691 19.3101C4.01438 19.8533 4.13199 20.4142 4.45971 20.8492C4.78291 21.2783 5.26706 21.524 5.78839 21.524C5.78954 21.524 5.79061 21.524 5.79176 21.524L6.11611 21.5234C5.97995 21.9831 5.90929 22.4643 5.90929 22.9503C5.90929 25.591 7.95267 27.7394 10.4644 27.7394C12.7672 27.7394 14.6751 25.933 14.9767 23.5975H26.879C27.219 23.5975 27.4946 23.3078 27.4946 22.9503C27.4946 22.5286 27.5347 22.1073 27.6137 21.6983C27.9425 19.9955 28.9245 18.5677 30.2496 17.6784L30.8769 18.9975C29.6782 19.8611 28.8898 21.3105 28.8898 22.9503C28.8898 25.591 30.9332 27.7394 33.4449 27.7394C35.9566 27.7394 38 25.591 38 22.9503C38 20.3096 35.9566 18.1612 33.4449 18.1612ZM13.0907 11.8621H18.3434C18.7281 11.8621 19.041 12.1911 19.041 12.5956C19.041 13 18.7281 13.329 18.3434 13.329H13.0907C12.706 13.329 12.3931 13 12.3931 12.5956C12.3931 12.1911 12.706 11.8621 13.0907 11.8621ZM1.2311 1.5505C1.2311 1.52677 1.24949 1.50736 1.27214 1.50736H10.4644C10.487 1.50736 10.5054 1.52677 10.5054 1.5505V2.97428H1.2311V1.5505ZM1.27214 11.2581C1.24949 11.2581 1.2311 11.2387 1.2311 11.2149V4.26862H10.5054V11.2149C10.5054 11.2387 10.487 11.2581 10.4644 11.2581H1.27214ZM4.21685 13.329C4.01339 13.329 3.84522 13.155 3.84202 12.9411C3.84038 12.8345 3.87879 12.734 3.94995 12.658C4.00001 12.6047 4.06222 12.5693 4.12977 12.5524L11.1631 12.5545C11.1628 12.5682 11.1621 12.5818 11.1621 12.5956C11.1621 12.8542 11.2089 13.1014 11.2931 13.329H4.21685ZM5.78946 20.2298C5.78913 20.2298 5.7888 20.2298 5.78848 20.2298C5.59289 20.2298 5.47668 20.1144 5.42481 20.0455C5.33264 19.9232 5.29989 19.7641 5.33486 19.6089C5.78848 17.5984 8.14981 14.6234 11.7775 14.6234C14.5937 14.6234 15.6432 17.4531 15.6432 19.2367C15.6432 19.7205 15.3892 20.2108 14.9036 20.2117L5.78946 20.2298ZM11.162 22.9503C11.162 23.3547 10.849 23.6838 10.4644 23.6838C10.0797 23.6838 9.76674 23.3547 9.76674 22.9503C9.76674 22.5459 10.0797 22.2168 10.4644 22.2168C10.849 22.2168 11.162 22.5459 11.162 22.9503ZM10.4644 26.445C8.6315 26.445 7.14039 24.8773 7.14039 22.9503C7.14039 22.4554 7.24167 21.9681 7.43224 21.5208L9.10079 21.5176C8.75182 21.8847 8.53564 22.3914 8.53564 22.9503C8.53564 24.0684 9.40086 24.9781 10.4644 24.9781C11.5279 24.9781 12.3931 24.0684 12.3931 22.9503C12.3931 22.3886 12.1747 21.8797 11.8226 21.5121L13.4913 21.5088C13.6853 21.9592 13.7883 22.4509 13.7883 22.9502C13.7883 24.8773 12.2972 26.445 10.4644 26.445ZM26.4072 21.4408C26.3524 21.7245 26.3132 22.0128 26.2896 22.3031H14.9774C14.9424 22.0325 14.8852 21.7659 14.8073 21.5063L14.9058 21.5061C16.028 21.5039 16.8742 20.5283 16.8742 19.2367C16.8742 17.8364 16.4309 16.4172 15.658 15.3435C15.4884 15.1079 15.2825 14.8607 15.0365 14.6234H17.0713V17.4278C17.0713 19.3072 18.5256 20.8362 20.3132 20.8362H26.2225C26.3589 20.8362 26.4845 20.789 26.5865 20.7101C26.516 20.9486 26.4552 21.192 26.4072 21.4408ZM28.8488 8.41052H29.5464V9.87744H28.8488C28.4641 9.87744 28.1512 9.54842 28.1512 9.14398C28.1512 8.73954 28.4641 8.41052 28.8488 8.41052ZM26.838 19.9917V12.7585C26.838 12.4789 26.9857 12.2275 27.2237 12.1024L27.523 11.945L29.6971 16.5166C28.4403 17.3278 27.4294 18.5361 26.838 19.9917ZM33.4449 26.445C31.6121 26.445 30.121 24.8773 30.121 22.9503C30.121 21.0233 31.6121 19.4556 33.4449 19.4556C35.2778 19.4556 36.7689 21.0233 36.7689 22.9503C36.7689 24.8773 35.2778 26.445 33.4449 26.445Z"
                                            fill="white"/>
                                    </svg>

                                </button>
                                <span>{seeMoreThisOrder.cart?seeMoreThisOrder.cart.deliveryMethods.selected:"N/A"}</span>
                            </div>
                        </div>
                        <div className="order-ptable">
                            <table>
                                <tbody>
                                {
                                    Object.keys(seeMoreThisOrder).length !== 0 && seeMoreThisOrder.constructor === Object && seeMoreThisOrder.cart.menu.map((item, index) => {
                                        return (
                                            <tr className="item" key={index}>
                                                <td className="item-quantity">1 X</td>
                                                <td className="item-name">
                                                    {item.name}
                                                    <span>{item.description}</span>
                                                </td>
                                                <td className="text-right item-price">
                                                    ₡{item.price}
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                                <tr>
                                    <td className="st-title" colSpan="3">
                                        Sin notas
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="3">
                                        <table className="total-ptable">
                                            <tbody>
                                            <tr>
                                                <td colSpan="2"></td>
                                            </tr>
                                            <tr>
                                                <td>Subtotal</td>
                                                <td className="text-right">₡{seeMoreThisOrder.montoTotal}</td>
                                            </tr>
                                            <tr>
                                                <td>Impuestos</td>
                                                <td className="text-right">₡0</td>
                                            </tr>
                                            <tr>
                                                <td>Envio express</td>
                                                <td className="text-right">₡0</td>
                                            </tr>
                                            <tr className="total">
                                                <td>Total</td>
                                                <td className="text-right">₡{seeMoreThisOrder.montoTotal}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                </tbody>
                            </table>

                            <div className="action-container">
                                <div className="btn-confirm">
                                    <button className="inner" onClick={() => {this.confirmOrder(Object.keys(seeMoreThisOrder).length !== 0 && seeMoreThisOrder.constructor === Object ? seeMoreThisOrder.id : null)}}>
                                        <svg width="41" height="42" viewBox="0 0 41 42" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M29.3972 12.4909C30.2575 11.5864 31.6524 11.5864 32.5127 12.4909C33.3731 13.3954 33.3731 14.8619 32.5127 15.7665L19.2947 29.6635C18.4344 30.568 17.0395 30.568 16.1792 29.6635L8.8358 21.9429C7.97547 21.0384 7.97547 19.5719 8.8358 18.6674C9.69613 17.7628 11.091 17.7628 11.9513 18.6674L17.7369 24.7502L29.3972 12.4909Z"
                                                fill="white"/>
                                        </svg>
                                    </button>
                                    <span>Confirmar</span>
                                </div>
                                <div className="btn-hold">
                                    <button className="inner" onClick={() => {this.packOffOrder(Object.keys(seeMoreThisOrder).length !== 0 && seeMoreThisOrder.constructor === Object ? seeMoreThisOrder.id : null)}}>
                                        <svg width="31" height="32" viewBox="0 0 31 32" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                  d="M0.221558 16C0.221558 7.3375 6.96276 0.25 15.202 0.25C23.4413 0.25 30.1825 7.3375 30.1825 16C30.1825 24.6625 23.4413 31.75 15.202 31.75C6.96276 31.75 0.221558 24.6625 0.221558 16ZM13.3295 17.9688H22.6922V14.0312H17.0746V8.125H13.3295V17.9688Z"
                                                  fill="#1A051D"/>
                                        </svg>
                                    </button>
                                    <span>Despachar</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Order details end */}
                    {/* Express start */}
                    <div className="order-detail shadow-1" style={!this.state.seeExpress ? {display: 'none'} : {}}>
                        <div className="express-title">
                            <div className="icon-area express">
                                <svg width="38" height="28" viewBox="0 0 38 28" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M33.4449 17.9807C32.9316 17.9807 32.4383 18.0673 31.9775 18.2246L31.3501 16.9697C32.006 16.7216 32.7128 16.5855 33.4449 16.5855C34.2719 16.5855 35.0721 16.7517 35.8232 17.0796C36.1346 17.2154 36.4976 17.0732 36.6336 16.7618C36.7696 16.4501 36.6273 16.0873 36.3158 15.9513C35.4083 15.5552 34.4424 15.3544 33.4449 15.3544C32.5169 15.3544 31.6223 15.5354 30.7975 15.8645L28.5171 11.3036C28.6249 11.3224 28.7356 11.3328 28.8488 11.3328H30.162C30.5019 11.3328 30.7775 11.0573 30.7775 10.7172V8.09088C30.7775 7.75085 30.5019 7.47533 30.162 7.47533H28.8488C28.0998 7.47533 27.4496 7.90474 27.1303 8.53014L26.4794 7.22829C26.1506 6.57063 25.4895 6.16215 24.7542 6.16215H23.5961C23.2562 6.16215 22.9806 6.43767 22.9806 6.77771C22.9806 7.11774 23.2562 7.39326 23.5961 7.39326H24.7542C25.0202 7.39326 25.2593 7.54107 25.3783 7.77892L26.9725 10.9672L26.6731 11.1169C26.0155 11.4457 25.6069 12.1067 25.6069 12.842V19.2939H20.3132C19.2044 19.2939 18.3024 18.3919 18.3024 17.2831V14.6157H18.3434C19.4069 14.6157 20.2721 13.7505 20.2721 12.687C20.2721 11.6235 19.4069 10.7583 18.3434 10.7583H13.0907C12.5634 10.7583 12.0851 10.9712 11.7365 11.3153V2.18159C11.7365 1.48011 11.1658 0.909454 10.4644 0.909454H1.27214C0.570657 0.909454 0 1.48011 0 2.18159V11.3738C0 12.0753 0.570657 12.646 1.27214 12.646H2.65376C2.62471 12.7721 2.60887 12.9021 2.611 13.035C2.62479 13.9066 3.34515 14.6157 4.21685 14.6157H7.52622C7.11002 14.8815 6.75349 15.1627 6.4568 15.4294C5.09298 16.655 4.36417 18.1154 4.13691 19.0735C4.01438 19.5901 4.13199 20.1236 4.45971 20.5373C4.78291 20.9455 5.26706 21.1792 5.78839 21.1792C5.78954 21.1792 5.79061 21.1792 5.79176 21.1792L6.11611 21.1786C5.97995 21.6158 5.90929 22.0736 5.90929 22.5358C5.90929 25.0475 7.95267 27.0909 10.4644 27.0909C12.7672 27.0909 14.6751 25.3728 14.9767 23.1514H26.879C27.219 23.1514 27.4946 22.8758 27.4946 22.5358C27.4946 22.1347 27.5347 21.734 27.6137 21.345C27.9425 19.7254 28.9245 18.3673 30.2496 17.5215L30.8769 18.7761C29.6782 19.5975 28.8898 20.9762 28.8898 22.5358C28.8898 25.0475 30.9332 27.0909 33.4449 27.0909C35.9566 27.0909 38 25.0475 38 22.5358C38 20.0241 35.9566 17.9807 33.4449 17.9807ZM13.0907 11.9894H18.3434C18.7281 11.9894 19.041 12.3023 19.041 12.687C19.041 13.0717 18.7281 13.3846 18.3434 13.3846H13.0907C12.706 13.3846 12.3931 13.0717 12.3931 12.687C12.3931 12.3023 12.706 11.9894 13.0907 11.9894ZM1.2311 2.18159C1.2311 2.15902 1.24949 2.14056 1.27214 2.14056H10.4644C10.487 2.14056 10.5054 2.15902 10.5054 2.18159V3.5358H1.2311V2.18159ZM1.27214 11.4149C1.24949 11.4149 1.2311 11.3964 1.2311 11.3738V4.76691H10.5054V11.3738C10.5054 11.3964 10.487 11.4149 10.4644 11.4149H1.27214ZM4.21685 13.3846C4.01339 13.3846 3.84522 13.2191 3.84202 13.0156C3.84038 12.9143 3.87879 12.8186 3.94995 12.7464C4.00001 12.6957 4.06222 12.662 4.12977 12.646L11.1631 12.6479C11.1628 12.661 11.1621 12.6739 11.1621 12.687C11.1621 12.933 11.2089 13.1681 11.2931 13.3846H4.21685ZM5.78946 19.9482C5.78913 19.9482 5.7888 19.9482 5.78848 19.9482C5.59289 19.9482 5.47668 19.8385 5.42481 19.773C5.33264 19.6566 5.29989 19.5052 5.33486 19.3577C5.78848 17.4454 8.14981 14.6157 11.7775 14.6157C14.5937 14.6157 15.6432 17.3072 15.6432 19.0037C15.6432 19.4638 15.3892 19.9301 14.9036 19.931L5.78946 19.9482ZM11.162 22.5358C11.162 22.9205 10.849 23.2334 10.4644 23.2334C10.0797 23.2334 9.76674 22.9205 9.76674 22.5358C9.76674 22.1511 10.0797 21.8382 10.4644 21.8382C10.849 21.8382 11.162 22.1511 11.162 22.5358ZM10.4644 25.8598C8.6315 25.8598 7.14039 24.3687 7.14039 22.5358C7.14039 22.0651 7.24167 21.6016 7.43224 21.1762L9.10079 21.1731C8.75182 21.5223 8.53564 22.0042 8.53564 22.5358C8.53564 23.5993 9.40086 24.4645 10.4644 24.4645C11.5279 24.4645 12.3931 23.5993 12.3931 22.5358C12.3931 22.0016 12.1747 21.5175 11.8226 21.1679L13.4913 21.1647C13.6853 21.5931 13.7883 22.0608 13.7883 22.5357C13.7883 24.3687 12.2972 25.8598 10.4644 25.8598ZM26.4072 21.1001C26.3524 21.3699 26.3132 21.6441 26.2896 21.9203H14.9774C14.9424 21.6629 14.8852 21.4093 14.8073 21.1623L14.9058 21.1621C16.028 21.1601 16.8742 20.2322 16.8742 19.0037C16.8742 17.6717 16.4309 16.3219 15.658 15.3006C15.4884 15.0766 15.2825 14.8415 15.0365 14.6157H17.0713V17.2831C17.0713 19.0707 18.5256 20.525 20.3132 20.525H26.2225C26.3589 20.525 26.4845 20.4801 26.5865 20.405C26.516 20.6319 26.4552 20.8634 26.4072 21.1001ZM28.8488 8.70643H29.5464V10.1017H28.8488C28.4641 10.1017 28.1512 9.78873 28.1512 9.40405C28.1512 9.01938 28.4641 8.70643 28.8488 8.70643ZM26.838 19.7218V12.8419C26.838 12.576 26.9857 12.3369 27.2237 12.2179L27.523 12.0682L29.6971 16.4164C28.4403 17.188 27.4294 18.3373 26.838 19.7218ZM33.4449 25.8598C31.6121 25.8598 30.121 24.3687 30.121 22.5358C30.121 20.7029 31.6121 19.2118 33.4449 19.2118C35.2778 19.2118 36.7689 20.7029 36.7689 22.5358C36.7689 24.3687 35.2778 25.8598 33.4449 25.8598Z"
                                        fill="white"/>
                                </svg>
                            </div>
                            <p>Rápido</p>
                            <a onClick={this.hideExpress} style={xStyle}>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M17.4573 14.8367C18.1809 15.5604 18.1809 16.7336 17.4573 17.4573C16.7336 18.1809 15.5604 18.1809 14.8367 17.4573L0.542887 3.16342C-0.180755 2.43978 -0.180755 1.26653 0.542887 0.542886C1.26653 -0.180756 2.43978 -0.180756 3.16342 0.542886L17.4573 14.8367Z"
                                        fill="#FBFBFD"/>
                                    <path
                                        d="M14.8366 0.542731C15.5602 -0.18091 16.7335 -0.18091 17.4571 0.542731C18.1808 1.26637 18.1808 2.43963 17.4571 3.16327L3.16327 17.4571C2.43963 18.1808 1.26637 18.1808 0.542731 17.4571C-0.18091 16.7335 -0.18091 15.5602 0.542731 14.8366L14.8366 0.542731Z"
                                        fill="#FBFBFD"/>
                                </svg>
                            </a>
                        </div>
                        <div className="order-desc-area">
                            <div>
                                <label>recibe:</label>
                                <p>{seeMoreThisOrder.orderBy}</p>
                            </div>
                            <div>
                                <label>dirección:</label>
                                {/* <p>{Object.keys(seeMoreThisOrder).length !== 0 && seeMoreThisOrder.constructor === Object ? seeMoreThisOrder.deliveryInformation.address.otherSigns : "N/A"}</p> */}
                            </div>
                            <div>
                                <label>barrio:</label>
                                {/* <p>{Object.keys(seeMoreThisOrder).length !== 0 && seeMoreThisOrder.constructor === Object ? seeMoreThisOrder.deliveryInformation.address.neighborhood : "N/A"}</p> */}
                            </div>
                        </div>
                    </div>

                    {/* Express end */}

                    {/* Snipe Movil start */}
                    <div className="order-detail shadow-1" style={!this.state.seeSinpeMobile ? {display: 'none'} : {}}>
                        <div className="snipe-title">
                            <div className="icon-area snipe">
                                <svg width="28" height="38" viewBox="0 0 28 38" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M27.6562 30.4396V25.6896C27.655 24.5877 27.2167 23.5312 26.4375 22.752C25.6583 21.9729 24.6019 21.5346 23.5 21.5333H19.3437V16.7833C19.3437 16.1534 19.0935 15.5493 18.6481 15.1039C18.2027 14.6585 17.5986 14.4083 16.9687 14.4083C16.3388 14.4083 15.7348 14.6585 15.2894 15.1039C14.844 15.5493 14.5937 16.1534 14.5937 16.7833V23.7444L13.9044 22.9233C13.71 22.6673 13.4656 22.4534 13.1861 22.2946C12.9066 22.1358 12.5977 22.0354 12.2783 21.9995C11.9588 21.9636 11.6354 21.9929 11.3276 22.0857C11.0198 22.1784 10.734 22.3327 10.4876 22.5392C10.2412 22.7456 10.0393 23 9.89407 23.2868C9.74885 23.5736 9.66337 23.8869 9.6428 24.2077C9.62224 24.5285 9.66702 24.8502 9.77443 25.1531C9.88184 25.4561 10.0496 25.7342 10.2677 25.9704L14.5937 31.1301V31.6271C14.5953 31.9942 14.7102 32.3518 14.9227 32.6511C15.1353 32.9504 15.4351 33.1767 15.7812 33.2991V34.5958C15.6238 34.5958 15.4727 34.6584 15.3614 34.7697C15.25 34.8811 15.1875 35.0321 15.1875 35.1896V37.5646C15.1875 37.722 15.25 37.8731 15.3614 37.9844C15.4727 38.0958 15.6238 38.1583 15.7812 38.1583H26.4687C26.6262 38.1583 26.7772 38.0958 26.8886 37.9844C26.9999 37.8731 27.0625 37.722 27.0625 37.5646V35.1896C27.0625 35.0321 26.9999 34.8811 26.8886 34.7697C26.7772 34.6584 26.6262 34.5958 26.4687 34.5958V32.7991C26.8361 32.5249 27.1347 32.1689 27.3408 31.7594C27.5469 31.3499 27.6549 30.898 27.6562 30.4396ZM15.7812 16.7833C15.7812 16.4684 15.9063 16.1663 16.129 15.9436C16.3517 15.7209 16.6538 15.5958 16.9687 15.5958C17.2837 15.5958 17.5857 15.7209 17.8084 15.9436C18.0311 16.1663 18.1562 16.4684 18.1562 16.7833V24.5021H19.3437V22.7208H21.125V24.5021H22.3125V22.7208H23.5C23.6994 22.7206 23.8983 22.7405 24.0937 22.7802V25.0958H25.2812V23.33C25.6486 23.6042 25.9472 23.9602 26.1533 24.3697C26.3594 24.7792 26.4674 25.2311 26.4687 25.6896V30.4396C26.4687 30.912 26.2811 31.3651 25.947 31.6991C25.613 32.0332 25.1599 32.2208 24.6875 32.2208H16.375C16.2175 32.2208 16.0665 32.1583 15.9551 32.0469C15.8438 31.9356 15.7812 31.7845 15.7812 31.6271V16.7833ZM11.1767 25.2063C11.0763 25.0873 11.0005 24.9496 10.9535 24.8012C10.9066 24.6527 10.8894 24.4965 10.9031 24.3414C10.9168 24.1863 10.961 24.0355 11.0333 23.8976C11.1055 23.7597 11.2043 23.6374 11.324 23.5378C11.568 23.3439 11.8772 23.251 12.1877 23.2783C12.4982 23.3056 12.7865 23.451 12.993 23.6845L14.5937 25.5916V29.2824L11.1767 25.2063ZM25.875 36.9708H16.375V35.7833H25.875V36.9708ZM25.2812 34.5958H16.9687V33.4083H24.6875C24.8869 33.4085 25.0858 33.3886 25.2812 33.3489V34.5958Z"
                                        fill="white"/>
                                    <path
                                        d="M16.3459 13.2863L17.5263 13.1556C17.3887 11.9324 16.874 10.7823 16.0536 9.86456C15.2332 8.94686 14.1477 8.30702 12.9475 8.03372C11.7473 7.76041 10.4918 7.86717 9.35491 8.33919C8.21806 8.81121 7.25617 9.62513 6.60249 10.6682C5.94882 11.7112 5.63574 12.9317 5.70663 14.1606C5.77751 15.3895 6.22886 16.566 6.99812 17.5269C7.76739 18.4879 8.8165 19.1858 10.0001 19.524C11.1837 19.8622 12.4431 19.8239 13.604 19.4144L13.2085 18.2946C12.2792 18.623 11.2708 18.6543 10.3229 18.384C9.37511 18.1137 8.53482 17.5553 7.91855 16.7861C7.30228 16.0169 6.94055 15.075 6.8835 14.091C6.82645 13.1071 7.0769 12.1297 7.60015 11.2944C8.12339 10.4592 8.89351 9.80735 9.80376 9.42933C10.714 9.05131 11.7193 8.96582 12.6803 9.18469C13.6414 9.40356 14.5105 9.91596 15.1673 10.6509C15.8241 11.3858 16.236 12.3068 16.3459 13.2863Z"
                                        fill="white"/>
                                    <path
                                        d="M11.625 12.0333C11.7825 12.0333 11.9335 12.0959 12.0448 12.2072C12.1562 12.3186 12.2188 12.4696 12.2188 12.6271H13.4062C13.4047 12.26 13.2898 11.9023 13.0773 11.603C12.8647 11.3037 12.5649 11.0774 12.2188 10.9551V10.2521H11.0312V10.9551C10.6354 11.0945 10.3017 11.3695 10.0892 11.7314C9.87668 12.0933 9.79912 12.5188 9.87024 12.9324C9.94135 13.346 10.1566 13.7211 10.4777 13.9912C10.7989 14.2614 11.2053 14.4091 11.625 14.4083C11.7424 14.4083 11.8572 14.4431 11.9549 14.5084C12.0525 14.5736 12.1286 14.6664 12.1736 14.7749C12.2185 14.8834 12.2303 15.0027 12.2073 15.1179C12.1844 15.2331 12.1279 15.3389 12.0448 15.4219C11.9618 15.505 11.856 15.5615 11.7408 15.5844C11.6257 15.6073 11.5063 15.5956 11.3978 15.5506C11.2893 15.5057 11.1966 15.4296 11.1313 15.3319C11.0661 15.2343 11.0312 15.1195 11.0312 15.0021H9.84375C9.84527 15.3692 9.96018 15.7268 10.1727 16.0261C10.3853 16.3254 10.6851 16.5517 11.0312 16.6741V17.3771H12.2188V16.6741C12.6146 16.5347 12.9483 16.2596 13.1608 15.8977C13.3733 15.5358 13.4509 15.1104 13.3798 14.6968C13.3086 14.2832 13.0934 13.9081 12.7723 13.6379C12.4511 13.3678 12.0447 13.22 11.625 13.2208C11.4675 13.2208 11.3165 13.1583 11.2052 13.0469C11.0938 12.9356 11.0312 12.7845 11.0312 12.6271C11.0312 12.4696 11.0938 12.3186 11.2052 12.2072C11.3165 12.0959 11.4675 12.0333 11.625 12.0333Z"
                                        fill="white"/>
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M3 1H19C20.1046 1 21 1.89543 21 3V19.9048H22V3C22 1.34315 20.6569 0 19 0H3C1.34315 0 0 1.34315 0 3V35C0 36.6569 1.34315 38 3 38H14.1809V37H3C1.89543 37 1 36.1046 1 35V3C1 1.89543 1.89543 1 3 1Z"
                                          fill="white"/>
                                    <rect x="9" y="26" width="1" height="0.999996" fill="white"/>
                                    <rect x="11" y="26" width="1" height="0.999996" fill="white"/>
                                    <line y1="4.50006" x2="22" y2="4.50006" stroke="white"/>
                                    <line y1="32.4999" x2="13" y2="32.4999" stroke="white"/>
                                    <line x1="9" y1="34.5001" x2="13" y2="34.5001" stroke="#AEA7AF"/>
                                </svg>
                            </div>
                            <p>SNIPE Móvil</p>
                            <a onClick={this.hideSinpeMobile} style={xStyle}>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M17.4573 14.8367C18.1809 15.5604 18.1809 16.7336 17.4573 17.4573C16.7336 18.1809 15.5604 18.1809 14.8367 17.4573L0.542887 3.16342C-0.180755 2.43978 -0.180755 1.26653 0.542887 0.542886C1.26653 -0.180756 2.43978 -0.180756 3.16342 0.542886L17.4573 14.8367Z"
                                        fill="#FBFBFD"/>
                                    <path
                                        d="M14.8366 0.542731C15.5602 -0.18091 16.7335 -0.18091 17.4571 0.542731C18.1808 1.26637 18.1808 2.43963 17.4571 3.16327L3.16327 17.4571C2.43963 18.1808 1.26637 18.1808 0.542731 17.4571C-0.18091 16.7335 -0.18091 15.5602 0.542731 14.8366L14.8366 0.542731Z"
                                        fill="#FBFBFD"/>
                                </svg>
                            </a>
                        </div>
                        <div className="order-desc-area">
                            <div>
                                <label>número de referencia:</label>
                                {/* <p>{Object.keys(seeMoreThisOrder).length !== 0 && seeMoreThisOrder.constructor === Object ? seeMoreThisOrder.paymentInformation.transferNumber : "N/A"}</p> */}
                            </div>
                            <div>
                                <label>captura:</label>
                                {/* <div className="cam" style={Object.keys(seeMoreThisOrder).length !== 0 && seeMoreThisOrder.constructor === Object && seeMoreThisOrder.paymentInformation.attachment ? {display: 'none'} : {}}>

                                </div> */}
                            </div>

                        </div>
                    </div>
                    {/* Snipe Movil end */}
                </div>
                
            </>

        );
    }
}

export default OrdersAside