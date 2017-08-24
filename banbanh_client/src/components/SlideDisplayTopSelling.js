import React, { Component } from 'react';
import { Carousel, Button, Grid, Row, Col } from 'react-bootstrap';
import $ from 'jquery';

import OrderModal from './OrderModal';
import Bill from './Bill';

class SlideDisplayTopSelling extends Component {
    constructor() {
        super();

        // topCake: list of top selling cakes
        // showModal: status of modal box: open or close
        // choosenCake: cake choosen when click "Buy now" button on slide
        // cakeIsPicked: cake was choosen in modal box, use to show in Bill component
        this.state = {
            topCake: [],
            showModal: false,
            choosenCake: {},
            cakeIsPicked: {}
        };

        // bind this pointer
        this.getTopSelling = this.getTopSelling.bind(this);
        this.openModal = this.openModal.bind(this);
        this.close = this.close.bind(this);
        this.pickUpCake = this.pickUpCake.bind(this);
    }

    componentWillMount() {
        this.getTopSelling();
    }

    getTopSelling() {
        $.ajax({
            url: '/api/bill-detail/get-top-selling',
            type: 'get'
        }).done((data) => {
            this.setState({
                topCake: data
            });
        }).fail((err) => {
            alert(err.message);
        });
    }

    // open modal & pass choosen cake to OrderModal component
    openModal(cake) {
        this.setState({
            showModal: true,
            choosenCake: cake
        });
    }

    // close modal
    close() {
        this.setState({ showModal: false });
    }

    // after click choose cake on modal box pass info of choosen cake to Bill component
    pickUpCake(cake) {
        this.setState({ cakeIsPicked: cake });
    }

    render() {
        const slider = this.state.topCake.map( (element) => {
            return (
                <Carousel.Item className="SlidePage">
                    <Grid>
                        <Row className="show-grid">
                            <Col sm={6} smOffset={2}>
                                <img className="ImageForTopSellingCake" alt="900x500" src={element.img_path}/>
                            </Col>
                            <Col sm={4}>
                                <div>
                                    <h3>{element.name}</h3>
                                    <p>{element.description}</p>
                                    <Button bsStyle="danger" onClick={() => this.openModal(element)}>Buy now</Button>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </Carousel.Item>
            );
        });

        return (
            <div className="SlideDisplayTopSelling">
                <Carousel>
                    {slider}
                </Carousel>
                <OrderModal showModal={this.state.showModal} onCloseModal={this.close} choosenCake={this.state.choosenCake} pickUpCake={this.pickUpCake}/>
                <Bill cakeIsPicked={this.state.cakeIsPicked} />
            </div>
        );
    }
}

export default SlideDisplayTopSelling;
