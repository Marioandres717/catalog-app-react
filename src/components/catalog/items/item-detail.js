import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../../userContext';
import { Link } from '@reach/router';

// TODO: MAYBE REFACTOR INTO A STATE OF ITEM?? INSTEAD OF INDIVIDUAL PROPERTIES
const ItemDetails = props => {
  var { categoryId, itemId } = props;
  var { user } = useContext(UserContext);
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

  async function handleDelete() {
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
    <div className="item-detail">
      <h1>
        {name} - {props.itemId}
      </h1>
      <h2>{description}</h2>
      <div className="item-picture">
        <img src={picture} alt={name} />
      </div>
      <button>Buy</button>
      {user.id != null ? <button>Add to WishList</button> : null}
      {user.id === ownerId ? (
        <div>
          <Link
            to={`/categories/${categoryId}/additems`}
            state={{
              item: { itemId, name, description, picture }
            }}
          >
            <button>Edit</button>
          </Link>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : null}
    </div>
  );
};

export default ItemDetails;
