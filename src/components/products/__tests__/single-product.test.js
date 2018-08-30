import React from 'react';
import { shallow } from 'enzyme';
import ProductList from '../single-product';
import Database from '../../../db.json';
import SingleProduct from '../single-product';

describe('#SingleProduct()', () => {
  test('renders with a single product without crashing', () => {
    const singleProduct = shallow(<SingleProduct key={Database.products[0].id} item={Database.products[0]} />);
    expect(singleProduct).toMatchSnapshot();
  });
});
