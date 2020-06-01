import React from 'react';
import Product from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
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
      <div className="d-flex flex-wrap justify-content-center">
        {
          this.state.products.map(product => {
            return (
              <Product
                key = {product.productId}
                products={product}
                setView={this.props.setView}
              />
            );
          })
        }
      </div>
    );
  }
}
