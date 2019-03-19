import React, { useState } from 'react';

const ItemCreate = props => {
  const { categoryId, location } = props;
  const { user } = location.state;
  const { item } = location.state;
  const [name, setName] = useState(item != null ? item.name : []);
  const [description, setDescription] = useState(
    item != null ? item.description : []
  );
  const [picture, setPicture] = useState(item != null ? item.picture : []);

  async function addItem() {
    try {
      const accessToken = user.accessToken;
      await fetch(`http://localhost:5000/categories/${categoryId}/items`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          name,
          description,
          picture,
          categoryId,
          userId: user.id
        })
      });
      console.log('successfully Created');
    } catch (e) {
      console.error(e);
    }
  }

  async function editItem() {
    try {
      const accessToken = user.accessToken;
      await fetch(
        `http://localhost:5000/categories/${categoryId}/items/${item.itemId}`,
        {
          method: 'PUT',
          mode: 'cors',
          credentials: 'same-origin',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            name,
            picture,
            description,
            categoryId,
            userId: user.id
          })
        }
      );
      console.log('successfully change');
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
