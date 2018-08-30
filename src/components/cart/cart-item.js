import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

class CartList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProduct: {}
    }
  }

  removeFromCart = (image, title, price, id) => {
    if (!this.state.selectedProduct.isAdded) {
        this.setState({
            selectedProduct: {
                image: image,
                title: title,
                price: price,
                id: id,
                isAdded: false
            }
        }, () => {
            this.props.removeFromCart(this.state.selectedProduct);
        });
    } else {
        console.log('Item already removed from cart!');
    }
}

  render() {
    return (
      <div className='cart-item'>
        <Container>
          <Row>
            <Col md='2' className='cart-thumbnail'>
              <img src={this.props.item.image} alt='' />
            </Col>
            <Col md='6'>{this.props.item.title}</Col>
            <Col md='2'>{this.props.item.price}</Col>
            <Col md='2'>
            <Button  
              color='warning'
              onClick={() => this.removeFromCart(this.props.item.image, this.props.item.title, this.props.item.price, this.props.item.id)}
            >
              Remove
            </Button>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default CartList;
