import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../../userContext';
import { navigate } from '@reach/router';

const ItemCreate = props => {
  const { categoryId, location } = props;
  const { user } = useContext(UserContext);
  const { item } = location.state || {};
  const [name, setName] = useState(item != null ? item.name : []);
  const [description, setDescription] = useState(
    item != null ? item.description : []
  );
  const [picture, setPicture] = useState(item != null ? item.picture : []);

  useEffect(() => {
    if (!user.id) {
      navigate('/');
    }
  }, []);

  async function addItem() {
    try {
      let resp = await fetch(
        `http://localhost:5000/categories/${categoryId}/items`,
        {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            'X-CSRF-TOKEN': user.csrfAccessToken
          },
          body: JSON.stringify({
            name,
            description,
            picture,
            categoryId
          })
        }
      );
      let data = await resp.json();
      console.log('Sucessfully created!', data);
      navigate(`/categories/${categoryId}/items`);
    } catch (e) {
      console.error(e);
    }
  }

  async function editItem() {
    try {
      let resp = await fetch(
        `http://localhost:5000/categories/${categoryId}/items/${item.itemId}`,
        {
          method: 'PUT',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'content-type': 'application/json',
            accept: 'application/json',
            'X-CSRF-TOKEN': user.csrfAccessToken
          },
          body: JSON.stringify({
            name,
            picture,
            description,
            categoryId
          })
        }
      );
      let data = await resp.json();
      console.log('Sucessfully Edited!', data);
      navigate(`/categories/${categoryId}/items`);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="item-container">
      <form
        className="item-form"
        action="submit"
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <label htmlFor="item-name">Name: </label>
        <input
          type="text"
          name="item-name"
          id="name"
          onChange={e => setName(e.target.value)}
          placeholder={item != null ? item.name : 'Enter Name'}
        />
        <label htmlFor="item-description">Description:</label>
        <textarea
          name="item-description"
          id="description"
          cols="30"
          rows="5"
          onChange={e => setDescription(e.target.value)}
          placeholder={item != null ? item.description : 'Enter Description'}
        />
        <label htmlFor="item-picture">Picture:</label>
        <input
          type="text"
          name="item-picture"
          id="picture"
          onChange={e => setPicture(e.target.value)}
          placeholder={item != null ? item.picture : 'Enter picture Url'}
        />

        <button onClick={item != null ? editItem : addItem} type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default ItemCreate;
