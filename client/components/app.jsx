import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addCartItem = this.addCartItem.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
  }

  setView(name, params) {
    return this.setState(state => ({
      view: {
        name: name,
        params: params
      }
    }));
  }

  getCartItems() {
    fetch('/api/cart')
      .then(response => response.json())
      .then(data => {
        return this.setState(() => ({
          cart: data
        }));
      });
  }

  addCartItem(product) {
    const oldCart = this.state.cart.slice();
    fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId: product })
    })
      .then(response => response.json())
      .then(newCartItem => {
        oldCart.push(newCartItem);
        return this.setState(() => ({
          cart: oldCart
        }));
      });
  }

  render() {
    return (
      <div className="container">
        <Header cartItemCount={this.state.cart.length}/>
        {this.state.view.name === 'catalog'
          ? <ProductList setView={this.setView} />
          : <ProductDetails addtoCart={this.addCartItem} params={this.state.view.params} setView={this.setView}/>
        }
      </div>
    );
  }
}
