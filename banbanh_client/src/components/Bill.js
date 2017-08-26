import React, { Component } from 'react';
import { Button, Col, Grid, Row, Modal } from 'react-bootstrap';
import $ from 'jquery';

class Bill extends Component {
    constructor() {
        super();
        this.state = {
            cakes: [],
            customerName: ""
        }

        this.getCustomerName = this.getCustomerName.bind(this);
        this.order = this.order.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.cakeIsPicked != this.props.cakeIsPicked) {
            this.setState({
                cakes: this.state.cakes.concat(nextProps.cakeIsPicked)
            });
        }
    }

    getCustomerName(event) {
        this.setState({customerName: event.target.value});
    }

    order() {
        let billData = {
            customer: this.state.customerName,
            _detail_purchase: []
        };
        $.ajax({
            url: '/api/bill/create-new-bill',
            type: 'post',
            data: billData
        }).done((bill) => {
            if (bill) {
                // insert bills detail
                this.state.cakes.forEach(function(cake) {
                    let billDetailData = {
                        _bill: bill._id,
                        _cake: cake.id,
                        qualtity_purchase: cake.qualtityPurchase
                    }
                    $.ajax({
                        url: '/api/bill-detail/create-new-bill-detail',
                        type: 'post',
                        data: billDetailData
                    }).done((billDetail) => {
                        alert('Success')
                        console.log(billDetail);
                    }).fail((err) => {
                        console.log(err);
                    });
                });
                this.setState({ cakes: this.state.cakes.splice(0, this.state.cakes.length-1) });
            }
        }).fail((err) => {
            console.log(err);
        });
    }

    render() {
        const cakes = this.state.cakes.map( (element) => {
            if (element) {
                let price = element.price * element.qualtityPurchase;
                return(
                    <tr>
                        <td>{element.name}</td>
                        <td>{element.qualtityPurchase}</td>
                        <td>${price}</td>
                    </tr>
                );
            }
        });

        return(
            <div className="Bill">
                <input className="form-control" type="text" onChange={this.getCustomerName} />
                <table className="table table-bordered">
                    <thead>
                        <th>Cake</th>
                        <th>Qualtity</th>
                        <th>Cost</th>
                    </thead>
                    <tbody>
                        {cakes}
                    </tbody>
                </table>
                <button type="button" onClick={this.order}>Order</button>
            </div>
        );
    }
}

export default Bill;
