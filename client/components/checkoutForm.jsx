import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: null,
      shippingAddress: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.placeOrder(this.state);
    this.setState({
      name: '',
      creditCard: null,
      shippingAddress: ''
    });
  }

  render() {
    return (
      <div className="d-flex flex-column">
        <form className="d-flex flex-column" onSubmit={this.handleSubmit}>
          <input
            id="name"
            type="text"
            placeholder="Enter Name Here"
            onChange={this.handleChange}/>
          <input
            id="creditCard"
            type="text"
            placeholder="Enter Credit Card Number Here"
            onChange={this.handleChange}/>
          <textarea
            id="shippingAddress"
            cols="30" rows="5"
            placeholder="Enter Shipping Address Here"
            onChange={this.handleChange}></textarea>
          <div className="d-flex justify-content-between">
            <span onClick={() => this.props.setView('catalog')} className="text-muted pointer">
            Continue Shopping
            </span>
            <button type="submit" className="btn btn-primary">Place Order</button>
          </div>
        </form>
      </div>
    );
  }
}
