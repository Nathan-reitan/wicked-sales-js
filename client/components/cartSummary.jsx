import CartSummaryItems from './cartSummaryItem';
import React from 'react';

export default function CartSummary(props) {
  const products = props.cart;
  let totalPrice = 0;
  for (let i = 0; i < products.length; i++) {
    totalPrice += products[i].price;
  }
  let productsList = null;
  if (products.length) {
    productsList = products.map(product => {
      return (
        <CartSummaryItems key={product.productId} product={product} />
      );
    });
  }
  return (
    <div>
      <div>
        <span onClick={() => props.setView('catalog')} className="text-light pointer">
          Back to Catalog
        </span>
      </div>
      <header><h2 className="text-white">Your Cart</h2></header>
      {productsList}
      {products.length
        ? <div className="d-flex justify-content-between">
          <h3 className="text-white">Total: ${(totalPrice / 100).toFixed(2)}</h3>
          <button onClick={() => props.setView('checkout')} className="btn btn-primary">Checkout</button>
        </div>
        : <h2 className="text-white w-100">There are no items in your cart!</h2>
      }
      <div className="d-flex justify-content-center my-1"><img src="./images/ASCII-Dancing-Kitty.gif" alt="Dancing Cat" className="dancingCat"/></div>
    </div>
  );
}
