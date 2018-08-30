import React from 'react';
import { shallow } from 'enzyme';
import ProductList from '../product-list';
import Database from '../../../db.json';

describe('#ProductList()', () => {
  test('renders with products without crashing', () => {
    const productList = shallow(<ProductList products={ Database.products } />);
    expect(productList).toMatchSnapshot();
  });
});
