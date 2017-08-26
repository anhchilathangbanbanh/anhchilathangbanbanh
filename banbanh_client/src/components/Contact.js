import React, { Component } from 'react';

class Contact extends Component {
    render() {
        return (
            <div className="contact">

                <div className="bgimg-3 w3-display-container w3-opacity-min">
                    <div className="w3-display-middle">
                        <b><span className="w3-xxxlarge w3-text-black w3-wide">CONTACT</span></b>
                    </div>
                </div>

                    <div className="w3-content w3-container w3-padding-64" id="contact">
                        <div className="w3-row w3-padding-32 w3-section">
                            <div className="w3-col m4 w3-container">
                                <iframe className="w3-round-large w3-greyscale" style={{"width":"100%","height":"400px"}} src={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6635.9354557690995!2d105.80930582703797!3d21.020960013542183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab6506592273%3A0x6496de55be1b8d4a!2zVGjDoG5oIEPDtG5nLCBIw6AgTuG7mWksIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1503413265264"}></iframe>
                            </div>
                            <div className="w3-col m8 w3-panel">
                                <div className="w3-large w3-margin-bottom">
                                <i className="fa fa-map-marker fa-fw w3-hover-text-black w3-xlarge w3-margin-right"></i> Ha Noi, VN<br/>
                                <i className="fa fa-phone fa-fw w3-hover-text-black w3-xlarge w3-margin-right"></i> Phone: +00 151515<br/>
                                <i className="fa fa-envelope fa-fw w3-hover-text-black w3-xlarge w3-margin-right"></i> Email: mail@mail.com<br/>
                            </div>
                            <p>Swing by for a cup of <i className="fa fa-coffee"></i>, or leave me a note:</p>
                            <form action="/action_page.php" target="_blank">
                                <div className="w3-row-padding" style={{"margin":"0 -16px 8px -16px"}}>
                                    <div className="w3-half">
                                        <input className="w3-input w3-border" type="text" placeholder="Name" required name="Name" />
                                    </div>
                                    <div className="w3-half">
                                        <input className="w3-input w3-border" type="text" placeholder="Email" required name="Email" />
                                    </div>
                                </div>
                                <input className="w3-input w3-border" type="text" placeholder="Message" required name="Message" />
                                <button className="w3-button w3-black w3-right w3-section" type="submit">
                                    <i className="fa fa-paper-plane"></i> SEND MESSAGE
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;
