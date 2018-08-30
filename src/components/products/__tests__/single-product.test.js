import React from 'react';
import { shallow, mount } from 'enzyme';
import Database from '../../../db.json';
import SingleProduct from '../single-product';

describe('#SingleProduct()', () => {
  test('renders with a single product without crashing', () => {
    const singleProduct = shallow(<SingleProduct key={Database.products[0].id} item={Database.products[0]} />);
    expect(singleProduct).toMatchSnapshot();
  });

  describe('inStock()', () => {
    test('To return add to cart button if there is > 0 stock', () => {
      const singleProduct = mount(<SingleProduct key={Database.products[0].id} item={Database.products[0]} />);
      expect(singleProduct.instance().inStock()).toMatchSnapshot();
    });
    test('To return out of stock button if there is 0 stock', () => {
      const singleProduct = mount(<SingleProduct key={Database.products[4].id} item={Database.products[4]} />);
      expect(singleProduct.instance().inStock()).toMatchSnapshot();
    });
  });
});
