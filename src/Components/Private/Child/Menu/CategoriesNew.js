import React, {Component} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import LoaderInScreen from "../../../Public/LoaderInScreen";
import {uuid} from "uuidv4";
import {bindActionCreators} from "redux";
import {
    getCategoryListData,
    updateCategoryFormData,
    postMenuFormData,
} from "../../../../actions";
import {connect} from "react-redux";
import $ from "jquery";
import axios from "axios";

class Categories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            itemList: [],
            categoryList: [],
            categoryListToUpdate:[],
            categoryDataToPost: {name: '',id:''}
        }

        SimpleReactValidator.addLocale('es', {
            required: 'este campo es requerido'
        });

        this.validator = new SimpleReactValidator({
            locale: 'es',
            autoForceUpdate: this
        });
    }

    componentWillMount() {
        this.props.getCategoryListData({ restaurantId: localStorage.getItem('restaurantId') })
    }

    componentDidUpdate(previousProps) {
        if ((previousProps.categories.loading && !this.props.categories.loading) || (previousProps.items.loading && !this.props.items.loading)) {
            const categories = this.props.categories
            const items = this.props.items
            this.setState({categoryList:categories.data,categoryListToUpdate:categories.data,itemList:items});
        }
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

    categoryInputChangeHandler = (e) => {
        let categoryId = e.target.id
        let categoryName = e.target.value
        let categoryObj = {id: categoryId, name: categoryName}
        $("svg[id=" + categoryId + "].trash").hide()
        $("#categories-list svg[id=" + categoryId + "].tik").show()
        $("input[id=" + categoryId + "]").parent().addClass('active')

        let categoryListToUpdate = this.state.categoryList
        console.log(categoryListToUpdate)
        let foundIndex = categoryListToUpdate.findIndex(x => x.id == categoryId);
        console.log(categoryObj)

        categoryListToUpdate[foundIndex] = categoryObj;
        this.setState({categoryList: categoryListToUpdate})
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
        this.props.updateCategoryFormData(dataPack)
        

    }

    inputChangeHandler = (e) => {
        let obj = this.state.categoryDataToPost
        obj[e.target.name] = e.target.value
        this.setState({categoryDataToPost: obj})
    }

    deleteCategory = (id) => {
        console.log("deleteCategory", id)
        let categoryListToUpdate = this.state.categoryList
        let categoryResult = categoryListToUpdate.filter(function (el) {
            return el.id != id;
        })

        let itemListToUpdate = this.state.itemList.data;
        let itemResult = itemListToUpdate.filter(function (el) {
            return el.id != id;
        })

        const categoryDataPack = {
            catList: categoryResult,
            restaurantId: localStorage.getItem('restaurantId')
        }

        const itemDataPack = {
            catList: categoryResult,
            restaurantId: localStorage.getItem('restaurantId')
        }
        this.props.updateCategoryFormData(categoryDataPack);
        // this.props.postMenuFormData(itemDataPack);
       
    }


    

    selectHandleChange = categorySelectedOption => {
        
    };

    processSubmit() {
        let categoryDataToPost = this.state.categoryDataToPost;
        categoryDataToPost['id'] = uuid()
        this.setState({categoryDataToPost: categoryDataToPost})
        console.log(this.state.categoryDataToPost)
        let categoryListToSend = this.state.categoryList;
        categoryListToSend.push(categoryDataToPost)
        // console.log(categoryListToSend)
        const dataPack = {
            catList: categoryListToSend,
            restaurantId: localStorage.getItem('restaurantId')
        }
        this.props.updateCategoryFormData(dataPack)
        this.setState({
            show: false,
            categoryDataToPost: {name: '',id:''}
        }, () => {
            console.log("calling after adding a menu")
        })
    }

    

    

    render() {
        return (
            <div className={"col-md-4 col-lg-4 col-sm-12 col-xs-12 "}>
                <h3 className="mb-hidden">
                    Categorías
                </h3>
                {this.props.categories.loading ? <LoaderInScreen/> : this.renderCategories()}
            </div>

        );
    }


    renderCategories() {
        let categories = this.state.categoryList;
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

    renderCategoriesList() {
        return <>
            {
                this.state.categoryList.map(category =>
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

const mapStateToProps = store =>
    (
        {
            categories: store.menu.categories,
            items:store.menu.items
        }
    )
const mapDispatchToProps = dispatch => bindActionCreators({
    updateCategoryFormData,
    getCategoryListData,
    postMenuFormData,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Categories)