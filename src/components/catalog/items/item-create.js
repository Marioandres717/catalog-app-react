import React, { useState } from 'react';

const ItemCreate = props => {
  const { categoryId, location } = props;
  const { user } = location.state;
  const [name, setName] = useState([]);
  const [description, setDescription] = useState([]);
  const [picture, setPicture] = useState([]);

  // TODO: EDIT ITEM
  // TODO: DELETE ITEM
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
          addItem();
        }}
      >
        <label htmlFor="item-name">Name:</label>
        <input
          type="text"
          name="item-name"
          id="name"
          onChange={e => setName(e.target.value)}
        />
        <label htmlFor="item-description">Description:</label>
        <textarea
          name="item-description"
          id="description"
          cols="30"
          rows="5"
          onChange={e => setDescription(e.target.value)}
        />
        <label htmlFor="item-picture">Picture:</label>
        <input
          type="text"
          name="item-picture"
          id="picture"
          onChange={e => setPicture(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ItemCreate;
