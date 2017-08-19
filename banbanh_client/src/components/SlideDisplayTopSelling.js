import React, { Component } from 'react';
import { Carousel, Button, Grid, Row, Col } from 'react-bootstrap';
import $ from 'jquery';

import OrderModal from './OrderModal';

class SlideDisplayTopSelling extends Component {
    constructor() {
        super();
        this.state = {
            topCake: [],
            showModal: false
        };

        this.getTopSelling = this.getTopSelling.bind(this);
        this.open = this.open.bind(this);
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

    open() {
        this.setState({ showModal: true });
    }

    render() {
        const slider = this.state.topCake.map(function(element) {
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
                                    <OrderModal {...element}/>
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
            </div>
        );
    }
}

export default SlideDisplayTopSelling;
