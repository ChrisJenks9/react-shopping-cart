import React, { Component } from 'react';
import { Container, Row, Col, Input } from 'reactstrap';
import { CartItem } from './index';
import '../../css/cart.css';

class Cart extends Component {
    HandleCartItem = () => {
        return this.props.cartItems.map((cartItem) => {
            return (
                <CartItem key={cartItem.id} item={cartItem} removeFromCart={this.props.removeFromCart} />
            )
         });
    }

    render() {
        return (
            <Container className='cart'>
                <Row>
                    <Col xs='12' md='10'>
                        <h1>SHOPPING CART</h1>
                        <this.HandleCartItem />
                    </Col>
                    <Col xs='12' md='2' className='total-price'>
                        <h5>Total Price</h5>
                        { this.props.total }
                    </Col>
                </Row>
                <Row>
                    <Col xs='12'>
                    <h6>Redeem Coupon</h6>
                        <Input onChange={ (event) => this.props.redeemCode(event.target.value) }></Input>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Cart;
