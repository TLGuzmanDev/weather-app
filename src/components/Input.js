import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Input = ({ onSubmit }) => {
  return (
    <form id="form" action="#" onSubmit={onSubmit}>
      <input
        type="text"
        id="location-input"
        name="location-input"
        placeholder="LOCATION..."
      ></input>
      <button type="submit">
        <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
      </button>
    </form>
  );
};

export default Input;
