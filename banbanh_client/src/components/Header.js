import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div className="Header">
                <div className="navbar navbar-fixed-top NavbarCustom" role="banner">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="index.html"><img src="" alt="Basica" /></a>
                        </div>
                        <div className="collapse navbar-collapse">
                            <ul className="nav navbar-nav navbar-right">
                                <li className="active"><a href="index.html">Home</a></li>
                                <li><a href="about-us.html">About Us</a></li>
                                <li><a href="services.html">Services</a></li>
                                <li><a href="contact-us.html">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
