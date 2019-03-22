import React, { useState, useEffect } from 'react';
import UserContext from '../../../userContext';
import { Link } from '@reach/router';

// TODO: MAYBE REFACTOR INTO A STATE OF ITEM?? INSTEAD OF INDIVIDUAL PROPERTIES
const ItemDetails = props => {
  var { categoryId, itemId } = props;
  var [name, setName] = useState([]);
  var [description, setDescription] = useState([]);
  var [picture, setPicture] = useState([]);
  var [ownerId, setOwnerId] = useState([]);

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
    let { item } = await response.json();
    return item;
  }

  async function handleDelete(user) {
    try {
      await fetch(
        `http://localhost:5000/categories/${categoryId}/items/${itemId}`,
        {
          method: 'DELETE',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': user.csrfAccessToken
          }
        }
      );
      console.log('SUCCESSFULLY DELETED');
    } catch (e) {
      console.error(e);
    }
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
                  user: user[0],
                  item: { itemId, name, description, picture }
                }}
              >
                <button>Edit</button>
              </Link>
              <button onClick={() => handleDelete(user[0])}>Delete</button>
            </div>
          ) : null}
        </div>
      )}
    </UserContext.Consumer>
  );
};

export default ItemDetails;
