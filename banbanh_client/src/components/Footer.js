import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div className="Footer">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4 myCols">
                            <h5>About us</h5>
                            <ul>
                                <li><a >Company Information</a></li>
                                <li><a >Reviews</a></li>
                            </ul>
                        </div>
                        <div className="col-sm-4 myCols">
                            <h5>Open</h5>
                            <ul>
                                <li>Mon - Fri: 8:00am - 6:00pm</li>
                                <li>Sat - Sun: 8:00am - 4:30pm</li>
                            </ul>
                        </div>
                        <div className="col-sm-4 myCols">
                            <h5>Contact Us</h5>
                            <ul>
                                <li>To make a booking, call: <a href="tel:+190010000">1900-100-00</a></li>
                                <li>Contact information: <a href="mailto:someone@example.com">anhchilathangbanbanh@gmail.com</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-social">
                        <a className="social-icons"><i className="fa fa-facebook"></i></a>
                        <a className="social-icons"><i className="fa fa-google-plus"></i></a>
                        <a className="social-icons"><i className="fa fa-twitter"></i></a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
