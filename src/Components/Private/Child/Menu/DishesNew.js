import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import {
    postMenuFormData,
    getMenuListByCategoryData,
    getMenuListData,
    postRemovalMenuFormData
} from "../../../../actions";
import { connect } from "react-redux";
import Checkbox from '@opuscapita/react-checkbox';
import Select from 'react-select';
import SimpleReactValidator from "simple-react-validator";
import DefaultImage from "../../../../assets/images/food.png";
import { uuid } from "uuidv4";
import { db, storage } from "../../../firebase";
import axios from 'axios'
import $ from 'jquery'
import LoaderInScreen from "../../../Public/LoaderInScreen";
import _ from "lodash";

const pageTabs = ['disponible', 'agotado']

class Dishes extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.productPictRefUpload = React.createRef();
        this.handleProductImageUpload = this.handleProductImageUpload.bind(this)

        this.state = {
            selectedDish: {},
            ignoreValidation: false,
            showDisponible: true,
            showagotado: null,
            editReq: false,
            uploadedFile: null,
            itemList: [],
            categoryList:[],
            showItemManage:false,
            newItem:false
        }
        this.validator = new SimpleReactValidator({
            locale: 'es',
            autoForceUpdate: this
        });

        SimpleReactValidator.addLocale('es', {
            required: 'este campo es requerido',
            email: 'Introduzca un correo electrónico válido'
        });

        this.validator = new SimpleReactValidator({
            locale: 'es',
            autoForceUpdate: this,
            validators: {
                mixPass: {
                    message: 'Esta no es una contraseña válida',
                    rule: (val, params, validator) => {
                        // console.log(val, params, validator);
                        return validator.helpers.testRegex(val, /^(?=.*\d)(?=.*[ A-Za-z]).{8,}$/)
                    },
                }
            }
        });
    }

    componentWillMount() {
        this.props.getMenuListByCategoryData({ restaurantId: localStorage.getItem('restaurantId') })
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentDidUpdate(previousProps) {
        if ((previousProps.categories.loading && !this.props.categories.loading) || (previousProps.items.loading && !this.props.items.loading)) {
            const items = this.props.items
            const categoryList = this.props.categories.data;
            console.log(items)
            this.setState({ itemList: items.data,categoryList:categoryList,showItemManage:false});

        }
    }

    deleteMenu = (id) => {
        let dataToPost = [];
        let categoryId = '';
        let arrayKey = '';
        let menuListToUpdate = this.state.itemList;

        for (const [key, value] of Object.entries(menuListToUpdate)) {
            if (value.products.menuItems) {
                let itemList = JSON.parse(value.products.menuItems.productItemList);
                itemList.forEach(item => {
                    if (item.id == id) {
                        arrayKey = key;
                    }
                });
            }
        }

        let data = JSON.parse(menuListToUpdate[arrayKey].products.menuItems.productItemList);
        data.forEach(element => {
            categoryId = element.categoryId;
            if (element.id != id) {
                dataToPost.push(element)
            }
        });

        this.props.postMenuFormData(dataToPost,categoryId)

    }


    CheckboxChangeHandler = (e, switchName) => {
        let obj = this.state.selectedDish;
        let value = !obj[switchName];
        obj[switchName] = value;
        this.setState({ selectedDish: obj });
        // console.log(this.state.dataToPost)
    }

    addMenuInputChangeHandler = (e) => {
        let obj = this.state.selectedDish
        obj[e.target.name] = e.target.value
        this.setState({ selectedDish: obj }, () => {
            console.log(this.state.selectedDish)
        })
    }

    selectHandleChange (e) {
        console.log(e)
        let obj = this.state.selectedDish;
        obj.categoryId = e;
        this.setState({selectedDish:obj})
    };

    newMenuItem() { 
            let newDish = {
                id: uuid(),
                isAvailable: true,
                name: '',
                description: '',
                categoryId: '',
                price: 0,
                upsell: false,
                recomendacion: false,
                promo: false,
                specialPrice: false,
                specialPriceAmount: 0,
                discount: false,
                discountPercentage: 0,
                llevaXpagaY: false,
                lleva: 0,
                paga: 0,
                envioGratis: false,
                picture: ''
            }
            this.setState({ selectedDish: newDish,showItemManage:true,newItem:true});
        
    }

    editMenuItem(e,id){

        let allItems = this.state.itemList;
        let selectedItem = {}
        allItems.forEach(element => {
            if(element.products && element.products.menuItems && element.products.menuItems.productItemList){
               let tempItem = JSON.parse(element.products.menuItems.productItemList);
               tempItem.forEach(item => {
                   if(item.id==id){
                       selectedItem = item;
                    //    break;
                   }
               });
            }
           
        });

        
            let allCategory = this.state.categoryList;
            let categoryOption={}
            allCategory.forEach(element => {
                if(element.id===selectedItem.categoryId){
                    categoryOption={
                        value: element.name,
                        label: element.name,
                        id: element.id
                    }
                } 
            });
            let newDish = {
                id: selectedItem.id,
                isAvailable: selectedItem.isAvailable,
                name: selectedItem.name,
                description: selectedItem.description,
                categoryId: categoryOption,
                price: selectedItem.price,
                upsell: selectedItem.upsell,
                recomendacion: selectedItem.recomendacion,
                promo: selectedItem.promo,
                specialPrice: selectedItem.specialPrice,
                specialPriceAmount: selectedItem.specialPriceAmount,
                discount: selectedItem.discount,
                discountPercentage: selectedItem.discountPercentage,
                llevaXpagaY: selectedItem.llevaXpagaY,
                lleva: selectedItem.lleva,
                paga: selectedItem.paga,
                envioGratis: selectedItem.envioGratis,
                picture: selectedItem.picture
            }

 
            this.setState({ selectedDish: newDish,showItemManage:true,newItem:false});
        
    }

    getFileExtension = filename => filename.split('.').pop();

    handleProductImageUpload = (e) => {
        console.log('handleProfileImageUpload::::::', e.target.files[0]);
        if (e && e.target.files[0]) {
            const _files = e.target.files[0];
            this.setState({ uploadedFile: URL.createObjectURL(_files) })
            const fileExtension = this.getFileExtension(e.target.files[0].name)
            const filename = `${Date.now()}.${fileExtension}`;
            const uploadTask = storage.ref(`restaurants/${localStorage.getItem('restaurantId')}/images/products/${filename}`).put(e.target.files[0]);

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
                        .ref(`restaurants/${localStorage.getItem('restaurantId')}/images/products/`)
                        .child(filename)
                        .getDownloadURL()
                        .then(url => {
                            console.log('url', url);
                            this.setState({ selectedDishPicture: url });
                            let obj = this.state.selectedDish
                            obj['picture'] = url
                            this.setState({ selectedDish: obj })
                        });
                }
            );
        }

    };



    selectTab = (e, tabArrayPosition) => {
        this.setState({ selectedTab: pageTabs[tabArrayPosition] })
        switch (tabArrayPosition) {
            case 0:
                this.setState({ showDisponible: true, showagotado: false }, () => {
                    let obj = this.state.selectedDish
                    obj['isAvailable'] = true
                    this.setState({ selectedDish: obj }, () => {
                        console.log(this.state)
                    })
                })
                break;
            case 1:
                this.setState({ showDisponible: false, showagotado: true }, () => {
                    let obj = this.state.selectedDish
                    obj['isAvailable'] = false
                    this.setState({ selectedDish: obj }, () => {
                        console.log(this.state)
                    })
                })
                break;
            default:
                this.setState({ showDisponible: true, showagotado: false })
        }
        // console.log(this.state)
    }

    addMenuProcessSubmit() {
        let obj = this.state.selectedDish;
        if (!obj.id) {
            obj['id'] = uuid();
        }
        if (!obj.specialPrice) {
            obj.specialPriceAmount = 0;
        }
        if (!obj.discount) {
            obj.discountPercentage = 0;
        }
        if (!obj.llevaXpagaY) {
            obj.lleva = 0;
            obj.paga = 0;
        }

        obj.categoryId = obj.categoryId.id;
        let dataToPost = [];
        let categoryId = '';
        let menuListToUpdate = this.state.itemList;
        let newItem = this.state.newItem;
        // console.log(menuListToUpdate)
        // console.log(obj)
        
        let updateArrayKey = '';

        for (const [key, value] of Object.entries(menuListToUpdate)) {
            if (value.products.menuItems) {
                let itemList = JSON.parse(value.products.menuItems.productItemList);                    
                itemList.forEach(item => {
                    if(item.categoryId===obj.categoryId && item.id!==obj.id){
                        dataToPost.push(item)
                    }
                    
                    if (item.id === obj.id && item.categoryId!==obj.categoryId) {
                        updateArrayKey = key;                    
                    }
                });
            }
        }

        dataToPost.push(obj)
        categoryId = obj.categoryId;

        if(!newItem && updateArrayKey){
                let updateDataToPost=[];
                let updateCategoryId='';
                // console.log(arrayKey)
                let data = JSON.parse(menuListToUpdate[updateArrayKey].products.menuItems.productItemList);
                console.log(data)
                data.forEach(element => {
                    updateCategoryId = element.categoryId;
                    if (element.id !== obj.id) {
                        updateDataToPost.push(element)
                    }
                });
                this.props.postRemovalMenuFormData(updateDataToPost,updateCategoryId);        
        }

        // console.log(updateArrayKey)
        
        
        // console.log(updateDataToPost)
        this.props.postMenuFormData(dataToPost,categoryId)

    }

    addMenuFormSubmitHandler = (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            this.addMenuProcessSubmit();
        } else {
            this.validator.showMessages();
        }
    };

    hideEditorMobile = () => {
        this.setState({showItemManage:false}, () => {
            console.log(this.state)
        })
    }

    calculatePercentage() {
        let percentage = this.state.selectedDish.discountPercentage;
        if (!isNaN(percentage)) {
            percentage = Number(percentage)
            if (percentage > 0 && percentage < 100) {
                return this.state.selectedDish.price - Math.round(this.state.selectedDish.price * (percentage / 100))
            } else {
                return ' _ '
            }
        } else {
            return ' _ '
        }
    }

    uploadPhoto() {
        //selectedDish
        console.log('uploadPhoto', this.state.selectedDish);
        this.productPictRefUpload.current.click();
    }


    

    render() {
        if (this.props.items.loading) {
            return <LoaderInScreen />
        }

        return (
            <>
                <div
                    className={"col-md-4 col-lg-4 col-sm-12 col-xs-12 "}>
                    <h3 className="mb-hidden">Menú</h3>
                    <div className="rotator-container lg">
                        <div className={`btn-theme add-menu `}>
                            <div className="add-item" onClick={() => {
                                this.newMenuItem()
                            }}>
                                <span>+</span>
                            </div>
                            <div className="add-details" onClick={() => {
                                this.newMenuItem()
                            }}>
                                <p className="title">AÑADIR ÍTEM AL MENÚ</p>
                                <p className="dummy"></p>
                                <p className="dummy" style={{ width: '80px' }}></p>
                                <p className="dummy" style={{ width: '80px' }}></p>
                                <button className="btn-add-menu">
                                    <span>+</span>AÑADIR
                                </button>

                            </div>
                        </div>
                        <div className="rotator-scroll" style={{ height: 'calc(100% - 100px)' }}>
                            <div className="rotator-stripe">
                                {this.state.itemList.length === 0 ? this.renderNoItems() : this.renderDishes()}
                            </div>
                        </div>
                    </div>
                </div>
                {this.renderDishEditor()}
            </>
        );
    }

    renderNoItems() {
        return <>
            <h6 className="lead" style={{ color: "grey" }}><b>¡Aún no se agregó ningún menú!</b></h6>
        </>
    }

   

    

    renderDishes() {
        let dishes = this.state.itemList;
        console.log("-----------")
        console.log(dishes)
        let categoriesArr = []

        let categories = dishes !== undefined && dishes.map(category => {
            var categoryObj = {};

            categoryObj['name'] = category.name;
            categoryObj['id'] = category.id;

            if (category.products && category.products.menuItems && category.products.menuItems.productItemList) {
                categoryObj['items'] = JSON.parse(category.products.menuItems.productItemList);
            } else {
                categoryObj['items'] = [];
            }
            categoriesArr.push(categoryObj);

        })

        //parse product list
        return (
            <>
                {categoriesArr.map(category =>
                    <>
                        <strong>{category.name}</strong>
                        <div>
                            {
                                category.items.length > 0 && category.items.map(dish =>

                                    <div className="rotator" key={dish.id}>
                                        <div className="directional">
                                            <svg className="top" width="9" height="7" viewBox="0 0 9 7"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.68156 7C8.50732 7 8.97723 6.05578 8.47932 5.39702L5.19777 1.05545C4.79765 0.526091 4.00237 0.52609 3.60225 1.05545L0.320704 5.39702C-0.177216 6.05578 0.292695 7 1.11846 7L7.68156 7Z"
                                                    fill="#41404D" />
                                            </svg>
                                            <svg className="bottom" width="9" height="7" viewBox="0 0 9 7"
                                                fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.68156 7C8.50732 7 8.97723 6.05578 8.47932 5.39702L5.19777 1.05545C4.79765 0.526091 4.00237 0.52609 3.60225 1.05545L0.320704 5.39702C-0.177216 6.05578 0.292695 7 1.11846 7L7.68156 7Z"
                                                    fill="#41404D" />
                                            </svg>
                                        </div>

                                        <div className={!dish.isAvailable ? "img out_stock" : "img"}
                                            style={{
                                                backgroundImage: `url(${dish.picture ? dish.picture : DefaultImage})`,
                                                backgroundPosition: 'center'
                                            }}></div>
                                        <div className="menu-ind">
                                            <div className="action">
                                                <svg className="trash" width="15" height="16"
                                                    viewBox="0 0 15 16"
                                                    fill="none" xmlns="http://www.w3.org/2000/svg"
                                                    id={category.id}
                                                    onClick={() => this.deleteMenu(dish.id)}>
                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                        d="M13.5393 2.66665H10.0121V0.666661C10.0121 0.298474 9.74885 0 9.42418 0H4.72118C4.39651 0 4.13331 0.298474 4.13331 0.666661V2.66665H0.606063C0.281389 2.66665 0.0181885 2.96512 0.0181885 3.33331C0.0181885 3.70149 0.281389 3.99997 0.606063 3.99997H13.5393C13.864 3.99997 14.1272 3.70149 14.1272 3.33331C14.1272 2.96512 13.864 2.66665 13.5393 2.66665ZM5.30905 1.33332H8.8363V2.66665H5.30905V1.33332ZM1.78181 5.33329V13.9999C1.78181 15.1045 2.57141 15.9999 3.54543 15.9999H10.5999C11.5739 15.9999 12.3635 15.1045 12.3635 13.9999V5.33329H1.78181ZM5.30904 12.6664H4.13329V7.99973H5.30904V12.6664ZM6.48479 12.6664H7.66054V7.99973H6.48479V12.6664ZM10.012 12.6664H8.83629V7.99973H10.012V12.6664Z"
                                                        fill="#41404D" />
                                                </svg>
                                            </div>

                                            <p>{dish.name}</p>
                                            <span className={`price ${(!dish.promo) ? '' : 'hidden'}`}>₡{dish.price}</span>
                                            <span className={`price ${(dish.promo) ? '' : 'hidden'}`}>
                                                <span style={{ textDecoration: 'line-through' }}>₡{dish.price}</span>
                                                <span className={`${(dish.specialPrice) ? '' : 'hidden'}`}> | ₡{dish.specialPriceAmount}</span>
                                                <span className={`${(dish.discount) ? '' : 'hidden'}`}> | ₡{dish.price - Math.round((dish.discountPercentage * dish.price) / 100)}</span>
                                                <span className={`${(dish.llevaXpagaY) ? '' : 'hidden'}`}> | {dish.lleva} X {dish.paga}</span>
                                                <span className={`${(dish.envioGratis) ? '' : 'hidden'}`}> | ENVÍO GRATIS</span>
                                            </span>


                                            {/* <span>₡{dish.price}</span> */}
                                            <button onClick={(e) => {this.editMenuItem(e,dish.id)}}>
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                        d="M8.89 0.21L10.99 2.31C11.27 2.59 11.27 3.01 10.99 3.29L9.73 4.55L6.65 1.47L7.91 0.21C8.19 -0.07 8.61 -0.07 8.89 0.21ZM0.21 7.91L5.67 2.45L8.75 5.53L3.29 10.99C3.15 11.13 3.01 11.2 2.8 11.2H0.7C0.28 11.2 0 10.92 0 10.5V8.4C0 8.19 0.07 8.05 0.21 7.91Z"
                                                        fill="white" />
                                                </svg>
                                                Editor
                                            </button>
                                        </div>
                                    </div>
                                )}
                            {
                                category.items.length === 0 &&
                                <small className="text-muted">
                                    <em>No hay ningún plato en esta categoría</em>
                                </small>
                            }
                        </div>
                    </>
                )
                }
            </>
        )


    }


    renderDishEditor() {
        let  categories  = this.state.categoryList;
        
        categories = !categories ? categories = { categories: [] } : categories

        return <>

            <div className={"col-md-4 col-lg-4 col-sm-12 col-xs-12 dishEditorMobile "+(this.state.showItemManage?'':'hidden') }>
                <h3 style={{ marginBottom: '21px' }}>Nuevo item de Menú</h3>
                <div className="menu-details">
                    <label htmlFor="">VISTA PREVIA</label>
                    <div className="add-menu-new">
                        <div className="add-item">
                            <div className="img"
                                style={{
                                    backgroundImage: `url(${this.state.selectedDish.picture ? this.state.selectedDish.picture : [this.state.editReq ? DefaultImage : DefaultImage]})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    width: '100%',
                                    height: '100%'
                                }}></div>
                        </div>
                        <div className="add-details">
                            <p className="title">{this.state.selectedDish.name}</p>
                            <p className="dummy">
                                {this.state.selectedDish.description}
                            </p>

                            <p className={`price ${(!this.state.selectedDish.promo) ? '' : 'hidden'}`}>₡{this.state.selectedDish.price}</p>
                            <p className={`price ${(this.state.selectedDish.promo) ? '' : 'hidden'}`}>
                                <span style={{ textDecoration: 'line-through' }}>₡{this.state.selectedDish.price}</span>
                                <span className={`${(this.state.selectedDish.specialPrice) ? '' : 'hidden'}`}> | ₡{this.state.selectedDish.specialPriceAmount}</span>
                                <span className={`${(this.state.selectedDish.discount) ? '' : 'hidden'}`}> | ₡{this.calculatePercentage()}</span>
                                <span className={`${(this.state.selectedDish.llevaXpagaY) ? '' : 'hidden'}`}> | {this.state.selectedDish.lleva}  {this.state.selectedDish.paga}</span>
                                <span className={`${(this.state.selectedDish.envioGratis) ? '' : 'hidden'}`}> | ENVÍO GRATIS</span>
                            </p>
                        </div>
                        <button className="btn-add-menu" onClick={e => {
                            e.preventDefault()
                        }}>Agregar
                        </button>
                    </div>
                    <div className="menu-elements">
                        <ul className="menu-tabs">
                            <li className={this.state.showagotado && !this.state.showDisponible ? '' : 'active'}>
                                <a onClick={(e) => this.selectTab(e, 0)} style={{ cursor: "pointer" }}>Disponible</a>
                            </li>
                            <li className={!this.state.showagotado && this.state.showDisponible ? '' : 'active'}>
                                <a onClick={(e) => this.selectTab(e, 1)} style={{ cursor: "pointer" }}>Agotado</a>
                            </li>
                        </ul>

                        <div>
                            <label htmlFor="">NOMBRE DEL item:</label>
                            <input type="text" className="uni-input" name="name"
                                onChange={this.addMenuInputChangeHandler}
                                value={this.state.selectedDish.name} />
                            <p style={{ color: "red" }}>
                                {/*{!this.state.ignoreValidation ? this.validator.message('name', this.state.selectedDish.name, 'required') : ''}*/}
                                {this.validator.message('name', this.state.selectedDish.name, 'required')}
                            </p>
                            <label htmlFor="">DescripciÓn:</label>
                            <textarea name="description" className="uni-input" style={{padding: '8px 12px'}} id="" cols="30"
                                rows="10"
                                onChange={this.addMenuInputChangeHandler}
                                value={this.state.selectedDish.description} />
                            <p style={{ color: "red" }}>
                                {/*{!this.state.ignoreValidation ? this.validator.message('name', this.state.selectedDish.description, 'required') : ''}*/}
                                {this.validator.message('description', this.state.selectedDish.description, 'required')}
                            </p>
                            <label htmlFor="">CATEGORIA (Próximamente)</label>
                            <Select className="cstm-select" value={this.state.selectedDish.categoryId} name="categoryId"
                                onChange={(e) => {this.selectHandleChange(e)} }
                                placeholder="Categoria"
                                options={categories.map(category => {
                                    return { value: category.name, label: category.name, id: category.id }
                                })}
                            />
                            <p style={{ color: "red" }}>
                                {/*{!this.state.ignoreValidation ? this.validator.message('name', this.state.selectedDish.categoryId, 'required') : ''}*/}
                                {this.validator.message('categoryId', this.state.selectedDish.categoryId, 'required')}
                            </p>
                            <label htmlFor="">PRECIO:</label>
                            <input type="number" className="uni-input" name="price" min={0}
                                onChange={this.addMenuInputChangeHandler}
                                value={this.state.selectedDish.price} />
                            <p style={{ color: "red" }}>
                                {/*{!this.state.ignoreValidation ? this.validator.message('name', this.state.selectedDish.price, 'required|numeric|min:0,num') : ''}*/}
                                {this.validator.message('price', this.state.selectedDish.price, 'required|numeric|min:0,num')}
                            </p>

                            <input type="file" id="my_file" style={{ display: "none" }} accept="image/*"
                                onChange={this.handleProductImageUpload} ref={this.productPictRefUpload} />

                            <div className="photo-area">
                                <div className="upload" onClick={this.uploadPhoto.bind(this)}>
                                    <div className="center">
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0)">
                                                <path
                                                    d="M18.8282 14.1716C20.3903 15.7338 20.3903 18.2665 18.8282 19.8287C17.266 21.3908 14.7333 21.3908 13.1711 19.8287C11.609 18.2665 11.609 15.7338 13.1711 14.1716C14.7333 12.6095 17.266 12.6095 18.8282 14.1716Z"
                                                    fill="white" />
                                                <path
                                                    d="M27.9999 5.99941H25.2361L23.2351 1.99927H8.76298L6.76386 6.00137L4.004 6.00629C1.80376 6.01022 0.0126439 7.80323 0.0107441 10.0045L0 25.9991C0 28.2052 1.794 30.0002 4.00014 30.0002H27.9999C30.2061 30.0002 32.0001 28.2062 32.0001 26V9.99948C32 7.79341 30.206 5.99941 27.9999 5.99941ZM15.9995 25C11.5882 25 7.99923 21.411 7.99923 16.9997C7.99923 12.5884 11.5882 8.99943 15.9995 8.99943C20.4108 8.99943 23.9998 12.5884 23.9998 16.9997C23.9998 21.411 20.4108 25 15.9995 25Z"
                                                    fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0">
                                                    <rect width="32" height="32" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <label htmlFor="">Agregar Fotografia</label>
                                </div>
                                <div className="chk-area">
                                    <div className='divP'>
                                        <Checkbox id="upsell" name="upsell"
                                            onChange={(e) => this.CheckboxChangeHandler(e, 'upsell')}
                                            checked={this.state.selectedDish.upsell} />
                                        <label htmlFor="" className="chk-label">Upsell</label>
                                    </div>
                                    <div className='divP'>
                                        <Checkbox id="recomendacion" name="recomendacion"
                                            onChange={(e) => this.CheckboxChangeHandler(e, 'recomendacion')}
                                            checked={this.state.selectedDish.recomendacion} />
                                        <label htmlFor="" className="chk-label">Recomendación</label>
                                    </div>
                                    <div className='divP'>
                                        <Checkbox id="promo" name="promo"
                                            onChange={(e) => this.CheckboxChangeHandler(e, 'promo')}
                                            checked={this.state.selectedDish.promo} />
                                        <label htmlFor="" className="chk-label">Promoción</label>
                                    </div>
                                </div>

                                <div className={!this.state.selectedDish.promo ? 'd-none' : ''}>
                                    <div className="promo-area">
                                        <label htmlFor="">PROMOCIONES</label>
                                        <div className='divP'>
                                            <Checkbox id="specialPrice" name="specialPrice"
                                                onChange={(e) => this.CheckboxChangeHandler(e, 'specialPrice')}
                                                checked={this.state.selectedDish.specialPrice} disabled={this.state.selectedDish.discount ? true : false} />
                                            <label htmlFor="" className="chk-label">Precio especial</label>
                                        </div>
                                        <div
                                            className={`promo-code ${this.state.selectedDish.specialPrice ? '' : 'hidden'}`}>
                                            <label htmlFor="">PRECIO PROMOCIÓN</label>
                                            <input type="number" className="uni-input" name="specialPriceAmount" min={0}
                                                onChange={this.addMenuInputChangeHandler}
                                                value={this.state.selectedDish.specialPriceAmount} />
                                            <p style={{ color: "red" }}>
                                                {/*{!this.state.ignoreValidation ? this.validator.message('name', this.state.selectedDish.price, 'required|numeric|min:0,num') : ''}*/}
                                                {this.state.selectedDish.specialPrice ? this.validator.message('name', this.state.selectedDish.specialPriceAmount, 'required|numeric|min:0,num') : null}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="promo-area">
                                        <div className='divP'>
                                            <Checkbox id="discount" name="discount"
                                                onChange={(e) => this.CheckboxChangeHandler(e, 'discount')}
                                                checked={this.state.selectedDish.discount} disabled={this.state.selectedDish.specialPrice ? true : false} />
                                            <label htmlFor="" className="chk-label">% de descuento</label>
                                        </div>
                                        <div
                                            className={`promo-code ${this.state.selectedDish.discount ? '' : 'hidden'}`}>
                                            <label htmlFor="">PORCENTAJE</label>
                                            <input type="number" className="uni-input" name="discountPercentage" min={0}
                                                onChange={this.addMenuInputChangeHandler} style={{ width: "100px" }}
                                                value={this.state.selectedDish.discountPercentage} />
                                            <p style={{ color: "red" }}>
                                                {/*{!this.state.ignoreValidation ? this.validator.message('name', this.state.selectedDish.price, 'required|numeric|min:0,num') : ''}*/}
                                                {this.state.selectedDish.discount ? this.validator.message('name', this.state.selectedDish.discountPercentage, 'required|numeric|min:0,num') : null}
                                            </p>
                                            <p className="discounted">
                                                <span className="cross">₡{this.state.selectedDish.price}</span> | <span>₡{this.calculatePercentage()}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="promo-area">
                                        <div className='divP'>
                                            <Checkbox id="llevaXpagaY" name="discount"
                                                onChange={(e) => this.CheckboxChangeHandler(e, 'llevaXpagaY')}
                                                checked={this.state.selectedDish.llevaXpagaY} />
                                            <label htmlFor="" className="chk-label">Llleva “x”, paga
                                                “y”</label>
                                        </div>
                                        <div
                                            className={`promo-code ${this.state.selectedDish.llevaXpagaY ? '' : 'hidden'}`}>
                                            <div className="row">
                                                <div className="col">
                                                    <label htmlFor="">LLEVA</label>
                                                    <input type="number" className="uni-input" name="lleva" min={0}
                                                        onChange={this.addMenuInputChangeHandler}
                                                        value={this.state.selectedDish.lleva} />
                                                    <p style={{ color: "red" }}>
                                                        {/*{!this.state.ignoreValidation ? this.validator.message('name', this.state.selectedDish.price, 'required|numeric|min:0,num') : ''}*/}
                                                        {this.state.selectedDish.llevaXpagaY ? this.validator.message('name', this.state.selectedDish.lleva, 'required|numeric|min:0,num') : null}
                                                    </p>
                                                </div>
                                                <div className="col">
                                                    <label htmlFor="">PAGA</label>
                                                    <input type="number" className="uni-input" name="paga" min={0}
                                                        onChange={this.addMenuInputChangeHandler}
                                                        value={this.state.selectedDish.paga} />
                                                    <p style={{ color: "red" }}>
                                                        {/*{!this.state.ignoreValidation ? this.validator.message('name', this.state.selectedDish.price, 'required|numeric|min:0,num') : ''}*/}
                                                        {this.state.selectedDish.llevaXpagaY ? this.validator.message('name', this.state.selectedDish.paga, 'required|numeric|min:0,num') : null}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="promo-area">
                                        <div className='divP'>
                                            <Checkbox id="envioGratis" name="discount"
                                                onChange={(e) => this.CheckboxChangeHandler(e, 'envioGratis')}
                                                checked={this.state.selectedDish.envioGratis} />
                                            <label htmlFor="" className="chk-label">Envío gratis</label>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="row" style={{ marginTop: '40px' }}>
                                <button className="btn-theme" onClick={this.addMenuFormSubmitHandler}>GUARDAR</button>
                                <br />
                                <button className="btn hidden-lg hidden-md btn-theme" onClick={this.hideEditorMobile} style={{marginTop: "5px"}}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    }
}

const mapStateToProps = store =>
    (
        {
            items: store.menu.items,
            // dishes: store.menu.items,
            categories: store.menu.categories,
            // MENU_LIST: menuReducer.MENU_LIST
        }
    )

const mapDispatchToProps = dispatch => bindActionCreators({
    getMenuListByCategoryData,
    postMenuFormData,
    getMenuListData,
    postRemovalMenuFormData
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Dishes)