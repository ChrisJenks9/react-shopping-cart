import React from 'react';
import { shallow, mount } from 'enzyme';
import ShoppingCart from '../shoppingCart';

describe('#ShoppingCart()', () => {
  test('renders without crashing', () => {
    const shoppingCart = shallow(<ShoppingCart />);
    expect(shoppingCart).toMatchSnapshot();
  });

  describe('#handleAddToCart', () => {
    test('should add a product to the cart', () => {
      const shoppingCart = mount(<ShoppingCart />);
      shoppingCart.instance().handleAddToCart({
        id: 1,
        title: 'Product'
      });
      
      expect(shoppingCart.state().cart).toMatchSnapshot();
    });
  });

  describe('#handleRemoveFromCart', () => {
    test('should remove product from the cart', () => {
      const shoppingCart = mount(<ShoppingCart />);

      shoppingCart.instance().handleAddToCart({
        id: 1,
        title: 'Product'
      });

      shoppingCart.instance().handleRemoveFromCart({
        id: 1,
        title: 'Product'
      });
      
      expect(shoppingCart.state().cart).toMatchSnapshot();
    });
  });

  describe('#handleSumTotal', () => {
    test('should total the products in the cart', async () => {
      const shoppingCart = mount(<ShoppingCart />);

      await shoppingCart.instance().handleAddToCart({
        id: 1,
        title: 'Product',
        'price': 10,
      });
      await shoppingCart.instance().handleAddToCart({
        id: 2,
        title: 'Product',
        'price': 10,
      });

      await shoppingCart.instance().handleSumTotal();
      
      expect(shoppingCart.state().totalAmount).toEqual(20);
    });
  });

  describe('#handleRedeemCodeChange', () => {
    test('should set discountCode to FIVEOFF & currentDiscount to 5', () => {
      const shoppingCart = mount(<ShoppingCart />);

      shoppingCart.instance().handleRedeemCodeChange('FIVEOFF');
      
      expect(shoppingCart.state().discountCode).toEqual('FIVEOFF');
      expect(shoppingCart.state().currentDiscount).toEqual(5);
    });
    test('should set discountCode to TENOFF & currentDiscount to 10 if total price > 50', async () => {
      const shoppingCart = mount(<ShoppingCart />);

      await shoppingCart.instance().handleAddToCart({
        id: 1,
        title: 'Product',
        'price': 51,
      });

      await shoppingCart.instance().handleRedeemCodeChange('TENOFF');
      
      expect(shoppingCart.state().discountCode).toEqual('TENOFF');
      expect(shoppingCart.state().currentDiscount).toEqual(10);
    });
    test('should set discountCode to TENOFF & currentDiscount to 0 if total price < 50', async () => {
      const shoppingCart = mount(<ShoppingCart />);

      await shoppingCart.instance().handleAddToCart({
        id: 1,
        title: 'Product',
        'price': 49,
      });

      await shoppingCart.instance().handleRedeemCodeChange('TENOFF');
      
      expect(shoppingCart.state().discountCode).toEqual('TENOFF');
      expect(shoppingCart.state().currentDiscount).toEqual(0);
    });
  });
});
