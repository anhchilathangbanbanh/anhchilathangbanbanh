import React, { Component } from 'react';

import SlideDisplayTopSelling from '../components/SlideDisplayTopSelling';
import ListCategory from '../components/ListCategory';
import Contact from '../components/Contact';

class Home extends Component {
    render() {
        return (
            <div className="Home">
                <SlideDisplayTopSelling />
                <ListCategory />
                <Contact />
            </div>
        );
    }
}

export default Home;
