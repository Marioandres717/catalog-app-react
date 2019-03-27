import React, { useState, useEffect, useContext } from 'react';
import { Link } from '@reach/router';
import UserContext from '../../../userContext';

const ItemList = props => {
  var { categoryId } = props;
  var [items, setItems] = useState([
    { id: '', name: '', description: '', picture: '' }
  ]);
  var { user } = useContext(UserContext);

  useEffect(() => {
    fetchItems().then(items => {
      setItems(items);
    });
  }, []);

  async function fetchItems() {
    const response = await fetch(
      `http://localhost:5000/categories/${categoryId}/items`
    );
    const { items } = await response.json();
    return items;
  }

  return (
    <div className="item-container">
      {items.map(item => (
        <Link
          to={`/categories/${categoryId}/items/${item.id}`}
          key={item.id}
          style={{ textDecoration: 'none', color: 'white' }}
        >
          <div className="item">
            <img src={item.picture} alt={item.name} className="item-picture" />
            <div className="item-details">
              <h2>{item.name}</h2>
              <p className="item-description">{item.description}</p>
              <p className="item-price">CAD $ 120.99</p>
            </div>
          </div>
        </Link>
      ))}
      {user.id != null ? (
        <Link to={`/categories/${categoryId}/additems`}>
          <button>Add Item</button>
        </Link>
      ) : null}
    </div>
  );
};

export default ItemList;
