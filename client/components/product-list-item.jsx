import React from 'react';

export default function Product(props) {
  const product = props.products;
  return (
    <div className="d-flex flex-column flex-wrap border shadow productCard">
      <img src={product.image} alt={product.name} className="contain mb-2"/>
      <h5>{product.name}</h5>
      <div><span>{(product.price / 100).toFixed(2)}</span></div>
      <p>{product.shortDescription}</p>
    </div>
  );
}
