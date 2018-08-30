import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-testing-library';
import ShoppingCart from './shoppingCart';

describe('#ShoppingCart()', () => {
  test('renders without crashing', () => {
    const shoppingCart = render(<ShoppingCart />);
    expect(shoppingCart).toMatchSnapshot();
  });
});
