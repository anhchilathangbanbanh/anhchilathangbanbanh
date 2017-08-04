import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div classNameName="Header">
                <div classNameName="container">
                    <div className="row">
                        <div className="col-sm-4 col-md-2 col-md-offset-2 Logo">
                            <a href="#"><img src="../images/new-logo.png" height="190"/></a>
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
            </div>
        );
    }
}

export default Header;
