import React from 'react';
import { Container, Row, Col }from 'reactstrap';
import { SingleProduct }from './index';

const ProductList = (props) => {
    const products = props.products.map((product) => {
        return (
            <SingleProduct key={product.id} item={product} addToCart={props.addToCart} />
        )
    });

    return (
        <Container>
            <Row>
                <Col xs='12'>
                    <h1>FEATURED PRODUCTS</h1>
                </Col>
                { products }
            </Row>
        </Container>
    )
};

export default ProductList;
