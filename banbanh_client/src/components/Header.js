import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
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
            </div>
        );
    }
}

export default Header;
