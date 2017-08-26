import React, { Component } from 'react';

import Body from '../components/Body';
import Contact from '../components/Contact';

class Home extends Component {
    render() {
        return (
            <div className="Home">
                <Body />
                <Contact />
            </div>
        );
    }
}

export default Home;
