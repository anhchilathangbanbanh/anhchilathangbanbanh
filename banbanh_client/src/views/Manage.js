import React, { Component } from 'react';
import $ from 'jquery';

class Manage extends Component {
    constructor() {
        super();
        this.state = {
            listCake: []
        };

        this.getListCake = this.getListCake.bind(this);
    }

    componentWillMount() {
        this.getListCake();
    }

    getListCake() {
        $.ajax({
            url: `/api/cake/get-list-cake`,
            type: 'get'
        }).done((response) => {
            if (response.status == 1) {
                console.log(response);
                this.setState({ listCake: response.data });
            }else {
                this.setState({ message: 'Dont have data' });
            }
        }).fail((err) => {
            alert('Something went wrong!');
            console.log(err);
        });
    }

    render() {
        const listCake = this.state.listCake.map((element, index) => {
            return (
                <tr key={index}>
                    <td>{element.product_code}</td>
                    <td>{element.name}</td>
                    <td>{element.description}</td>
                    <td>{element._category.name}</td>
                    <td>{element.qualtity}</td>
                    <td>{element.price}</td>
                </tr>
            );
        });

        return (
            <table className="table table-condensed">
                <thead>
                    <th>Product code</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Qualtity</th>
                    <th>Price</th>
                </thead>
                <tbody>
                    {listCake}
                </tbody>
            </table>
        );
    }
}

export default Manage;
