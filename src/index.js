import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ProductList }from './components/products/index';
import { Cart } from './components/cart/index'
import Database from './db.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';

class ShoppingCart extends Component {
    state = {
        products: Database.products,
        categories: Database.categories,
        discount: Database.discount,
        currentDiscount: 0,
        totalAmount: 0,
        cart: []
    };

    handleAddToCart = (selectedProducts) => {
        let cartItem = this.state.cart;
        cartItem.push(selectedProducts);

		this.setState({
            cart : cartItem
        });

        this.handleSumTotal();
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

        console.log(this.state.currentDiscount);

        await cart.map((item) => {
            return total += item.price;
        });

        total -= this.state.currentDiscount;

		await this.setState({
			totalAmount: total
        });
    };

    handleRedeemCodeChange = async (discountCode) => {
        if (this.state.discount[discountCode] && this.state.discount[discountCode].code === 'FIVEOFF') {
            await this.setState({
                currentDiscount: this.state.discount[discountCode].discountOff
            });
        } else if (this.state.discount[discountCode] && this.state.discount[discountCode].code === 'TENOFF' && this.state.totalAmount > 50) {
            await this.setState({
                currentDiscount: this.state.discount[discountCode].discountOff
            });
        } else {
            await this.setState({
                currentDiscount: 0
            });
        }
    };

    handleRedeemCodeClick = async () => {
        await this.handleSumTotal();
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

ReactDOM.render(<ShoppingCart />, document.getElementById('root'));
