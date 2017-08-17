import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div className="Footer">
                <div className="container">
    		    	<div className="row">
    		    		<div className="col-footer col-md-4 col-xs-6">
    		    			<h3>Contact Us</h3>
    		    			<p className="contact-us-details">
    	        				<b>Address:</b> 123 Downtown Avenue, Manhattan, New York, United States of America<br/>
    	        				<b>Phone:</b> +1 123 45678910<br/>
    	        				<b>Fax:</b> +1 123 45678910<br/>
    	        				<b>Email:</b> <a href="mailto:info@yourcompanydomain.com">info@yourcompanydomain.com</a>
    	        			</p>
    		    		</div>
    		    		<div className="col-footer col-md-4 col-xs-6">
    		    			<h3>Our Social Networks</h3>
    						<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam.</p>
    		    			<div>
    		    				<img src="img/icons/facebook.png" width="32" alt="Facebook" />
    		    				<img src="img/icons/twitter.png" width="32" alt="Twitter" />
    		    				<img src="img/icons/linkedin.png" width="32" alt="LinkedIn" />
    							<img src="img/icons/rss.png" width="32" alt="RSS Feed" />
    						</div>
    		    		</div>
    		    		<div className="col-footer col-md-4 col-xs-6">
    		    			<h3>About Our Company</h3>
    		    				<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci.</p>
    		    		</div>
    		    	</div>
		        </div>
            </div>
        );
    }
}

export default Footer;
