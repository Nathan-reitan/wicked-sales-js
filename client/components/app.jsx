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
      isToggled: false
    };
    this.setView = this.setView.bind(this);
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  setView(name, params) {
    return this.setState(state => ({
      view: {
        name: name,
        params: params
      }
    }));
  }

  toggle(productId) {
    return this.setState(state => ({
      isToggled: !state.isToggled,
      productId: productId
    }));
  }

  render() {
    return (
      <div className="container">
        {this.state.isLoading
          ? <h1>Testing connections...</h1>
          : <h1>{this.state.message}</h1>}
        <Header/>
        {this.state.view.name === 'catalog'
          ? <ProductList setView={this.setView} />
          : <ProductDetails params={this.state.view.params} setView={this.setView}/>
        }
      </div>
    );
  }
}
