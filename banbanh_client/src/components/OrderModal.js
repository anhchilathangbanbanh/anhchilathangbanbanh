import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Button, Col, Grid, Row, Modal } from 'react-bootstrap';
import $ from 'jquery';

class OrderModal extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            qualtityPurchase: 1
        };

        this.close = this.close.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.order = this.order.bind(this);
    }

    componentDidMount() {

    }

    close() {
        this.props.onCloseModal();
        // $('.modal').hide
    }

    handleChange(event) {
        this.setState({qualtityPurchase: event.target.value});
    }

    order() {
        let billData = {
            customer: 'lethemanh',
            _detail_purchase: []
        };
        $.ajax({
            url: '/api/bill/create-new-bill',
            type: 'post',
            data: billData
        }).done((bill) => {
            let billDetailData = {
                _bill: bill._id,
                _cake: this.props._id,
                qualtity_purchase: this.state.qualtityPurchase
            }
            if (bill) {
                $.ajax({
                    url: '/api/bill-detail/create-new-bill-detail',
                    type: 'post',
                    data: billDetailData
                }).done((billDetail) => {
                    console.log(billDetail);
                }).fail((err) => {
                    console.log(err);
                });
            }
        }).fail((err) => {
            console.log(err);
        });
    }

    render() {
        return (
            <div>

                <Modal className="OrderModal" bsSize="large" aria-labelledby="contained-modal-title-lg" show={this.props.showModal} onHide={this.close}>

                    <Modal.Body>
                    <span className="close" onClick={this.close}>&times;</span>
                        <Grid>
                            <Row className="show-grid">
                                <Col sm={6}>
                                    <a><img src={this.props.img_path} /></a>
                                </Col>
                                <Col sm={6}>
                                    <p><strong>Name:</strong> {this.props.name}</p>
                                    <p><strong>Product code:</strong> {this.props.product_code}</p>
                                    <p><strong>Price:</strong> {this.props.price}</p>
                                    <p><strong>Qualtity:</strong> {this.props.qualtity}</p>
                                    <div className="input-group input-postfix">
                                        <input type="number" className="ng-pristine ng-valid ng-not-empty ng-touched" aria-invalid="false" value={this.state.qualtityPurchase} onChange={this.handleChange} />
                                        <div className="spinner-arrows" aria-hidden="true">
                                            <span className="up-arrow glyphicon-arrow_up"></span>
                                            <span className="down-arrow glyphicon-arrow_down disabled"></span>
                                        </div>
                                    </div>
                                    <button className="btn btn-danger" onClick={this.order}>Order</button>
                                </Col>
                            </Row>
                        </Grid>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default OrderModal;
