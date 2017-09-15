import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';
import swal from 'sweetalert/dist/sweetalert.min.js';

class ListCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            message: '',
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

    goToCakeDetail(category, categoryId) {
        this.props.history.push(`/cake/${category}/${categoryId}`);
    }

    render() {
        const cakeCategory = this.state.categories.map((element, index) => {
            var imgPath = `${window.location.origin}/${element.avatar[0]}`;
            return (
                <div key={index} onClick={() => this.goToCakeDetail(element.name, element._id)} className="Category col-md-3 col-sm-6 col-xs-12">
                    <div className="CategoryIntro">
                        <img ref="avatar" className="img-responsive" src={imgPath} alt="img04" />
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
                                { this.state.message && <p>{this.state.message}</p>}
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
