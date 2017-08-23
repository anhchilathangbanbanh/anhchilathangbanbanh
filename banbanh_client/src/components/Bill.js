import React, { Component } from 'react';
import { Button, Col, Grid, Row, Modal } from 'react-bootstrap';
import $ from 'jquery';

class Bill extends Component {
    constructor() {
        super();
        this.state = {
            cakes: []
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            cakes: this.state.cakes.concat(nextProps.choosenCake)
        });
        console.log(nextProps);
    }

    render() {

            const cakes = this.state.cakes.map( (element) => {
                if (element) {
                    console.log(element.choosenCake);
                    return(
                        <li>{element.choosenCake.name}</li>
                    );
                }
            });

        return(
            <div className="Bill">
                <input type="text" />
                <ul>
                    {cakes}
                </ul>
            </div>
        );
    }
}

export default Bill;
