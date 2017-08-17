import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';

class ListCategory extends Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            isLoading: false
        };

        this.getListCakeCategory = this.getListCakeCategory.bind(this);
    }

    componentDidMount() {
        this.getListCakeCategory();

        $(document).ready(function() {
            const el = findDOMNode(this.refs.avatar);
            var avatarWidth = $(el).width();
            $(".CategoryCaption").width(avatarWidth);
        }.bind(this));
    }

    getListCakeCategory() {
        $.ajax({
            url: '/api/cake-category/get-list-cake-category',
            type: 'get'
        }).done((data) => {
            this.setState({
                categories: data.data
            });
        }).fail((err) => {
            alert(err.message);
        });
    }

    render() {
        const cakeCategory = this.state.categories.map(function(element) {
            return (
                <div className="Category col-md-4 col-sm-6 col-xs-12">
                    <div className="CategoryIntro">
                        <img ref="avatar" className="col-md-12 col-sm-12 col-xs-12" src={element.avatar} alt="img04" />
                        <div className="CategoryCaption">
                            <h3>{element.name}</h3>
                            <a>Take a look</a>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className="ListCategory">
                <div className="section section-white">
                	    <div className="container">
                	        <div className="row">
                				<div className="section-title">
                				<h1>Categories</h1>
                			</div>

                			<ul className="grid cs-style-3">
                                {cakeCategory}
                			</ul>
        	        	</div>
        	        </div>
        	    </div>
            </div>
        );
    }
}

export default ListCategory;
