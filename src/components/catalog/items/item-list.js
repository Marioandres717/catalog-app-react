import React, { Component } from 'react';
import { Link } from '@reach/router';

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
        {items.map(item => (
          <Link
            to={`/items/${item.id}`}
            key={item.id}
            style={{ textDecoration: 'none', color: 'white' }}
          >
            <div className="item">
              <img
                src={item.picture}
                alt={item.name}
                className="item-picture"
              />
              <div className="item-details">
                <h2>{item.name}</h2>
                <p className="item-description">{item.description}</p>
                <p className="item-price">CAD $ 120.99</p>
              </div>
            </div>
          </Link>
        ))}
        <Link to="/item/add">
          <button>Add Item</button>
        </Link>
      </div>
    );
  }
}
