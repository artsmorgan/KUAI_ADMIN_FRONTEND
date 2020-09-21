import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {getCategoryListData, updateCategoryFormData, postMenuFormData, getMenuListByCategoryData} from "../../../../actions";
import {connect} from "react-redux";
import LoaderInScreen from "../../../Public/LoaderInScreen";
import Checkbox from '@opuscapita/react-checkbox';
import Select from 'react-select';
import SimpleReactValidator from "simple-react-validator";
import {uuid} from "uuidv4";
import {db, storage} from "../../../firebase";
import {toastr} from "react-redux-toastr";

class Dishes extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.productPictRefUpload = React.createRef();

    this.state = {
      selectedDish: {},
    }
    this.validator = new SimpleReactValidator({
      locale: 'es',
      autoForceUpdate: this
    });
  }

  componentDidMount(){

    this._isMounted = true;

    // console.log('this.props.getMenuListByCategoryData()',this.props.getMenuListByCategoryData())
    
    // console.log('getMenuListByCategoryData',this.getMenuListByCategoryData())

    //  this.setState({allDishes: this.props.getMenuListByCategoryData() })


     axios.get(GET_MENU_LIST_BY_CATEGORY_URL, {})
        .then(response => {
            console.log(response)
            this.setState({allDishes: response.data});
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

  componentWillUnmount(){
    this._isMounted = false;
    // this.setState({allDishes: null});
  }

  CheckboxChangeHandler = (e, switchName) => {
    let obj = this.state.selectedDish;
    let value = !obj[switchName];
    obj[switchName] = value;
    this.setState({selectedDish: obj});
    // console.log(this.state.dataToPost)
  }

  addMenuInputChangeHandler = (e) => {
    let obj = this.state.selectedDish
    obj[e.target.name] = e.target.value
    this.setState({selectedDish: obj})
  }

  newMenuItem() {
    const newDish = {
      id: uuid(),
      isAvailable: true,
      name: '',
      description: '',
      categoryId: this.props.selectedCategory.id,
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
    this.setState({selectedDish: newDish});
  }

  getFileExtension = filename => filename.split('.').pop();

  handleProductImageUpload = (e) => {
    // console.log('handleProfileImageUpload',e.target.files[0]);
    if (e && e.target.files[0]) {
        const _files = e.target.files[0];
        // this.setState({ profileImage: e.target.files[0] });
        const fileExtension = this.getFileExtension(e.target.files[0].name)
        const filename = `${Date.now()}.${fileExtension}`;
        const uploadTask = storage.ref(`restaurants/${localStorage.getItem('restaurantId')}/images/products/${filename}`).put(e.target.files[0]);

        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                this.setState({progress: progress});
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
                        this.setState({selectedDishPicture: url});
                        let obj = this.state.selectedDish
                            obj['picture'] = url
                            console.log('obj',obj);
                            this.setState({selectedDish: obj})
                        // const docRef = db.collection('restaurants').doc(localStorage.getItem('restaurantId'));
                        // docRef.update({
                        //     profilePicture: url
                        // }).then(() => {
                        //     toastr.success("Éxito", 'La imágen de perfil fue subida con éxito')
                        //     // this.props.getDefaultConfigData({restaurantId: localStorage.getItem('restaurantId')})
                        // }).catch((error) => {
                        //     console.log('Error updating the document:', error);
                        // })
                    });
            }
        );
    }

};


  render() {
    console.log('allDishes', this.state.allDishes)
    if (this.props.categories.loading || this.props.dishes.loading) {
      return <LoaderInScreen/>
    }
    return (
        <>
          <div
              className={"col-md-4 col-lg-4 col-sm-12 col-xs-12 "}>
            <h3 className="mb-hidden">Menú</h3>
            <div className="rotator-container lg">
              <div className={`btn-theme add-menu `}>
                <div className="add-item">
                  <span>+</span>
                </div>
                <div className="add-details">
                  <p className="title">AÑADIR ÍTEM AL MENÚ</p>
                  <p className="dummy"></p>
                  <p className="dummy" style={{width: '80px'}}></p>
                  <p className="dummy" style={{width: '80px'}}></p>
                  <button className="btn-add-menu" onClick={()=>{this.newMenuItem()}}>
                  <span>+</span>AÑADIR</button>

                </div>
              </div>
              <div className="rotator-scroll">
                <div className="rotator-stripe">                  
                  {this.state.allDishes.productList.length === 0 ? this.renderNoItems() : this.renderDishes()}
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
      <h6 className="lead" style={{color: "grey"}}><b>¡Aún no se agregó ningún menú!</b></h6>
    </>
  }

/*  selectHandleChange = categorySelectedOption => {
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
  };*/

  selectHandleChange = categorySelectedOption => {
    console.log(categorySelectedOption)
    let obj = this.state.selectedDish
    obj['categoryId'] = categorySelectedOption.value
    this.setState({selectedDish: obj}, () => {
      console.log(this.state)
    })
  };

  renderDish(){
    return <i>test</i>
  }

  renderCategoryTitle(){}

  renderDishes() {
    let dishes = this.state.allDishes;
    console.log('dishes---->',dishes)

    let categoriesArr = []

    let categories = dishes.productList.map(category => {
      var categoryObj = {};

      categoryObj['name'] = category.name;
      categoryObj['id'] = category.id;
      // categoryObj['products'] = (category.products.menuItems && category.products.menuItems.products.length > 0) ? JSON.parse(category.products.menuItems.productItemList)  : [];

      // console.log('category',category)

      if(category.products.menuItems && category.products.menuItems.productItemList){
        categoryObj['items'] = JSON.parse(category.products.menuItems.productItemList);
      }else{
        categoryObj['items'] = [];
      }

      
      // console.log('category.products.menuItems',category.products.menuItems)      
      // console.log('categoryObj',categoryObj)
      categoriesArr.push(categoryObj);

    } )

    console.log('categoriesArr',categoriesArr)

    //parse product list
    return (
      <>
          {categoriesArr.map(category => 
              <>
              <strong>{category.name}</strong>
              <div>
                {                  
                  category.items.map(dish => 
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
                        style={{background: "url(" + dish.picture + ")"}}></div>
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
                )}
              </div>
              </>
          )
        }
      </>
    )
      
          
          
          
      
      
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

    const dishes = [];
    this.props.dishes.dishes.forEach(dish => {
      if (dish.id !== obj.id) {
        dishes.push(dish);
      }
    })
    dishes.push(obj);
    this.props.postMenuFormData(dishes, this.props.selectedCategory.id ? this.props.selectedCategory.id : this.state.selectedDish.categoryId, () => {
      this.setState({selectedDish: null})
      this.props.loadMenu(this.props.selectedCategory.id, this.props.selectedCategory.name);
    })
  }

  addMenuFormSubmitHandler = (e) => {
    e.preventDefault();
    // console.log(this.validator.allValid())
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
        return ''
      }
    } else {
      return ''
    }
  }

  uploadPhoto ()  {
    //selectedDish
    console.log('uploadPhoto', this.state.selectedDish );
    this.productPictRefUpload.current.click();
  }

  handleProductImageUpload = (e) => {
    console.log('handleProductImageUpload',e.target.files[0]);
  };

  

  renderDishEditor() {
    if (this.state.selectedDish === null) {
      return <></>
    }
    return <>

      <div className={"col-md-4 col-lg-4 col-sm-12 col-xs-12 dishEditorMobile "}>
        <h3 style={{marginBottom: '21px'}}>Nuevo item de Menú</h3>
        <div className="menu-details">
          <label htmlFor="">VISTA PREVIA</label>
          <div className="add-menu-new">
            <div className="add-item">
              {/* <svg width="22" height="20" viewBox="0 0 22 20" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M19.2499 3.12461H17.3498L15.9741 0.374512H6.02455L4.65015 3.12596L2.75275 3.12934C1.24009 3.13204 0.00869271 4.36474 0.00738656 5.87808L0 16.8744C0 18.3911 1.23337 19.6251 2.7501 19.6251H19.2499C20.7667 19.6251 22 18.3918 22 16.875V5.87466C22 4.35798 20.7666 3.12461 19.2499 3.12461ZM10.9997 16.1875C7.9669 16.1875 5.49947 13.7201 5.49947 10.6873C5.49947 7.65455 7.9669 5.18712 10.9997 5.18712C14.0324 5.18712 16.4999 7.65455 16.4999 10.6873C16.4999 13.7201 14.0324 16.1875 10.9997 16.1875Z"
                    fill="#AEA7AF"/>
              </svg> */}
              <div className="img"
                 style={{background: "url(" + this.state.selectedDish.picture + ")"}}></div>
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
            <label htmlFor="">CATEGORIA (Próximamente)</label>
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

            <input type="file" id="my_file" style={{display: "none"}} accept="image/*"
                                               onChange={this.handleProductImageUpload} ref={this.productPictRefUpload}/>

            <div className="photo-area" >
              <div className="upload" onClick={this.uploadPhoto.bind(this)}>
                <div className="center">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0)">
                      <path
                          d="M18.8282 14.1716C20.3903 15.7338 20.3903 18.2665 18.8282 19.8287C17.266 21.3908 14.7333 21.3908 13.1711 19.8287C11.609 18.2665 11.609 15.7338 13.1711 14.1716C14.7333 12.6095 17.266 12.6095 18.8282 14.1716Z"
                          fill="white"/>
                      <path
                          d="M27.9999 5.99941H25.2361L23.2351 1.99927H8.76298L6.76386 6.00137L4.004 6.00629C1.80376 6.01022 0.0126439 7.80323 0.0107441 10.0045L0 25.9991C0 28.2052 1.794 30.0002 4.00014 30.0002H27.9999C30.2061 30.0002 32.0001 28.2062 32.0001 26V9.99948C32 7.79341 30.206 5.99941 27.9999 5.99941ZM15.9995 25C11.5882 25 7.99923 21.411 7.99923 16.9997C7.99923 12.5884 11.5882 8.99943 15.9995 8.99943C20.4108 8.99943 23.9998 12.5884 23.9998 16.9997C23.9998 21.411 20.4108 25 15.9995 25Z"
                          fill="white"/>
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect width="32" height="32" fill="white"/>
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
                            checked={this.state.selectedDish.upsell}/>
                  <label htmlFor="" className="chk-label">Upsell</label>
                </div>
                <div className='divP'>
                  <Checkbox id="recomendacion" name="recomendacion"
                            onChange={(e) => this.CheckboxChangeHandler(e, 'recomendacion')}
                            checked={this.state.selectedDish.recomendacion}/>
                  <label htmlFor="" className="chk-label">Recomendación</label>
                </div>
                <div className='divP'>
                  <Checkbox id="promo" name="promo"
                            onChange={(e) => this.CheckboxChangeHandler(e, 'promo')}
                            checked={this.state.selectedDish.promo}/>
                  <label htmlFor="" className="chk-label">Promoción</label>
                </div>
              </div>

              <div className="promo-area">
                <label htmlFor="">PROMOCIONES</label>
                <div className='divP'>
                  <Checkbox id="specialPrice" name="specialPrice"
                            onChange={(e) => this.CheckboxChangeHandler(e, 'specialPrice')}
                            checked={this.state.selectedDish.specialPrice}/>
                  <label htmlFor="" className="chk-label">Precio especial</label>
                </div>
                <div className={`promo-code ${this.state.selectedDish.specialPrice ? '' : 'hidden'}`}>
                  <label htmlFor="">PRECIO PROMOCIÓN</label>
                  <input type="text" className="uni-input" name="specialPriceAmount"
                         onChange={this.addMenuInputChangeHandler}
                         value={this.state.selectedDish.specialPriceAmount}/>
                </div>
              </div>
              <div className="promo-area">
                <div className='divP'>
                  <Checkbox id="discount" name="discount"
                            onChange={(e) => this.CheckboxChangeHandler(e, 'discount')}
                            checked={this.state.selectedDish.discount}/>
                  <label htmlFor="" className="chk-label">% de descuento</label>
                </div>
                <div className={`promo-code ${this.state.selectedDish.discount ? '' : 'hidden'}`}>
                  <label htmlFor="">PORCENTAJE</label>
                  <input type="text" className="uni-input" name="discountPercentage"
                         onChange={this.addMenuInputChangeHandler} style={{width: "100px"}}
                         value={this.state.selectedDish.discountPercentage}/>
                  <p className="discounted">
                    <span
                        className="cross">₡{this.state.selectedDish.price}</span> | <span>₡{this.calculatePercentage()}</span>
                  </p>
                </div>
              </div>
              <div className="promo-area">
                <div className='divP'>
                  <Checkbox id="llevaXpagaY" name="discount"
                            onChange={(e) => this.CheckboxChangeHandler(e, 'llevaXpagaY')}
                            checked={this.state.selectedDish.llevaXpagaY}/>
                  <label htmlFor="" className="chk-label">Llleva “x”, paga
                    “y”</label>
                </div>
                <div className={`promo-code ${this.state.selectedDish.llevaXpagaY ? '' : 'hidden'}`}>
                  <div className="row">
                    <div className="col">
                      <label htmlFor="">LLEVA</label>
                      <input type="text" className="uni-input" name="lleva"
                             onChange={this.addMenuInputChangeHandler}
                             value={this.state.selectedDish.lleva}/>
                    </div>
                    <div className="col">
                      <label htmlFor="">PAGA</label>
                      <input type="text" className="uni-input" name="paga"
                             onChange={this.addMenuInputChangeHandler}
                             value={this.state.selectedDish.paga}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="promo-area">
                <div className='divP'>
                  <Checkbox id="envioGratis" name="discount"
                            onChange={(e) => this.CheckboxChangeHandler(e, 'envioGratis')}
                            checked={this.state.selectedDish.envioGratis}/>
                  <label htmlFor="" className="chk-label">Envío gratis</label>
                </div>
              </div>
            </div>

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
  categories: menuReducer.categories,
  // fullDishes: menuReducer.fullDishes
})
const mapDispatchToProps = dispatch => bindActionCreators({
  updateCategoryFormData,
  getCategoryListData,
  postMenuFormData,
  // getMenuListByCategoryData
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Dishes)