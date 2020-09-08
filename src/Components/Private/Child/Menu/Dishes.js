import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {getCategoryListData, updateCategoryFormData, postMenuFormData} from "../../../../actions";
import {connect} from "react-redux";
import LoaderInScreen from "../../../Public/LoaderInScreen";
import Checkbox from '@opuscapita/react-checkbox';
import Select from 'react-select';
import SimpleReactValidator from "simple-react-validator";
import {uuid} from "uuidv4";

class Dishes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formTab: false,
      menuList: [],
      selectedDish: null
    }
    this.validator = new SimpleReactValidator({
      locale: 'es',
      autoForceUpdate: this
    });
  }


  addMenuInputChangeHandler = (e) => {
    let obj = this.state.selectedDish
    obj[e.target.name] = e.target.value
    this.setState({selectedDish: obj})
  }

  render() {
    if (this.props.categories.loading || this.props.dishes.loading) {
      return <LoaderInScreen/>
    }
    return (
        <>
          <div
              className={"col-md-4 col-lg-4 col-sm-12 col-xs-12 "}>
            <h3 className="mb-hidden">Menú</h3>
            <div className="rotator-container lg">
              <div className="btn-theme add-menu" onClick={this.newMenuItem}>
                <div className="add-item">
                  <span>+</span>
                </div>
                <div className="add-details">
                  <p className="title">AÑADIR ÍTEM AL MENÚ</p>
                  <p className="dummy"></p>
                  <p className="dummy" style={{width: '80px'}}></p>
                  <p className="dummy" style={{width: '80px'}}></p>
                  <button className="btn-add-menu"><span>+</span>AÑADIR</button>
                </div>
              </div>
              <div className="rotator-scroll">
                <div className="rotator-stripe">
                  <p className="rotator-title">{this.props.selectedCategory.name}</p>
                  {this.props.dishes.dishes.length === 0 ? this.renderNoItems() : this.renderDishes()}
                </div>
              </div>
            </div>
          </div>
          {this.renderDishEditor()}
        </>
    );
  }

  renderNoItems() {
    if (this.state.selectedDish) {
      this.setState({selectedDish: null})
    }
    return <>
      <h6 className="lead" style={{color: "grey"}}><b>¡Aún no se agregó ningún menú!</b></h6>
    </>
  }

  selectHandleChange = categorySelectedOption => {
    // console.log(categorySelectedOption)
    this.setState(
        this.state,
        () => {

          // console.log(`Option selected:`, this.state.categorySelectedOption)
          let obj = this.state.selectedDish
          obj['categoryId'] = categorySelectedOption.id
          this.setState({selectedDish: obj})
        }
    );
  };

  renderDishes() {
    let {dishes} = this.props;
    return <>
      {dishes.dishes.map(dish =>
          <div className="rotator" key={dish.id}>
            <div className="directional">
              <svg className="top" width="9" height="7" viewBox="0 0 9 7"
                   fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M7.68156 7C8.50732 7 8.97723 6.05578 8.47932 5.39702L5.19777 1.05545C4.79765 0.526091 4.00237 0.52609 3.60225 1.05545L0.320704 5.39702C-0.177216 6.05578 0.292695 7 1.11846 7L7.68156 7Z"
                    fill="#41404D"/>
              </svg>
              <svg className="bottom" width="9" height="7" viewBox="0 0 9 7"
                   fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M7.68156 7C8.50732 7 8.97723 6.05578 8.47932 5.39702L5.19777 1.05545C4.79765 0.526091 4.00237 0.52609 3.60225 1.05545L0.320704 5.39702C-0.177216 6.05578 0.292695 7 1.11846 7L7.68156 7Z"
                    fill="#41404D"/>
              </svg>
            </div>
            <div className="img"
                 style={{background: "url(" + null + ")"}}></div>
            <div className="menu-ind">
              <p>{dish.name}</p>
              <span>₡{dish.price}</span>
              <button onClick={() => {
                this.setState({selectedDish: {...dish}})
              }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd"
                        d="M8.89 0.21L10.99 2.31C11.27 2.59 11.27 3.01 10.99 3.29L9.73 4.55L6.65 1.47L7.91 0.21C8.19 -0.07 8.61 -0.07 8.89 0.21ZM0.21 7.91L5.67 2.45L8.75 5.53L3.29 10.99C3.15 11.13 3.01 11.2 2.8 11.2H0.7C0.28 11.2 0 10.92 0 10.5V8.4C0 8.19 0.07 8.05 0.21 7.91Z"
                        fill="white"/>
                </svg>
                Editor
              </button>
            </div>
          </div>
      )}</>
  }

  addMenuProcessSubmit() {
    let obj = this.state.selectedDish;
    if (!obj.id) {

      obj['id'] = uuid();
    }
    this.props.postMenuFormData(obj, () => {
      this.setState({selectedDish: null})
      this.props.loadMenu(this.props.selectedCategory.id, this.props.selectedCategory.name);
    })
  }

  addMenuFormSubmitHandler = (e) => {
    e.preventDefault();
    if (this.validator.allValid()) {
      this.addMenuProcessSubmit();
    } else {
      this.validator.showMessages();
    }
  };

  renderDishEditor() {
    if (this.state.selectedDish === null) {
      return <></>
    }
    return <>

      <div
          className={"col-md-4 col-lg-4 col-sm-12 col-xs-12 "}>
        <h3 style={{marginBottom: '21px'}}>Nuevo item de Menú</h3>
        <div className="menu-details">
          <label htmlFor="">VISTA PREVIA</label>
          <div className="add-menu-new">
            <div className="add-item">
              <svg width="22" height="20" viewBox="0 0 22 20" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M19.2499 3.12461H17.3498L15.9741 0.374512H6.02455L4.65015 3.12596L2.75275 3.12934C1.24009 3.13204 0.00869271 4.36474 0.00738656 5.87808L0 16.8744C0 18.3911 1.23337 19.6251 2.7501 19.6251H19.2499C20.7667 19.6251 22 18.3918 22 16.875V5.87466C22 4.35798 20.7666 3.12461 19.2499 3.12461ZM10.9997 16.1875C7.9669 16.1875 5.49947 13.7201 5.49947 10.6873C5.49947 7.65455 7.9669 5.18712 10.9997 5.18712C14.0324 5.18712 16.4999 7.65455 16.4999 10.6873C16.4999 13.7201 14.0324 16.1875 10.9997 16.1875Z"
                    fill="#AEA7AF"/>
              </svg>

            </div>
            <div className="add-details">
              <p className="title">{this.state.selectedDish.name}</p>
              <p className="dummy">
                {this.state.selectedDish.description}
              </p>
              <p className="price">₡{this.state.selectedDish.price}</p>
            </div>
            <button className="btn-add-menu" onClick={e => {
              e.preventDefault()
            }}>Agregar
            </button>
          </div>
          <div className="menu-elements">
            <ul className="menu-tabs">
              <li className="active">
                <a href="">Disponible</a>
              </li>
              <li>
                <a href="">Agotado</a>
              </li>
            </ul>

            <label htmlFor="">NOMBRE DEL item:</label>
            <input type="text" className="uni-input" name="name" onChange={this.addMenuInputChangeHandler}
                   value={this.state.selectedDish.name}/>
            <p style={{color: "red"}}>
              {this.validator.message('name', this.state.selectedDish.name, 'required')}
            </p>
            <label htmlFor="">DescripciÓn:</label>
            <textarea name="description" className="uni-input" id="" cols="30"
                      rows="10"
                      onChange={this.addMenuInputChangeHandler} value={this.state.selectedDish.description}/>
            <p style={{color: "red"}}>
              {this.validator.message('name', this.state.selectedDish.description, 'required')}
            </p>
            <label htmlFor="">CATEGORIA:</label>
            <Select className="cstm-select" value={this.state.selectedDish.categoryId}
                    onChange={this.selectHandleChange}
                    placeholder="Categoria"
                    options={this.props.categories.categories.map(category => {
                      return {value: category.id, label: category.name, name: "categoryId"}
                    })}
            />
            <p style={{color: "red"}}>
              {this.validator.message('name', this.state.selectedDish.categoryId, 'required')}
            </p>
            <label htmlFor="">PRECIO:</label>
            <input type="text" className="uni-input" name="price" onChange={this.addMenuInputChangeHandler}
                   value={this.state.selectedDish.price}/>
            <p style={{color: "red"}}>
              {this.validator.message('name', this.state.selectedDish.price, 'required')}
            </p>

            <div className="row" style={{marginTop: '40px'}}>
              <button className="btn-theme" onClick={this.addMenuFormSubmitHandler}>GUARDAR</button>
            </div>
          </div>
        </div>
      </div>


    </>
  }
}

const mapStateToProps = ({menuReducer}) => ({
  dishes: menuReducer.dishes,
  categories: menuReducer.categories
})
const mapDispatchToProps = dispatch => bindActionCreators({
  updateCategoryFormData,
  getCategoryListData,
  postMenuFormData
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Dishes)