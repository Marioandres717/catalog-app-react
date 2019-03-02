import React, { Component } from 'react';

export default class ItemList extends Component {
  state = {
    items: []
  };
  async componentDidMount() {
    const response = await fetch('http://localhost:5000/');
    const data = await response.json();
    this.setState({
      items: data.items
    });
  }
  render() {
    const { items } = this.state;
    return (
      <div className="item-container">
        {items.map((item) => (
          <div className="item" key={item.id}>
            <img src={item.picture} alt={item.name} className="item-picture" />
            <div className="item-details">
              <h2>{item.name}</h2>
              <p className="item-description">{item.description}</p>
              <p className="item-price">{item.price}</p>
              <button>Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
