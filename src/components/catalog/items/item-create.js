import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../../userContext';
import { navigate } from '@reach/router';
import { editItem, addItem } from '../../utils/urlBuilder';

const ItemCreate = props => {
  const { categoryId, location } = props;
  const { user } = useContext(UserContext);
  const { item } = location.state.item
    ? location.state
    : { item: { itemId: '', name: '', description: '', picture: '' } };

  const [name, setName] = useState(item != null ? item.name : []);
  const [description, setDescription] = useState(
    item != null ? item.description : []
  );
  const [picture, setPicture] = useState(item != null ? item.picture : []);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!user.id) {
      navigate(`/categories/${categoryId}/items`);
    }
  }, []);

  async function submitItem() {
    try {
      setSubmitted(true);
      let resp = await fetch(
        item.itemId ? editItem(categoryId, item.itemId) : addItem(categoryId),
        {
          method: item.itemId ? 'PUT' : 'POST',
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
      console.log('Sucessful!', data);
      navigate(`/categories/${categoryId}/items`);
    } catch (e) {
      console.error(e);
      setSubmitted(true);
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
          onChange={e => {
            setSubmitted(false);
            setName(e.target.value);
          }}
          placeholder={item != null ? item.name : 'Enter Name'}
        />
        <label htmlFor="item-description">Description:</label>
        <textarea
          name="item-description"
          id="description"
          cols="30"
          rows="5"
          onChange={e => {
            setSubmitted(false);
            setDescription(e.target.value);
          }}
          placeholder={item != null ? item.description : 'Enter Description'}
        />
        <label htmlFor="item-picture">Picture:</label>
        <input
          type="text"
          name="item-picture"
          id="picture"
          onChange={e => {
            setSubmitted(false);
            setPicture(e.target.value);
          }}
          placeholder={item != null ? item.picture : 'Enter picture Url'}
        />
        <button disabled={submitted} onClick={submitItem} type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default ItemCreate;
