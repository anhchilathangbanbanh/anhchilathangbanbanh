import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Button, Col, Grid, Row, Modal } from 'react-bootstrap';
import $ from 'jquery';

class OrderModal extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false
        };

        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }

    componentDidMount() {

    }

    close() {
        this.setState({ showModal: false });
        // $('.modal').hide
    }

    open() {
        this.setState({ showModal: true });
        // $('.modal').show()
    }

    render() {
        return (
            <div>
                <Button bsStyle="danger" onClick={this.open}>Buy now</Button>

                <Modal className="OrderModal" container={this} bsSize="large" aria-labelledby="contained-modal-title-lg" show={this.state.showModal} onHide={this.close}>

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
                                        <input type="number" className="ng-pristine ng-valid ng-not-empty ng-touched" aria-invalid="false" value="1" />
                                        <div className="spinner-arrows" aria-hidden="true">
                                            <span className="up-arrow glyphicon-arrow_up"></span>
                                            <span className="down-arrow glyphicon-arrow_down disabled"></span>
                                        </div>
                                    </div>
                                    <button className="btn btn-danger">Order</button>
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
