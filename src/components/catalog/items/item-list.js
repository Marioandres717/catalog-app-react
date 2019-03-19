import React, { Component } from 'react';
import { Link } from '@reach/router';
import UserContext from '../../../userContext';

export default class ItemList extends Component {
  state = {
    items: []
  };
  async componentDidMount() {
    const response = await fetch(
      `http://localhost:5000/categories/${this.props.categoryId}/items`
    );
    const { items } = await response.json();
    this.setState({
      items: items
    });
  }

  render() {
    const { categoryId } = this.props;
    const { items } = this.state;
    return (
      <div className="item-container">
        {items.map(item => (
          <Link
            to={`/categories/${categoryId}/items/${item.id}`}
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
        <UserContext.Consumer>
          {user =>
            user[0].id != null ? (
              <Link
                to={`/categories/${categoryId}/additems`}
                state={{ user: user[0] }}
              >
                <button>Add Item</button>
              </Link>
            ) : null
          }
        </UserContext.Consumer>
      </div>
    );
  }
}
