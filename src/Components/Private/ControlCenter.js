import React from "react";

import Navbar from "./Child/Fixed/Navbar/Navbar";
import Sidebar from "./Child/Fixed/Sidebar/Sidebar";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getControlCenterMethodFormData } from '../../actions';

class ControlCenter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalMonthOrders: 0,
      totalMonthSales: 0,
      totalTodayOrders: 0,
      totalTodaySales: 0,
      totalYestardaySales: 0,
      totalYesterdayOrders: 0,
      commissionOrders:0,
      commissionSales:0,
      success:false,
    }
  }

  componentDidUpdate(previousProps) {
    if (!this.state.success && this.props.controlCenter.success) {
        const controlCenter = this.props.controlCenter;
        this.setState({
          totalMonthOrders: controlCenter.totalMonthOrders,
          totalMonthSales: controlCenter.totalMonthSales,
          totalTodayOrders: controlCenter.totalTodayOrders,
          totalTodaySales: controlCenter.totalTodaySales,
          totalYestardaySales: controlCenter.totalTodaySales,
          totalYesterdayOrders: controlCenter.totalYesterdayOrders,
          commissionOrders:controlCenter.commission.orders,
          commissionSales:controlCenter.commission.sales,
          success:true
        });
      }
}


  componentWillMount() {
    this.props.getControlCenterMethodFormData({ restaurantId: localStorage.getItem('restaurantId') })

  }

  render() {
    return (
      <>
        <Sidebar />
        <div className="wrapper">
          <Navbar />
          <div className="flex-area content container-fluid">
            <div className="row">
              <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <h3 className="text-center">Total De Hoy</h3>
                <div className="desk-total-view row">
                  <div className="col">
                    <label htmlFor="">
                    {this.state.totalTodaySales} <span>Ordenes</span>
                    </label>
                  </div>
                  <div className="col">
                    <label htmlFor="">
                      ₡{this.state.totalTodaySales} <span>Ventas</span>
                    </label>
                  </div>
                </div>
                <h3 className="text-center">Total de ayer</h3>
                <div className="desk-total-view white row">
                  <div className="col">
                    <label htmlFor="">
                    {this.state.totalYesterdayOrders} <span>Ordenes</span>
                    </label>
                  </div>
                  <div className="col">
                    <label htmlFor="">
                      ₡{this.state.totalYestardaySales} <span>Ventas</span>
                    </label>
                  </div>
                </div>
                <h3 className="text-center">Total de la semana</h3>
                <div className="desk-total-view white row">
                  <div className="col">
                    <label htmlFor="">
                      ## <span>Ordenes</span>
                    </label>
                  </div>
                  <div className="col">
                    <label htmlFor="">
                      ₡##.### <span>Ventas</span>
                    </label>
                  </div>
                </div>
                <h3 className="text-center">Total del mes</h3>
                <div className="desk-total-view white row">
                  <div className="col">
                    <label htmlFor="">
                    {this.state.totalMonthOrders} <span>Ordenes</span>
                    </label>
                  </div>
                  <div className="col">
                    <label htmlFor="">
                      ₡{this.state.totalMonthSales} <span>Ventas</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <h3 className="text-center">Costo de comisión</h3>
                <div className="desk-total-view white row">
                  <div className="col">
                    <label htmlFor="">
                    {this.state.commissionOrders}<span>Ordenes</span>
                    </label>
                  </div>
                  <div className="col">
                    <label htmlFor="">
                      ₡{this.state.commissionSales} <span>Ventas</span>
                    </label>
                  </div>
                </div>
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
      getControlCenterMethodFormData
    },
    dispatch
  );

const mapStateToProps = store =>
  (
    {
      controlCenter: store.controlCenter
    }
  )

export default connect(mapStateToProps, mapDispatchToProps)(ControlCenter)

// export default ControlCenter;
