import React, { Component } from 'react';
import $ from 'jquery';

class Header extends Component {
    render() {
        return (
<<<<<<< HEAD
            <div className="Header">
              <div class="row">
                  <div class="col-sm-4 col-md-2 col-md-offset-2 logo">
                      <a href="#"><img src="../public/images/new-logo.png" height="190"/></a>
                  </div>
                  <div class="col-sm-8 col-md-7 menu-wrapper">
                      <nav class="navbar navbar-custom">
                          <div class="navbar-header">
                              <button class="collapsed navbar-toggle button-menu" data-toggle="collapse" data-target="#menu-collapse">
                                  <span class="sr-only">Toggle</span>
                                  <span class="icon-bar"></span>
                                  <span class="icon-bar"></span>
                                  <span class="icon-bar"></span>
                              </button>
                              <span class="basket">
                                  <a href="#"><img src="../public/images/basket.png"/></a>
                              </span>
                          </div>

                          <div class="navbar-collapse collapse" id="menu-collapse">
                              <ul class="nav navbar-nav menu-detail">
                                  <li><a href="#">Home</a></li>
                                  <li><a href="#">Contact us</a></li>
                                  <li><a href="#">New Order</a></li>
                                  <li><a href="#">Shopping Cart <span class="glyphicon glyphicon-shopping-cart"></span></a></li>
                              </ul>
                          </div>
                      </nav>
                  </div>
              </div>
=======
          <div className="Header">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4 col-md-2 col-md-offset-2 Logo">
                            <a href="#"><img src={require('../images/new-logo.png')} height="190"/></a>
                        </div>
                        <div className="col-sm-8 col-md-7 MenuWrapper">
                            <nav className="navbar NavbarCustom">
                                <div className="NavbarHeader">
                                    <button className="collapsed navbar-toggle ButtonMenu" data-toggle="collapse" data-target="#menu-collapse">
                                        <span className="sr-only">Toggle</span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                    </button>
                                </div>

                                <div className="navbar-collapse collapse" id="menu-collapse">
                                    <ul className="nav navbar-nav MenuDetail">
                                        <li><a href="#">Home</a></li>
                                        <li><a href="#">Popular</a></li>
                                        <li><a href="#">Contact us</a></li>
                                        <li><a href="#">New Order</a></li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
>>>>>>> 76e760df232f95ea3561cb0069989b9df07c24fa
            </div>
        );
    }
}

export default Header;
