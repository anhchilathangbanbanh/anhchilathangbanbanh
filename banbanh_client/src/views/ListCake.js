import React, { Component } from 'react';
import $ from 'jquery';

class ListCake extends Component {
    constructor() {
        super();
        this.state = {
            listCake: [],
            message: ''
        };

        // id of category
        // this.categoryId = this.props.match.params.category;

        // bind this
        this.getListCake = this.getListCake.bind(this);
    }

    componentWillMount() {
        // get list cake
        this.getListCake();
    }

    getListCake() {
        $.ajax({
            url: `/api/cake/get-cake-by-category/${this.props.match.params.category}`,
            type: 'get'
        }).done((response) => {
            if (response.status == 1) {
                this.setState({ listCake: response.data });
            }else {
                this.setState({ message: 'Dont have data' });
            }
        }).fail((err) => {
            alert('Something went wrong!');
            console.log(err);
        })
    }

    render() {
        const listCake = this.state.listCake.map((element) => {
            return (
                <div className="col-sm-4">
                    <img src={element.img_path} className="img-responsive1" />
                    <p>{element.name}</p>
                </div>
            );
        });

        return (
            <div className="ListCake">
                <div className="bgimg-1 w3-display-container w3-opacity-min">
                <div className="w3-display-middle">
                    <b><span className="w3-xxxlarge w3-text-black w3-wide"></span></b>
                </div>
            </div>
            <div className="container text-center">
                <div className="row">
                    {listCake}
                </div>
            </div><br/>
          </div>
        );
    }
}

export default ListCake;
