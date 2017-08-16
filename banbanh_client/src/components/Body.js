import React, { Component } from 'react';

import Slide from './Slide';
import ListCategory from './ListCategory';

class Body extends Component {
    render() {
        return (
            <div className="Body">
                <Slide />
                <ListCategory />
            </div>
        );
    }
}

export default Body;
