import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Home from '../views/Home';

class Header extends Component {
    render() {
        return (
          <div className="Header">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4 col-md-2 col-md-offset-2 Logo">
                            <a href="#"><img src={require('../images/new-logo.png')} width="125" height="125"/></a>
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
                                        <li><Link className="navbar-brand" to="/">Home</Link></li>
                                        <li><a>Popular</a></li>
                                        <li><a>Contact us</a></li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
