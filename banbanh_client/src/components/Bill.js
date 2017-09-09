import React, { Component } from 'react';
import { Button, Col, Grid, Row, Modal } from 'react-bootstrap';
import update from 'react-addons-update';
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
        this.removeChoosenCake = this.removeChoosenCake.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.cakeIsPicked != this.props.cakeIsPicked) {
            this.setState({
                cakes: this.state.cakes.concat(nextProps.cakeIsPicked)
            });
        }
    }

    componentDidMount() {
        $('.BillIcon img').click(() => {
            $('.BillWrapper').toggle('slow').animate({
                width: '250px',
                height: '400px'
            });
        })
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

    removeChoosenCake(index) {
        this.setState({
            cakes: update(this.state.cakes, {$splice: [[index, 1]]})
        });
    }

    render() {
        const cakes = this.state.cakes.map((element, index) => {
            if (element) {
                let price = element.price * element.qualtityPurchase;
                return(
                    <button key={index} className="list-group-item BillDetailItem">
                        <div className="BtnCancel" onClick={() => this.removeChoosenCake(index)}><span>&times;</span></div>
                        <p className="CakeName">{element.name}</p>
                        <div className="Qualtity">{element.qualtityPurchase}</div>
                        <p className="Price">${price}</p>
                    </button>
                );
            }
        });

        return(
            <div className="Bill">
                <div className="BillIcon">
                    { this.state.cakes.length > 0 && <span className="NotifyIcon">{this.state.cakes.length}</span> }
                    <img src={require('../images/bill-icon.png')} width="50px" height="50px" />
                </div>
                <div className="BillWrapper">
                    <div className="BillTitle">Choosen Cake</div>
                    <p>Customer Infomation</p>
                    <input className="form-control CustomerName" placeholder="Name" type="text" onChange={this.getCustomerName} />
                    <ul className="list-group BillDetail">
                        {cakes}
                    </ul>
                    <button type="button" className="BtnOrder" onClick={this.order}>Order</button>
                </div>
            </div>
        );
    }
}

export default Bill;
