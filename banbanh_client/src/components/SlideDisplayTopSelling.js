import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import $ from 'jquery';

class SlideDisplayTopSelling extends Component {
    constructor() {
        super();
        this.state = {
            topCake: []
        };

        this.getTopSelling = this.getTopSelling.bind(this);
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

    render() {
        const slider = this.state.topCake.map(function(element) {
            return (
                <Carousel.Item className="SlidePage">
                    <div className="SlideContent">
                        <img className="ImageForTopSellingCake img-responsive" alt="900x500" src={element.img_path}/>
                        <span className="CakeIntro">
                            <h3>{element.name}</h3>
                            <p>{element.description}</p>
                            <button className="btn btn-danger">Buy Now</button>
                        </span>
                    </div>
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
