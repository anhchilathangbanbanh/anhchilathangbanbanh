import React, { Component } from 'react';
import $ from 'jquery';

class AddCake extends Component {
    constructor() {
        super();
        this.state = {
            product_code: '',
            cakeName: '',
            category: false,
            isShowOnSlide: false,
            description: '',
            qualtity: 0,
            price: 0,
            img_path: '',
            categories: []
        };
        this.getImgPathFromClient = this.getImgPathFromClient.bind(this);
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
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          let reader = new FileReader();
          reader.onload = (e) => {

            var img = document.getElementById("img-user");
            img.src = e.target.result;

          };
          reader.readAsDataURL(event.target.files[0]);
        }
    }

    getImgPathFromClient(event) {
      this.setState({ img_path: event.target.value });
    }

    addCake() {
        var fd = new FormData(document.getElementById("add_cake_form"));
        console.log(fd);
        $.ajax({
            url: '/api/upload',
            type: 'post',
            data: fd,
            processData: false, // tell jQuery not to process the data
            contentType: false // tell jQuery not to set contentType
        }).done(response => {
            let imgPath = response.data;
            let cakeInfo = {
                product_code: this.state.product_code,
                name: this.state.cakeName,
                _category: this.state.category,
                description: this.state.description,
                show_on_slide: this.state.isShowOnSlide,
                qualtity: this.state.qualtity,
                price: this.state.price,
                img_path: imgPath
            }

            $.ajax({
                url: '/api/cake/create-new-cake',
                type: 'post',
                data: cakeInfo
            }).done(response => {
                if (response.status == 1) {
                    alert('Success');
                }else if (response.status == 0) {
                    alert(response.message);
                }
            }).fail(err => {
                alert('error');
            });
        }).fail(err => {
            alert(JSON.stringify(err));
        });
    }

    render() {
        const categories = this.state.categories.map((element, index) => {
            return (
                <label key={index} className="radio-inline">
                  <input type="radio" name="category" onChange={this.handleInputChange} value={element._id} /> {element.name}
                </label>
            );
        })

        return (
            <div className="container">
                <form id="add_cake_form">
                    <div className="form-group col-md-6">
                        <label>Product code</label>
                        <input type="text" className="form-control" placeholder="Product code" required
                          name="product_code"
                          value={this.state.product_code}
                          onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Name</label>
                        <input type="text" className="form-control" placeholder="Name" required
                          name="cakeName"
                          value={this.state.cakeName}
                          onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Qualtity</label>
                        <input type="number" className="form-control" placeholder="Qualtity" required min="0"
                          name="qualtity"
                          value={this.state.qualtity}
                          onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Price</label>
                        <input type="number" className="form-control" placeholder="Price" required min="0"
                          name="price"
                          value={this.state.price}
                          onChange={this.handleInputChange}/>
                    </div>
                    <div className="col-md-12">
                        <label>Category</label>
                        <div>
                            {categories}
                            </div>
                        </div>
                    <div>
                        <label>
                            <input type="checkbox" name="isShowOnSlide"
                                checked={this.state.isShowOnSlide}
                                onChange={this.handleInputChange} /> Show on slide
                        </label>
                    </div>
                    <div className="form-group col-md-12">
                        <label>Avatar</label>
                        <input type="file" name="images" required onChange={this.onImageChange} />
                        <img id="img-user" height="20%" width="20%"/>
                    </div>
                    <div className="form-group col-md-12">
                        <label>Description</label>
                        <input type="text" className="form-control" placeholder="Description"
                          name="description"
                          value={this.state.description}
                          onChange={this.handleInputChange}/>
                    </div>
                    <div className="col-md-12">
                        <button type="button" onClick={this.addCake} className="btn btn-success">Add</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddCake;
