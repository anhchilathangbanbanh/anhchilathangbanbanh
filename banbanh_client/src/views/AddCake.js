import React, { Component } from 'react';
import $ from 'jquery';

class AddCake extends Component {
    constructor() {
        super();
        this.state = {
            cakeInfo: {
                product_code: '',
                cakeName: '',
                category: false,
                description: '',
                qualtity: 0,
                price: 0
            },
            categories: []
        };

        this.getListCategories = this.getListCategories.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.addCake = this.addCake.bind(this);
    }

    componentDidMount() {
        this.getListCategories();
    }

    getListCategories() {
        $.ajax({
            url: '/api/cake-category/get-list-cake-category',
            type: 'get'
        }).done(response => {
            if (response.status == 1) {
                this.setState({ categories: response.data });
            }
        }).fail(err => {
            console.log(err);
        })
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    addCake() {
        console.log($("input[name=images]").val());
        var fd = new FormData(document.getElementById("add_cake_form"));
        $.ajax({
            url: '/api/upload',
            type: 'post',
            data: fd,
            processData: false, // tell jQuery not to process the data
            contentType: false // tell jQuery not to set contentType
        }).done(response => {
            let imgPath = response.data;
            let cakeInfo = {
                product_code: this.state.cakeInfo.product_code,
                name: this.state.cakeInfo.cakeName,
                _category: this.state.category,
                description: this.state.description,
                qualtity: this.state.qualtity,
                price: this.state.price,
                img_path: imgPath
            }
            console.log(cakeInfo);

            $.ajax({
                url: '/api/cake/create-new-cake',
                type: 'post',
                data: cakeInfo
            }).done(response => {
                console.log(response);
            }).fail(err => {
                console.log(err);
            });
        }).fail(err => {
            console.log(err);
        });
    }

    render() {
        const categories = this.state.categories.map((element, key) => {
            return (
                <label className="radio-inline">
                  <input type="radio" name="category" onChange={this.handleInputChange} value={element._id} /> {element.name}
                </label>
            );
        })

        return (
            <form id="add_cake_form" enctype="multipart/form-data">
                <div className="form-group">
                    <label>Product code</label>
                    <input type="text" className="form-control" placeholder="Product code"
                        name="product_code"
                        value={this.state.product_code}
                        onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="Name"
                        name="cakeName"
                        value={this.state.cakeName}
                        onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Avatar</label>
                    <input type="file" name="images" />
                </div>
                <div className="checkbox">
                    <label>Category</label>
                    {categories}
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input type="text" className="form-control" placeholder="Description"
                        name="description"
                        value={this.state.description}
                        onChange={this.handleInputChange}/>
                </div>
                <div className="form-group">
                    <label>Qualtity</label>
                    <input type="number" className="form-control" placeholder="Qualtity"
                        name="qualtity"
                        value={this.state.qualtity}
                        onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="number" className="form-control" placeholder="Price"
                        name="price"
                        value={this.state.price}
                        onChange={this.handleInputChange}/>
                </div>
                <button type="button" onClick={this.addCake} className="btn btn-success">Add</button>
            </form>
        );
    }
}

export default AddCake;
