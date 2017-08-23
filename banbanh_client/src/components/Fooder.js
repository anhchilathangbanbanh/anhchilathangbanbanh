import React, { Component } from 'react';

class Fooder extends Component {
    render() {
        return (
          <footer className="w3-center w3-black w3-padding-220 w3-opacity w3-hover-opacity-off">
            <div className="w3-col m6">
              <a href="#" className="w3-button w3-light-grey"><i className="fa fa-arrow-up w3-margin-right"></i>To the top</a>
              <div className="w3-xlarge w3-section">
                <p>FOLLOW US ON</p>
                <i className="fa fa-arrow-down w3-hover-opacity"></i>
              </div>
              <div className="w3-xlarge w3-section">
                <i className="fa fa-facebook-official w3-hover-opacity"></i>
                <i className="fa fa-instagram w3-hover-opacity"></i>
                <i className="fa fa-snapchat w3-hover-opacity"></i>
                <i className="fa fa-pinterest-p w3-hover-opacity"></i>
                <i className="fa fa-twitter w3-hover-opacity"></i>
                <i className="fa fa-linkedin w3-hover-opacity"></i>
              </div>
              <p></p>
            </div>
            <div className="w3-col m6 w3-center">
              <h3><b>OPENING HOURS</b></h3>
              <p className="w3-center"><i className="fa fa-minus" aria-hidden="true"></i></p>
              <h4>Mon-Fri: 7 am - 10 pm</h4>
              <h4>Saturday: 8 am - 10 pm</h4>
              <h4>Sunday: 8 am - 11 pm</h4>
            </div>
          </footer>
        );
    }
}

export default Fooder;
