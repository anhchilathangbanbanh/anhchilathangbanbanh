import React, { Component } from 'react';
import $ from 'jquery';
import swal from 'sweetalert/dist/sweetalert.min.js';
import { Link } from 'react-router-dom';
// import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import ListCake from '../views/ListCake';

class SideMenu extends Component {
    constructor() {
        super();
        this.state = {
            categories: []
        };

        this.getListCakeCategory = this.getListCakeCategory.bind(this);
        this.goToCategory = this.goToCategory.bind(this);
    }

    componentDidMount() {
        this.getListCakeCategory();
    }

    getListCakeCategory() {
        $.ajax({
            url: '/api/cake-category/get-list-cake-category',
            type: 'get'
        }).done(response => {
            if (response.status == 1) {
                this.setState({ categories: response.data });
            }else {
                this.setState({ message: response.message });
            }
        }).fail((err) => {
            swal("Oops", 'Seems like something went wrong!', "error");
        });
    }

    goToCategory(href) {
        window.location = href;
    }

    render() {
        const categories = this.state.categories.map((element, index) => {
            let categoryPath = `#/cake/${element.name}/${element._id}`

            return (
                <li key={index}>
                    <div className="PathToCategory" onClick={() => this.goToCategory(categoryPath)}>
                        <img width="60" height="60" src={element.avatar[1]} />
                        <div className="CategoryName">{element.name}</div>
                    </div>
                </li>
            );
        });

        return (
                <div className="SideMenu">
                    <ul className="ListCategoryMenu">
                        {categories}
                    </ul>
                </div>
        );
    }
}

export default SideMenu;
