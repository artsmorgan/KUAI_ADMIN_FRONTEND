import React from 'react';
import {Button, Nav} from 'react-bootstrap';
import Navbar from "./Child/Fixed/Navbar/Navbar";

import Sidebar from "./Child/Fixed/Sidebar/Sidebar";


import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    getCategoryListData,
    getMenuListData,
    postMenuFormData,
    redirectToUrl,
    updateCategoryFormData
} from '../../actions'
import SimpleReactValidator from "simple-react-validator";
import {uuid} from 'uuidv4';
import $ from 'jquery'
import Categories from "./Child/Menu/Categories";
import Dishes from "./Child/Menu/Dishes";

class ModifyMenu extends React.Component {

    constructor(props) {
        super(props);

    this.state = {
      selectedCategory: ''
    }

        this.newMenuItem = this.newMenuItem.bind(this);

        SimpleReactValidator.addLocale('es', {
            required: 'este campo es requerido'
        });

        this.validator = new SimpleReactValidator({
            locale: 'es',
            autoForceUpdate: this
        });
    }

    inputChangeHandler = (e) => {
        let obj = this.state.categoryDataToPost
        obj[e.target.name] = e.target.value
        this.setState({categoryDataToPost: obj})
        // console.log(this.state.categoryDataToPost);
    }

    formSubmitHandler = (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            this.processSubmit();
        } else {
            this.validator.showMessages();
        }
    };

    addMenuInputChangeHandler = (e) => {
        let obj = this.state.menuDataToPost
        obj[e.target.name] = e.target.value
        this.setState({menuDataToPost: obj})
    }

    addMenuFormSubmitHandler = (e) => {
        e.preventDefault();
        if (this.validator.allValid()) {
            this.addMenuProcessSubmit();
        } else {
            this.validator.showMessages();
        }
    };


    processSubmit() {
        let {categoryDataToPost} = this.state
        // console.log(form)
        categoryDataToPost['id'] = uuid()
        this.setState({categoryDataToPost: categoryDataToPost})
        // console.log(this.state.categoryDataToPost)
        let categoryListToSend = this.state.categoryList;
        categoryListToSend.push(categoryDataToPost)
        // console.log(categoryListToSend)
        this.props.updateCategoryFormData(categoryListToSend)
        this.setState({
            show: false,
            categoryDataToPost: {}
        })
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

            this.setState({formTab: alltabs})
        }
    }

    newMenuItem() {

        let obj = this.state.formTab
        console.log(obj)
        obj['newMenuItem'] = true;
        if (this.state.mobile) {
            obj['menuTab'] = false
        }
        this.setState({formTab: obj});
    }

    displayCategoryList = () => {
        let categoryList = []
        try {
            const {menuReducer} = this.props
            // console.log(menuReducer['CATEGORY_LIST'])
            categoryList = JSON.parse(menuReducer['CATEGORY_LIST'].categories);
            // console.log(categoryList)
            if (categoryList) {
                this.setState({categoryList: categoryList})
                this.setState({categoryListToUpdate: categoryList})
                let categoryArrList = []
                categoryList.map(el => {
                    let catObj = {
                        id: el.id,
                        value: el.name,
                        label: el.name
                    }
                    categoryArrList.push(catObj)
                })
                this.setState({categoryOptions: categoryArrList})
            }
        } catch (e) {
            categoryList = []
        }
        // console.log(this.state.categoryListToUpdate)
        // console.log(this.state.categoryOptions)
    }

    displayMenuList = () => {
        let menuList = []
        try {
            const {menuReducer} = this.props
            console.log(menuReducer['MENU_LIST'])
            menuList = JSON.parse(menuReducer['CATEGORY_LIST'].response);
            // console.log(categoryList)
            if (Object.keys(menuList).length === 0 && menuList.constructor === Object) {
                this.setState({menuList: []})
            } else {
                this.setState({menuList: menuList})
            }
        } catch (e) {
            menuList = []
        }
        // console.log(this.state.menuList)
    }

    componentWillMount() {
        //
        //this.props.getMenuListData()
    }

    componentDidMount() {
        this.props.getCategoryListData()
        //window.setTimeout(this.displayCategoryList, 800)
        // window.setTimeout(this.displayMenuList, 800)

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log("componentDidUpdate")
        // console.log(this.state.categoryListToUpdate)
    }

    showCategoryModal = () => {
        this.setState({show: true});
    }

    hideCategoryModal = () => {
        this.setState({show: false});
    }

    categoryInputChangeHandler = (e) => {
        let categoryId = e.target.id
        let categoryName = e.target.value
        let categoryObj = {id: categoryId, name: categoryName}
        $("svg[id=" + categoryId + "].trash").hide()
        $("#categories-list svg[id=" + categoryId + "].tik").show()
        $("input[id=" + categoryId + "]").parent().addClass('active')

        let categoryListToUpdate = this.state.categoryListToUpdate
        // console.log(categoryListToUpdate)
        let foundIndex = categoryListToUpdate.findIndex(x => x.id == categoryId);
        // console.log(categoryObj)
        categoryListToUpdate[foundIndex] = categoryObj;
        this.state.categoryListToUpdate = categoryListToUpdate
        this.setState({categoryListToUpdate: categoryListToUpdate}, () => {
            // console.log(this.state.categoryListToUpdate)
        })
    }

    deleteCategory = (id) => {
        let categoryListToUpdate = this.state.categoryListToUpdate
        let result = categoryListToUpdate.filter(function (el) {
            return el.id != id;
        })
        // console.log(result)
        this.setState({categoryListToUpdate: result}, () => {
            // console.log(this.state.categoryListToUpdate)
            this.props.updateCategoryFormData(this.state.categoryListToUpdate)
        })
    }

  loadMenu(id, name) {
    this.setState({selectedCategory: {id, name}});
    this.props.getMenuListData(id);
  }

  render() {
    return (
        <>
          <Sidebar/>
          <div className="wrapper">
            <Navbar/>
            <div className="flex-area conten container-fluid">
              <div className="mod-rest-container">
                <div className="row clearfix">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <Nav className="tab-cstm mb-visible" variant="pills" defaultActiveKey="link-1">
                      <Nav.Item>
                        <Nav.Link href="#" eventKey="link-1"
                                  onClick={(e) => this.activateTab(e, 'menuTab')}>Menú</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link href="#" eventKey="link-2"
                                  onClick={(e) => this.activateTab(e, 'categoriesTab')}>Categorías</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </div>
                  <Categories loadMenu={(id, name) => this.loadMenu(id, name)}/>
                  <Dishes loadMenu={(id, name) => this.loadMenu(id, name)}
                          selectedCategory={this.state.selectedCategory}/>
                </div>
              </div>
            </div>
          </div>
        </>

        );
    }
}

const mapStateToProps = ({menuReducer}) => ({
    menu: menuReducer
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getCategoryListData,
            updateCategoryFormData,
            redirectToUrl,
            getMenuListData,
            postMenuFormData
        },
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(ModifyMenu)