import React from 'react';

export default function CartSummaryItems(props) {
  const product = props.product;
  return (
    <div className="cartSummary shadow my-3 p-2">
      {product
        ? <div className="detailCard d-flex flex-row flex-wrap">
          <img src={product.image} alt={product.name} className="contain mb-2 w-25" />
          <div className="d-flex flex-column flex-wrap">
            <h5 className="p-2">{product.name}</h5>
            <div className="p-2"><span className="text-white">${(product.price / 100).toFixed(2)}</span></div>
            <div className="p-2">{product.shortDescription}</div>
          </div>
        </div>
        : <div><span>You have no items in your cart.</span></div>
      }
    </div>
  );
}
