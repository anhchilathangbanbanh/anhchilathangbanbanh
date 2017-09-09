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
        this.props.history.push(`/category/${category}`);
        console.log(this.props);
    }

    render() {
        const cakeCategory = this.state.categories.map((element, index) => {
            return (
                <div key={index} onClick={() => this.goToCakeDetail(element._id)} className="Category col-md-3 col-sm-6 col-xs-12">
                    <div className="CategoryIntro">
                        <img ref="avatar" className="img-responsive" src={element.avatar} alt="img04" />
                        <h3 className="text-center" title={element.name}>{element.name}</h3>
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
                      		<div className="row">
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
