import React from 'react';
import { shallow } from 'enzyme';
import ShoppingCart from './shoppingCart';

describe('#ShoppingCart()', () => {
  test('renders without crashing', () => {
    const shoppingCart = shallow(<ShoppingCart />);
    expect(shoppingCart).toMatchSnapshot();
  });
});
