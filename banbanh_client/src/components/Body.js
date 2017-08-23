import React, { Component } from 'react';

import SlideDisplayTopSelling from './SlideDisplayTopSelling';
import ListCategory from './ListCategory';

class Body extends Component {
    render() {
        return (
            <div className="Body">
                <SlideDisplayTopSelling />
                <ListCategory />
            </div>
        );
    }
}

export default Body;
