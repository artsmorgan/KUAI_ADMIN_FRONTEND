import React from 'react';
import {Nav} from 'react-bootstrap';
import Navbar from "./Child/Fixed/Navbar/Navbar";
import Sidebar from "./Child/Fixed/Sidebar/Sidebar";
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    getMenuListByCategoryData
} from '../../actions'
import $ from 'jquery'
import Categories from "./Child/Menu/CategoriesNew";
import Dishes from "./Child/Menu/DishesNew";

class ModifyMenuNew extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedCategory: '',
            mobile: false,
            formTab: {
                menuTab: true,
                categoriesTab: false
            },
        }

        window.addEventListener("resize", this.updateDimension);
    }

    updateDimension = () => {
        this.setState({
            width: window.innerWidth
        }, () => {
            if (this.state.width < 1024) {
                let obj = this.state.formTab

                obj.informationTab = false;
                obj.scheduleTab = false

                this.setState({formTab: obj, mobile: true});
            } else {
                let obj = this.state.formTab

                obj.informationTab = true;
                obj.scheduleTab = true

                this.setState({formTab: obj, mobile: false});
            }
        });
    };

    activateTab(e, tabName) {
        // console.log('here')
        let obj = this.state.formTab;
        let alltabs = this.state.formTab;
        if (this.state.mobile) {
            for (const [key, value] of Object.entries(obj)) {
                console.log(key)
                console.log(value)
                console.log(tabName)
                if (tabName === 'menuTab') {
                    $('div.dishEditorMobile').addClass('hidden')
                }
                if (key == tabName) {
                    alltabs[key] = true
                } else {
                    alltabs[key] = false
                }
            }
            console.log('alltabs', alltabs)
            this.setState({formTab: alltabs})
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimension);
    }

    componentDidMount() {
        this.updateDimension();
    }

    loadMenu(id, name) {
        this.setState({selectedCategory: {id, name}});
        this.props.getMenuListByCategoryData({restaurantId: localStorage.getItem('restaurantId')});
    }

    renderMobile() {
        return (
            <>
                <div
                    className={"col col-md-4 col-lg-4 col-sm-12 col-xs-12 " + (this.state.formTab.menuTab ? '' : 'hidden')}>
                    <Dishes loadMenu={(id, name) => this.loadMenu(id, name)}
                            selectedCategory={this.state.selectedCategory}/>
                </div>
                <div
                    className={"col col-md-4 col-lg-4 col-sm-12 col-xs-12 " + (this.state.formTab.categoriesTab ? '' : 'hidden')}>
                    <Categories/>
                </div>
            </>
        )
    }

    renderDesktop() {
        return (
            <>
                <Categories/>
                <Dishes loadMenu={(id, name) => this.loadMenu(id, name)}
                        selectedCategory={this.state.selectedCategory}/>
            </>
        )
    }

    render() {

        let render;

        if (this.state.mobile) {
            render = this.renderMobile()
        } else {
            render = this.renderDesktop()
        }

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

                                {render}

                            </div>
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
            getMenuListByCategoryData
        },
        dispatch
    )

export default connect(null, mapDispatchToProps)(ModifyMenuNew)