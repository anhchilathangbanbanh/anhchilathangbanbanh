import React, { Component } from 'react';

import Header from './Header';

class ListCake extends Component {
    render() {
        return (
          <div className="ListCake">
            <Header />
            <div className="bgimg-1 w3-display-container w3-opacity-min">
              <div className="w3-display-middle">
                 <b><span className="w3-xxxlarge w3-text-black w3-wide"></span></b>
              </div>
            </div>
            <div className="container text-center">
              <h3>What We Do</h3><br/>
              <div className="row">
                <div className="col-sm-4">
                  <div className="img-responsive1"></div>
                  <p>Bánh nè mua đê</p>
                </div>
                <div className="col-sm-4">
                  <div className="img-responsive2"></div>
                  <p>Đây cũng là bánh nữa nè</p>
                </div>
                <div className="col-sm-4">
                  <div className="img-responsive3"></div>
                  <p>Nốt cái nữa nhá</p>
                </div>
              </div>
            </div><br/>
          </div>
        );
    }
}

export default ListCake;
