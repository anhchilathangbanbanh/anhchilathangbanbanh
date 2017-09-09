import React, { Component } from 'react';
import $ from 'jquery';

class AddCake extends Component {
    constructor() {
        super();
        this.state = {
            product_code: '',
            cakeName: '',
            category: false,
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

    getImgPathFromClient(event) {
      this.setState({ img_path: event.target.value });
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
                product_code: this.state.product_code,
                name: this.state.cakeName,
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
          <div>
            <br/>
            <br/>
            <div className="container">
              <form id="add_cake_form" enctype="multipart/form-data">
                  <div className="form-group col-md-6">
                      <label>Product code</label>
                      <input type="text" className="form-control" placeholder="Product code" required name="Message"
                          name="product_code"
                          value={this.state.product_code}
                          onChange={this.handleInputChange} />
                  </div>
                  <div className="form-group col-md-6">
                      <label>Name</label>
                      <input type="text" className="form-control" placeholder="Name" required name="Message"
                          name="cakeName"
                          value={this.state.cakeName}
                          onChange={this.handleInputChange} />
                  </div>
                  <div className="form-group col-md-6">
                      <label>Qualtity</label>
                      <input type="number" className="form-control" placeholder="Qualtity" required name="Message" min="0"
                          name="qualtity"
                          value={this.state.qualtity}
                          onChange={this.handleInputChange} />
                  </div>
                  <div className="form-group col-md-6">
                      <label>Price</label>
                      <input type="number" className="form-control" placeholder="Price" required name="Message" min="0"
                          name="price"
                          value={this.state.price}
                          onChange={this.handleInputChange}/>
                  </div>
                  <div className="col-md-12">
                    <label>Category</label>
                    <div className="checkbox" >
                        {categories}
                    </div>
                  </div>
                  <div className="form-group col-md-12">
                      <label>Avatar</label>
                      <input type="file" name="images"  required name="Message" onChange={this.onImageChange} />
                      <img id="img-user" style={{"transform":"scale(0.5, 0.5)", "transform": "translate(0px, 0px)"}} height="100" width="100"/>
                  </div>
                  <div className="form-group col-md-12">
                      <label>Description</label>
                      <input type="text" className="form-control" placeholder="Description"
                          name="description"
                          value={this.state.description}
                          onChange={this.handleInputChange}/>
                  </div>
                  <div className="col-md-12">
                    <button type="submit" onClick={this.addCake} className="btn btn-success">Add</button>
                  </div>
              </form>
            </div>
            <br/>
          </div>
        );
    }
}

export default AddCake;
