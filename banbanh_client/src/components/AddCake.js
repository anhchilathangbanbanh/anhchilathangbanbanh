import React, { Component } from 'react';

import Header from './Header';

class AddCake extends Component {
    render() {
        return (
          <div classNameName="AddCake">
            <Header />
            <div>
            <nav className="w3-sidebar w3-collapse w3-white w3-animate-left" style={{"z-index":"3","width":"300px"}} id="mySidebar"><br/>
              <div className="w3-container">
                <a href="#" onclick="w3_close()" className="w3-hide-large w3-right w3-jumbo w3-padding w3-hover-grey" title="close menu">
                  <i className="fa fa-remove"></i>
                </a>
                <h4 style={{"text-align":"center"}}><b>TOOL</b></h4>
              </div>
              <div className="w3-bar-block">
                <a href="#portfolio" onclick="w3_close()" className="w3-bar-item w3-button w3-padding w3-text-teal"><i className="fa fa-th-large fa-fw w3-margin-right"></i>ADD CAKE</a>
                <a href="#about" onclick="w3_close()" className="w3-bar-item w3-button w3-padding"><i className="fa fa-user fa-fw w3-margin-right"></i>MANAGE</a>
                <a href="#contact" onclick="w3_close()" className="w3-bar-item w3-button w3-padding"><i className="fa fa-envelope fa-fw w3-margin-right"></i>CONTACT</a>
              </div>
            </nav>
              <div className="w3-content w3-container w3-padding-64" id="contact">
                <b><h3 className="w3-center">ADD CAKE</h3></b>
              <div className="w3-row w3-padding-32 w3-section">
                <div className="w3-col m4 w3-container">
                </div>
                <div className="w3-col m8 w3-panel">
                  <form action="/action_page.php" target="_blank">
                    <div className="w3-row-padding" style={{"margin":"0 -16px 8px -16px"}}>
                      <div className="w3-half">
                        <input className="w3-input w3-border" type="text" placeholder="Product Code" required name="ProductCode" />
                      </div>
                      <div className="w3-half">
                        <input className="w3-input w3-border" type="text" placeholder="Name" required name="Name" />
                      </div>
                    </div>
                    <div className="w3-row-padding" style={{"margin":"0 -16px 8px -16px"}}>
                      <div className="w3-half">
                        <input className="w3-input w3-border" type="text" placeholder="Price" required name="Price" />
                      </div>
                      <div className="w3-half">
                        <input className="w3-input w3-border" type="text" placeholder="Quantity" required name="Quantity" />
                      </div>
                    </div>
                    <div className="w3-row-padding" style={{"margin":"0 -16px 8px -16px"}}>
                      <div className="w3-half">
                        <div className="dropdown">
                          <button className="w3-input w3-border btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Category
                          <span className="caret"></span></button>
                          <ul className="dropdown-menu">
                            <li><a href="#">Birthday Cake</a></li>
                            <li><a href="#">Cup cake</a></li>
                            <li><a href="#">Bread</a></li>
                          </ul>
                        </div>
                      </div>
                      <div className="w3-half">
                        <div className="w3-select" type="text">
                          Select
                        </div>
                      </div>
                    </div>
                    <div className="w3-row-padding" style={{"margin":"0 -16px 8px -16px"}}>
                      <div className="w3-half">
                        <input className="w3-input w3-border" type="text" placeholder="Image" required name="Image" />
                      </div>
                      <div className="w3-half">
                        <button className="w3-upload w3-border" type="submit">
                          <i className="fa fa-paper-plane"></i> Upload
                        </button>
                      </div>
                    </div>
                    <input className="w3-input w3-border" type="text" placeholder="Description" required name="Description" />
                    <button className="w3-button w3-black w3-right w3-section" type="submit">
                      <i className="fa fa-paper-plane"></i> ADD
                    </button>
                  </form>
                </div>
              </div>
              </div>
            </div>
          </div>
        );
    }
}

export default AddCake;
