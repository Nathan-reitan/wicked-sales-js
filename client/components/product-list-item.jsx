import React from 'react';

export default function Product(props) {
  const product = props.products;
  return (
    <div onClick={() => props.setView('details', { productId: product.productId })} className="d-flex flex-column flex-wrap border shadow productCard pointer">
      <img src={product.image} alt={product.name} className="contain mb-2"/>
      <h5 className="p-1">{product.name}</h5>
      <div className="p-1"><span>${(product.price / 100).toFixed(2)}</span></div>
      <p className="p-1">{product.shortDescription}</p>
    </div>
  );
}
