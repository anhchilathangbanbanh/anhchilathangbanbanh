import React, { Component } from 'react';
import $ from 'jquery';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import swal from 'sweetalert/dist/sweetalert.min.js';


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
            cakesOnSlide: [],
            message: '',
            showModal: false,
            choosenCake: {},
            cakeIsPicked: {}
        };

        // bind this pointer
        this.getCakeShowOnSlide = this.getCakeShowOnSlide.bind(this);
        this.close = this.close.bind(this);
        this.pickUpCake = this.pickUpCake.bind(this);
    }

    componentDidMount() {
        this.getCakeShowOnSlide();
    }

    // call APIs
    getCakeShowOnSlide() {
        $.ajax({
            url: '/api/cake/get-cake-show-on-slide',
            type: 'get'
        }).done(response => {
            console.log(response);
            if (response.status == 1) {
                this.setState({ cakesOnSlide: response.data });
            }else {
                this.setState({ message: response.message });
            }
        }).fail(err => {
            swal("Oops", err, "error");
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
        const slider = this.state.cakesOnSlide.map((element, index) => {
            return (
                <div key={index} className="TopSellingCake">
                <br/>
                <br/>
                    <div className="form-group col-md-6">
                      <img className="CakeAvatar" src={element.img_path}/>
                    </div>
                    <div className="form-group col-md-6">
                      <div className="CakeInfo">
                          <div className="CakeName">{element.name}</div>
                      </div>
                      <div className="BtnBuyNow">
                          <button className="btn btn-danger"  onClick={()=> this.openModal(element)}>Buy now</button>
                      </div>
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
            <div className="SlideDisplayTopSelling">
                <Slider {...slideSetting} className="container TopSellingSlide">
                    {slider}
                    { this.state.message && <p className="text-center">{this.state.message}</p>}
                </Slider>
                <OrderModal showModal={this.state.showModal} onCloseModal={this.close} choosenCake={this.state.choosenCake} pickUpCake={this.pickUpCake}/>
                <Bill cakeIsPicked={this.state.cakeIsPicked} />
            </div>
        );
    }
}

export default SlideDisplayTopSelling;
