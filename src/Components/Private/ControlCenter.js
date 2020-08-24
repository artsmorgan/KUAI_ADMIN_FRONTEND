import React from "react";

import Navbar from "./Child/Fixed/Navbar/Navbar";
import Sidebar from "./Child/Fixed/Sidebar/Sidebar";

class ControlCenter extends React.Component {
  constructor(props) {
    super(props);
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
                      20 <span>Ordenes</span>
                    </label>
                  </div>
                  <div className="col">
                    <label htmlFor="">
                      ₡300.000 <span>Ventas</span>
                    </label>
                  </div>
                </div>
                <h3 className="text-center">Total de ayer</h3>
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
                      ## <span>Ordenes</span>
                    </label>
                  </div>
                  <div className="col">
                    <label htmlFor="">
                      ₡##.### <span>Ventas</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
              <h3 className="text-center">Costo de comisión</h3>
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
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ControlCenter;
