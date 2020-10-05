import React, {Component} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import LoaderInScreen from "../../../Public/LoaderInScreen";
import {uuid} from "uuidv4";
import {bindActionCreators} from "redux";
import {
    getCategoryListData, getMenuListData,
    updateCategoryFormData,
    postMenuFormData
} from "../../../../actions";
import {connect} from "react-redux";
import $ from "jquery";
import axios from "axios";

class Categories extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            menuList: [],
            isFetched: true,
            eventTriggered: null,
            categoryDataToPost: {name: ''}
        }
        this.validator = new SimpleReactValidator({
            locale: 'es',
            autoForceUpdate: this
        });
    }

    toggleCategoryModal = () => {
        this.setState({show: !this.state.show});
    }

    formSubmitHandler = (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            this.processSubmit();
        } else {
            this.validator.showMessages();
        }
    };
    inputChangeHandler = (e) => {
        let obj = this.state.categoryDataToPost
        obj[e.target.name] = e.target.value
        this.setState({categoryDataToPost: obj})
    }

    deleteCategory = (id) => {
        console.log("deleteCategory", id)
        let categoryListToUpdate = this.props.categories.categories
        let result = categoryListToUpdate.filter(function (el) {
            return el.id != id;
        })

        //check  if the category  has products
        const GET_MENU_LIST_BY_CATEGORY_URL = 'https://us-central1-kuai-test.cloudfunctions.net/api/menu/item/';
        axios.get(GET_MENU_LIST_BY_CATEGORY_URL + id, {})
            .then(response => {
                console.log('response', response)
                let dishes = (response.data.response.productItemList) ? JSON.parse(response.data.response.productItemList) : false;
                console.log('dishes', dishes)
                //check if the object Id exists in the list, if so update'


                //If category has dishes assign to next top category
                if (dishes != false) {
                    const defaultCategory = result[0].id;
                    console.log('currentCategory', id)
                    console.log('defaultCategory', defaultCategory)

                    dishes.map(dish => {
                        dish.categoryId = defaultCategory;
                    })

                    //Get Defaul categories array list
                    axios.get(GET_MENU_LIST_BY_CATEGORY_URL + defaultCategory, {})
                        .then(response => {
                            let catDishes = (response.data.response.productItemList) ? JSON.parse(response.data.response.productItemList) : [];
                            const mergeDishes = [...catDishes, ...dishes];
                            this.props.postMenuFormData(mergeDishes, defaultCategory, () => {
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


                }


                this.setState({categoryListToUpdate: result}, () => {
                    // console.log(this.state.categoryListToUpdate)
                    const dataPack = {
                        catList: this.state.categoryListToUpdate,
                        restaurantId: localStorage.getItem('restaurantId')
                    }
                    this.props.updateCategoryFormData(dataPack, this.props.getCategoryListData({restaurantId: localStorage.getItem('restaurantId')}))
                    /*window.setTimeout(() => {
                        console.log("calling after deleting a menu")
                        this.props.getCategoryListData({restaurantId: localStorage.getItem('restaurantId')})
                    }, 500)*/
                })


                // dispatch(getMenuListFullSuccess(response.data))
            })
            .catch(error => {
                const response = error.response
                console.log(error)
                // dispatch(getMenuListFullError())
                if (response && response.status === 401) {
                    // logout(dispatch)
                }
            })

        // console.log(result)

    }

    categoryUpdateHandler = (id) => {
        const categoryId = id
        $("svg[id=" + categoryId + "].trash").show()
        $("#categories-list svg[id=" + categoryId + "].tik").hide()
        $("input[id=" + categoryId + "]").parent().removeClass('active')
        const dataPack = {
            catList: this.state.categoryListToUpdate,
            restaurantId: localStorage.getItem('restaurantId')
        }
        this.props.updateCategoryFormData(dataPack, this.props.getCategoryListData({restaurantId: localStorage.getItem('restaurantId')}))
        /*window.setTimeout(() => {
            console.log("calling after updating a menu")
            this.props.getCategoryListData({restaurantId: localStorage.getItem('restaurantId')})
        }, 500)*/
    }

    selectHandleChange = categorySelectedOption => {
        // console.log(categorySelectedOption)
        this.setState(
            {categorySelectedOption},
            () => {
                // console.log(`Option selected:`, this.state.categorySelectedOption)
                let obj = this.state.menuDataToPost
                obj['categoryId'] = categorySelectedOption.id
                this.setState({menuDataToPost: obj})
            }
        );
    };

    processSubmit() {
        let {categoryDataToPost} = this.state
        // console.log(form)
        categoryDataToPost['id'] = uuid()
        this.setState({categoryDataToPost: categoryDataToPost})
        // console.log(this.state.categoryDataToPost)
        let categoryListToSend = this.props.categories.categories;
        categoryListToSend.push(categoryDataToPost)
        // console.log(categoryListToSend)
        const dataPack = {
            catList: categoryListToSend,
            restaurantId: localStorage.getItem('restaurantId')
        }
        this.props.updateCategoryFormData(dataPack, this.props.getCategoryListData({restaurantId: localStorage.getItem('restaurantId')}))
        this.setState({
            show: false,
            categoryDataToPost: {name: ''}
        }, () => {
            console.log("calling after adding a menu")
            // this.props.getCategoryListData({restaurantId: localStorage.getItem('restaurantId')})
        })
    }

    getCatList = () => {
        const restaurantId = localStorage.getItem('restaurantId');
        const GET_MENU_LIST_URL = 'https://us-central1-kuai-test.cloudfunctions.net/api/menu/categories/' + restaurantId;
        axios.get(GET_MENU_LIST_URL, {})
            .then(response => {
                console.log(">>>>>>menu list")
                console.log(response.data.categories)
                console.log("menu list<<<<<<")
                this.setState({ menuList: JSON.parse(response.data.categories), isFetched: false });
                this.setState({ eventTriggered: null });
                // dispatch(getMenuListFullSuccess(response.data))
            })
            .catch(error => {
                const response = error.response
                console.log(error)
                // dispatch(getMenuListFullError())
                if (response && response.status === 401) {
                    // logout(dispatch)
                }
            })
    }

    componentDidMount() {

        this._isMounted = true;

        // console.log('this.props.getMenuListByCategoryData()',this.props.getMenuListByCategoryData())

        // console.log('getMenuListByCategoryData',this.getMenuListByCategoryData())

        //  this.setState({allDishes: this.props.getMenuListByCategoryData() })

        this.getCatList()

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log(prevState.eventTriggered)
        // console.log(this.state.eventTriggered)
        if (prevState.eventTriggered !== this.state.eventTriggered) {
            // console.log("eventTriggered")
            this.getCatList()
        }

    }

    componentWillReceiveProps(props) {
        // console.log(props.eventTriggered)
        this.setState({
            eventTriggered: props.eventTriggered,
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <div className={"col-md-4 col-lg-4 col-sm-12 col-xs-12 "}>
                <h3 className="mb-hidden">
                    Categorías
                </h3>
                {/*{this.props.categories.loading ? <LoaderInScreen/> : this.renderCategories()}*/}
                {this.state.isFetched ? <LoaderInScreen/> : this.renderCategories()}
            </div>

        );
    }


    renderCategories() {
        // let {categories} = this.props;
        let categories = this.state.menuList;
        return <div className="rotator-container">
            <button className="btn-theme btn-cat" onClick={this.toggleCategoryModal}>
                <span>+</span>NUEVA CATEGORÍA
            </button>
            <Modal
                className="cstm-modal"
                size="xs"
                show={this.state.show}
                onHide={this.toggleCategoryModal}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        NUEVA CATEGORÍA
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.formSubmitHandler}>
                        <div className="ls-panel">
                            <input type="text" className={"uni-input"} name="name"
                                   placeholder="Ex: Aperitivo"
                                   onChange={this.inputChangeHandler}
                                   value={this.state.categoryDataToPost.name}
                                   autoComplete={"off"}/>
                            <p style={{color: "red"}}>
                                {this.validator.message('name', this.state.categoryDataToPost.name, 'required')}
                            </p>
                            <Button className="btn btn-theme" type="submit">
                                NUEVA
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <div className="rotator-scroll" style={{paddingTop: '25px'}}
                 id="categories-list">
                {categories.length === 0 ? this.renderNoCategories() : this.renderCategoriesList()}
            </div>
        </div>
    }

    renderNoCategories() {
        return <>
            <h6 className="lead" style={{color: "grey"}}><b>No se encontró ninguna categoría.</b></h6>
        </>
    }

    categoryInputChangeHandler = (e) => {
        let categoryId = e.target.id
        let categoryName = e.target.value
        let categoryObj = {id: categoryId, name: categoryName}
        $("svg[id=" + categoryId + "].trash").hide()
        $("#categories-list svg[id=" + categoryId + "].tik").show()
        $("input[id=" + categoryId + "]").parent().addClass('active')

        // let categoryListToUpdate = this.props.categories.categories
        let categoryListToUpdate = this.state.menuList
        // console.log(categoryListToUpdate)
        let foundIndex = categoryListToUpdate.findIndex(x => x.id == categoryId);
        // console.log(categoryObj)
        categoryListToUpdate[foundIndex] = categoryObj;
        this.state.categoryListToUpdate = categoryListToUpdate
        this.setState({categoryListToUpdate: categoryListToUpdate}, () => {
            // console.log(this.state.categoryListToUpdate)
        })
    }


    renderCategoriesList() {
        // console.log('categories',categories)
        //onClick={() => this.props.loadMenu(category.id, category.name)}
        console.log(this.state.menuList)
        return <>
            {
                this.state.menuList.map(category =>
                    <div className="rotator" key={category.id}>
                        <div className="directional">
                            <svg className="top" width="9" height="7" viewBox="0 0 9 7"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7.68156 7C8.50732 7 8.97723 6.05578 8.47932 5.39702L5.19777 1.05545C4.79765 0.526091 4.00237 0.52609 3.60225 1.05545L0.320704 5.39702C-0.177216 6.05578 0.292695 7 1.11846 7L7.68156 7Z"
                                    fill="#41404D"/>
                            </svg>
                            <svg className="bottom" width="9" height="7"
                                 viewBox="0 0 9 7"
                                 fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7.68156 7C8.50732 7 8.97723 6.05578 8.47932 5.39702L5.19777 1.05545C4.79765 0.526091 4.00237 0.52609 3.60225 1.05545L0.320704 5.39702C-0.177216 6.05578 0.292695 7 1.11846 7L7.68156 7Z"
                                    fill="#41404D"/>
                            </svg>
                        </div>
                        <input type="text" value={category.name} id={category.id}
                               onChange={this.categoryInputChangeHandler}/>
                        <div className="action">
                            <svg className="trash" width="15" height="16"
                                 viewBox="0 0 15 16"
                                 fill="none" xmlns="http://www.w3.org/2000/svg"
                                 id={category.id}
                                 onClick={() => this.deleteCategory(category.id)}>
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M13.5393 2.66665H10.0121V0.666661C10.0121 0.298474 9.74885 0 9.42418 0H4.72118C4.39651 0 4.13331 0.298474 4.13331 0.666661V2.66665H0.606063C0.281389 2.66665 0.0181885 2.96512 0.0181885 3.33331C0.0181885 3.70149 0.281389 3.99997 0.606063 3.99997H13.5393C13.864 3.99997 14.1272 3.70149 14.1272 3.33331C14.1272 2.96512 13.864 2.66665 13.5393 2.66665ZM5.30905 1.33332H8.8363V2.66665H5.30905V1.33332ZM1.78181 5.33329V13.9999C1.78181 15.1045 2.57141 15.9999 3.54543 15.9999H10.5999C11.5739 15.9999 12.3635 15.1045 12.3635 13.9999V5.33329H1.78181ZM5.30904 12.6664H4.13329V7.99973H5.30904V12.6664ZM6.48479 12.6664H7.66054V7.99973H6.48479V12.6664ZM10.012 12.6664H8.83629V7.99973H10.012V12.6664Z"
                                      fill="#41404D"/>
                            </svg>
                            <svg className="tik" width="14" height="12"
                                 viewBox="0 0 14 12" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" id={category.id}
                                 style={{display: "none"}}
                                 onClick={() => this.categoryUpdateHandler(category.id)}>
                                <path
                                    d="M11.694 1.13765C12.1498 0.620782 12.8888 0.620782 13.3445 1.13765C13.8003 1.65452 13.8003 2.49254 13.3445 3.00941L6.34187 10.9506C5.88608 11.4675 5.14711 11.4675 4.69132 10.9506L0.800946 6.53882C0.34516 6.02195 0.34516 5.18394 0.800946 4.66706C1.25673 4.15019 1.99571 4.15019 2.45149 4.66706L5.51659 8.14295L11.694 1.13765Z"
                                    fill="#37DBE4"/>
                            </svg>
                        </div>
                    </div>
                )
            }
        </>
    }
}

const mapStateToProps = ({menuReducer}) => ({categories: menuReducer.categories})
const mapDispatchToProps = dispatch => bindActionCreators({
    updateCategoryFormData,
    getCategoryListData,
    getMenuListData,
    postMenuFormData
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Categories)