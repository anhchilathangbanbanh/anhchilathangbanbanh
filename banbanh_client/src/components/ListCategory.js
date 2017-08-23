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
                <div className="Category col-md-3 col-sm-6 col-xs-12">
                    <div className="CategoryIntro">
                        <img ref="avatar" src={element.avatar} alt="img04" />
                        <div className="CategoryCaption">
                            <a href="#">Take a look</a>
                            <h3 title={element.name}>{element.name}</h3>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className="ListCategory w3-padding-100">
              <div className="section section-white">
                <div>
                  <div className="bgimg-2 w3-display-container w3-opacity-min">
                    <div className="w3-display-middle">
                       <b><span className="w3-xxxlarge w3-text-black w3-wide">CATEGORIES</span></b>
                    </div>
                  </div>
                  <div className="container">
                    <div className="w3-content w3-container w3-padding-50" id="about">
                      <h3 className="w3-center">ABOUT MY SHOP</h3>
                      <p className="w3-center"><em>I love cakes</em></p>
                    </div>
              			<div className="section-title">
                  		<div className="row grid cs-style-3">
                        {cakeCategory}
                  		</div>
              			</div>
          	      </div>
                </div>
        	    </div>
            </div>
        );
    }
}

export default ListCategory;
