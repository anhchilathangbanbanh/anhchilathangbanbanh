import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';

class Slide extends Component {
    render() {
        return (
            <div className="Slide">
                <Carousel>
                    <Carousel.Item>
                        <img height={500} alt="900x500" src={"https://www.w3schools.com/css/img_fjords.jpg"}/>
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img height={500} alt="900x500" src={"https://www.w3schools.com/css/img_fjords.jpg"}/>
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img height={500} alt="900x500" src={"https://www.w3schools.com/css/img_fjords.jpg"}/>
                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
}

export default Slide;
