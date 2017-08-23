import React, { Component } from 'react';
import { Carousel, Button, Grid, Row, Col } from 'react-bootstrap';
import $ from 'jquery';

import OrderModal from './OrderModal';
import Bill from './Bill';

class SlideDisplayTopSelling extends Component {
    constructor() {
        super();
        this.state = {
            topCake: [],
            showModal: false,
            chooseCake: {}
        };

        this.getTopSelling = this.getTopSelling.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.chooseCake = this.chooseCake.bind(this);
    }

    componentDidMount() {
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

    // open & close modal
    open() {
        this.setState({ showModal: true });
    }

    close() {
        this.setState({ showModal: false });
    }

    chooseCake(cake) {
        this.setState({ choosenCake: cake });
        console.log(this.state.chooseCake);
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
                                    <Button bsStyle="danger" onClick={this.open}>Buy now</Button>
                                    <OrderModal {...element} showModal={this.state.showModal} onCloseModal={this.close} chooseCake={this.chooseCake}/>
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
                <Bill choosenCake={this.state.choosenCake} />
            </div>
        );
    }
}

export default SlideDisplayTopSelling;
