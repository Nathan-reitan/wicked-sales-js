import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cartSummary';

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
    const name = this.state.view.name;
    let content;
    if (name === 'catalog') {
      content = <ProductList setView={this.setView} />;
    } else if (name === 'details') {
      content = <ProductDetails addtoCart={this.addCartItem} params={this.state.view.params} setView={this.setView} />;
    } else if (name === 'cart') {
      content = <CartSummary cart={this.state.cart} setView={this.setView} />;
    } else {
      content = <div>Something went wrong!</div>;
    }
    return (
      <div className="container">
        <Header cartItemCount={this.state.cart.length} setView={this.setView}/>
        {content}
      </div>
    );
  }
}
