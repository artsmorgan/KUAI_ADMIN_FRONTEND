import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import {
    postMenuFormData,
    getMenuListByCategoryData
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
            allDishes: { productList: [] },
            isFetched: true,
            selectedDish: {},
            categoryOptions: [],
            selectedOption: null,
            eventTriggered: null,
            ignoreValidation: false,
            showDisponible: true,
            showagotado: null,
            editReq: false,
            uploadedFile: null,
            previousCategory: null,
            dishHasCategoryChange: false,
            isCreationMode: false
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

    deleteMenu = (id) => {
        let dataToPost = [];
        let categoryId = '';
        let arrayKey = '';
        let menuListToUpdate = this.state.allDishes.productList;

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

        this.props.postMenuFormData(dataToPost, categoryId)

    }

    componentWillMount() {
        this.props.getMenuListByCategoryData({restaurantId: localStorage.getItem('restaurantId')})
    }

    componentDidMount() {

        this._isMounted = true;

    }

    componentDidUpdate(previousProps) {
        console.log("componentDidUpdate")
        console.log(previousProps.dishes.loading)
        console.log(this.props.dishes.loading)
        console.log("************end")
        if (previousProps.dishes.loading && !this.props.dishes.loading) {
            console.log("going to update MENU list")
            const dishes = this.props.MENU_LIST;
            this.setState({ allDishes: dishes, isFetched: false });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.setState({ dishHasCategoryChange: false, previousCategory: null })
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

    newMenuItem() {
        //reset previous states
        this.setState({ dishHasCategoryChange: false, previousCategory: '', isCreationMode: true })

        this.setState({ selectedDish: {} }, () => {
            let newDish = {
                id: uuid(),
                isAvailable: true,
                name: '',
                description: '',
                categoryId: null,
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
            this.setState({ selectedDish: newDish, showDisponible: true, showagotado: false }, () => {
                $('div.dishEditorMobile').removeClass('hidden');
                console.log('selectedDish', this.state.selectedDish)
                console.log('dishHasCategoryChange', this.state.dishHasCategoryChange)
            });
        })
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


    render() {
        if (this.props.categories.loading || this.props.dishes.loading) {
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
                                {this.state.isFetched
                                    ? <LoaderInScreen />
                                    : [
                                        this.state.allDishes !== undefined && this.state.allDishes.productList.length === 0 ? this.renderNoItems() : this.renderDishes()
                                    ]
                                }
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

    selectHandleChange = selectedOption => {
        //previousCategory
        console.log('isCreationMode', this.state.isCreationMode)
        console.log('previousCategory', this.state.selectedDish.categoryId)
        console.log('new Category', selectedOption)
        //dishHasCategoryChange
        if (!this.state.isCreationMode) {
            if (this.state.selectedDish.categoryId !== selectedOption.id) {
                this.setState({ dishHasCategoryChange: true, previousCategory: this.state.selectedDish.categoryId })

            }
        }


        this.setState(
            { selectedOption },
            () => {
                // console.log(`Option selected:`, this.state.selectedOption)
                let obj = this.state.selectedDish
                obj['categoryId'] = selectedOption.id

                this.setState({ selectedDish: obj }, () => {
                    console.log(this.state.selectedDish)
                })
            }
        );
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

    renderDish() {
        return <i>test</i>
    }

    renderCategoryTitle() {
    }

    renderDishes() {
        let dishes = this.state.allDishes;

        let categoriesArr = []

        let categories = dishes !== undefined && dishes.productList.map(category => {
            var categoryObj = {};

            categoryObj['name'] = category.name;
            categoryObj['id'] = category.id;

            if (category.products.menuItems && category.products.menuItems.productItemList) {
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
                                                <span className={`${(dish.discount) ? '' : 'hidden'}`}> | ₡{dish.price-Math.round((dish.discountPercentage*dish.price)/100)}</span>
                                                <span className={`${(dish.llevaXpagaY) ? '' : 'hidden'}`}> | {dish.lleva} X {dish.paga}</span>
                                                <span className={`${(dish.envioGratis) ? '' : 'hidden'}`}> | ENVÍO GRATIS</span>
                                            </span>


                                            {/* <span>₡{dish.price}</span> */}
                                            <button onClick={() => {
                                                // $('div.dishEditorMobile').removeClass('hidden')
                                                this.setState({
                                                    selectedOption: {
                                                        value: category.name,
                                                        label: category.name,
                                                        id: category.id
                                                    },
                                                    // showDisponible: true,
                                                    // showagotado: false,
                                                    editReq: true
                                                })
                                                this.setState({ dishHasCategoryChange: false, previousCategory: null, isCreationMode: false })
                                                this.setState({ selectedDish: { ...dish } }, () => {
                                                    let obj = this.state.selectedDish
                                                    console.log("editor")
                                                    this.setState({
                                                        showDisponible: obj.isAvailable ? true : false,
                                                        showagotado: obj.isAvailable ? false : true,
                                                    }, () => {
                                                        console.log("editor..inside")
                                                    })
                                                    console.log("editor..ouside")
                                                    $('div.dishEditorMobile').removeClass('hidden')
                                                })
                                            }}>
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

    addMenuProcessSubmit() {

        // console.log('here')

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

        const dishes = [];
        this.state.allDishes.productList.forEach(dish => {
            if (dish.id !== obj.id) {
                dishes.push(dish);
            }
        })

        const restaurantId = localStorage.getItem('restaurantId');

        console.log('this.state.dishHasCategoryChange', this.state.dishHasCategoryChange)
        const expectedCategoryId = (this.state.dishHasCategoryChange) ? this.state.previousCategory : obj.categoryId;


        const GET_MENU_LIST_BY_CATEGORY_URL = 'https://us-central1-kuai-test.cloudfunctions.net/api/menu/item/' + expectedCategoryId;
        axios.get(GET_MENU_LIST_BY_CATEGORY_URL, {})
            .then(response => {

                let dishes = (response.data.response.productItemList) ? JSON.parse(response.data.response.productItemList) : [];
                console.log('dishes', dishes)
                //check if the object Id exists in the list, if so update'
                const IsEdit = _.findIndex(dishes, function (item) {
                    return item.id === obj.id;
                })


                let cateId = this.props.selectedCategory.id ? this.props.selectedCategory.id : this.state.selectedDish.categoryId;

                if (IsEdit >= 0) {

                    // console.log('dishes[IsEdit]',dishes[IsEdit])

                    //this.setState({dishHasCategoryChange: true, previousCategory: this.state.selectedDish.categoryId})
                    if (this.state.dishHasCategoryChange) {
                        //Remove product from current dish list
                        let result = dishes.filter(function (dish) {
                            return dish.id != obj.id;
                        })

                        console.log('current dish list', dishes);
                        console.log('new dish list', result);


                        //get new dish list
                        const GET_MENU_LIST_BY_CATEGORY_URL = 'https://us-central1-kuai-test.cloudfunctions.net/api/menu/item/' + obj.categoryId;
                        axios.get(GET_MENU_LIST_BY_CATEGORY_URL, {})
                            .then(response => {
                                let new_dishes = (response.data.response.productItemList) ? JSON.parse(response.data.response.productItemList) : [];
                                new_dishes.push(obj);
                                this.props.postMenuFormData(new_dishes, obj.categoryId, () => {
                                })
                            })
                            .catch(error => {
                                const response = error.response
                                console.log(error)
                                // dispatch(getMenuListFullError())
                                if (response && response.status === 401) {
                                    // logout(dispatch)
                                }
                            })

                        //add the dish to the new dish list
                        dishes = result;
                    } else {
                        const defaultCategory = this.props.categories.categories[0].id;


                        if (cateId == null) {
                            cateId = defaultCategory;
                            obj.categoryId = defaultCategory;
                        }
                        dishes[IsEdit] = obj
                    }


                } else {
                    dishes.push(obj);
                }

                this.props.postMenuFormData(dishes, expectedCategoryId, () => {
                    this.setState({ selectedDish: null, ignoreValidation: true, selectedOption: null }, () => {
                        console.log(this.state.selectedDish)
                    })
                    this.props.getMenuListByCategoryData({restaurantId: localStorage.getItem('restaurantId')})
                    console.log(this.state.selectedDish)
                })
            })
            .catch(error => {
                const response = error.response
                console.log(response)
                if (response && response.status === 401) {
                }
            })
    }

    addMenuFormSubmitHandler = (e) => {
        e.preventDefault();
        console.log(this.state.selectedDish)
        console.log(this.validator.allValid())
        if (this.validator.allValid()) {
            this.addMenuProcessSubmit();
        } else {
            this.validator.showMessages();
        }
    };

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

    hideEditorMobile() {
        $('div.dishEditorMobile').addClass('hidden')
    }

    renderDishEditor() {
        if (this.state.selectedDish === null) {
            return <></>
        }

        let { categories } = this.props;
        categories = !categories ? categories = { categories: [] } : categories
        return <>

            <div className={"col-md-4 col-lg-4 col-sm-12 col-xs-12 dishEditorMobile hidden"}>
                <h3 style={{ marginBottom: '21px' }}>Nuevo item de Menú</h3>
                <div className="menu-details">
                    <label htmlFor="">VISTA PREVIA</label>
                    <div className="add-menu-new">
                        <div className="add-item">
                            <div className="img"
                                 style={{
                                     backgroundImage: `url(${this.state.selectedDish.picture ? this.state.selectedDish.picture : [this.state.editReq ? DefaultImage : '']})`,
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
                                <span className={`${(this.state.selectedDish.llevaXpagaY) ? '' : 'hidden'}`}> | {this.state.selectedDish.lleva} X {this.state.selectedDish.paga}</span>
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
                            <textarea name="description" className="uni-input" id="" cols="30"
                                      rows="10"
                                      onChange={this.addMenuInputChangeHandler}
                                      value={this.state.selectedDish.description} />
                            <p style={{ color: "red" }}>
                                {/*{!this.state.ignoreValidation ? this.validator.message('name', this.state.selectedDish.description, 'required') : ''}*/}
                                {this.validator.message('description', this.state.selectedDish.description, 'required')}
                            </p>
                            <label htmlFor="">CATEGORIA (Próximamente)</label>
                            <Select className="cstm-select" value={this.state.selectedOption} name="categoryId"
                                    onChange={this.selectHandleChange}
                                    placeholder="Categoria"
                                    options={this.props.categories.categories.map(category => {
                                        return { value: category.name, label: category.name, id: category.id }
                                    })}
                            />
                            <p style={{ color: "red" }}>
                                {/*{!this.state.ignoreValidation ? this.validator.message('name', this.state.selectedDish.categoryId, 'required') : ''}*/}
                                {this.validator.message('categoryId', this.state.selectedDish.categoryId, 'required')}
                            </p>
                            <label htmlFor="">PRECIO:</label>
                            <input type="number" className="uni-input" name="price"
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
                                                      checked={this.state.selectedDish.specialPrice} disabled={this.state.selectedDish.discount ? true : false}/>
                                            <label htmlFor="" className="chk-label">Precio especial</label>
                                        </div>
                                        <div
                                            className={`promo-code ${this.state.selectedDish.specialPrice ? '' : 'hidden'}`}>
                                            <label htmlFor="">PRECIO PROMOCIÓN</label>
                                            <input type="number" className="uni-input" name="specialPriceAmount"
                                                   onChange={this.addMenuInputChangeHandler}
                                                   value={this.state.selectedDish.specialPriceAmount}/>
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
                                                      checked={this.state.selectedDish.discount} disabled={this.state.selectedDish.specialPrice ? true : false}/>
                                            <label htmlFor="" className="chk-label">% de descuento</label>
                                        </div>
                                        <div
                                            className={`promo-code ${this.state.selectedDish.discount ? '' : 'hidden'}`}>
                                            <label htmlFor="">PORCENTAJE</label>
                                            <input type="number" className="uni-input" name="discountPercentage"
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
                                                    <input type="number" className="uni-input" name="lleva"
                                                           onChange={this.addMenuInputChangeHandler}
                                                           value={this.state.selectedDish.lleva} />
                                                    <p style={{ color: "red" }}>
                                                        {/*{!this.state.ignoreValidation ? this.validator.message('name', this.state.selectedDish.price, 'required|numeric|min:0,num') : ''}*/}
                                                        {this.state.selectedDish.llevaXpagaY ? this.validator.message('name', this.state.selectedDish.lleva, 'required|numeric|min:0,num') : null}
                                                    </p>
                                                </div>
                                                <div className="col">
                                                    <label htmlFor="">PAGA</label>
                                                    <input type="number" className="uni-input" name="paga"
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
                                <button className="btn hideMobile" onClick={this.hideEditorMobile}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    }
}

const mapStateToProps = ({ menuReducer }) => ({
    dishes: menuReducer.dishes,
    categories: menuReducer.categories,
    MENU_LIST: menuReducer.MENU_LIST
})

const mapDispatchToProps = dispatch => bindActionCreators({
    getMenuListByCategoryData,
    postMenuFormData,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Dishes)