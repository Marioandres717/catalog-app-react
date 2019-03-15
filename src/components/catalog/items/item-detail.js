import React, { useState, useEffect } from 'react';

const ItemDetails = props => {
  const [name, setName] = useState([]);
  const [description, setDescription] = useState([]);
  const [picture, setPicture] = useState([]);

  useEffect(() => {
    fetchItem(props.id).then(item => {
      let { name, description, picture } = item;
      setName(name);
      setDescription(description);
      setPicture(picture);
    });
  }, [name, description, picture]);

  async function fetchItem(itemId) {
    const response = await fetch(`http://localhost:5000/items/${itemId}`, {
      method: 'GET'
    });
    const { item } = await response.json();
    return item;
  }

  return (
    <div>
      <h1>
        {name} - {props.id}
      </h1>
      <h2>{description}</h2>
      <img src={picture} alt={name} />
    </div>
  );
};

export default ItemDetails;
