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
        this.chooseCake = this.chooseCake.bind(this);
    }

    close() {
        this.props.onCloseModal();
    }

    handleChange(event) {
        this.setState({qualtityPurchase: event.target.value});
    }

    chooseCake() {
        let cake = {
            id: this.props.choosenCake._id,
            name: this.props.choosenCake.name,
            price: this.props.choosenCake.price,
            qualtityPurchase: this.state.qualtityPurchase
        }
        this.props.pickUpCake(cake);
        this.props.onCloseModal();
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
                                    <a><img src={this.props.choosenCake.img_path} /></a>
                                </Col>
                                <Col sm={6}>
                                    <p><strong>Name:</strong> {this.props.choosenCake.name}</p>
                                    <p><strong>Product code:</strong> {this.props.choosenCake.product_code}</p>
                                    <p><strong>Price:</strong> {this.props.choosenCake.price}</p>
                                    <p><strong>Qualtity:</strong> {this.props.choosenCake.qualtity}</p>
                                    <div className="input-group input-postfix">
                                        <input type="number" className="ng-pristine ng-valid ng-not-empty ng-touched" aria-invalid="false" value={this.state.qualtityPurchase} onChange={this.handleChange} />
                                        <div className="spinner-arrows" aria-hidden="true">
                                            <span className="up-arrow glyphicon-arrow_up"></span>
                                            <span className="down-arrow glyphicon-arrow_down disabled"></span>
                                        </div>
                                    </div>
                                    <button className="btn btn-danger" onClick={this.chooseCake}>Choose</button>
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
