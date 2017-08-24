import React, { Component } from 'react';

import Header from './Header';

class Manage extends Component {
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
                <a href="#portfolio" onclick="w3_close()" className="w3-bar-item w3-button w3-padding"><i className="fa fa-th-large fa-fw w3-margin-right"></i>ADD CAKE</a>
                <a href="#about" onclick="w3_close()" className="w3-bar-item w3-button w3-padding w3-text-teal"><i className="fa fa-user fa-fw w3-margin-right"></i>MANAGE</a>
                <a href="#contact" onclick="w3_close()" className="w3-bar-item w3-button w3-padding"><i className="fa fa-envelope fa-fw w3-margin-right"></i>CONTACT</a>
              </div>
            </nav>
              <div className="w3-content w3-container w3-padding-64" id="contact">
                <b><h3 className="w3-center">MANAGE</h3></b>
              <div className="w3-row w3-padding-32 w3-section">
                <div className="w3-col m4 w3-container">
                </div>
                <div className="w3-col m8 w3-panel">
                  <form action="/action_page.php" target="_blank">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Customer Name</th>
                          <th>Porduct detail</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>John</td>
                          <td>Doe</td>
                          <td>john@example.com</td>
                        </tr>
                        <tr>
                          <td>Mary</td>
                          <td>Moe</td>
                          <td>mary@example.com</td>
                        </tr>
                        <tr>
                          <td>July</td>
                          <td>Dooley</td>
                          <td>july@example.com</td>
                        </tr>
                      </tbody>
                    </table>
                  </form>
                </div>
              </div>
              </div>
            </div>
          </div>
        );
    }
}

export default Manage;
