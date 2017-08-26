import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';

class ListCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            isLoading: false
        };

        this.getListCakeCategory = this.getListCakeCategory.bind(this);
        this.goToCakeDetail = this.goToCakeDetail.bind(this);
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

    goToCakeDetail(category) {
        this.props.history.push(`/${category}`);
        console.log(this.props);
    }

    render() {
        const cakeCategory = this.state.categories.map((element, index) => {
            return (
                <div key={index} className="Category col-md-3 col-sm-6 col-xs-12">
                    <div className="CategoryIntro">
                        <img ref="avatar" src={element.avatar} alt="img04" />
                        <div className="CategoryCaption">
                            <a onClick={() => this.goToCakeDetail(element._id)}>Take a look</a>
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

export default withRouter(ListCategory);
