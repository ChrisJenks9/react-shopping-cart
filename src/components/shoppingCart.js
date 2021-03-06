import React, { Component } from 'react';
import { ProductList }from './products/index';
import { Cart } from './cart/index'
import Database from '../db.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';

class ShoppingCart extends Component {
    state = {
        products: Database.products,
        categories: Database.categories,
        discount: Database.discount,
        discountCode: '',
        currentDiscount: 0,
        totalAmount: 0,
        cart: []
    };

    handleAddToCart = async (selectedProducts) => {
        let cartItem = this.state.cart;
        await cartItem.push(selectedProducts);

		await this.setState({
            cart : cartItem
        });

        await this.handleSumTotal();
    }

    handleRemoveFromCart = async (selectedProducts) => {
        let cartItem = this.state.cart;
        cartItem = await cartItem.filter((item) => {
            return item.id !== selectedProducts.id;
        });

        await this.setState({
            cart : cartItem
        });

        await this.handleSumTotal();
    };

    handleSumTotal = async () => {
        let total = 0;
        let cart = this.state.cart;

        await cart.map((item) => {
            return total += item.price;
        });

        total -= this.state.currentDiscount;

        if (total < 0) total = 0;

		await this.setState({
			totalAmount: total
        });
    };

    handleRedeemCodeChange = async (discountCode) => {
        if (this.state.discount[discountCode] && this.state.discount[discountCode].code === 'FIVEOFF') {
            await this.setState({
                discountCode,
                currentDiscount: this.state.discount[discountCode].discountOff
            });
        } else if (this.state.discount[discountCode] && this.state.discount[discountCode].code === 'TENOFF' && this.state.totalAmount > 50) {
            await this.setState({
                discountCode,
                currentDiscount: this.state.discount[discountCode].discountOff
            });
        } else {
            await this.setState({
                discountCode,
                currentDiscount: 0
            });
        }
    };

    handleRedeemCodeClick = async () => {
        if (!this.state.discount[this.state.discountCode]) alert('This is not a Valid Code');
        if (this.state.discount[this.state.discountCode] && this.state.discount[this.state.discountCode].code === 'TENOFF' && this.state.totalAmount < 50) alert('Order must be over £50.00');
        
        await this.handleSumTotal();

        const elements = document.getElementsByClassName('form-control');
        elements[0].value = '';
    };

    render() {
        return (
            <div className='shopping-cart'>
                <ProductList 
                    products={ this.state.products } 
                    addToCart={this.handleAddToCart}
                />
                <Cart 
                    updateCart={ this.state.cartBounce }
                    cartItems={ this.state.cart }
                    removeFromCart={this.handleRemoveFromCart} 
                    redeemCodeChange={ this.handleRedeemCodeChange }
                    redeemCodeClick={ this.handleRedeemCodeClick }
                    total={ this.state.totalAmount }
                />
            </div>
        );
    }
}
export default ShoppingCart;
