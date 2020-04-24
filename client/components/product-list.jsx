import React from 'react';
import Product from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(resp => resp.json())
      .then(data => {
        return this.setState(state => ({
          products: data
        }));
      })
      .catch(error => console.error('Error:', error));
  }

  render() {
    return (
      <div className="productContainer d-flex flex-row flex-wrap justify-content-sm-between">
        {
          this.state.products.map(product => {
            return (
              <Product
                key = {product.productId}
                products={product} />
            );
          })
        }
      </div>
    );
  }
}
