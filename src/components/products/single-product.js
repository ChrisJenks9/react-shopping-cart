import React, { Component } from 'react';
import { Col, Button } from 'reactstrap';
import '../../css/single-product.css';

class SingleProduct extends Component{
    constructor(props) {
        super(props);
        this.item = this.props.item;
        this.state = {
            selectedProduct: {},
            addedToCart: false
        }
    }

    addToCart = (image, title, price, id) => {
        if (!this.state.isAdded) {
            this.setState({
                selectedProduct: {
                    image: image,
                    title: title,
                    price: price,
                    id: id
                }
            }, () => {
                this.props.addToCart(this.state.selectedProduct);
            });
    
            this.setState({
                isAdded: true
            }, () => {
                setTimeout(() => {
                    this.setState({
                        isAdded: false,
                        selectedProduct: {} 
                    });
                }, 3500);
            });
        } else {
            console.log('Item already added to cart!');
        }
    }

    render() {
        return (
            <Col xs='12' lg='3' md='4' className='single-product'>
                <h6 className='product-title'>{this.item.title}</h6>
                <div className='product-image'><img src={this.item.image} alt='' /></div>
                <p className='product-description'>{this.item.description}</p>
                <h6 className='product-price'>£{this.item.price}</h6>
                <div className='product-add-to-cart'>
                    <Button 
                        color='info'
                        className={!this.state.isAdded ? "" : "added"}
                        onClick={() => this.addToCart(this.item.image, this.item.title, this.item.price, this.item.id)}>{!this.state.isAdded ? "ADD TO CART" : "✔ ADDED"}
                    </Button>
                </div>
            </Col>
        )
    }
}

export default SingleProduct;
