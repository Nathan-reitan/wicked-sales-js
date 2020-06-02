import React from 'react';

export default function Product(props) {
  const product = props.products;
  return (
    <div onClick={() => props.setView('details', { productId: product.productId })} className="d-flex flex-column flex-wrap productCard pointer mx-3">
      <img src={product.image} alt={product.name} className="contain mb-2"/>
      <h5 className="p-2">{product.name}</h5>
      <div className="p-2"><span>${(product.price / 100).toFixed(2)}</span></div>
      <p className="p-2 my-0">{product.shortDescription}</p>
    </div>
  );
}
