import React, { Component } from 'react';
import $ from 'jquery';

import OrderModal from '../components/OrderModal';
import Bill from '../components/Bill';
import SideMenu from '../components/SideMenu';

class ListCake extends Component {
    constructor() {
        super();
        this.state = {
            listCake: [],
            message: '',
            showModal: false,
            choosenCake: {},
            cakeIsPicked: {},
            prevUrl: ''
        };

        // bind this
        this.getListCake = this.getListCake.bind(this);
        this.openModal = this.openModal.bind(this);
        this.close = this.close.bind(this);
        this.pickUpCake = this.pickUpCake.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.location.pathname != this.props.location.pathname) {
            // get list cake
            this.getListCake();
        }
        console.log(prevProps);
        console.log(this.props);
    }

    componentDidMount() {
        this.getListCake();
    }

    getListCake() {
        $.ajax({
            url: `/api/cake/get-cake-by-category/${this.props.match.params.categoryId}`,
            type: 'get'
        }).done((response) => {
            if (response.status == 1) {
                this.setState({ listCake: response.data });
            }else {
                this.setState({ message: 'Dont have data' });
            }
        }).fail((err) => {
            alert('Something went wrong!');
            console.log(err);
        })
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
        const listCake = this.state.listCake.map((element, index) => {
            var imgPath = `${window.location.origin}/${element.img_path}`;
            return (
                <div key={index} className="Cake col-md-3 col-sm-4">
                    <img src={imgPath} className="img-responsive" onClick={()=> this.openModal(element)} />
                    <p>{element.name}</p>
                </div>
            );
        });

        return (
            <div className="ListCake">
                <div className="bgimg-1 w3-display-container w3-opacity-min">
                <div className="w3-display-middle">
                    <b><span className="w3-xxxlarge w3-text-black w3-wide">{this.props.match.params.category}</span></b>
                </div>
                </div>
                <div className="ListCakeContent row">
                    <div className="col-md-2 col-sm-2 col-xs-2">
                        <div className="CategorySideMenu">
                            <SideMenu />
                        </div>
                    </div>
                    <div className="col-md-9">
                        {listCake}
                    </div>
                    <OrderModal showModal={this.state.showModal} onCloseModal={this.close} choosenCake={this.state.choosenCake} pickUpCake={this.pickUpCake}/>
                    <div className="col-md-3">
                        <Bill cakeIsPicked={this.state.cakeIsPicked} />
                    </div>
                </div>
          </div>
        );
    }
}

export default ListCake;
