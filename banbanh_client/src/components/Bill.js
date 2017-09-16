import React, { Component } from 'react';
import { Button, Col, Grid, Row, Modal } from 'react-bootstrap';
import update from 'react-addons-update';
import $ from 'jquery';
import swal from 'sweetalert/dist/sweetalert.min.js';

class Bill extends Component {
    constructor() {
        super();
        this.state = {
            cakes: [],
            name: '',
            phoneNumber: '',
            address: ''
        }

        this.getCustomerInfo = this.getCustomerInfo.bind(this);
        this.order = this.order.bind(this);
        this.removeChoosenCake = this.removeChoosenCake.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.cakeIsPicked != this.props.cakeIsPicked) {
            this.setState({
                cakes: this.state.cakes.concat(nextProps.cakeIsPicked)
            });
            $('.BillIcon').addClass('BillIconShake');
        }
    }

    componentDidMount() {
        $('.BillIcon img').click((e) => {
            e.stopPropagation();
            $('.BillWrapper').show('slow');
        });

        $('.BtnCloseBill').click(() => {
            $('.BillWrapper').hide('slow');
        });
    }

    getCustomerInfo(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    order() {
        let billData = {
            customer_name: this.state.name,
            customer_phone: this.state.phoneNumber,
            customer_address: this.state.address,
            billDetail: this.state.cakes
        };
        $.ajax({
            url: '/api/bill/create-new-bill',
            type: 'post',
            data: billData
        }).done((response) => {
            if (response.status == 1) {
                swal('Order Success', '', 'success');
            }else if (response.status == 0) {
                swal('Error', response.message, 'error');
            }
        }).fail((err) => {
            swal('Error', err.message, 'error');
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
                    <div className="BillTitle">
                        <span>Choosen Cake</span>
                        <span className="BtnCloseBill">&times;</span>
                    </div>
                    <p>Customer Infomation</p>
                    <input className="form-control CustomerName" placeholder="Name" type="text"
                        name="name" value={this.state.name} onChange={this.getCustomerInfo} />
                    <input className="form-control CustomerName" placeholder="Phone number" type="text"
                        name="phoneNumber" value={this.state.phoneNumber} onChange={this.getCustomerInfo} />
                    <input className="form-control CustomerName" placeholder="Address" type="text"
                        name="address" value={this.state.address} onChange={this.getCustomerInfo} />
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
