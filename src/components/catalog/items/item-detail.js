import React, { useState, useEffect } from 'react';
import UserContext from '../../../userContext';
import { Link } from '@reach/router';

const ItemDetails = props => {
  const { categoryId, itemId } = props;
  const [name, setName] = useState([]);
  const [description, setDescription] = useState([]);
  const [picture, setPicture] = useState([]);
  const [ownerId, setOwnerId] = useState([]);

  useEffect(() => {
    fetchItem(categoryId, itemId).then(item => {
      let { name, description, picture, userId } = item;
      setName(name);
      setDescription(description);
      setPicture(picture);
      setOwnerId(userId);
    });
  }, [name, description, picture]);

  async function fetchItem(categoryId, itemId) {
    const response = await fetch(
      `http://localhost:5000/categories/${categoryId}/items/${itemId}`,
      {
        method: 'GET'
      }
    );
    const { item } = await response.json();
    return item;
  }

  return (
    <UserContext.Consumer>
      {user => (
        <div className="item-detail">
          <h1>
            {name} - {props.itemId}
          </h1>
          <h2>{description}</h2>
          <div className="item-picture">
            <img src={picture} alt={name} />
          </div>
          <button>Buy</button>
          {user[0].id != null ? <button>Add to WishList</button> : null}
          {user[0].id === ownerId ? (
            <div>
              <Link
                to={`/categories/${categoryId}/additems`}
                state={{
                  itemId,
                  name,
                  description,
                  picture
                }}
              >
                <button>Edit</button>
              </Link>
              <button>Delete</button>
            </div>
          ) : null}
        </div>
      )}
    </UserContext.Consumer>
  );
};

export default ItemDetails;
