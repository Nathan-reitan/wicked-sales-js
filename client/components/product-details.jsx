import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    this.getProduct();
  }

  getProduct() {
    fetch(`/api/products/${this.props.params.productId}`)
      .then(resp => resp.json())
      .then(data => {
        return this.setState(state => ({
          product: data
        }));
      })
      .catch(error => console.error('Error:', error));
  }

  render() {
    const product = this.state.product;
    if (product) {
      return (
        <div className="d-flex flex-wrap detailContainer shadow p-2">
          <div className="catalog">
            <span onClick={() => this.props.setView('catalog')} className="pointer text-white">
              Back to Catalog
            </span>
          </div>
          <div className="detailCard d-flex flex-row flex-wrap">
            <img src={product.image} alt={product.name} className="contain mb-2" />
            <div className="d-flex flex-column flex-wrap w-50">
              <h5>{product.name}</h5>
              <div className="h5"><span>${(product.price / 100).toFixed(2)}</span></div>
              <p>{product.shortDescription}</p>
              <button type='button' onClick={() => this.props.addtoCart(product.productId)} className="btn btn-primary w-25 p-1">Add to Cart</button>
            </div>
          </div>
          <div>
            <p>{product.longDescription}</p>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
