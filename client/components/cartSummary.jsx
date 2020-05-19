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
  } else {
    productsList = <h2>There are no items in your cart!</h2>;
  }
  return (
    <div>
      <header><h2>Your Cart</h2></header>
      <div>
        <span onClick={() => props.setView('catalog')} className="text-muted pointer">
          Back to Catalog
        </span>
      </div>
      {productsList}
      <div><h3>Total: ${(totalPrice / 100).toFixed(2)}</h3></div>
    </div>
  );
}
