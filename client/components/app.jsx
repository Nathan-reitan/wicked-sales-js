import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cartSummary';
import CheckoutForm from './checkoutForm';

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
    this.placeOrder = this.placeOrder.bind(this);
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
        if (data.length === 0) {
          return this.setState(() => ({
            cart: []
          }));
        }
        return this.setState(() => ({
          cart: [data]
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

  placeOrder(info) {
    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: info.name,
        creditCard: info.creditCard,
        shippingAddress: info.shippingAddress
      })
    })
      .then(response => response.json())
      .then(data => {
        return this.setState(() => ({
          cart: [],
          view: {
            name: 'catalog',
            params: {}
          }
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
    } else if (name === 'checkout') {
      content = <CheckoutForm placeOrder={this.placeOrder} setView={this.setView}/>;
    } else {
      content = <div>Something went wrong!</div>;
    }
    return (
      <div>
        <Header cartItemCount={this.state.cart.length} setView={this.setView} />
        <div className="text-light text-center"><h1>Disclaimer: This site is for demonstrative purposes only, DO NOT ENTER REAL INFORMATION INTO THE FORM ON THE CHECKOUT PAGE.</h1></div>
        <div className="container d-flex justify-content-center">
          {content}
        </div>
      </div>

    );
  }
}
