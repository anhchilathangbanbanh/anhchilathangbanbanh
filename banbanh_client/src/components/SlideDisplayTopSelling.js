import React, { Component } from 'react';
import { Carousel, Button, Grid, Row, Col } from 'react-bootstrap';
import $ from 'jquery';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

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
        this.close = this.close.bind(this);
        this.pickUpCake = this.pickUpCake.bind(this);
    }

    componentWillMount() {
        this.getTopSelling();
    }

    // call APIs
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
    openModal = (cake) => {
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
        const slider = this.state.topCake.map((element, index) => {
            return (
                <div key={index} className="TopSellingCake">
                    <img className="CakeAvatar" src={element.img_path} onClick={()=> this.openModal(element)} />
                    <div className="CakeInfo">
                        <div className="CakeName">{element.name}</div>
                        <div className="CakeDescription">{element.description}</div>
                    </div>
                </div>
            );
        });

        const slideSetting = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        return (
            <div className="row SlideDisplayTopSelling">
                <Slider {...slideSetting} className="col-md-8 TopSellingSlide">
                    {slider}
                </Slider>
                <OrderModal showModal={this.state.showModal} onCloseModal={this.close} choosenCake={this.state.choosenCake} pickUpCake={this.pickUpCake}/>
                <div className="col-md-3">
                    <Bill cakeIsPicked={this.state.cakeIsPicked} />
                </div>
            </div>
        );
    }
}

export default SlideDisplayTopSelling;
